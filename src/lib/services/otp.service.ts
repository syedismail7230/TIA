// ===================================================
// TIA BACKEND - EMAIL OTP VERIFICATION SERVICE
// ===================================================

import fs from 'fs';
import path from 'path';
import { sendLiveEmail, DEFAULT_RECIPIENT } from '@/lib/email/resend';
import { renderPlatformEmail } from '@/lib/email/templates';
import { logAudit } from '@/lib/audit/logger';

export interface OtpRecord {
  email: string;
  code: string;
  purpose: 'SIGNUP' | 'LOGIN' | 'PASSWORD_RESET' | 'PAYOUT_VERIFICATION';
  attempts: number;
  expiresAt: number; // timestamp in ms
  createdAt: string;
  verified: boolean;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const OTP_FILE = path.join(DATA_DIR, 'email_otps.json');
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

let memoryOtps: OtpRecord[] = [];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(OTP_FILE)) {
      fs.writeFileSync(OTP_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch {}
}

function readOtps(): OtpRecord[] {
  ensureDataFile();
  try {
    if (fs.existsSync(OTP_FILE)) {
      const raw = fs.readFileSync(OTP_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return memoryOtps;
}

function writeOtps(otps: OtpRecord[]) {
  memoryOtps = [...otps];
  try {
    ensureDataFile();
    fs.writeFileSync(OTP_FILE, JSON.stringify(otps, null, 2), 'utf-8');
  } catch {}
}

export class OtpService {
  /**
   * Generates and dispatches a 6-digit OTP to the user's email via Resend
   */
  static async sendOtp(
    email: string,
    purpose: OtpRecord['purpose'] = 'SIGNUP'
  ): Promise<{ success: boolean; message: string; email: string }> {
    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      throw new Error('Please provide a valid email address.');
    }

    // Generate cryptographically random 6-digit OTP code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + OTP_EXPIRY_MS;

    const list = readOtps().filter((o) => !(o.email === normalizedEmail && o.purpose === purpose));

    const newRecord: OtpRecord = {
      email: normalizedEmail,
      code,
      purpose,
      attempts: 0,
      expiresAt,
      createdAt: new Date().toISOString(),
      verified: false,
    };

    list.push(newRecord);
    writeOtps(list);

    // Purpose labels for email
    const purposeTitles: Record<OtpRecord['purpose'], string> = {
      SIGNUP: 'Account Verification',
      LOGIN: 'Login Security Code',
      PASSWORD_RESET: 'Password Reset',
      PAYOUT_VERIFICATION: 'High-Value Payout Verification',
    };

    const title = purposeTitles[purpose] || 'Verification Code';

    // Branded HTML Email Template matching platform UI/UX
    const html = renderPlatformEmail({
      badgeText: 'SECURE AUTH',
      badgeColor: 'blue',
      title,
      subtitle: `Use the 6-digit verification code below to complete your request for <strong style="color: #0052FF;">${normalizedEmail}</strong>.`,
      contentHtml: '',
      highlightBox: {
        value: code,
        style: 'dashed',
      },
      footerNote: 'This code is valid for <strong>10 minutes</strong>. Do not share this OTP with anyone.',
    });

    await sendLiveEmail({
      to: normalizedEmail || DEFAULT_RECIPIENT,
      subject: `Your ${title} Code is ${code}`,
      html,
    });

    logAudit({
      actorId: normalizedEmail,
      action: 'OTP_DISPATCHED',
      targetType: 'EmailOTP',
      targetId: normalizedEmail,
      details: { purpose, expiresAt },
    });

    return {
      success: true,
      message: `A 6-digit verification code has been sent to ${normalizedEmail}.`,
      email: normalizedEmail,
    };
  }

  /**
   * Validates the 6-digit OTP code
   */
  static async verifyOtp(
    email: string,
    code: string,
    purpose: OtpRecord['purpose'] = 'SIGNUP'
  ): Promise<{ success: boolean; message: string }> {
    const normalizedEmail = email.toLowerCase().trim();
    const cleanCode = code.trim();

    const list = readOtps();
    const record = list.find((o) => o.email === normalizedEmail && o.purpose === purpose);

    if (!record) {
      throw new Error('No active verification code found for this email. Please request a new OTP.');
    }

    if (Date.now() > record.expiresAt) {
      throw new Error('Verification code has expired. Please request a new OTP.');
    }

    if (record.attempts >= MAX_ATTEMPTS) {
      throw new Error('Too many failed verification attempts. Please request a new OTP.');
    }

    if (record.code !== cleanCode) {
      record.attempts += 1;
      writeOtps(list);
      const remaining = MAX_ATTEMPTS - record.attempts;
      throw new Error(`Incorrect verification code. ${remaining} attempts remaining.`);
    }

    // Mark verified and burn code
    record.verified = true;
    const remainingList = list.filter((o) => !(o.email === normalizedEmail && o.purpose === purpose));
    writeOtps(remainingList);

    logAudit({
      actorId: normalizedEmail,
      action: 'OTP_VERIFIED_SUCCESSFULLY',
      targetType: 'EmailOTP',
      targetId: normalizedEmail,
      details: { purpose },
    });

    return {
      success: true,
      message: 'Email successfully verified!',
    };
  }
}
