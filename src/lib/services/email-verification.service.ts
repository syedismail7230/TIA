// ===================================================
// TIA BACKEND - EMAIL VERIFICATION LINK ENGINE
// ===================================================

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { sendLiveEmail } from '@/lib/email/resend';

export interface EmailVerificationRecord {
  token: string;
  email: string;
  userId?: string;
  role: 'CREATOR' | 'BRAND_ADMIN' | 'BRAND_USER';
  createdAt: string;
  expiresAt: string;
  verified: boolean;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const VERIFICATION_FILE = path.join(DATA_DIR, 'email_verifications.json');

let memoryVerifications: Record<string, EmailVerificationRecord> = {};

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {}
}

function loadVerifications(): Record<string, EmailVerificationRecord> {
  ensureDataDir();
  try {
    if (fs.existsSync(VERIFICATION_FILE)) {
      const raw = fs.readFileSync(VERIFICATION_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {}
  return memoryVerifications;
}

function saveVerifications(data: Record<string, EmailVerificationRecord>) {
  memoryVerifications = { ...data };
  try {
    ensureDataDir();
    fs.writeFileSync(VERIFICATION_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch {}
}

export class EmailVerificationService {
  /**
   * Generates a 32-byte secure hex token and dispatches email verification link
   */
  static async sendVerificationEmail(params: {
    email: string;
    name?: string;
    userId?: string;
    role: 'CREATOR' | 'BRAND_ADMIN' | 'BRAND_USER';
  }): Promise<{ success: boolean; token: string; error?: string }> {
    const { email, name = 'Valued Partner', userId, role } = params;
    const token = crypto.randomBytes(32).toString('hex');
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    const records = loadVerifications();
    records[token] = {
      token,
      email: email.toLowerCase().trim(),
      userId,
      role,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      verified: false,
    };
    saveVerifications(records);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verifyUrl = `${appUrl}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    const roleLabel = role === 'CREATOR' ? 'Creator' : 'Brand';

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; }
          .card { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 40px; box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
          .header { text-align: center; margin-bottom: 28px; }
          .title { font-size: 24px; font-weight: 800; color: #0f172a; margin: 12px 0 6px 0; letter-spacing: -0.02em; }
          .subtitle { font-size: 14px; color: #64748b; margin: 0; line-height: 1.5; }
          .btn-container { text-align: center; margin: 32px 0; }
          .btn { display: inline-block; background-color: #0052FF; color: #ffffff !important; padding: 14px 32px; border-radius: 12px; font-weight: 700; font-size: 15px; text-decoration: none; box-shadow: 0 4px 14px rgba(0,82,255,0.3); }
          .url-box { background: #f1f5f9; border-radius: 8px; padding: 12px; word-break: break-all; font-size: 12px; color: #475569; margin: 20px 0; }
          .footer { border-top: 1px solid #f1f5f9; padding-top: 20px; text-align: center; font-size: 12px; color: #94a3b8; margin-top: 24px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1 class="title">Verify Your Email Address</h1>
            <p class="subtitle">Welcome to The Influencer's Agency (TIA), ${name}!</p>
          </div>

          <p style="font-size: 14px; color: #334155; line-height: 1.6;">
            Thank you for registering as a verified <strong>${roleLabel}</strong> on TIA. To activate your account, access high-paying brand campaigns, and secure 100% payment protection, please verify your email address.
          </p>

          <div class="btn-container">
            <a href="${verifyUrl}" class="btn">Verify Email Address →</a>
          </div>

          <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
            Or copy and paste this verification link into your browser:
          </p>
          <div class="url-box">${verifyUrl}</div>

          <p style="font-size: 11px; color: #94a3b8; margin-top: 20px;">
            This verification link will expire in 24 hours. If you did not create a TIA account, please ignore this email.
          </p>

          <div class="footer">
            © ${new Date().getFullYear()} The Influencer's Agency (TIA). All rights reserved.<br>
            Automated Contract &amp; Payment Intelligence Platform.
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await sendLiveEmail({
      to: email,
      subject: `Verify your email for The Influencer's Agency (TIA)`,
      html,
    });

    if (!result.success) {
      console.warn('Failed to send verification email via Resend:', result.error);
      return { success: false, token, error: result.error };
    }

    return { success: true, token };
  }

  /**
   * Verifies the email token
   */
  static verifyToken(token: string, email?: string): { success: boolean; record?: EmailVerificationRecord; error?: string } {
    const records = loadVerifications();
    const record = records[token];

    if (!record) {
      return { success: false, error: 'Invalid or expired verification link.' };
    }

    if (new Date(record.expiresAt) < new Date()) {
      return { success: false, error: 'This email verification link has expired.' };
    }

    if (email && record.email.toLowerCase() !== email.toLowerCase().trim()) {
      return { success: false, error: 'Email mismatch for this verification link.' };
    }

    record.verified = true;
    records[token] = record;
    saveVerifications(records);

    return { success: true, record };
  }
}
