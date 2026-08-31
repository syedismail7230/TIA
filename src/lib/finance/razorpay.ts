// ===================================================
// TIA BACKEND - LIVE RAZORPAY GATEWAY CLIENT
// ===================================================

import Razorpay from 'razorpay';
import crypto from 'crypto';

const key_id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_RQuwNOxotGRMaW';
const key_secret = process.env.RAZORPAY_KEY_SECRET || 'YvHSA69PHkq4SvDj1Fr8VmuN';
const webhook_secret = process.env.RAZORPAY_WEBHOOK_SECRET || '3ef54778bead13e6398b16e4db45389658cd96a6be26f582c0fa0f5b84293f0b';

export const razorpayClient = new Razorpay({
  key_id,
  key_secret,
});

export interface CreateOrderParams {
  amountInRupees: number;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

/**
 * Creates a live Razorpay Order for upfront milestone lock or wallet deposit
 */
export async function createLiveRazorpayOrder(params: CreateOrderParams): Promise<RazorpayOrderResponse> {
  const options = {
    amount: Math.round(params.amountInRupees * 100), // convert to paise
    currency: 'INR',
    receipt: params.receipt,
    notes: params.notes || {},
  };

  const order = await razorpayClient.orders.create(options);
  return {
    id: order.id,
    amount: typeof order.amount === 'number' ? order.amount : Number(order.amount),
    currency: order.currency,
    receipt: order.receipt || params.receipt,
    status: order.status,
  };
}

/**
 * Verifies the authenticity of Razorpay payment callback signature
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const text = `${params.orderId}|${params.paymentId}`;
  const generatedSignature = crypto
    .createHmac('sha256', key_secret)
    .update(text)
    .digest('hex');

  return generatedSignature === params.signature;
}

/**
 * Verifies the authenticity of incoming Razorpay Webhook payloads
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  if (!webhook_secret) return true;

  const expectedSignature = crypto
    .createHmac('sha256', webhook_secret)
    .update(rawBody)
    .digest('hex');

  return expectedSignature === signature;
}

/**
 * Fetches live payment details from Razorpay API
 */
export async function getLivePaymentDetails(paymentId: string) {
  return await razorpayClient.payments.fetch(paymentId);
}
