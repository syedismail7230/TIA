// ===================================================
// TIA BACKEND - NOTIFICATIONS API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Authentication required' }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
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
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { action, notificationId } = body;

    if (action === 'MARK_ALL_READ') {
      await prisma.notification.updateMany({
        where: { userId: user.id },
        data: { isRead: true },
      });
      return NextResponse.json({ success: true, message: 'All notifications marked as read' });
    }

    if (action === 'MARK_READ' && notificationId) {
      // Tenant Isolation: Only allow marking user's own notification as read
      await prisma.notification.updateMany({
        where: { id: notificationId, userId: user.id },
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
