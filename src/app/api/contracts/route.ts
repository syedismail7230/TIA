import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { contractId, action } = body; // action: 'SIGN'

    if (!contractId || action !== 'SIGN') {
      return NextResponse.json({ error: 'Contract ID and SIGN action required' }, { status: 400 });
    }

    const contract = await prisma.campaignContract.findUnique({
      where: { id: contractId },
    });

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    const updateData: any = {};
    if (user.role === 'CREATOR') {
      if (contract.creatorId !== user.creatorProfile?.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      updateData.creatorSignedAt = new Date();
    } else if (user.role === 'BRAND_ADMIN' || user.role === 'BRAND_USER') {
      const orgId = user.orgMemberships[0]?.organizationId;
      if (contract.organizationId !== orgId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      updateData.brandSignedAt = new Date();
    }

    // Check if both signed after this update
    const willBeSignedByBoth =
      (contract.brandSignedAt || updateData.brandSignedAt) &&
      (contract.creatorSignedAt || updateData.creatorSignedAt);

    if (willBeSignedByBoth) {
      updateData.status = 'SIGNED';
    }

    const updatedContract = await prisma.campaignContract.update({
      where: { id: contractId },
      data: updateData,
    });

    await logAuditEvent({
      userId: user.id,
      userRole: user.role,
      action: 'CONTRACT_SIGN',
      entityType: 'CAMPAIGN_CONTRACT',
      entityId: contract.id,
      metadata: { status: updatedContract.status },
    });

    return NextResponse.json({
      message: willBeSignedByBoth
        ? 'Contract fully executed by both parties'
        : 'Signature recorded successfully',
      contract: updatedContract,
    });
  } catch (error: any) {
    console.error('Contract Signing Error:', error);
    return NextResponse.json({ error: 'Failed to sign contract' }, { status: 500 });
  }
}
