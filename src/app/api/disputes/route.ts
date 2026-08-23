import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { canResolveDisputes } from '@/lib/rbac/permissions';
import { logAuditEvent } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const disputes = await prisma.dispute.findMany({
      include: {
        campaign: { select: { title: true, status: true, budget: true } },
        initiator: { select: { name: true, role: true } },
        evidence: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ disputes });
  } catch (error: any) {
    console.error('Fetch Disputes Error:', error);
    return NextResponse.json({ error: 'Failed to fetch disputes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { campaignId, contractId, reason, description, claimedAmount, action, disputeId, decisionSummary, financialResolutionType, refundAmountMinor, releaseAmountMinor } = body;

    // 1. Open Dispute
    if (action === 'OPEN') {
      if (!campaignId || !reason || !description) {
        return NextResponse.json({ error: 'Campaign ID, reason, and description are required' }, { status: 400 });
      }

      const claimedAmountMinor = claimedAmount ? Math.round(Number(claimedAmount) * 100) : 0;

      const dispute = await prisma.dispute.create({
        data: {
          campaignId,
          contractId: contractId || null,
          initiatorUserId: user.id,
          initiatorRole: user.role === 'CREATOR' ? 'CREATOR' : 'BRAND',
          reason,
          description,
          claimedAmount: claimedAmountMinor,
          status: 'OPENED',
        },
      });

      // Update campaign state to DISPUTED
      await prisma.campaign.update({
        where: { id: campaignId },
        data: { status: 'DISPUTED' },
      });

      await logAuditEvent({
        userId: user.id,
        userRole: user.role,
        action: 'DISPUTE_OPEN',
        entityType: 'DISPUTE',
        entityId: dispute.id,
      });

      return NextResponse.json({ message: 'Dispute opened successfully', dispute }, { status: 201 });
    }

    // 2. TIA Governance Decision
    if (action === 'RESOLVE') {
      if (!canResolveDisputes(user.role)) {
        return NextResponse.json({ error: 'Forbidden. Only TIA Finance/Admin can resolve disputes.' }, { status: 403 });
      }

      if (!disputeId || !decisionSummary || !financialResolutionType) {
        return NextResponse.json({ error: 'Dispute ID, decision summary, and financial resolution type are required' }, { status: 400 });
      }

      const dispute = await prisma.dispute.update({
        where: { id: disputeId },
        data: {
          status: 'RESOLVED',
          decisionSummary,
          financialResolutionType,
          refundAmount: refundAmountMinor ? Math.round(Number(refundAmountMinor)) : 0,
          releaseAmount: releaseAmountMinor ? Math.round(Number(releaseAmountMinor)) : 0,
          decidedByUserId: user.id,
          decidedAt: new Date(),
        },
      });

      await logAuditEvent({
        userId: user.id,
        userRole: user.role,
        action: 'DISPUTE_DECISION',
        entityType: 'DISPUTE',
        entityId: dispute.id,
        metadata: { resolution: financialResolutionType },
      });

      return NextResponse.json({ message: 'Dispute resolved with recorded financial outcome', dispute });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Dispute Management Error:', error);
    return NextResponse.json({ error: 'Failed to process dispute' }, { status: 500 });
  }
}
