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
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Authentication required' }, { status: 401 });
    }

    const userId = user.id;
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');
    const isAdmin = user.role.startsWith('TIA_') || user.role === 'TIA_SUPER_ADMIN';

    if (threadId) {
      // Security Check: Verify caller is a member of the requested thread
      const threads = await MessageService.getThreadsForUser(userId);
      const isMember = threads.some((t) => t.id === threadId);

      if (!isMember && !isAdmin) {
        return NextResponse.json({ success: false, error: 'Forbidden: You are not a participant in this conversation' }, { status: 403 });
      }

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
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { threadId, text, attachmentUrl } = body;

    if (!threadId || !text) {
      return NextResponse.json({ success: false, error: 'Thread ID and message text are required' }, { status: 400 });
    }

    const isAdmin = user.role.startsWith('TIA_') || user.role === 'TIA_SUPER_ADMIN';

    // Security Check: Verify sender belongs to this conversation thread
    const userThreads = await MessageService.getThreadsForUser(user.id);
    const belongsToThread = userThreads.some((t) => t.id === threadId);

    if (!belongsToThread && !isAdmin) {
      return NextResponse.json({ success: false, error: 'Forbidden: You cannot send messages to this thread' }, { status: 403 });
    }

    const senderId = user.id;
    const senderName = user.name || (user.role === 'CREATOR' ? 'Creator' : 'Brand Manager');
    const senderRole = user.role === 'CREATOR' ? 'CREATOR' : 'BRAND';

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
