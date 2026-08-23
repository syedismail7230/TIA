import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { campaignId, creatorId, offerAmount, deliverables, timelineDays = 7, notes, action } = body;

    if (!campaignId || !creatorId) {
      return NextResponse.json({ error: 'Campaign ID and Creator ID are required' }, { status: 400 });
    }

    const isCreatorRole = user.role === 'CREATOR';
    const isBrandRole = user.role === 'BRAND_ADMIN' || user.role === 'BRAND_USER';

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    if (action === 'ACCEPT') {
      // 1. Mark latest negotiation accepted
      const latestNegotiation = await prisma.campaignNegotiation.findFirst({
        where: { campaignId, creatorId },
        orderBy: { createdAt: 'desc' },
      });

      if (!latestNegotiation) {
        return NextResponse.json({ error: 'No active negotiation found to accept' }, { status: 400 });
      }

      await prisma.campaignNegotiation.update({
        where: { id: latestNegotiation.id },
        data: { status: 'ACCEPTED' },
      });

      // 2. Generate Digital Agreement (CampaignContract)
      const agreedAmountMinor = latestNegotiation.offerAmount;
      const commissionRate = 5.00;
      const commissionAmount = Math.round((agreedAmountMinor * commissionRate) / 100);
      const creatorAllocationAmount = agreedAmountMinor - commissionAmount;

      const contract = await prisma.campaignContract.create({
        data: {
          campaignId,
          organizationId: campaign.organizationId,
          creatorId,
          agreedAmount: agreedAmountMinor,
          commissionRate,
          commissionAmount,
          creatorAllocationAmount,
          deliverables: latestNegotiation.deliverables || campaign.deliverables || '["1x Post"]',
          revisionLimit: 2,
          usageRights: 'Full digital marketing & organic distribution rights for 12 months.',
          status: 'PENDING_SIGNATURES',
        },
      });

      // 3. Create Deliverable items
      await prisma.campaignDeliverable.create({
        data: {
          campaignId,
          contractId: contract.id,
          creatorId,
          title: 'Primary Campaign Deliverable',
          type: 'REEL',
          platform: 'INSTAGRAM',
          requirements: 'Conform to campaign brief and guidelines.',
          status: 'PENDING',
        },
      });

      // 4. Advance campaign state to CONTRACTED
      await prisma.campaign.update({
        where: { id: campaignId },
        data: { status: 'CONTRACTED' },
      });

      await logAuditEvent({
        userId: user.id,
        userRole: user.role,
        action: 'NEGOTIATION_ACCEPT',
        entityType: 'CAMPAIGN_CONTRACT',
        entityId: contract.id,
      });

      return NextResponse.json({
        message: 'Offer accepted and contract generated',
        contractId: contract.id,
      });
    }

    // Otherwise record Counter-offer
    if (offerAmount === undefined) {
      return NextResponse.json({ error: 'Offer amount is required for counter-offer' }, { status: 400 });
    }

    const offerAmountMinor = Math.round(Number(offerAmount) * 100);
    const initiatorRole = isCreatorRole ? 'CREATOR' : 'BRAND';

    const negotiation = await prisma.campaignNegotiation.create({
      data: {
        campaignId,
        creatorId,
        initiatorRole,
        offerAmount: offerAmountMinor,
        deliverables: deliverables ? JSON.stringify(deliverables) : null,
        timelineDays: Number(timelineDays),
        notes: notes || null,
        status: 'COUNTERED',
      },
    });

    // Update campaign status to NEGOTIATION
    await prisma.campaign.update({
      where: { id: campaignId },
      data: { status: 'NEGOTIATION' },
    });

    await logAuditEvent({
      userId: user.id,
      userRole: user.role,
      action: 'NEGOTIATION_OFFER',
      entityType: 'CAMPAIGN_NEGOTIATION',
      entityId: negotiation.id,
    });

    return NextResponse.json({
      message: 'Counter-offer submitted successfully',
      negotiation,
    });
  } catch (error: any) {
    console.error('Negotiation Error:', error);
    return NextResponse.json({ error: 'Failed to process negotiation' }, { status: 500 });
  }
}
