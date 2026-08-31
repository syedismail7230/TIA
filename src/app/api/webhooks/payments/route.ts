// ===================================================
// TIA BACKEND - PAYMENT WEBHOOK RECONCILIATION API
// ===================================================

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/db/prisma';
import { PaymentService } from '@/lib/services/payment.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify HMAC signature if webhook secret is set
    if (signature && webhookSecret) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event || event.type || 'payment.captured';
    console.log('Payment Webhook Reconciled:', eventType);

    // 1. Handle payment capture -> credit brand wallet or lock milestone protection
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentData = event.payload?.payment?.entity || event.data?.object;
      const brandId = paymentData?.notes?.brandId;
      const amount = paymentData?.amount ? paymentData.amount / 100 : 0; // Convert paise to INR

      if (brandId && amount > 0) {
        try {
          await PaymentService.addFunds(brandId, amount);
        } catch (err: any) {
          console.warn('Wallet deposit reconciliation note:', err.message);
        }
      }

      const contractId = paymentData?.notes?.contractId;
      if (contractId) {
        try {
          await prisma.transaction.updateMany({
            where: { contractId },
            data: { status: 'HELD_IN_PROTECTION' },
          });
        } catch (dbErr: any) {
          console.warn('Prisma transaction update note:', dbErr.message);
        }
      }
    }

    // 2. Handle payout transfer / creator bank release
    if (eventType === 'transfer.processed' || eventType === 'payout.paid') {
      const payoutData = event.payload?.transfer?.entity || event.data?.object;
      const transactionId = payoutData?.notes?.transactionId;

      if (transactionId) {
        try {
          await PaymentService.disbursePayout(transactionId);
        } catch (disburseErr: any) {
          console.warn('Payout disbursement reconciliation note:', disburseErr.message);
        }
      }
    }

    return NextResponse.json({ received: true, status: 'processed' });
  } catch (error: any) {
    console.error('Payment Webhook Error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 400 }
    );
  }
}
