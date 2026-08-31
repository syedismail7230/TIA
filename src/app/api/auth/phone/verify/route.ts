// ===================================================
// TIA BACKEND - FIREBASE PHONE OTP SESSION VERIFY API
// ===================================================

import { NextResponse } from 'next/server';
import { setSessionCookie } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, phoneNumber, displayName, role = 'CREATOR' } = body;

    if (!uid || !phoneNumber) {
      return NextResponse.json({ success: false, error: 'UID and Phone Number are required' }, { status: 400 });
    }

    const email = `${phoneNumber.replace(/\D/g, '')}@phone.tia.agency`;
    const resolvedName = displayName || `User ${phoneNumber.slice(-4)}`;

    await setSessionCookie({
      userId: uid,
      email,
      role,
      name: resolvedName,
      creatorId: role === 'CREATOR' ? `creator_${uid}` : undefined,
      organizationId: role.startsWith('BRAND_') ? `org_${uid}` : undefined,
    });

    try {
      await logAuditEvent({
        userId: uid,
        userRole: role,
        action: 'PHONE_OTP_LOGIN',
        entityType: 'USER',
        entityId: uid,
      });
    } catch {}

    return NextResponse.json({
      success: true,
      message: 'Phone session established',
      user: {
        id: uid,
        email,
        name: resolvedName,
        role,
        phoneNumber,
      },
    });
  } catch (error: any) {
    console.error('Phone Session API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to establish phone session' }, { status: 500 });
  }
}
