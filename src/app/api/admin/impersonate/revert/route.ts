import { NextResponse } from 'next/server';
import { getImpersonatorSession, setSessionCookie, clearImpersonationState } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';

export async function POST() {
  try {
    const adminSession = await getImpersonatorSession();
    if (!adminSession) {
      return NextResponse.json(
        { error: 'No active administrative impersonation session was found.' },
        { status: 400 }
      );
    }

    // Restore admin's original session
    await setSessionCookie(adminSession);

    // Clear impersonation markers
    clearImpersonationState();

    try {
      await logAuditEvent({
        userId: adminSession.userId,
        userRole: adminSession.role,
        action: 'ADMIN_REVERT_IMPERSONATION',
        entityType: 'USER',
        entityId: adminSession.userId,
        metadata: {
          adminEmail: adminSession.email,
        },
      });
    } catch {}

    return NextResponse.json({
      success: true,
      message: 'Impersonation ended. Returned to Admin Console.',
      redirectUrl: '/admin',
    });
  } catch (error: any) {
    console.error('Revert impersonation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to revert impersonation session' },
      { status: 500 }
    );
  }
}
