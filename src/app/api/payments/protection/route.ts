// ===================================================
// TIA BACKEND - PAYMENT PROTECTION DISBURSEMENT API
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { PaymentService } from '@/lib/services/payment.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { action, transactionId, milestoneData } = body;

    // Action 1: Disburse payout to creator upon deliverable approval
    if (action === 'DISBURSE' && transactionId) {
      const disbursedTx = await PaymentService.disbursePayout(transactionId);
      return NextResponse.json({
        success: true,
        transaction: disbursedTx,
        message: `Milestone payout of ₹${disbursedTx.netCreatorPayout.toLocaleString('en-IN')} disbursed to creator bank account via NEFT (UTR: ${disbursedTx.utrNumber}).`,
      });
    }

    // Action 2: Lock upfront milestone budget in TIA Payment Protection
    if (action === 'LOCK' && milestoneData) {
      const brandId = user?.id || 'demo-brand-user-id';
      const lockedTx = await PaymentService.lockMilestoneFunds({
        brandId,
        creatorId: milestoneData.creatorId,
        campaignId: milestoneData.campaignId,
        campaignTitle: milestoneData.campaignTitle,
        creatorName: milestoneData.creatorName,
        creatorHandle: milestoneData.creatorHandle,
        grossAmount: Number(milestoneData.grossAmount),
        milestoneStage: Number(milestoneData.milestoneStage),
        milestoneTitle: milestoneData.milestoneTitle,
      });

      return NextResponse.json({
        success: true,
        transaction: lockedTx,
        message: `₹${lockedTx.grossAmount.toLocaleString('en-IN')} 100% secured in TIA Payment Protection.`,
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid protection action requested' }, { status: 400 });
  } catch (error: any) {
    console.error('Payment Protection API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Payment Protection operation failed' }, { status: 500 });
  }
}
