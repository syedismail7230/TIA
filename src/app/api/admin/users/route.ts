import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/admin-guard';
import prisma from '@/lib/db/prisma';
import { hashPassword } from '@/lib/auth/password';
import { logAuditEvent } from '@/lib/audit/logger';
import { saveStoredUser, deleteStoredUser } from '@/lib/auth/local-auth-store';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const take = parseInt(searchParams.get('take') || '50', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    const where: any = {};
    if (role && role !== 'ALL') {
      where.role = role;
    }
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        { id: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: 'desc' },
        include: {
          creatorProfile: { select: { id: true, username: true, verificationStatus: true } },
          orgMemberships: { include: { organization: { select: { id: true, name: true } } } },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({ success: true, users, total });
  } catch (error: any) {
    console.error('Admin users GET error:', error);
    return NextResponse.json({ error: error.message || 'Failed to list users' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { email, password, name, role = 'CREATOR', country = 'India', emailVerified = true } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, name, and password are required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const passwordHash = await hashPassword(password);

    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        name: name.trim(),
        role,
        country,
        emailVerified: Boolean(emailVerified),
      },
    });

    // Mirror to local auth store
    saveStoredUser({
      id: newUser.id,
      email: normalizedEmail,
      passwordHash,
      name: newUser.name,
      role: newUser.role as any,
      country,
      createdAt: newUser.createdAt.toISOString(),
    });

    // Auto-create creator or brand shell if applicable
    if (role === 'CREATOR') {
      const username = `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.floor(Math.random() * 1000)}`;
      await prisma.creator.create({
        data: {
          userId: newUser.id,
          displayName: name,
          username,
          country,
          verificationStatus: emailVerified ? 'EMAIL_VERIFIED' : 'UNVERIFIED',
        },
      }).catch((e) => console.warn('Auto-creator note:', e.message));
    }

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_CREATE_USER',
      entityType: 'USER',
      entityId: newUser.id,
      metadata: { targetEmail: normalizedEmail, assignedRole: role },
    }).catch(() => {});

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error('Admin users POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create user' }, { status: 500 });
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { id, name, role, email, country, emailVerified, password } = body;

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (name) updateData.name = name.trim();
    if (role) updateData.role = role;
    if (country) updateData.country = country;
    if (emailVerified !== undefined) updateData.emailVerified = Boolean(emailVerified);
    if (email) updateData.email = email.toLowerCase().trim();
    if (password) {
      updateData.passwordHash = await hashPassword(password);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    // Sync to local auth store
    saveStoredUser({
      id: updated.id,
      email: updated.email,
      passwordHash: updated.passwordHash,
      name: updated.name,
      role: updated.role as any,
      country: updated.country || 'India',
      createdAt: updated.createdAt.toISOString(),
    });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_UPDATE_USER',
      entityType: 'USER',
      entityId: id,
      metadata: updateData,
    }).catch(() => {});

    return NextResponse.json({ success: true, user: updated });
  } catch (error: any) {
    console.error('Admin users PATCH error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Safety: prevent admin from deleting themselves
    if (id === auth.user!.id) {
      return NextResponse.json({ error: 'Action blocked: Cannot delete your own active administrative account.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.user.delete({ where: { id } });
    deleteStoredUser(id);

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_DELETE_USER',
      entityType: 'USER',
      entityId: id,
      metadata: { deletedEmail: user.email },
    }).catch(() => {});

    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('Admin users DELETE error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete user' }, { status: 500 });
  }
}
