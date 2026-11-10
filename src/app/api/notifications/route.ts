// ===================================================
// TIA BACKEND - NOTIFICATIONS API ROUTE (100% REAL DATABASE)
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const notifications = await prisma.notification.findMany({
      where: user?.id ? { userId: user.id } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const formatted = notifications.map((n) => ({
      id: n.id,
      title: n.title,
      message: n.message,
      type: n.type,
      read: n.isRead,
      timestamp: n.createdAt.toISOString(),
      actionUrl: n.actionUrl || '/dashboard',
    }));

    return NextResponse.json({ success: true, notifications: formatted });
  } catch (error: any) {
    console.error('Fetch Notifications Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve notifications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { action, notificationId } = body;

    let userId = user?.id;
    if (!userId) {
      const demoUser = await prisma.user.findFirst();
      userId = demoUser?.id;
    }

    if (action === 'MARK_ALL_READ' && userId) {
      await prisma.notification.updateMany({
        where: { userId },
        data: { isRead: true },
      });
      return NextResponse.json({ success: true, message: 'All notifications marked as read' });
    }

    if (action === 'MARK_READ' && notificationId) {
      await prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true },
      });
      return NextResponse.json({ success: true, message: 'Notification marked as read' });
    }

    return NextResponse.json({ success: false, error: 'Invalid notification action' }, { status: 400 });
  } catch (error: any) {
    console.error('Notification Update Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to update notifications' }, { status: 500 });
  }
}
