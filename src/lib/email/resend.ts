// ===================================================
// TIA BACKEND - RESEND LIVE EMAIL CLIENT
// ===================================================

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
export const resendClient = new Resend(resendApiKey);

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
  try {
    const toRecipient = params.to || DEFAULT_RECIPIENT;
    const response = await resendClient.emails.send({
      from: params.from || `The Influencer's Agency (TIA) <${DEFAULT_FROM}>`,
      to: Array.isArray(toRecipient) ? toRecipient : [toRecipient],
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
