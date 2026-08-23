import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('q');

    const whereClause: any = {};

    if (user?.role === 'CREATOR') {
      // Creators view published/accepting campaigns
      whereClause.status = status ? status : { in: ['PUBLISHED', 'ACCEPTING_APPLICATIONS'] };
      whereClause.visibility = 'PUBLIC';
    } else if (user?.role === 'BRAND_ADMIN' || user?.role === 'BRAND_USER') {
      const orgId = user.orgMemberships[0]?.organizationId;
      if (orgId) {
        whereClause.organizationId = orgId;
      }
      if (status) {
        whereClause.status = status;
      }
    } else if (!user) {
      whereClause.status = 'PUBLISHED';
      whereClause.visibility = 'PUBLIC';
    }

    if (category) {
      whereClause.category = category;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const campaigns = await prisma.campaign.findMany({
      where: whereClause,
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            verificationStatus: true,
            reputationScore: true,
          },
        },
        applications: true,
        contracts: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ campaigns });
  } catch (error: any) {
    console.error('Fetch Campaigns Error:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'BRAND_ADMIN' && user.role !== 'BRAND_USER' && user.role !== 'TIA_SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized. Brand permissions required.' }, { status: 403 });
    }

    const orgId = user.orgMemberships[0]?.organizationId;
    if (!orgId) {
      return NextResponse.json({ error: 'User does not belong to an active organization' }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      description,
      objective,
      category,
      budget, // in rupees/dollars from form, convert to minor units
      currency = 'INR',
      targetGeographies,
      targetInterests,
      requiredPlatforms,
      deliverables,
      status = 'ACCEPTING_APPLICATIONS',
    } = body;

    if (!title || !description || !objective || !category || budget === undefined) {
      return NextResponse.json({ error: 'Missing required campaign parameters' }, { status: 400 });
    }

    // Convert to minor currency units (paise/cents)
    const budgetMinor = Math.round(Number(budget) * 100);

    const campaign = await prisma.campaign.create({
      data: {
        organizationId: orgId,
        title,
        description,
        objective,
        category,
        status,
        budget: budgetMinor,
        currency,
        targetGeographies: targetGeographies ? JSON.stringify(targetGeographies) : null,
        targetInterests: targetInterests ? JSON.stringify(targetInterests) : null,
        requiredPlatforms: requiredPlatforms ? JSON.stringify(requiredPlatforms) : JSON.stringify(['INSTAGRAM']),
        deliverables: deliverables ? JSON.stringify(deliverables) : JSON.stringify(['1x Reel', '1x Story']),
      },
    });

    await logAuditEvent({
      userId: user.id,
      userRole: user.role,
      action: 'CAMPAIGN_CREATE',
      entityType: 'CAMPAIGN',
      entityId: campaign.id,
    });

    return NextResponse.json({ message: 'Campaign created successfully', campaign }, { status: 201 });
  } catch (error: any) {
    console.error('Campaign Creation Error:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
