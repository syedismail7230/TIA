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
        { name: { contains: search, mode: 'insensitive' } },
        { legalName: { contains: search, mode: 'insensitive' } },
        { businessCategory: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [organizations, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: 'desc' },
        include: {
          brandProfile: true,
          members: { include: { user: { select: { id: true, name: true, email: true, role: true } } } },
          _count: { select: { campaigns: true, members: true } },
        },
      }),
      prisma.organization.count({ where }),
    ]);

    return NextResponse.json({ success: true, organizations, total });
  } catch (error: any) {
    console.error('Admin organizations GET error:', error);
    return NextResponse.json({ error: error.message || 'Failed to list organizations' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { name, legalName, country = 'India', businessCategory = 'Consumer Tech', verificationStatus = 'VERIFIED', ownerUserId } = body;

    if (!name) {
      return NextResponse.json({ error: 'Organization name is required' }, { status: 400 });
    }

    const org = await prisma.$transaction(async (tx) => {
      const newOrg = await tx.organization.create({
        data: {
          name: name.trim(),
          legalName: legalName ? legalName.trim() : `${name.trim()} Pvt Ltd`,
          country,
          businessCategory,
          verificationStatus,
          reputationScore: 100,
          paymentReliabilityScore: 100,
        },
      });

      await tx.brandProfile.create({
        data: {
          organizationId: newOrg.id,
          companyName: name.trim(),
          industry: businessCategory,
          verificationStatus,
        },
      });

      if (ownerUserId) {
        await tx.organizationMember.create({
          data: {
            organizationId: newOrg.id,
            userId: ownerUserId,
            role: 'OWNER',
          },
        }).catch(() => {});
      }

      return newOrg;
    });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_CREATE_ORGANIZATION',
      entityType: 'ORGANIZATION',
      entityId: org.id,
      metadata: { name },
    }).catch(() => {});

    return NextResponse.json({ success: true, organization: org }, { status: 201 });
  } catch (error: any) {
    console.error('Admin organizations POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create organization' }, { status: 500 });
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { id, name, legalName, country, businessCategory, verificationStatus, reputationScore, paymentReliabilityScore } = body;

    if (!id) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (name) updateData.name = name.trim();
    if (legalName !== undefined) updateData.legalName = legalName.trim();
    if (country) updateData.country = country;
    if (businessCategory) updateData.businessCategory = businessCategory;
    if (verificationStatus) updateData.verificationStatus = verificationStatus;
    if (reputationScore !== undefined) updateData.reputationScore = Math.min(100, Math.max(0, parseInt(reputationScore, 10)));
    if (paymentReliabilityScore !== undefined) updateData.paymentReliabilityScore = Math.min(100, Math.max(0, parseInt(paymentReliabilityScore, 10)));

    const updated = await prisma.$transaction(async (tx) => {
      const org = await tx.organization.update({
        where: { id },
        data: updateData,
      });

      if (name || businessCategory || verificationStatus) {
        await tx.brandProfile.updateMany({
          where: { organizationId: id },
          data: {
            companyName: name ? name.trim() : undefined,
            industry: businessCategory || undefined,
            verificationStatus: verificationStatus || undefined,
          },
        }).catch(() => {});
      }

      return org;
    });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_UPDATE_ORGANIZATION',
      entityType: 'ORGANIZATION',
      entityId: id,
      metadata: updateData,
    }).catch(() => {});

    return NextResponse.json({ success: true, organization: updated });
  } catch (error: any) {
    console.error('Admin organizations PATCH error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update organization' }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    await prisma.organization.delete({ where: { id } });

    await logAuditEvent({
      userId: auth.user!.id,
      userRole: auth.user!.role,
      action: 'ADMIN_DELETE_ORGANIZATION',
      entityType: 'ORGANIZATION',
      entityId: id,
    }).catch(() => {});

    return NextResponse.json({ success: true, message: 'Organization deleted successfully' });
  } catch (error: any) {
    console.error('Admin organizations DELETE error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete organization' }, { status: 500 });
  }
}
