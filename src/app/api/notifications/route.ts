// ===================================================
// TIA BACKEND - NOTIFICATIONS API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { NotificationService } from '@/lib/services/notification.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id || 'demo-brand-user-id';

    const notifications = await NotificationService.getForUser(userId);
    return NextResponse.json({ success: true, notifications });
  } catch (error: any) {
    console.error('Fetch Notifications Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve notifications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id || 'demo-brand-user-id';
    const body = await request.json();
    const { action } = body;

    if (action === 'MARK_ALL_READ') {
      await NotificationService.markAllAsRead(userId);
      return NextResponse.json({ success: true, message: 'All notifications marked as read' });
    }

    return NextResponse.json({ success: false, error: 'Invalid notification action' }, { status: 400 });
  } catch (error: any) {
    console.error('Notification Update Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to update notifications' }, { status: 500 });
  }
}
