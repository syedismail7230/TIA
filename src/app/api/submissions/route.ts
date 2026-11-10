// ===================================================
// TIA BACKEND - DELIVERABLE SUBMISSIONS API ROUTE (100% REAL DATABASE)
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

    const deliverables = await prisma.campaignDeliverable.findMany({
      where: campaignId ? { campaignId } : undefined,
      include: {
        campaign: true,
        creator: {
          include: { user: true },
        },
        submissions: {
          orderBy: { version: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = deliverables.map((d) => {
      const latestSub = d.submissions[0];
      return {
        id: latestSub?.id || d.id,
        deliverableId: d.id,
        campaignId: d.campaignId,
        campaignTitle: d.campaign?.title || 'Brand Deliverable',
        creatorId: d.creatorId,
        creatorName: d.creator?.displayName || d.creator?.user?.name || 'Creator',
        creatorHandle: `@${d.creator?.username || 'creator'}`,
        deliverableType: d.type,
        title: d.title,
        status: d.status === 'APPROVED' ? 'APPROVED' : d.status === 'DRAFT_SUBMITTED' ? 'SUBMITTED' : d.status,
        submittedAt: latestSub?.submittedAt?.toISOString() || d.createdAt.toISOString(),
        assetUrl: latestSub?.fileUrl || '',
        fileName: latestSub?.fileName || 'asset.mp4',
        caption: latestSub?.caption || '',
        notes: latestSub?.notes || '',
        version: latestSub?.version || 1,
        reviewNotes: [],
      };
    });

    return NextResponse.json({ success: true, submissions: formatted });
  } catch (error: any) {
    console.error('Fetch Submissions Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const {
      action = 'SUBMIT',
      deliverableId,
      campaignId = 'camp-101',
      title,
      assetUrl,
      notes,
    } = body;

    // Action 1: Creator Submits Deliverable Draft
    if (action === 'SUBMIT') {
      if (!title || !assetUrl) {
        return NextResponse.json({ success: false, error: 'Title and Asset URL are required' }, { status: 400 });
      }

      let targetDeliverableId = deliverableId;
      if (!targetDeliverableId) {
        const firstDeliv = await prisma.campaignDeliverable.findFirst({
          where: { campaignId },
        });
        targetDeliverableId = firstDeliv?.id;
      }

      if (!targetDeliverableId) {
        // Create deliverable if none found
        const firstCreator = await prisma.creator.findFirst();
        const firstContract = await prisma.campaignContract.findFirst();
        if (!firstCreator || !firstContract) {
          return NextResponse.json({ success: false, error: 'No active contract found' }, { status: 400 });
        }

        const newDeliv = await prisma.campaignDeliverable.create({
          data: {
            campaignId,
            contractId: firstContract.id,
            creatorId: firstCreator.id,
            title,
            type: 'VIDEO',
            platform: 'INSTAGRAM',
            status: 'DRAFT_SUBMITTED',
          },
        });
        targetDeliverableId = newDeliv.id;
      }

      const submission = await prisma.contentSubmission.create({
        data: {
          deliverableId: targetDeliverableId,
          version: 1,
          fileUrl: assetUrl,
          fileName: title.toLowerCase().replace(/\s+/g, '_') + '.mp4',
          status: 'SUBMITTED',
          notes: notes || undefined,
        },
      });

      // Update deliverable status
      await prisma.campaignDeliverable.update({
        where: { id: targetDeliverableId },
        data: { status: 'DRAFT_SUBMITTED' },
      });

      return NextResponse.json({ success: true, submission });
    }

    // Action 2: Approve Deliverable
    if (action === 'APPROVE' && deliverableId) {
      const updated = await prisma.campaignDeliverable.update({
        where: { id: deliverableId },
        data: {
          status: 'APPROVED',
          approvedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        deliverable: updated,
        message: 'Deliverable approved successfully.',
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid submission action' }, { status: 400 });
  } catch (error: any) {
    console.error('Submission API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Submission operation failed' }, { status: 500 });
  }
}
