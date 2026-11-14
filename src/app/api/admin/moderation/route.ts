import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/admin-guard';
import prisma from '@/lib/db/prisma';
import { logAuditEvent } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const messages = await prisma.message.findMany({
      where: { containsFlaggedContactInfo: true },
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        sender: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    console.error('Admin moderation GET error:', error);
    return NextResponse.json({ error: error.message || 'Failed to list flagged messages' }, { status: 500 });
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { id, action } = body; // action: 'DISMISS' | 'REDACT' | 'PENALIZE_USER'

    if (!id || !action) {
      return NextResponse.json({ error: 'Message ID and Action are required' }, { status: 400 });
    }

    let updated;
    if (action === 'DISMISS') {
      updated = await prisma.message.update({
        where: { id },
        data: {
          containsFlaggedContactInfo: false,
          flaggedReason: 'Dismissed by Administrator',
        },
      });
    } else if (action === 'REDACT') {
      updated = await prisma.message.update({
        where: { id },
        data: {
          content: '[Prohibited off-platform contact information redacted by TIA Compliance]',
          flaggedReason: 'Redacted by Administrator',
        },
      });
    }

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: `ADMIN_MODERATE_MESSAGE_${action}`,
      entityType: 'MESSAGE',
      entityId: id,
    }).catch(() => {});

    return NextResponse.json({ success: true, message: updated });
  } catch (error: any) {
    console.error('Admin moderation PATCH error:', error);
    return NextResponse.json({ error: error.message || 'Failed to moderate message' }, { status: 500 });
  }
}
