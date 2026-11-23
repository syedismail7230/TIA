// ===================================================
// TIA BACKEND - FINANCIAL IDEMPOTENCY ENGINE
// Prevents duplicate charges, double deposits & replayed payouts
// ===================================================

import prisma from '@/lib/db/prisma';
import { logger } from '@/lib/logger/logger';

export interface IdempotencyRecord {
  key: string;
  response: any;
  createdAt: number;
}

// Memory cache for sub-second rapid replay deduplication
const memoryIdempotencyStore = new Map<string, IdempotencyRecord>();

// TTL: 24 hours (86,400,000 ms)
const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000;

// Cleanup stale keys every 15 minutes
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of memoryIdempotencyStore.entries()) {
      if (now - record.createdAt > IDEMPOTENCY_TTL_MS) {
        memoryIdempotencyStore.delete(key);
      }
    }
  }, 15 * 60 * 1000);
  if (cleanupTimer && typeof cleanupTimer.unref === 'function') {
    cleanupTimer.unref();
  }
}

export class IdempotencyEngine {
  /**
   * Generates or extracts an authoritative idempotency key from request or payload.
   */
  static extractKey(request: Request, body?: any): string | null {
    const headerKey = request.headers.get('idempotency-key') || request.headers.get('x-idempotency-key');
    if (headerKey && headerKey.trim().length >= 8) {
      return headerKey.trim();
    }

    if (body?.idempotency_key && typeof body.idempotency_key === 'string') {
      return body.idempotency_key.trim();
    }

    // Fall back to external payment reference ID (e.g. Razorpay payment ID)
    if (body?.razorpay_payment_id && typeof body.razorpay_payment_id === 'string') {
      return `rzp_${body.razorpay_payment_id.trim()}`;
    }

    return null;
  }

  /**
   * Checks if an operation with this idempotency key has already completed.
   */
  static async getCompletedOperation(key: string): Promise<any | null> {
    // 1. Check in-memory fast cache
    const cached = memoryIdempotencyStore.get(key);
    if (cached && Date.now() - cached.createdAt < IDEMPOTENCY_TTL_MS) {
      logger.info(`[Idempotency] Fast-cache hit for key: ${key}`);
      return cached.response;
    }

    // 2. Check persistent database ledger entries
    try {
      const existingLedger = await prisma.ledgerEntry.findFirst({
        where: { referenceId: key },
        include: { wallet: true },
      });

      if (existingLedger) {
        logger.info(`[Idempotency] Database ledger hit for key: ${key}`);
        const responseData = {
          success: true,
          idempotent: true,
          wallet: {
            id: existingLedger.wallet.id,
            ownerId: existingLedger.wallet.ownerId,
            availableBalance: Math.round(existingLedger.wallet.availableBalance / 100),
            committedInEscrow: Math.round(existingLedger.wallet.committedInEscrow / 100),
            totalDisbursed: Math.round(existingLedger.wallet.totalDisbursed / 100),
            currency: existingLedger.wallet.currency,
          },
          message: 'Operation previously completed successfully (Idempotent response).',
          transactionRef: key,
        };

        memoryIdempotencyStore.set(key, {
          key,
          response: responseData,
          createdAt: Date.now(),
        });

        return responseData;
      }
    } catch (err) {
      // Database offline/unreachable fallback
    }

    return null;
  }

  /**
   * Stores the successful result of an idempotent financial operation.
   */
  static recordOperation(key: string, response: any): void {
    memoryIdempotencyStore.set(key, {
      key,
      response,
      createdAt: Date.now(),
    });
  }
}
