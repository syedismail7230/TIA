import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/admin-guard';
import prisma from '@/lib/db/prisma';
import { logAuditEvent } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const take = parseInt(searchParams.get('take') || '50', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    const where: any = {};
    if (status && status !== 'ALL') {
      where.verificationStatus = status;
    }
    if (search) {
      where.OR = [
        { displayName: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [creators, total] = await Promise.all([
      prisma.creator.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, email: true, name: true, createdAt: true } },
          socialAccounts: { select: { id: true, platform: true, username: true, audienceSize: true, engagementRate: true } },
          rateCard: true,
        },
      }),
      prisma.creator.count({ where }),
    ]);

    return NextResponse.json({ success: true, creators, total });
  } catch (error: any) {
    console.error('Admin creators GET error:', error);
    return NextResponse.json({ error: error.message || 'Failed to list creators' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { userId, displayName, username, bio, country = 'India', verificationStatus = 'VERIFIED_CREATOR' } = body;

    if (!userId || !displayName || !username) {
      return NextResponse.json({ error: 'User ID, Display Name, and Username are required' }, { status: 400 });
    }

    const cleanUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, '');

    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      return NextResponse.json({ error: 'Referenced User does not exist' }, { status: 404 });
    }

    const existingUsername = await prisma.creator.findUnique({ where: { username: cleanUsername } });
    if (existingUsername) {
      return NextResponse.json({ error: 'Username is already taken by another creator' }, { status: 409 });
    }

    const creator = await prisma.creator.create({
      data: {
        userId,
        displayName,
        username: cleanUsername,
        bio: bio || 'Verified TIA Creator',
        country,
        verificationStatus,
        intelligenceScore: 88,
        reputationScore: 100,
        brandSafetyScore: 100,
        availabilityStatus: 'AVAILABLE',
      },
    });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_CREATE_CREATOR',
      entityType: 'CREATOR',
      entityId: creator.id,
      metadata: { username: cleanUsername, userId },
    }).catch(() => {});

    return NextResponse.json({ success: true, creator }, { status: 201 });
  } catch (error: any) {
    console.error('Admin creators POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create creator' }, { status: 500 });
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { id, displayName, username, bio, country, verificationStatus, intelligenceScore, reputationScore, brandSafetyScore, availabilityStatus } = body;

    if (!id) {
      return NextResponse.json({ error: 'Creator ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (displayName) updateData.displayName = displayName.trim();
    if (username) updateData.username = username.toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (bio !== undefined) updateData.bio = bio;
    if (country) updateData.country = country;
    if (verificationStatus) updateData.verificationStatus = verificationStatus;
    if (availabilityStatus) updateData.availabilityStatus = availabilityStatus;
    if (intelligenceScore !== undefined) updateData.intelligenceScore = Math.min(100, Math.max(0, parseInt(intelligenceScore, 10)));
    if (reputationScore !== undefined) updateData.reputationScore = Math.min(100, Math.max(0, parseInt(reputationScore, 10)));
    if (brandSafetyScore !== undefined) updateData.brandSafetyScore = Math.min(100, Math.max(0, parseInt(brandSafetyScore, 10)));

    const updated = await prisma.creator.update({
      where: { id },
      data: updateData,
    });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_UPDATE_CREATOR',
      entityType: 'CREATOR',
      entityId: id,
      metadata: updateData,
    }).catch(() => {});

    return NextResponse.json({ success: true, creator: updated });
  } catch (error: any) {
    console.error('Admin creators PATCH error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update creator' }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Creator ID is required' }, { status: 400 });
    }

    await prisma.creator.delete({ where: { id } });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_DELETE_CREATOR',
      entityType: 'CREATOR',
      entityId: id,
    }).catch(() => {});

    return NextResponse.json({ success: true, message: 'Creator profile deleted successfully' });
  } catch (error: any) {
    console.error('Admin creators DELETE error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete creator' }, { status: 500 });
  }
}
