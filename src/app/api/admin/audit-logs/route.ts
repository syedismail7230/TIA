import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/admin-guard';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entityType') || '';
    const take = parseInt(searchParams.get('take') || '100', 10);

    const where: any = {};
    if (entityType && entityType !== 'ALL') {
      where.entityType = entityType;
    }

    const logs = await prisma.auditLog.findMany({
      where,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    console.error('Admin audit logs GET error:', error);
    return NextResponse.json({ error: error.message || 'Failed to list audit logs' }, { status: 500 });
  }
}
