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
    const status = searchParams.get('status') || '';
    const take = parseInt(searchParams.get('take') || '50', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: 'desc' },
        include: {
          organization: { select: { id: true, name: true } },
          creator: { select: { id: true, displayName: true, username: true } },
        },
      }),
      prisma.transaction.count({ where }),
    ]);

    return NextResponse.json({ success: true, transactions, total });
  } catch (error: any) {
    console.error('Admin transactions GET error:', error);
    return NextResponse.json({ error: error.message || 'Failed to list transactions' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { grossAmount, type = 'ADMIN_ADJUSTMENT', status = 'SETTLED', organizationId, creatorId, campaignId, description } = body;

    if (!grossAmount) {
      return NextResponse.json({ error: 'Gross amount is required' }, { status: 400 });
    }

    const amountMinor = Math.round(Number(grossAmount) * 100);
    const commissionMinor = Math.round(amountMinor * 0.05); // 5% TIA Platform Fee
    const netMinor = amountMinor - commissionMinor;

    // Resolve or fallback organization, creator, and campaign
    let resolvedOrgId = organizationId;
    let resolvedCreatorId = creatorId;
    let resolvedCampaignId = campaignId;

    if (!resolvedOrgId) {
      const firstOrg = await prisma.organization.findFirst();
      resolvedOrgId = firstOrg?.id;
    }
    if (!resolvedCreatorId) {
      const firstCreator = await prisma.creator.findFirst();
      resolvedCreatorId = firstCreator?.id;
    }
    if (!resolvedCampaignId) {
      const firstCampaign = await prisma.campaign.findFirst();
      resolvedCampaignId = firstCampaign?.id;
    }

    if (!resolvedOrgId || !resolvedCreatorId || !resolvedCampaignId) {
      return NextResponse.json({ error: 'Cannot record transaction: Campaign, Organization, and Creator must exist in database' }, { status: 400 });
    }

    const tx = await prisma.transaction.create({
      data: {
        organizationId: resolvedOrgId,
        creatorId: resolvedCreatorId,
        campaignId: resolvedCampaignId,
        grossAmount: amountMinor,
        commissionAmount: commissionMinor,
        creatorAllocationAmount: netMinor,
        netAmount: netMinor,
        currency: 'INR',
        transactionType: type,
        status,
      },
    });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_RECORD_TRANSACTION',
      entityType: 'TRANSACTION',
      entityId: tx.id,
      metadata: { grossAmount: amountMinor, description, type, status },
    }).catch(() => {});

    return NextResponse.json({ success: true, transaction: tx }, { status: 201 });
  } catch (error: any) {
    console.error('Admin transactions POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to record transaction' }, { status: 500 });
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Transaction ID and Status are required' }, { status: 400 });
    }

    const updated = await prisma.transaction.update({
      where: { id },
      data: { status },
    });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_UPDATE_TRANSACTION_STATUS',
      entityType: 'TRANSACTION',
      entityId: id,
      metadata: { newStatus: status },
    }).catch(() => {});

    return NextResponse.json({ success: true, transaction: updated });
  } catch (error: any) {
    console.error('Admin transactions PATCH error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update transaction status' }, { status: 500 });
  }
}
