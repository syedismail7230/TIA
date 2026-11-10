// ===================================================
// TIA BACKEND - EMAIL VERIFICATION LINK ENGINE
// ===================================================

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { sendLiveEmail } from '@/lib/email/resend';
import { renderPlatformEmail } from '@/lib/email/templates';

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

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.theinfluencers.agency';
    const verifyUrl = `${appUrl}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
    const roleLabel = role === 'CREATOR' ? 'Verified Creator' : 'Brand Organization';

    const html = renderPlatformEmail({
      badgeText: 'ACCOUNT ACTIVATION',
      badgeColor: 'blue',
      title: 'Verify Your Email Address ✉️',
      subtitle: `Welcome to The Influencer's Agency (TIA), ${name}!`,
      contentHtml: `
        <p>Thank you for registering as a <strong>${roleLabel}</strong> on TIA. To activate your workspace, access campaign opportunities, and secure 100% upfront milestone protection, please verify your email address.</p>
        <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; font-size: 11.5px; word-break: break-all; color: #0052FF; margin: 16px 0; font-family: monospace;">
          ${verifyUrl}
        </div>
      `,
      ctaButton: {
        label: 'Verify Email Address →',
        url: verifyUrl,
        color: '#2563eb',
      },
      footerNote: 'This verification link will expire in 24 hours. If you did not create a TIA account, please ignore this email.',
    });

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
