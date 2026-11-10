// ===================================================
// TIA BACKEND - REAL-TIME CAMPAIGNS API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('q') || undefined;

    const whereClause: any = {};

    if (user?.role === 'CREATOR') {
      whereClause.status = status ? status : { in: ['PUBLISHED', 'ACCEPTING_APPLICATIONS'] };
    } else if (user?.role === 'BRAND_ADMIN' || user?.role === 'BRAND_USER') {
      const orgId = user.orgMemberships?.[0]?.organizationId;
      if (orgId) whereClause.organizationId = orgId;
      if (status) whereClause.status = status;
    } else if (status) {
      whereClause.status = status;
    }

    if (category && category !== 'ALL') whereClause.category = category;
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    const campaigns = await prisma.campaign.findMany({
      where: whereClause,
      include: {
        organization: {
          select: { id: true, name: true, verificationStatus: true, reputationScore: true },
        },
        applications: true,
        contracts: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, campaigns });
  } catch (error: any) {
    console.error('Fetch Campaigns Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const {
      title,
      category = 'Consumer Tech',
      budget = 100000,
      deliverables = '1x Dedicated Video + 2x Reels',
      objectives = 'Brand Awareness & Performance',
    } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: 'Campaign title is required' }, { status: 400 });
    }

    let orgId = user?.orgMemberships?.[0]?.organizationId;
    if (!orgId) {
      const defaultOrg = await prisma.organization.findFirst({
        orderBy: { createdAt: 'asc' },
      });
      orgId = defaultOrg?.id;
    }

    if (!orgId) {
      const createdOrg = await prisma.organization.create({
        data: {
          name: user?.name ? `${user.name} Organization` : 'Default Brand Organization',
          country: 'India',
          verificationStatus: 'VERIFIED',
        },
      });
      orgId = createdOrg.id;
    }

    const campaign = await prisma.campaign.create({
      data: {
        organizationId: orgId,
        title,
        description: objectives,
        objective: objectives,
        category,
        budget: Math.round(Number(budget) * 100),
        currency: 'INR',
        deliverables: typeof deliverables === 'string' ? deliverables : JSON.stringify(deliverables),
        status: 'PUBLISHED',
      },
      include: {
        organization: true,
      },
    });

    if (user?.id) {
      try {
        await logAuditEvent({
          userId: user.id,
          action: 'CAMPAIGN_CREATED',
          entityType: 'Campaign',
          entityId: campaign.id,
        });
      } catch {}
    }

    return NextResponse.json({ success: true, campaign });
  } catch (error: any) {
    console.error('Create Campaign Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create campaign' }, { status: 500 });
  }
}
