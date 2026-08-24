import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const event = JSON.parse(rawBody);

    // Support both Razorpay & Stripe webhook payloads
    const eventType = event.event || event.type || 'payment.captured';
    console.log('Received Payment Webhook Event:', eventType);

    // 1. Handle payment capture / escrow funding
    if (eventType === 'payment.captured' || eventType === 'payment_intent.succeeded') {
      const paymentData = event.payload?.payment?.entity || event.data?.object;
      const contractId = paymentData?.notes?.contractId || paymentData?.metadata?.contractId;

      if (contractId) {
        try {
          await prisma.transaction.updateMany({
            where: { contractId },
            data: {
              status: 'HELD_IN_ESCROW',
            },
          });
        } catch (dbErr: any) {
          console.warn('Webhook DB transaction update note:', dbErr.message);
        }
      }
    }

    // 2. Handle payout transfer / creator bank release
    if (eventType === 'transfer.processed' || eventType === 'payout.paid') {
      const payoutData = event.payload?.transfer?.entity || event.data?.object;
      const contractId = payoutData?.notes?.contractId || payoutData?.metadata?.contractId;

      if (contractId) {
        try {
          await prisma.transaction.updateMany({
            where: { contractId },
            data: {
              status: 'SETTLED',
            },
          });
        } catch (dbErr: any) {
          console.warn('Webhook DB payout update note:', dbErr.message);
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
