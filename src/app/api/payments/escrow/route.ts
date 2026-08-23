import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { recordEscrowDeposit, recordEscrowRelease } from '@/lib/finance/ledger';
import { logAuditEvent } from '@/lib/audit/logger';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { contractId, action } = body; // action: 'DEPOSIT' | 'RELEASE'

    if (!contractId || !action) {
      return NextResponse.json({ error: 'Contract ID and action are required' }, { status: 400 });
    }

    const contract = await prisma.campaignContract.findUnique({
      where: { id: contractId },
      include: {
        campaign: true,
      },
    });

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    const orgId = user.orgMemberships[0]?.organizationId;
    const isBrandAuthorized = contract.organizationId === orgId || user.role === 'TIA_SUPER_ADMIN' || user.role === 'TIA_FINANCE';

    if (!isBrandAuthorized) {
      return NextResponse.json({ error: 'Forbidden. Only brand finance or TIA admins can mutate escrow.' }, { status: 403 });
    }

    if (action === 'DEPOSIT') {
      // Record Escrow Deposit
      const transaction = await recordEscrowDeposit({
        organizationId: contract.organizationId,
        creatorId: contract.creatorId,
        campaignId: contract.campaignId,
        contractId: contract.id,
        grossAmountMinor: contract.agreedAmount,
        currency: contract.currency,
        paymentProvider: 'INTERNAL_LEDGER',
      });

      // Advance campaign state to FUNDED / IN_PROGRESS
      await prisma.campaign.update({
        where: { id: contract.campaignId },
        data: { status: 'IN_PROGRESS' },
      });

      await logAuditEvent({
        userId: user.id,
        userRole: user.role,
        action: 'PAYMENT_CAPTURED',
        entityType: 'TRANSACTION',
        entityId: transaction.id,
        metadata: { amountMinor: contract.agreedAmount, status: 'HELD_IN_ESCROW' },
      });

      return NextResponse.json({
        message: 'Campaign escrow successfully funded and locked in ledger',
        transaction,
      });
    }

    if (action === 'RELEASE') {
      // Record Escrow Release, Payout, and Tax Invoice
      const transaction = await recordEscrowRelease({
        organizationId: contract.organizationId,
        creatorId: contract.creatorId,
        campaignId: contract.campaignId,
        contractId: contract.id,
        grossAmountMinor: contract.agreedAmount,
        currency: contract.currency,
      });

      // Advance campaign state to COMPLETED
      await prisma.campaign.update({
        where: { id: contract.campaignId },
        data: { status: 'COMPLETED' },
      });

      await logAuditEvent({
        userId: user.id,
        userRole: user.role,
        action: 'PAYMENT_RELEASED',
        entityType: 'TRANSACTION',
        entityId: transaction.id,
        metadata: { status: 'SETTLED', commissionCaptured: transaction.commissionAmount },
      });

      return NextResponse.json({
        message: 'Campaign completed! Escrow released to creator and 5% commission captured.',
        transaction,
      });
    }

    return NextResponse.json({ error: 'Invalid escrow action' }, { status: 400 });
  } catch (error: any) {
    console.error('Escrow Payment Error:', error);
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}
