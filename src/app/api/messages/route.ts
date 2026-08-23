import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { scanForCircumvention } from '@/lib/circumvention/detector';
import { logAuditEvent } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');
    const creatorId = searchParams.get('creatorId');

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID required' }, { status: 400 });
    }

    const whereClause: any = { campaignId };
    if (user.role === 'CREATOR') {
      whereClause.creatorId = user.creatorProfile?.id;
    } else if (creatorId) {
      whereClause.creatorId = creatorId;
    }

    const thread = await prisma.messageThread.findFirst({
      where: whereClause,
      include: {
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                role: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        campaign: {
          select: {
            id: true,
            title: true,
            status: true,
            budget: true,
            currency: true,
          },
        },
      },
    });

    return NextResponse.json({ thread });
  } catch (error: any) {
    console.error('Fetch Messages Error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { campaignId, creatorId, content, attachmentUrls } = body;

    if (!campaignId || !content) {
      return NextResponse.json({ error: 'Campaign ID and content are required' }, { status: 400 });
    }

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    const targetCreatorId =
      user.role === 'CREATOR' ? user.creatorProfile?.id : creatorId;

    if (!targetCreatorId) {
      return NextResponse.json({ error: 'Target creator ID could not be determined' }, { status: 400 });
    }

    // 1. Ensure Thread Exists
    const thread = await prisma.messageThread.upsert({
      where: {
        campaignId_creatorId: {
          campaignId,
          creatorId: targetCreatorId,
        },
      },
      update: {},
      create: {
        campaignId,
        organizationId: campaign.organizationId,
        creatorId: targetCreatorId,
        subject: `Campaign: ${campaign.title}`,
      },
    });

    // 2. Scan for Prohibited Anti-Circumvention Contact Details
    const scanResult = scanForCircumvention(content);

    const message = await prisma.message.create({
      data: {
        threadId: thread.id,
        senderUserId: user.id,
        senderRole: user.role === 'CREATOR' ? 'CREATOR' : 'BRAND',
        content,
        attachmentUrls: attachmentUrls ? JSON.stringify(attachmentUrls) : null,
        containsFlaggedContactInfo: scanResult.isFlagged,
        flaggedReason: scanResult.isFlagged ? scanResult.reasons.join('; ') : null,
        readByCreator: user.role === 'CREATOR',
        readByBrand: user.role !== 'CREATOR',
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            role: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (scanResult.isFlagged) {
      await logAuditEvent({
        userId: user.id,
        userRole: user.role,
        action: 'CIRCUMVENTION_DETECTED',
        entityType: 'MESSAGE',
        entityId: message.id,
        metadata: { reasons: scanResult.reasons, patterns: scanResult.flaggedPatterns },
      });
    }

    return NextResponse.json({ message, scanResult }, { status: 201 });
  } catch (error: any) {
    console.error('Send Message Error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
