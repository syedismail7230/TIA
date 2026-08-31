// ===================================================
// TIA BACKEND - CAMPAIGNS API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { CampaignService } from '@/lib/services/campaign.service';
import { logAuditEvent } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('q') || undefined;

    // Try Prisma DB first
    try {
      const whereClause: any = {};

      if (user?.role === 'CREATOR') {
        whereClause.status = status ? status : { in: ['PUBLISHED', 'ACCEPTING_APPLICATIONS'] };
      } else if (user?.role === 'BRAND_ADMIN' || user?.role === 'BRAND_USER') {
        const orgId = user.orgMemberships?.[0]?.organizationId;
        if (orgId) whereClause.organizationId = orgId;
        if (status) whereClause.status = status;
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

      if (campaigns && campaigns.length > 0) {
        return NextResponse.json({ success: true, campaigns });
      }
    } catch {
      // Fallback to CampaignService
    }

    const localCampaigns = await CampaignService.getAll({
      category,
      status,
      search,
      brandId: user?.id,
    });

    return NextResponse.json({ success: true, campaigns: localCampaigns });
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
      deadline = 'Oct 15, 2026',
      objectives = 'Brand Awareness & Performance',
      targetNiches = 'Tech, Lifestyle',
    } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: 'Campaign title is required' }, { status: 400 });
    }

    const brandId = user?.id || 'demo-brand-user-id';
    const brandName = user?.name || 'Enterprise Brand Client';

    // Try Prisma DB first
    try {
      const orgId = user?.orgMemberships?.[0]?.organizationId;
      if (orgId) {
        const campaign = await prisma.campaign.create({
          data: {
            organizationId: orgId,
            title,
            description: objectives,
            objective: objectives,
            category,
            budget: Math.round(Number(budget) * 100),
            currency: 'INR',
            deliverables: deliverables,
            status: 'PUBLISHED',
          },
        });

        await logAuditEvent({
          userId: user.id,
          action: 'CAMPAIGN_CREATED',
          entityType: 'Campaign',
          entityId: campaign.id,
        });

        return NextResponse.json({ success: true, campaign });
      }
    } catch {
      // Fallback to local CampaignService
    }

    const newCampaign = await CampaignService.create({
      brandId,
      brandName,
      title,
      category,
      budget: Number(budget),
      deliverables,
      deadline,
      objectives,
      targetNiches,
    });

    return NextResponse.json({ success: true, campaign: newCampaign });
  } catch (error: any) {
    console.error('Create Campaign Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create campaign' }, { status: 500 });
  }
}
