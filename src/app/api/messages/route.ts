// ===================================================
// TIA BACKEND - MESSAGES & COLLABORATION API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { MessageService } from '@/lib/services/message.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id || 'demo-brand-user-id';
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (threadId) {
      const messages = await MessageService.getMessages(threadId);
      return NextResponse.json({ success: true, messages });
    }

    const threads = await MessageService.getThreadsForUser(userId);
    return NextResponse.json({ success: true, threads });
  } catch (error: any) {
    console.error('Fetch Messages Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { threadId, text, attachmentUrl } = body;

    if (!threadId || !text) {
      return NextResponse.json({ success: false, error: 'Thread ID and message text are required' }, { status: 400 });
    }

    const senderId = user?.id || 'demo-brand-user-id';
    const senderName = user?.name || 'Nike Brand Manager';
    const senderRole = user?.role === 'CREATOR' ? 'CREATOR' : 'BRAND';

    const message = await MessageService.sendMessage({
      threadId,
      senderId,
      senderName,
      senderRole,
      text,
      attachmentUrl,
    });

    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    console.error('Send Message Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to send message' }, { status: 400 });
  }
}
