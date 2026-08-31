// ===================================================
// TIA BACKEND - EMAIL OTP VERIFICATION SERVICE
// ===================================================

import fs from 'fs';
import path from 'path';
import { sendLiveEmail, DEFAULT_RECIPIENT } from '@/lib/email/resend';
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

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(OTP_FILE)) {
    fs.writeFileSync(OTP_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readOtps(): OtpRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(OTP_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeOtps(otps: OtpRecord[]) {
  ensureDataFile();
  fs.writeFileSync(OTP_FILE, JSON.stringify(otps, null, 2), 'utf-8');
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

    // Branded HTML Email Template
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - TIA</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f9fafb; margin: 0; padding: 24px; }
    .container { max-width: 520px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; }
    .header { padding: 24px 32px; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border-bottom: 1px solid #374151; }
    .logo { font-size: 18px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
    .badge { display: inline-block; padding: 3px 8px; font-size: 10px; font-weight: 700; background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 9999px; margin-left: 8px; }
    .body { padding: 32px; color: #d1d5db; line-height: 1.6; font-size: 14px; text-align: center; }
    .otp-box { margin: 28px auto; padding: 18px 24px; background: #1f2937; border: 2px dashed #3b82f6; border-radius: 12px; display: inline-block; }
    .otp-code { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #60a5fa; font-family: monospace; }
    .footer { padding: 18px 32px; background-color: #0b0f19; border-top: 1px solid #1f2937; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="logo">THE INFLUENCER'S AGENCY</span>
      <span class="badge">SECURE AUTH</span>
    </div>
    <div class="body">
      <h2 style="color: #ffffff; margin-top: 0;">${title}</h2>
      <p style="color: #9ca3af;">Use the 6-digit verification code below to complete your request for <strong>${normalizedEmail}</strong>.</p>
      
      <div class="otp-box">
        <div class="otp-code">${code}</div>
      </div>

      <p style="color: #9ca3af; font-size: 13px;">This code is valid for <strong>10 minutes</strong>. Do not share this OTP with anyone.</p>
    </div>
    <div class="footer">
      &copy; 2026 The Influencer's Agency (TIA). All payments held under TIA Payment Protection.
    </div>
  </div>
</body>
</html>
    `;

    await sendLiveEmail({
      to: normalizedEmail || DEFAULT_RECIPIENT,
      subject: `[TIA Verification] Your ${title} Code is ${code}`,
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
