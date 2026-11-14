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

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    const [disputes, total] = await Promise.all([
      prisma.dispute.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          campaign: { select: { id: true, title: true, budget: true } },
          initiator: { select: { id: true, name: true, email: true, role: true } },
          decider: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.dispute.count({ where }),
    ]);

    return NextResponse.json({ success: true, disputes, total });
  } catch (error: any) {
    console.error('Admin disputes GET error:', error);
    return NextResponse.json({ error: error.message || 'Failed to list disputes' }, { status: 500 });
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { id, status, resolution, resolutionNotes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Dispute ID and Status are required' }, { status: 400 });
    }

    const updated = await prisma.dispute.update({
      where: { id },
      data: {
        status,
        decisionSummary: resolutionNotes || `Resolved by Administrator: ${resolution || status}`,
        financialResolutionType: status.includes('CREATOR') ? 'FULL_RELEASE' : status.includes('BRAND') ? 'FULL_REFUND' : 'PARTIAL_RELEASE_AND_REFUND',
        decidedByUserId: auth.user!.id,
        decidedAt: new Date(),
      },
    });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_RESOLVE_DISPUTE',
      entityType: 'DISPUTE',
      entityId: id,
      metadata: { verdict: status, resolutionNotes },
    }).catch(() => {});

    return NextResponse.json({ success: true, dispute: updated });
  } catch (error: any) {
    console.error('Admin disputes PATCH error:', error);
    return NextResponse.json({ error: error.message || 'Failed to resolve dispute' }, { status: 500 });
  }
}
