// ===================================================
// TIA BACKEND - UNIFIED TRANSACTIONAL EMAIL CLIENT
// Cloudflare Routing via Gmail SMTP + Resend Fallback
// ===================================================

import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

function getEnvVar(key: string, defaultValue: string = ''): string {
  if (process.env[key]) {
    return process.env[key]!;
  }

  // Load from local .env if running in test / cli mode
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const regex = new RegExp(`^${key}=(.*)$`, 'm');
      const match = content.match(regex);
      if (match && match[1]) {
        return match[1].trim().replace(/^["']|["']$/g, '');
      }
    }
  } catch {}

  return defaultValue;
}

export const SMTP_USER = getEnvVar('SMTP_USER', 'creatorsalliance.media@gmail.com');
export const SMTP_PASS = getEnvVar('SMTP_PASS', 'yudcqmjsedbopqxf').replace(/\s+/g, '');
export const DEFAULT_FROM = getEnvVar('SMTP_FROM', `"The Influencer's Agency" <noreply@theinfluencers.agency>`);
export const DEFAULT_RECIPIENT = getEnvVar('DEFAULT_NOTIFICATION_EMAIL', 'creatorsalliance.media@gmail.com');

export interface SendEmailParams {
  to?: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

// Singleton SMTP Transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendLiveEmail(params: SendEmailParams) {
  const targetRecipient = params.to || DEFAULT_RECIPIENT;
  const fromAddress = params.from || DEFAULT_FROM;

  // 1. Primary: Send via Cloudflare Routing (Gmail SMTP)
  if (SMTP_USER && SMTP_PASS) {
    try {
      const transport = getTransporter();
      const info = await transport.sendMail({
        from: fromAddress,
        to: targetRecipient,
        subject: params.subject,
        html: params.html,
        replyTo: params.replyTo || 'support@theinfluencers.agency',
      });

      console.log('✅ SMTP Email Dispatched Successfully:', info.messageId);
      return { success: true, messageId: info.messageId, provider: 'smtp' };
    } catch (smtpError: any) {
      console.warn('⚠️ SMTP Dispatch error, attempting fallback:', smtpError.message);
    }
  }

  // 2. Fallback: Resend API if configured
  const resendKey = getEnvVar('RESEND_API_KEY');
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const resendResponse = await resend.emails.send({
        from: `The Influencer's Agency (TIA) <onboarding@resend.dev>`,
        to: Array.isArray(targetRecipient) ? targetRecipient : [targetRecipient],
        subject: params.subject,
        html: params.html,
        replyTo: params.replyTo || 'support@theinfluencers.agency',
      });

      console.log('Resend Fallback Email Dispatched:', resendResponse);
      return { success: true, data: resendResponse, provider: 'resend' };
    } catch (resendError: any) {
      console.error('Resend Fallback Error:', resendError);
      return { success: false, error: resendError.message };
    }
  }

  return { success: false, error: 'No active email provider available' };
}
