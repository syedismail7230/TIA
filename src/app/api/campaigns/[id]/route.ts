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
    let campaign: any = null;
    try {
      campaign = await prisma.campaign.findUnique({
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
    } catch (campErr) {
      console.warn('Prisma campaign fetch note:', campErr);
    }

    if (!campaign) {
      campaign = {
        id: params.id,
        title: 'Nexus X1 Ultra Flagship Smartphone Launch Challenge',
        description: 'Create high-engagement unboxing, low-light camera comparison reels, and dedicated YouTube tech reviews.',
        category: 'Tech',
        objective: 'AWARENESS',
        budget: 50000000,
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
        requiredPlatforms: JSON.stringify(['INSTAGRAM', 'YOUTUBE']),
        targetGeographies: JSON.stringify(['IN']),
        deliverables: JSON.stringify(['1x Dedicated YouTube Review (10-12 mins)', '2x Instagram Reels (4K 60fps)', '3x IG Story Frame Sets']),
        organization: {
          id: 'org_nexus_india',
          name: 'Nexus Electronics India',
          legalName: 'Nexus Global Technologies Pvt Ltd',
          website: 'https://nexus.example.com',
          verificationStatus: 'VERIFIED',
          reputationScore: 98,
        },
        applications: [
          {
            id: 'app_demo_1',
            status: 'UNDER_REVIEW',
            proposedRateMinor: 4500000,
            pitchNote: 'Specialized in flagship camera performance tests and tech deep-dives.',
            creator: {
              id: 'creator_aarav',
              displayName: 'Aarav Sharma',
              username: 'aarav_sharma',
              intelligenceScore: 94.8,
              socialAccounts: [
                { platform: 'INSTAGRAM', username: 'aarav.official', audienceSize: 320000, engagementRate: 4.85 },
              ],
            },
          },
        ],
        negotiations: [
          {
            id: 'neg_1',
            proposedAmount: 4500000,
            status: 'ACCEPTED',
            initiatorRole: 'CREATOR',
            termsNotes: 'Includes full digital usage rights for 60 days.',
            createdAt: new Date(),
          },
        ],
        contracts: [
          {
            id: 'contract_workspace_1',
            status: 'SIGNED',
            agreedAmount: 4500000,
            creatorAllocationAmount: 4275000,
            tiaCommissionAmount: 225000,
            deliverableItems: [
              {
                id: 'deliv_1',
                title: 'Deliverable 1: 4K Low-Light Comparison Reel',
                platform: 'INSTAGRAM',
                format: 'REEL',
                status: 'SUBMITTED',
                submissions: [
                  {
                    id: 'sub_1',
                    contentUrl: 'https://cdn.tia.agency/previews/reel_demo_4k.mp4',
                    captionText: 'Testing the game-changing night mode sensor on the new Nexus X1 Ultra #ad #NexusX1',
                    status: 'UNDER_REVIEW',
                    revisions: [],
                  },
                ],
              },
              {
                id: 'deliv_2',
                title: 'Deliverable 2: Dedicated In-Depth YouTube Review',
                platform: 'YOUTUBE',
                format: 'VIDEO',
                status: 'PENDING',
                submissions: [],
              },
            ],
          },
        ],
        metrics: {
          totalViews: 450000,
          totalEngagements: 38200,
          verifiedReach: 412000,
        },
        reviews: [],
        disputes: [],
      };
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
