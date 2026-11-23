import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { verifyPassword } from '@/lib/auth/password';
import { setSessionCookie } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';
import { findStoredUserByEmail } from '@/lib/auth/local-auth-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Primary: Database lookup via Prisma
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        include: {
          creatorProfile: true,
          orgMemberships: {
            include: {
              organization: true,
            },
          },
        },
      });
    } catch (dbErr: any) {
      console.warn('Database login query note:', dbErr.message);
    }

    if (user) {
      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      const primaryOrg = user.orgMemberships?.[0];

      await setSessionCookie({
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        creatorId: user.creatorProfile?.id,
        organizationId: primaryOrg?.organizationId,
        orgRole: primaryOrg?.role,
      });

      try {
        await logAuditEvent({
          userId: user.id,
          userRole: user.role,
          action: 'LOGIN',
          entityType: 'USER',
          entityId: user.id,
        });
      } catch {}

      return NextResponse.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          creatorProfile: user.creatorProfile,
          organization: primaryOrg?.organization,
        },
      });
    }

    // 2. Fallback: Check stored users (persistent hashed store)
    const storedUser = findStoredUserByEmail(normalizedEmail);
    if (storedUser) {
      const isMatch = await verifyPassword(password, storedUser.passwordHash);

      if (isMatch) {
        await setSessionCookie({
          userId: storedUser.id,
          email: storedUser.email,
          role: storedUser.role,
          name: storedUser.name,
          creatorId: storedUser.role === 'CREATOR' ? `creator_${storedUser.id}` : undefined,
          organizationId: storedUser.role.startsWith('BRAND_') ? `org_${storedUser.id}` : undefined,
        });

        try {
          await logAuditEvent({
            userId: storedUser.id,
            userRole: storedUser.role,
            action: 'LOGIN',
            entityType: 'USER',
            entityId: storedUser.id,
          });
        } catch {}

        return NextResponse.json({
          message: 'Login successful',
          user: {
            id: storedUser.id,
            email: storedUser.email,
            name: storedUser.name,
            role: storedUser.role,
          },
        });
      }
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login' },
      { status: 500 }
    );
  }
}
