import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/admin-guard';
import prisma from '@/lib/db/prisma';
import { logAuditEvent } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const take = parseInt(searchParams.get('take') || '50', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: 'desc' },
        include: {
          organization: { select: { id: true, name: true, verificationStatus: true } },
          _count: { select: { applications: true, contracts: true, deliverableItems: true } },
        },
      }),
      prisma.campaign.count({ where }),
    ]);

    return NextResponse.json({ success: true, campaigns, total });
  } catch (error: any) {
    console.error('Admin campaigns GET error:', error);
    return NextResponse.json({ error: error.message || 'Failed to list campaigns' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { title, description, budget, organizationId, category = 'Tech', objective = 'AWARENESS', status = 'PUBLISHED' } = body;

    if (!title || !description || !budget || !organizationId) {
      return NextResponse.json({ error: 'Title, description, budget, and organizationId are required' }, { status: 400 });
    }

    const budgetMinor = Math.round(Number(budget) * 100);

    const campaign = await prisma.campaign.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        budget: budgetMinor,
        currency: 'INR',
        organizationId,
        category,
        objective,
        status,
      },
    });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_CREATE_CAMPAIGN',
      entityType: 'CAMPAIGN',
      entityId: campaign.id,
      metadata: { title, budget: budgetMinor },
    }).catch(() => {});

    return NextResponse.json({ success: true, campaign }, { status: 201 });
  } catch (error: any) {
    console.error('Admin campaigns POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create campaign' }, { status: 500 });
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { id, title, description, budget, status, category, objective } = body;

    if (!id) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (category) updateData.category = category;
    if (objective) updateData.objective = objective;
    if (status) updateData.status = status;
    if (budget !== undefined) {
      updateData.budget = Math.round(Number(budget) * 100);
    }

    const updated = await prisma.campaign.update({
      where: { id },
      data: updateData,
    });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_UPDATE_CAMPAIGN',
      entityType: 'CAMPAIGN',
      entityId: id,
      metadata: updateData,
    }).catch(() => {});

    return NextResponse.json({ success: true, campaign: updated });
  } catch (error: any) {
    console.error('Admin campaigns PATCH error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update campaign' }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    await prisma.campaign.delete({ where: { id } });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_DELETE_CAMPAIGN',
      entityType: 'CAMPAIGN',
      entityId: id,
    }).catch(() => {});

    return NextResponse.json({ success: true, message: 'Campaign deleted successfully' });
  } catch (error: any) {
    console.error('Admin campaigns DELETE error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete campaign' }, { status: 500 });
  }
}
