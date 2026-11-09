// ===================================================
// TIA SECURITY VAULT - AES-256-GCM DATA ENCRYPTION AT REST
// Standard: SOC 2 & ISO 27001 Cryptographic Safeguards
// ===================================================

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

function getMasterKey(): Buffer {
  const secret = process.env.ENCRYPTION_MASTER_KEY || process.env.JWT_SECRET || 'tia_production_grade_jwt_secret_key_minimum_32_characters_long_entropy_secure_2026';
  // Generate deterministic 32-byte key via SHA-256
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * Encrypts sensitive plaintext (e.g. OAuth tokens, bank details, tax IDs) using AES-256-GCM.
 * Output format: iv:authTag:ciphertext (hex-encoded)
 */
export function encryptField(plaintext: string | null | undefined): string | null {
  if (!plaintext) return null;

  try {
    const key = getMasterKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  } catch (error) {
    console.error('Vault encryption error:', error);
    throw new Error('Failed to encrypt sensitive data payload');
  }
}

/**
 * Decrypts AES-256-GCM encrypted ciphertext back to plaintext.
 */
export function decryptField(encryptedPayload: string | null | undefined): string | null {
  if (!encryptedPayload) return null;

  // Handle unencrypted legacy data gracefully
  if (!encryptedPayload.includes(':')) {
    return encryptedPayload;
  }

  try {
    const parts = encryptedPayload.split(':');
    if (parts.length !== 3) {
      return encryptedPayload; // Return raw if format doesn't match
    }

    const [ivHex, authTagHex, ciphertextHex] = parts;
    const key = getMasterKey();
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertextHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.warn('Vault decryption error or invalid payload, returning fallback');
    return null;
  }
}
