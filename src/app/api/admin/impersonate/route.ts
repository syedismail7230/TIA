import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { requireAdminSession } from '@/lib/auth/admin-guard';
import { setImpersonationState, SessionPayload } from '@/lib/auth/session';
import { findStoredUserById, findStoredUserByEmail } from '@/lib/auth/local-auth-store';
import { logAuditEvent } from '@/lib/audit/logger';

export async function POST(request: Request) {
  try {
    const auth = await requireAdminSession();
    if (!auth.authorized || !auth.user) {
      return auth.response;
    }

    const body = await request.json();
    const { userId, email } = body;

    if (!userId && !email) {
      return NextResponse.json({ error: 'Target userId or email is required' }, { status: 400 });
    }

    let targetUser: any = null;

    // 1. Try DB lookup
    try {
      if (userId) {
        targetUser = await prisma.user.findUnique({
          where: { id: userId },
          include: {
            creatorProfile: true,
            orgMemberships: {
              include: {
                organization: true,
              },
            },
          },
        });
      } else if (email) {
        targetUser = await prisma.user.findUnique({
          where: { email: email.toLowerCase().trim() },
          include: {
            creatorProfile: true,
            orgMemberships: {
              include: {
                organization: true,
              },
            },
          },
        });
      }
    } catch (dbErr: any) {
      console.warn('DB lookup error during impersonation:', dbErr.message);
    }

    // 2. Fallback to stored users
    if (!targetUser) {
      const stored = userId ? findStoredUserById(userId) : findStoredUserByEmail(email);
      if (stored) {
        targetUser = {
          id: stored.id,
          email: stored.email,
          name: stored.name,
          role: stored.role,
          creatorProfile: stored.role === 'CREATOR' ? { id: `creator_${stored.id}` } : null,
          orgMemberships: stored.role.startsWith('BRAND_') ? [{ organizationId: `org_${stored.id}`, role: 'OWNER' }] : [],
        };
      }
    }

    if (!targetUser) {
      return NextResponse.json({ error: 'Target user could not be found' }, { status: 404 });
    }

    const adminPayload: SessionPayload = {
      userId: auth.user.userId,
      email: auth.user.email,
      role: auth.user.role,
      name: auth.user.name,
    };

    const primaryOrg = targetUser.orgMemberships?.[0];

    const targetPayload: SessionPayload = {
      userId: targetUser.id,
      email: targetUser.email,
      role: targetUser.role,
      name: targetUser.name,
      creatorId: targetUser.creatorProfile?.id || (targetUser.role === 'CREATOR' ? `creator_${targetUser.id}` : undefined),
      organizationId: primaryOrg?.organizationId || (targetUser.role.startsWith('BRAND_') ? `org_${targetUser.id}` : undefined),
      orgRole: primaryOrg?.role,
    };

    await setImpersonationState(adminPayload, targetPayload);

    try {
      await logAuditEvent({
        userId: auth.user.userId,
        userRole: auth.user.role,
        action: 'ADMIN_IMPERSONATE_USER',
        entityType: 'USER',
        entityId: targetUser.id,
        metadata: {
          adminEmail: auth.user.email,
          targetEmail: targetUser.email,
          targetRole: targetUser.role,
        },
      });
    } catch {}

    let redirectUrl = '/creator';
    if (targetUser.role.startsWith('BRAND_')) {
      redirectUrl = '/brand';
    } else if (targetUser.role.startsWith('TIA_')) {
      redirectUrl = '/admin';
    }

    return NextResponse.json({
      success: true,
      message: `Impersonation active for ${targetUser.email}`,
      targetUser: {
        id: targetUser.id,
        email: targetUser.email,
        name: targetUser.name,
        role: targetUser.role,
      },
      redirectUrl,
    });
  } catch (error: any) {
    console.error('Impersonation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize user impersonation' },
      { status: 500 }
    );
  }
}
