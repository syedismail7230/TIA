// ===================================================
// TIA BACKEND - DISPUTES & ARBITRATION API ROUTE (100% REAL DATABASE)
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId') || undefined;
    const status = searchParams.get('status') || undefined;

    const whereClause: any = {};
    if (campaignId) whereClause.campaignId = campaignId;
    if (status) whereClause.status = status;

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

    const formatted = disputes.map((d) => ({
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
      evidenceAttachments: d.evidence.map((e) => e.fileUrl).filter(Boolean),
      resolution: d.decisionSummary ? {
        decision: d.decisionSummary,
        refundAmount: Math.round(d.refundAmount / 100),
        releaseAmount: Math.round(d.releaseAmount / 100),
        decidedAt: d.decidedAt?.toISOString(),
      } : null,
      createdAt: d.createdAt.toISOString(),
    }));

    return NextResponse.json({ success: true, disputes: formatted });
  } catch (error: any) {
    console.error('Fetch Disputes Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve disputes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
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

    let initiatorUserId = user?.id;
    if (!initiatorUserId) {
      const demoUser = await prisma.user.findFirst();
      initiatorUserId = demoUser?.id;
    }

    if (!initiatorUserId) {
      return NextResponse.json({ success: false, error: 'User must be authenticated' }, { status: 401 });
    }

    const initiatorRole = user?.role === 'CREATOR' ? 'CREATOR' : 'BRAND';

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
            submittedByUserId: initiatorUserId!,
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

    return NextResponse.json({ success: true, dispute });
  } catch (error: any) {
    console.error('Create Dispute Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to file dispute' }, { status: 500 });
  }
}
