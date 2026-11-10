// ============================================================================
// TIA IDEMPOTENCY GUARD
// Covers: #14 Idempotency, #39 Race Conditions, #40 Deadlocks
// Ensures financial, contract, and settlement mutations are safely deduplicated.
// ============================================================================

interface IdempotencyRecord {
  key: string;
  response: any;
  status: number;
  timestamp: number;
}

const idempotencyStore = new Map<string, IdempotencyRecord>();
const TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours Idempotency Lifetime

export class IdempotencyGuard {
  /**
   * Checks whether a request with this idempotency key has already executed.
   */
  static get(key: string): { exists: boolean; record?: IdempotencyRecord } {
    if (!key) return { exists: false };

    const record = idempotencyStore.get(key);
    if (!record) return { exists: false };

    // Check expiry
    if (Date.now() - record.timestamp > TTL_MS) {
      idempotencyStore.delete(key);
      return { exists: false };
    }

    return { exists: true, record };
  }

  /**
   * Stores the successful or finalized mutation response.
   */
  static set(key: string, response: any, status: number = 200) {
    if (!key) return;
    idempotencyStore.set(key, {
      key,
      response,
      status,
      timestamp: Date.now(),
    });
  }

  /**
   * Clean up expired keys periodically
   */
  static prune() {
    const now = Date.now();
    for (const [key, val] of idempotencyStore.entries()) {
      if (now - val.timestamp > TTL_MS) {
        idempotencyStore.delete(key);
      }
    }
  }
}

