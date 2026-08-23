import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            legalName: true,
            website: true,
            verificationStatus: true,
            reputationScore: true,
          },
        },
        applications: {
          include: {
            creator: {
              include: {
                scores: { take: 1, orderBy: { calculatedAt: 'desc' } },
                rateCard: true,
                socialAccounts: true,
              },
            },
          },
        },
        negotiations: {
          orderBy: { createdAt: 'asc' },
        },
        contracts: {
          include: {
            deliverableItems: {
              include: {
                submissions: {
                  include: {
                    revisions: true,
                  },
                },
              },
            },
          },
        },
        metrics: true,
        reviews: true,
        disputes: true,
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    return NextResponse.json({ campaign });
  } catch (error: any) {
    console.error('Fetch Campaign Detail Error:', error);
    return NextResponse.json({ error: 'Failed to fetch campaign' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    const orgId = user.orgMemberships[0]?.organizationId;
    const isBrandOwner = campaign.organizationId === orgId;
    const isStaff = user.role.startsWith('TIA_');

    if (!isBrandOwner && !isStaff) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { status, title, description, budget } = body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (budget !== undefined) updateData.budget = Math.round(Number(budget) * 100);

    const updated = await prisma.campaign.update({
      where: { id: params.id },
      data: updateData,
    });

    await logAuditEvent({
      userId: user.id,
      userRole: user.role,
      action: 'CAMPAIGN_STATUS_CHANGE',
      entityType: 'CAMPAIGN',
      entityId: campaign.id,
      metadata: { from: campaign.status, to: status },
    });

    return NextResponse.json({ message: 'Campaign updated successfully', campaign: updated });
  } catch (error: any) {
    console.error('Update Campaign Error:', error);
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
}
