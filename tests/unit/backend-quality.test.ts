// ===================================================
// TIA BACKEND - PHASE 3 QUALITY & SECURITY QA TESTS
// Tests Zod Validation, Error Handler, Rate Limiter, File Guard & Idempotency
// ===================================================

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { ZodError } from 'zod';
import {
  loginSchema,
  createWalletOrderSchema,
  createCampaignSchema,
  sendMessageSchema,
  validateRequest,
} from '@/lib/validations';
import {
  AppError,
  ValidationError,
  AuthenticationError,
  RateLimitError,
  handleApiError,
} from '@/lib/errors/api-error';
import { enforceRateLimit } from '@/lib/security/rate-limiter';
import { verifyMagicBytes, sanitizeFilename } from '@/lib/security/file-guard';
import { IdempotencyEngine } from '@/lib/security/idempotency';

describe('TIA Backend Quality & Security (Phase 3)', () => {
  // -------------------------------------------------
  // 1. Zod Request Validation
  // -------------------------------------------------
  test('Zod validation succeeds with valid login payload', () => {
    const valid = validateRequest(loginSchema, {
      email: 'creator@theinfluencers.agency',
      password: 'SecurePassword123!',
    });
    assert.equal(valid.email, 'creator@theinfluencers.agency');
  });

  test('Zod validation rejects invalid email and short password', () => {
    assert.throws(
      () => {
        validateRequest(loginSchema, {
          email: 'not-an-email',
          password: '123',
        });
      },
      (err: any) => err instanceof ZodError
    );
  });

  test('Zod wallet validation enforces positive limits', () => {
    assert.throws(() => {
      validateRequest(createWalletOrderSchema, {
        action: 'CREATE_ORDER',
        amount: -500,
      });
    });

    const validOrder = validateRequest(createWalletOrderSchema, {
      action: 'CREATE_ORDER',
      amount: 1000,
    });
    assert.equal(validOrder.amount, 1000);
  });

  // -------------------------------------------------
  // 2. Centralized Error Handling
  // -------------------------------------------------
  test('handleApiError returns 400 with formatted field details for ZodError', async () => {
    try {
      validateRequest(loginSchema, { email: 'bad' });
    } catch (zodErr) {
      const response = handleApiError(zodErr, 'TestRoute');
      assert.equal(response.status, 400);
      const data = await response.json();
      assert.equal(data.success, false);
      assert.equal(data.code, 'VALIDATION_ERROR');
      assert.ok(Array.isArray(data.details));
    }
  });

  test('handleApiError respects AppError status codes', async () => {
    const authErr = new AuthenticationError('Token expired');
    const response = handleApiError(authErr, 'TestAuth');
    assert.equal(response.status, 401);
    const data = await response.json();
    assert.equal(data.code, 'AUTHENTICATION_REQUIRED');
  });

  // -------------------------------------------------
  // 3. Rate Limiter
  // -------------------------------------------------
  test('Rate limiter allows requests within threshold and blocks excess', async () => {
    const testIp = `test-ip-${Date.now()}`;
    const tier = { windowMs: 10000, maxRequests: 3, keyPrefix: 'test' };

    // 1st request - ok
    const r1 = await enforceRateLimit(testIp, tier);
    assert.equal(r1.remaining, 2);

    // 2nd request - ok
    const r2 = await enforceRateLimit(testIp, tier);
    assert.equal(r2.remaining, 1);

    // 3rd request - ok
    const r3 = await enforceRateLimit(testIp, tier);
    assert.equal(r3.remaining, 0);

    // 4th request - should throw RateLimitError (429)
    await assert.rejects(
      async () => {
        await enforceRateLimit(testIp, tier);
      },
      (err: any) => err instanceof RateLimitError && err.statusCode === 429
    );
  });

  // -------------------------------------------------
  // 4. Secure File Upload Guards
  // -------------------------------------------------
  test('verifyMagicBytes accepts genuine PNG header and rejects spoofed executable', () => {
    // Genuine PNG header (89 50 4E 47 0D 0A 1A 0A)
    const validPng = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
    assert.equal(verifyMagicBytes(validPng, '.png'), true);

    // Fake PNG: Windows executable MZ header (4D 5A) renamed to .png
    const fakePng = Buffer.from([0x4d, 0x5a, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00]);
    assert.equal(verifyMagicBytes(fakePng, '.png'), false);

    // Genuine PDF header (%PDF = 25 50 44 46)
    const validPdf = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]);
    assert.equal(verifyMagicBytes(validPdf, '.pdf'), true);
  });

  test('sanitizeFilename strips path traversal sequences', () => {
    const maliciousName = '../../../../etc/passwd.jpg';
    const sanitized = sanitizeFilename(maliciousName, 'user123');
    assert.ok(!sanitized.includes('../'));
    assert.ok(sanitized.endsWith('.jpg'));
  });

  // -------------------------------------------------
  // 5. Financial Idempotency Engine
  // -------------------------------------------------
  test('IdempotencyEngine stores and returns cached result on replay', async () => {
    const testKey = `idem_test_${Date.now()}`;
    const initialCheck = await IdempotencyEngine.getCompletedOperation(testKey);
    assert.equal(initialCheck, null);

    const mockResponse = {
      success: true,
      wallet: { availableBalance: 5000 },
      transactionRef: testKey,
    };

    IdempotencyEngine.recordOperation(testKey, mockResponse);

    const replayedCheck = await IdempotencyEngine.getCompletedOperation(testKey);
    assert.notEqual(replayedCheck, null);
    assert.equal(replayedCheck.transactionRef, testKey);
  });
});
