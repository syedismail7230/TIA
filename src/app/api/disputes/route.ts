// ===================================================
// TIA BACKEND - DISPUTES & ARBITRATION API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { EmailService } from '@/lib/services/email.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId') || undefined;
    const status = searchParams.get('status') || undefined;
    const disputeId = searchParams.get('id');
    const isAdmin = user.role.startsWith('TIA_') || user.role === 'TIA_SUPER_ADMIN';

    // 1. Single Dispute Fetch
    if (disputeId) {
      const dispute = await prisma.dispute.findUnique({
        where: { id: disputeId },
        include: {
          campaign: {
            include: { organization: { include: { members: true } } },
          },
          contract: {
            include: { creator: true },
          },
          initiator: true,
          evidence: true,
        },
      });

      if (!dispute) {
        return NextResponse.json({ success: false, error: 'Dispute record not found' }, { status: 404 });
      }

      const isInitiator = dispute.initiatorUserId === user.id;
      const isCreatorParty = dispute.contract?.creator?.userId === user.id;
      const isBrandParty = dispute.campaign?.organization?.members?.some((m) => m.userId === user.id);

      if (!isAdmin && !isInitiator && !isCreatorParty && !isBrandParty) {
        return NextResponse.json({ success: false, error: 'Forbidden: Access to this dispute is restricted' }, { status: 403 });
      }

      return NextResponse.json({ success: true, dispute: formatDispute(dispute) });
    }

    // 2. Multi-tenant Scoped Query
    let whereClause: any = {};
    if (campaignId) whereClause.campaignId = campaignId;
    if (status) whereClause.status = status;

    if (!isAdmin) {
      if (user.role === 'CREATOR') {
        whereClause.OR = [
          { initiatorUserId: user.id },
          { contract: { creator: { userId: user.id } } },
        ];
      } else {
        // Brand user / admin
        const orgIds = user.orgMemberships?.map((m) => m.organizationId) || [];
        whereClause.OR = [
          { initiatorUserId: user.id },
          { campaign: { organizationId: { in: orgIds } } },
        ];
      }
    }

    const disputes = await prisma.dispute.findMany({
      where: whereClause,
      include: {
        campaign: true,
        contract: true,
        initiator: true,
        evidence: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, disputes: disputes.map(formatDispute) });
  } catch (error: any) {
    console.error('Fetch Disputes Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve disputes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const {
      campaignId,
      contractId,
      reason,
      disputedAmount,
      evidenceNotes,
      evidenceAttachments = [],
    } = body;

    if (!campaignId || !reason || !disputedAmount) {
      return NextResponse.json({ success: false, error: 'Missing required dispute fields' }, { status: 400 });
    }

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { organization: { include: { members: true } } },
    });

    if (!campaign) {
      return NextResponse.json({ success: false, error: 'Target campaign not found' }, { status: 404 });
    }

    const initiatorUserId = user.id;
    const initiatorRole = user.role === 'CREATOR' ? 'CREATOR' : 'BRAND';

    // Verify user is party to this campaign
    const isBrandMember = campaign.organization?.members?.some((m) => m.userId === user.id);
    const isAdmin = user.role.startsWith('TIA_') || user.role === 'TIA_SUPER_ADMIN';

    if (user.role !== 'CREATOR' && !isBrandMember && !isAdmin) {
      return NextResponse.json({ success: false, error: 'Forbidden: You are not authorized to file disputes on this campaign' }, { status: 403 });
    }

    const dispute = await prisma.dispute.create({
      data: {
        campaignId,
        contractId: contractId || undefined,
        initiatorUserId,
        initiatorRole,
        reason,
        description: evidenceNotes || 'Dispute initiated regarding campaign deliverables or terms.',
        claimedAmount: Math.round(Number(disputedAmount) * 100), // minor units
        status: 'OPENED',
        evidence: {
          create: (evidenceAttachments as string[]).map((url) => ({
            submittedByUserId: initiatorUserId,
            description: 'Dispute evidence attachment',
            fileUrl: url,
          })),
        },
      },
      include: {
        campaign: true,
        evidence: true,
      },
    });

    try {
      await EmailService.sendDisputeAlertEmail({
        recipientName: user.name || (initiatorRole === 'CREATOR' ? 'Creator' : 'Brand Admin'),
        role: initiatorRole,
        campaignTitle: dispute.campaign?.title || 'Campaign',
        disputeReason: reason,
        disputedAmount: Math.round(dispute.claimedAmount / 100),
        disputeId: dispute.id,
      });
    } catch (e) {
      console.warn('Dispute email dispatch warning:', e);
    }

    return NextResponse.json({ success: true, dispute });
  } catch (error: any) {
    console.error('Create Dispute Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to file dispute' }, { status: 500 });
  }
}

function formatDispute(d: any) {
  return {
    id: d.id,
    campaignId: d.campaignId,
    campaignTitle: d.campaign?.title || 'Campaign Arbitration',
    contractId: d.contractId,
    initiatorId: d.initiatorUserId,
    initiatorRole: d.initiatorRole,
    reason: d.reason,
    disputedAmount: Math.round(d.claimedAmount / 100),
    status: d.status,
    evidenceNotes: d.description,
    evidenceAttachments: d.evidence?.map((e: any) => e.fileUrl).filter(Boolean) || [],
    resolution: d.decisionSummary
      ? {
          decision: d.decisionSummary,
          refundAmount: Math.round(d.refundAmount / 100),
          releaseAmount: Math.round(d.releaseAmount / 100),
          decidedAt: d.decidedAt?.toISOString(),
        }
      : null,
    createdAt: d.createdAt?.toISOString(),
  };
}
