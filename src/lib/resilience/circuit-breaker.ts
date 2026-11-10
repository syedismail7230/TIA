// ============================================================================
// TIA SYSTEM RESILIENCE ENGINE
// Covers: #10 Circuit Breakers, #11 Timeouts, #12 Retries, #13 Exponential Backoff
// ============================================================================

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface CircuitBreakerOptions {
  failureThreshold?: number; // Failures before opening circuit (default 5)
  recoveryTimeMs?: number; // Time before attempting half-open (default 30000ms)
  timeoutMs?: number; // Operation timeout (default 8000ms)
  maxRetries?: number; // Max retry attempts (default 3)
  initialDelayMs?: number; // Initial backoff delay (default 500ms)
}

export class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failureCount: number = 0;
  private lastFailureTime: number = 0;
  private name: string;
  private options: Required<CircuitBreakerOptions>;

  constructor(name: string, options: CircuitBreakerOptions = {}) {
    this.name = name;
    this.options = {
      failureThreshold: options.failureThreshold || 5,
      recoveryTimeMs: options.recoveryTimeMs || 30000,
      timeoutMs: options.timeoutMs || 8000,
      maxRetries: options.maxRetries || 3,
      initialDelayMs: options.initialDelayMs || 500,
    };
  }

  public getState(): CircuitState {
    const now = Date.now();
    if (this.state === 'OPEN' && now - this.lastFailureTime > this.options.recoveryTimeMs) {
      this.state = 'HALF_OPEN';
      console.log(`[CircuitBreaker:${this.name}] Transitioned to HALF_OPEN (Attempting recovery)`);
    }
    return this.state;
  }

  public async execute<T>(fn: (signal: AbortSignal) => Promise<T>): Promise<T> {
    const currentState = this.getState();
    if (currentState === 'OPEN') {
      throw new Error(`[CircuitBreaker:${this.name}] Circuit is OPEN. Request rejected to prevent cascading failure.`);
    }

    let attempt = 0;
    let lastError: any = null;

    while (attempt <= this.options.maxRetries) {
      const controller = new AbortController();
      const timeoutHandle = setTimeout(() => controller.abort(), this.options.timeoutMs);

      try {
        const result = await fn(controller.signal);
        clearTimeout(timeoutHandle);
        this.onSuccess();
        return result;
      } catch (err: any) {
        clearTimeout(timeoutHandle);
        lastError = err;
        attempt++;

        if (attempt <= this.options.maxRetries) {
          // #13 Exponential Backoff with Full Jitter
          const backoff = this.options.initialDelayMs * Math.pow(2, attempt - 1);
          const jitter = Math.random() * backoff;
          const waitTime = backoff + jitter;
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
      }
    }

    this.onFailure();
    throw lastError;
  }

  private onSuccess() {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.state = 'CLOSED';
      console.log(`[CircuitBreaker:${this.name}] System recovered! Circuit reset to CLOSED.`);
    }
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.options.failureThreshold) {
      this.state = 'OPEN';
      console.error(`[CircuitBreaker:${this.name}] Failure threshold reached! Circuit is now OPEN.`);
    }
  }
}

// Registry of standard circuit breakers for third-party integrations
export const circuitBreakers = {
  razorpay: new CircuitBreaker('RazorpayGateway', { failureThreshold: 3, timeoutMs: 7000 }),
  metaApi: new CircuitBreaker('MetaGraphAPI', { failureThreshold: 5, timeoutMs: 10000 }),
  youtubeApi: new CircuitBreaker('YouTubeDataAPI', { failureThreshold: 5, timeoutMs: 10000 }),
  aiAvatar: new CircuitBreaker('AIAvatarEngine', { failureThreshold: 3, timeoutMs: 15000 }),
};
