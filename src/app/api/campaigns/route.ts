// ===================================================
// TIA BACKEND - REAL-TIME CAMPAIGNS API ROUTE
// Secured with Rate Limiting, Zod Validation & Centralized Error Handling
// ===================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';
import { handleApiError, AuthenticationError, ForbiddenError } from '@/lib/errors/api-error';
import { enforceRateLimit, getClientIp, RATE_LIMIT_TIERS } from '@/lib/security/rate-limiter';
import { validateRequest, createCampaignSchema } from '@/lib/validations';

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
  } catch (error) {
    return handleApiError(error, 'GET /api/campaigns');
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new AuthenticationError('Authentication required to create campaigns');
    }

    // Role check: Creators cannot create brand campaigns
    if (user.role === 'CREATOR') {
      throw new ForbiddenError('Creators cannot post brand campaigns');
    }

    // Rate limiting
    await enforceRateLimit(user.id || getClientIp(request), RATE_LIMIT_TIERS.STANDARD);

    const rawBody = await request.json();
    const validated = validateRequest(createCampaignSchema, rawBody);

    // Resolve or create user's OWN organization (never hijack another brand's organization)
    let orgId = user.orgMemberships?.[0]?.organizationId;
    if (!orgId) {
      const org = await prisma.organization.create({
        data: {
          name: user.name ? `${user.name} Organization` : 'Brand Organization',
          country: (user as any).country || 'India',
          verificationStatus: 'PENDING',
          members: {
            create: {
              userId: user.id,
              role: 'OWNER',
            },
          },
        },
      });
      orgId = org.id;
    }

    const campaign = await prisma.campaign.create({
      data: {
        organizationId: orgId,
        title: validated.title.trim(),
        description: validated.objectives || validated.deliverables,
        objective: validated.objectives || 'Brand Awareness & Performance',
        category: validated.category,
        budget: Math.round(Number(validated.budget) * 100), // minor currency units (paise)
        currency: 'INR',
        deliverables: typeof validated.deliverables === 'string' ? validated.deliverables : JSON.stringify(validated.deliverables),
        status: 'PUBLISHED',
      },
      include: {
        organization: true,
      },
    });

    try {
      await logAuditEvent({
        userId: user.id,
        action: 'CAMPAIGN_CREATED',
        entityType: 'Campaign',
        entityId: campaign.id,
      });
    } catch {}

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    return handleApiError(error, 'POST /api/campaigns');
  }
}
