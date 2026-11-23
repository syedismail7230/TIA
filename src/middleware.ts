// ============================================================================
// TIA EDGE MIDDLEWARE
// Covers: Authentication Route Guarding, Rate Limiting, Reverse Proxy Headers,
// Distributed Tracing (x-request-id), CORS, and Security Headers
// ============================================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tia_production_grade_jwt_secret_key_minimum_32_characters_long_entropy_secure_2026'
);

const SESSION_COOKIE_NAME = 'tia_session_token';

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

  // Generate unique trace ID
  const requestId = request.headers.get('x-request-id') || `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // 1. Edge-Level Protected Route Guarding
  const isProtectedDashboard =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/brand') ||
    pathname.startsWith('/creator') ||
    pathname.startsWith('/workspace');

  if (isProtectedDashboard) {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(sessionToken, JWT_SECRET);

      // Admin route RBAC check
      if (pathname.startsWith('/admin')) {
        const userRole = typeof payload.role === 'string' ? payload.role : '';
        if (!userRole.startsWith('TIA_') && userRole !== 'TIA_SUPER_ADMIN') {
          return NextResponse.redirect(new URL('/login?error=forbidden', request.url));
        }
      }
    } catch {
      // Invalid or expired token -> redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      redirectResponse.cookies.delete(SESSION_COOKIE_NAME);
      return redirectResponse;
    }
  }

  // 2. Handle CORS Preflight
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

  // 3. Rate Limiting for API routes
  if (pathname.startsWith('/api/')) {
    const isStrictRoute = pathname.includes('/auth/') || pathname.includes('/payments/');
    const limitCapacity = isStrictRoute ? STRICT_AUTH_CAPACITY : RATE_LIMIT_CAPACITY;
    const rateKey = `${ip}:${isStrictRoute ? 'strict' : 'general'}`;

    const { limited } = isRateLimited(rateKey, limitCapacity);

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

  // Forward request with normalized security & tracing headers
  const response = NextResponse.next();

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
