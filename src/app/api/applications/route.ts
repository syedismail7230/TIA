import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'CREATOR' || !user.creatorProfile) {
      return NextResponse.json({ error: 'Unauthorized. Creator account required.' }, { status: 403 });
    }

    const body = await request.json();
    const { campaignId, proposedPrice, pitch, conceptNote, deliveryDays = 7 } = body;

    if (!campaignId || proposedPrice === undefined || !pitch) {
      return NextResponse.json({ error: 'Campaign ID, proposed price, and pitch are required' }, { status: 400 });
    }

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign || (campaign.status !== 'ACCEPTING_APPLICATIONS' && campaign.status !== 'PUBLISHED')) {
      return NextResponse.json({ error: 'This campaign is not currently accepting applications' }, { status: 400 });
    }

    const proposedPriceMinor = Math.round(Number(proposedPrice) * 100);

    const application = await prisma.campaignApplication.upsert({
      where: {
        campaignId_creatorId: {
          campaignId,
          creatorId: user.creatorProfile.id,
        },
      },
      update: {
        proposedPrice: proposedPriceMinor,
        pitch,
        conceptNote,
        deliveryDays: Number(deliveryDays),
        status: 'SUBMITTED',
      },
      create: {
        campaignId,
        creatorId: user.creatorProfile.id,
        proposedPrice: proposedPriceMinor,
        pitch,
        conceptNote,
        deliveryDays: Number(deliveryDays),
        status: 'SUBMITTED',
      },
    });

    // Also record initial CampaignBid
    await prisma.campaignBid.create({
      data: {
        campaignId,
        creatorId: user.creatorProfile.id,
        bidAmount: proposedPriceMinor,
        terms: pitch,
        status: 'SUBMITTED',
      },
    });

    // Create Message Thread for in-platform campaign communication
    await prisma.messageThread.upsert({
      where: {
        campaignId_creatorId: {
          campaignId,
          creatorId: user.creatorProfile.id,
        },
      },
      update: {},
      create: {
        campaignId,
        organizationId: campaign.organizationId,
        creatorId: user.creatorProfile.id,
        subject: `Application: ${campaign.title}`,
      },
    });

    await logAuditEvent({
      userId: user.id,
      userRole: user.role,
      action: 'APPLICATION_SUBMIT',
      entityType: 'CAMPAIGN_APPLICATION',
      entityId: application.id,
    });

    return NextResponse.json({ message: 'Application submitted successfully', application }, { status: 201 });
  } catch (error: any) {
    console.error('Application Submission Error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
