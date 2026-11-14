import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/admin-guard';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const [
      userCount,
      creatorCount,
      orgCount,
      campaignCount,
      disputeCount,
      flaggedCount,
      transactions,
      recentLogs,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count().catch(() => 0),
      prisma.creator.count().catch(() => 0),
      prisma.organization.count().catch(() => 0),
      prisma.campaign.count().catch(() => 0),
      prisma.dispute.count({ where: { status: { in: ['OPENED', 'UNDER_REVIEW', 'EVIDENCE_SUBMITTED'] } } }).catch(() => 0),
      prisma.message.count({ where: { containsFlaggedContactInfo: true } }).catch(() => 0),
      prisma.transaction.findMany({ take: 20, orderBy: { createdAt: 'desc' } }).catch(() => []),
      prisma.auditLog.findMany({ take: 10, orderBy: { createdAt: 'desc' } }).catch(() => []),
      prisma.user.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, name: true, email: true, role: true, createdAt: true } }).catch(() => []),
    ]);

    const totalVolumeMinor = transactions
      .filter((t) => t.status === 'SETTLED' || t.status === 'HELD_IN_ESCROW')
      .reduce((sum, t) => sum + (t.grossAmount || 0), 0);

    const totalCommissionMinor = transactions
      .filter((t) => t.status === 'SETTLED')
      .reduce((sum, t) => sum + (t.commissionAmount || 0), 0);

    const escrowLockedMinor = transactions
      .filter((t) => t.status === 'HELD_IN_ESCROW')
      .reduce((sum, t) => sum + (t.netAmount || 0), 0);

    return NextResponse.json({
      success: true,
      stats: {
        userCount,
        creatorCount,
        orgCount,
        campaignCount,
        disputeCount,
        flaggedCount,
        totalVolumeMinor,
        totalCommissionMinor,
        escrowLockedMinor,
      },
      recentLogs,
      recentUsers,
      recentTransactions: transactions.slice(0, 5),
    });
  } catch (error: any) {
    console.error('Admin overview error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch overview metrics' }, { status: 500 });
  }
}
