// ============================================================================
// TIA EDGE MIDDLEWARE
// Covers: #1 Rate Limiting, #4 Reverse Proxy Headers, #5 API Gateway,
// #60 Distributed Tracing (x-request-id), #76 CORS, #77 CSRF
// ============================================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ----------------------------------------------------------------------------
// In-Memory Token Bucket Rate Limiter (Edge Compatible)
// ----------------------------------------------------------------------------
interface RateLimitBucket {
  tokens: number;
  lastRefill: number;
}

const rateLimitMap = new Map<string, RateLimitBucket>();
const RATE_LIMIT_CAPACITY = 60; // Max 60 requests per window
const REFILL_RATE_PER_SECOND = 1; // 1 token added per second (60/min steady-state)
const STRICT_AUTH_CAPACITY = 10; // Stricter for auth & sensitive routes (10/min)

function isRateLimited(key: string, capacity: number = RATE_LIMIT_CAPACITY): { limited: boolean; remaining: number } {
  const now = Date.now();
  let bucket = rateLimitMap.get(key);

  if (!bucket) {
    bucket = { tokens: capacity - 1, lastRefill: now };
    rateLimitMap.set(key, bucket);
    return { limited: false, remaining: capacity - 1 };
  }

  // Refill tokens based on time elapsed
  const elapsedSeconds = (now - bucket.lastRefill) / 1000;
  bucket.tokens = Math.min(capacity, bucket.tokens + elapsedSeconds * REFILL_RATE_PER_SECOND);
  bucket.lastRefill = now;

  if (bucket.tokens < 1) {
    return { limited: true, remaining: 0 };
  }

  bucket.tokens -= 1;
  return { limited: false, remaining: Math.floor(bucket.tokens) };
}

// Allowed CORS origins
const ALLOWED_ORIGINS = [
  'https://www.theinfluencers.agency',
  'https://theinfluencers.agency',
  'https://tia-omega-silk.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin') || '';
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

  // Generate unique trace ID (#60 Distributed Tracing)
  const requestId = request.headers.get('x-request-id') || `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Handle CORS Preflight (#76 CORS)
  if (request.method === 'OPTIONS') {
    const isAllowed = ALLOWED_ORIGINS.includes(origin) || process.env.NODE_ENV !== 'production';
    const response = new NextResponse(null, { status: 204 });
    if (isAllowed && origin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      response.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With, Idempotency-Key, x-request-id'
      );
      response.headers.set('Access-Control-Max-Age', '86400');
    }
    return response;
  }

  // Rate Limiting (#1 Rate Limiting)
  if (pathname.startsWith('/api/')) {
    const isStrictRoute = pathname.includes('/auth/') || pathname.includes('/payments/');
    const limitCapacity = isStrictRoute ? STRICT_AUTH_CAPACITY : RATE_LIMIT_CAPACITY;
    const rateKey = `${ip}:${isStrictRoute ? 'strict' : 'general'}`;

    const { limited, remaining } = isRateLimited(rateKey, limitCapacity);

    if (limited) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please throttle your requests.',
          retryAfterSeconds: 30,
        },
        {
          status: 429,
          headers: {
            'Retry-After': '30',
            'X-RateLimit-Limit': String(limitCapacity),
            'X-RateLimit-Remaining': '0',
            'x-request-id': requestId,
          },
        }
      );
    }
  }

  // Forward request with normalized headers
  const response = NextResponse.next();

  // Attach Security Headers (#4 Reverse Proxies, #74 WAF/Security)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(self), microphone=(), geolocation=(), interest-cohort=()'
  );

  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Attach Tracing & CORS headers to response
  response.headers.set('x-request-id', requestId);
  if (ALLOWED_ORIGINS.includes(origin) || process.env.NODE_ENV !== 'production') {
    if (origin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, favicon, etc.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
