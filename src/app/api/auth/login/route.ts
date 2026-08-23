import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { verifyPassword } from '@/lib/auth/password';
import { setSessionCookie } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';

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

    const user = await prisma.user.findUnique({
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

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const primaryOrg = user.orgMemberships[0];

    await setSessionCookie({
      userId: user.id,
      email: user.email,
      role: user.role,
      creatorId: user.creatorProfile?.id,
      organizationId: primaryOrg?.organizationId,
      orgRole: primaryOrg?.role,
    });

    await logAuditEvent({
      userId: user.id,
      userRole: user.role,
      action: 'LOGIN',
      entityType: 'USER',
      entityId: user.id,
    });

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
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login' },
      { status: 500 }
    );
  }
}
