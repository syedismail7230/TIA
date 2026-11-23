// ===================================================
// TIA BACKEND - MESSAGES & COLLABORATION API ROUTE
// Secured with Rate Limiting, Zod Validation, Anti-Circumvention & Centralized Error Handling
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { MessageService } from '@/lib/services/message.service';
import { handleApiError, AuthenticationError, ForbiddenError } from '@/lib/errors/api-error';
import { enforceRateLimit, getClientIp, RATE_LIMIT_TIERS } from '@/lib/security/rate-limiter';
import { validateRequest, sendMessageSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new AuthenticationError('Authentication required to view conversations');
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
        throw new ForbiddenError('You are not a participant in this conversation thread');
      }

      const messages = await MessageService.getMessages(threadId);
      return NextResponse.json({ success: true, messages });
    }

    const threads = await MessageService.getThreadsForUser(userId);
    return NextResponse.json({ success: true, threads });
  } catch (error) {
    return handleApiError(error, 'GET /api/messages');
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new AuthenticationError('Authentication required to send messages');
    }

    // Rate limiting: 120 messages / minute per user
    await enforceRateLimit(user.id || getClientIp(request), RATE_LIMIT_TIERS.STANDARD);

    const rawBody = await request.json();
    const validated = validateRequest(sendMessageSchema, rawBody);

    const isAdmin = user.role.startsWith('TIA_') || user.role === 'TIA_SUPER_ADMIN';

    // Security Check: Verify sender belongs to this conversation thread
    const userThreads = await MessageService.getThreadsForUser(user.id);
    const belongsToThread = userThreads.some((t) => t.id === validated.threadId);

    if (!belongsToThread && !isAdmin) {
      throw new ForbiddenError('You cannot send messages to a thread you do not belong to');
    }

    const senderId = user.id;
    const senderName = user.name || (user.role === 'CREATOR' ? 'Creator' : 'Brand Manager');
    const senderRole = user.role === 'CREATOR' ? 'CREATOR' : 'BRAND';

    const message = await MessageService.sendMessage({
      threadId: validated.threadId,
      senderId,
      senderName,
      senderRole,
      text: validated.text,
      attachmentUrl: validated.attachmentUrl,
    });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    return handleApiError(error, 'POST /api/messages');
  }
}
