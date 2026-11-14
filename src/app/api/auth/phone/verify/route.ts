// ===================================================
// TIA BACKEND - FIREBASE / OAUTH SESSION VERIFY API
// ===================================================

import { NextResponse } from 'next/server';
import { setSessionCookie } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, phoneNumber, email: rawEmail, displayName, role = 'CREATOR' } = body;

    if (!uid && !rawEmail && !phoneNumber) {
      return NextResponse.json({ success: false, error: 'UID, Email, or Phone Number is required' }, { status: 400 });
    }

    const resolvedUid = uid || `oauth_${Date.now()}`;
    const email = rawEmail || (phoneNumber ? `${phoneNumber.replace(/\D/g, '')}@phone.tia.agency` : `${resolvedUid}@auth.tia.agency`);
    const resolvedName = displayName || (email ? email.split('@')[0] : `User`);

    await setSessionCookie({
      userId: resolvedUid,
      email,
      role,
      name: resolvedName,
      creatorId: role === 'CREATOR' ? `creator_${resolvedUid}` : undefined,
      organizationId: role.startsWith('BRAND_') ? `org_${resolvedUid}` : undefined,
    });

    try {
      await logAuditEvent({
        userId: resolvedUid,
        userRole: role,
        action: 'OAUTH_LOGIN',
        entityType: 'USER',
        entityId: resolvedUid,
      });
    } catch {}

    return NextResponse.json({
      success: true,
      message: 'Session established',
      user: {
        id: resolvedUid,
        email,
        name: resolvedName,
        role,
        phoneNumber,
      },
    });
  } catch (error: any) {
    console.error('Session Verify API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to establish session' }, { status: 500 });
  }
}
