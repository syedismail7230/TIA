// ===================================================
// TIA BACKEND - PRODUCTION RATE LIMITER
// Sliding Window Rate Limiting with In-Memory & Redis support
// ===================================================

import { RateLimitError } from '@/lib/errors/api-error';

export interface RateLimitConfig {
  windowMs: number;       // Window duration in ms (e.g. 60,000 for 1 minute)
  maxRequests: number;    // Maximum allowed requests in window
  keyPrefix?: string;     // Prefix for key namespace
}

interface WindowRecord {
  timestamps: number[];
}

// In-memory sliding window store
const memoryStore = new Map<string, WindowRecord>();

// Cleanup stale windows every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of memoryStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 300000);
      if (record.timestamps.length === 0) {
        memoryStore.delete(key);
      }
    }
  }, 300000);
  if (cleanupTimer && typeof cleanupTimer.unref === 'function') {
    cleanupTimer.unref();
  }
}

export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) {
    return xRealIp.trim();
  }
  return '127.0.0.1';
}

/**
 * Checks rate limits for a given client identifier (IP or User ID).
 * Returns rate limit metadata or throws RateLimitError if exceeded.
 */
export async function enforceRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<{
  limit: number;
  remaining: number;
  resetSeconds: number;
}> {
  const now = Date.now();
  const windowStart = now - config.windowMs;
  const key = `${config.keyPrefix || 'rl'}:${identifier}`;

  // Optional: Upstash Redis REST adapter if configured
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      // Execute atomic sliding window script via REST
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          ['ZREMRANGEBYSCORE', key, 0, windowStart],
          ['ZADD', key, now, `${now}-${Math.random()}`],
          ['ZCARD', key],
          ['EXPIRE', key, Math.ceil(config.windowMs / 1000)],
        ]),
      });

      if (res.ok) {
        const results = await res.json();
        const requestCount = results[2]?.result || 1;
        const remaining = Math.max(0, config.maxRequests - requestCount);
        const resetSeconds = Math.ceil(config.windowMs / 1000);

        if (requestCount > config.maxRequests) {
          throw new RateLimitError(
            `Rate limit exceeded. Maximum ${config.maxRequests} requests per ${Math.round(config.windowMs / 1000)}s allowed.`,
            resetSeconds
          );
        }

        return { limit: config.maxRequests, remaining, resetSeconds };
      }
    } catch (redisErr) {
      if (redisErr instanceof RateLimitError) throw redisErr;
      // Fallback to in-memory store if Redis fails
    }
  }

  // In-memory sliding window
  let record = memoryStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(key, record);
  }

  // Filter timestamps within current window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (record.timestamps.length >= config.maxRequests) {
    const oldestTimestamp = record.timestamps[0];
    const retryAfterMs = oldestTimestamp + config.windowMs - now;
    const retryAfterSec = Math.max(1, Math.ceil(retryAfterMs / 1000));

    throw new RateLimitError(
      `Rate limit exceeded. Maximum ${config.maxRequests} requests per ${Math.round(config.windowMs / 1000)}s allowed.`,
      retryAfterSec
    );
  }

  // Record this request timestamp
  record.timestamps.push(now);

  const remaining = config.maxRequests - record.timestamps.length;
  const resetSeconds = Math.ceil(config.windowMs / 1000);

  return {
    limit: config.maxRequests,
    remaining,
    resetSeconds,
  };
}

// Preset rate limit tiers
export const RATE_LIMIT_TIERS = {
  AUTH: { windowMs: 60 * 1000, maxRequests: 10, keyPrefix: 'auth' },      // 10 req/min (anti-brute force)
  PAYMENT: { windowMs: 60 * 1000, maxRequests: 20, keyPrefix: 'pay' },    // 20 req/min
  STANDARD: { windowMs: 60 * 1000, maxRequests: 120, keyPrefix: 'std' },  // 120 req/min
  STRICT: { windowMs: 60 * 1000, maxRequests: 5, keyPrefix: 'strict' },   // 5 req/min (e.g. OTP generation)
};
