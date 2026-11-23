// ===================================================
// TIA BACKEND - CENTRALIZED API ERROR HANDLING
// Production-grade error classes & standardized response format
// ===================================================

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { logger } from '@/lib/logger/logger';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: any;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required to access this resource') {
    super(message, 401, 'AUTHENTICATION_REQUIRED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests. Please slow down.', retryAfterSeconds = 60) {
    super(message, 429, 'RATE_LIMIT_EXCEEDED', { retryAfterSeconds });
  }
}

export interface ApiSuccessResponse<T = any> {
  success: true;
  data?: T;
  message?: string;
  meta?: Record<string, any>;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  code: string;
  details?: any;
  timestamp: string;
}

export function formatSuccess<T = any>(
  data?: T,
  message?: string,
  statusCode = 200,
  meta?: Record<string, any>
): NextResponse {
  const body: ApiSuccessResponse<T> = {
    success: true,
    ...(data !== undefined ? { data } : {}),
    ...(message ? { message } : {}),
    ...(meta ? { meta } : {}),
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(body, { status: statusCode });
}

export function handleApiError(error: unknown, routeName = 'API'): NextResponse {
  const timestamp = new Date().toISOString();

  // 1. Zod Schema Validation Error
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
      rule: err.code,
    }));

    logger.warn(`[${routeName}] Request validation failed`, {
      errors: formattedErrors,
    });

    const errorBody: ApiErrorResponse = {
      success: false,
      error: formattedErrors[0]?.message || 'Invalid request payload',
      code: 'VALIDATION_ERROR',
      details: formattedErrors,
      timestamp,
    };

    return NextResponse.json(errorBody, { status: 400 });
  }

  // 2. Controlled AppError instance
  if (error instanceof AppError) {
    if (error.statusCode >= 500) {
      logger.error(`[${routeName}] Operational server error: ${error.message}`, {
        code: error.code,
        details: error.details,
        error,
      });
    } else {
      logger.warn(`[${routeName}] Client error (${error.statusCode}): ${error.message}`, {
        code: error.code,
        details: error.details,
      });
    }

    const errorBody: ApiErrorResponse = {
      success: false,
      error: error.message,
      code: error.code,
      details: error.details,
      timestamp,
    };

    return NextResponse.json(errorBody, { status: error.statusCode });
  }

  // 3. Prisma / Database errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; message: string; meta?: any };

    // Unique constraint violation (e.g. duplicate email, handle, idempotency reference)
    if (prismaError.code === 'P2002') {
      const target = prismaError.meta?.target || 'field';
      logger.warn(`[${routeName}] Unique constraint violation on ${target}`);

      return NextResponse.json(
        {
          success: false,
          error: `A record with this ${target} already exists.`,
          code: 'DUPLICATE_RESOURCE',
          timestamp,
        },
        { status: 409 }
      );
    }

    // Record not found in DB
    if (prismaError.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          error: 'The requested resource does not exist.',
          code: 'NOT_FOUND',
          timestamp,
        },
        { status: 404 }
      );
    }
  }

  // 4. Generic / Unhandled Exceptions
  const isProd = process.env.NODE_ENV === 'production';
  const errorMessage = error instanceof Error ? error.message : 'An unexpected internal error occurred';

  logger.error(`[${routeName}] Unhandled exception: ${errorMessage}`, {
    error,
  });

  return NextResponse.json(
    {
      success: false,
      error: isProd ? 'Internal server error. Please try again later.' : errorMessage,
      code: 'INTERNAL_SERVER_ERROR',
      timestamp,
    },
    { status: 500 }
  );
}
