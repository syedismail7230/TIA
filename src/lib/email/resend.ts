// ===================================================
// TIA BACKEND - RESEND LIVE EMAIL CLIENT
// ===================================================

import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

function getApiKey(): string {
  if (process.env.RESEND_API_KEY) {
    return process.env.RESEND_API_KEY;
  }

  // Load from local .env if running in test / cli mode
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const match = content.match(/RESEND_API_KEY=(.+)/);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch {
    // ignore
  }

  return '';
}

export const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
export const DEFAULT_RECIPIENT = process.env.DEFAULT_NOTIFICATION_EMAIL || 'creatorsalliance.media@gmail.com';

export interface SendEmailParams {
  to?: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendLiveEmail(params: SendEmailParams) {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set. Skipping live email dispatch.');
    return { success: false, error: 'Missing RESEND_API_KEY' };
  }

  try {
    const resend = new Resend(apiKey);
    const targetRecipient = DEFAULT_RECIPIENT;

    const response = await resend.emails.send({
      from: params.from || `The Influencer's Agency (TIA) <${DEFAULT_FROM}>`,
      to: [targetRecipient],
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo || 'support@tia.agency',
    });

    console.log('Resend Email Dispatched:', response);
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Resend Email Error:', error);
    return { success: false, error: error.message };
  }
}
