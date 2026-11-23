// ===================================================
// TIA BACKEND - CONTRACTS & SIGNATURES API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { EmailService } from '@/lib/services/email.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get('id');
    const isAdmin = user.role.startsWith('TIA_') || user.role === 'TIA_SUPER_ADMIN';

    // 1. Fetch single contract with tenant authorization check
    if (contractId) {
      const contract = await prisma.campaignContract.findUnique({
        where: { id: contractId },
        include: {
          campaign: true,
          organization: {
            include: { members: true },
          },
          creator: {
            include: { user: true },
          },
        },
      });

      if (!contract) {
        return NextResponse.json({ success: false, error: 'Contract not found' }, { status: 404 });
      }

      // Verify caller is a party to the contract or platform administrator
      const isCreatorParty = contract.creator?.userId === user.id || contract.creatorId === user.creatorProfile?.id;
      const isBrandParty = contract.organization?.members?.some((m) => m.userId === user.id);

      if (!isAdmin && !isCreatorParty && !isBrandParty) {
        return NextResponse.json({ success: false, error: 'Forbidden: Access to this contract is restricted' }, { status: 403 });
      }

      return NextResponse.json({
        success: true,
        contract: formatContract(contract),
      });
    }

    // 2. Multi-tenant scoped contracts query
    let whereClause: any = {};

    if (!isAdmin) {
      if (user.role === 'CREATOR') {
        whereClause = {
          OR: [
            { creator: { userId: user.id } },
            { creatorId: user.creatorProfile?.id || '__none__' },
          ],
        };
      } else {
        // Brand user / admin
        const orgIds = user.orgMemberships?.map((m) => m.organizationId) || [];
        whereClause = {
          organizationId: { in: orgIds },
        };
      }
    }

    const contracts = await prisma.campaignContract.findMany({
      where: whereClause,
      include: {
        campaign: true,
        organization: true,
        creator: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      contracts: contracts.map(formatContract),
    });
  } catch (error: any) {
    console.error('Fetch Contracts Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve contracts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const {
      action = 'CREATE',
      contractId,
      campaignId,
      creatorId,
      agreedAmount,
      deliverableScope,
    } = body;

    const isAdmin = user.role.startsWith('TIA_') || user.role === 'TIA_SUPER_ADMIN';

    // Action 1: Generate Standard TIA Contract
    if (action === 'CREATE') {
      if (!campaignId || !agreedAmount) {
        return NextResponse.json({ success: false, error: 'Missing contract creation parameters' }, { status: 400 });
      }

      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { organization: { include: { members: true } } },
      });

      if (!campaign) {
        return NextResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 });
      }

      // Authorization: Caller must belong to the campaign's organization or be admin
      const isOrgMember = campaign.organization?.members?.some((m) => m.userId === user.id);
      if (!isAdmin && !isOrgMember) {
        return NextResponse.json({ success: false, error: 'Forbidden: You do not own this campaign' }, { status: 403 });
      }

      // Minor units calculations (5% platform fee)
      const minorAmount = Math.round(Number(agreedAmount) * 100);
      const commissionAmount = Math.round(minorAmount * 0.05);
      const creatorAllocation = minorAmount - commissionAmount;

      let targetCreatorId = creatorId;
      if (!targetCreatorId) {
        const firstCreator = await prisma.creator.findFirst();
        targetCreatorId = firstCreator?.id;
      }

      const contract = await prisma.campaignContract.create({
        data: {
          campaignId,
          organizationId: campaign.organizationId,
          creatorId: targetCreatorId,
          agreedAmount: minorAmount,
          commissionRate: 5.0,
          commissionAmount,
          creatorAllocationAmount: creatorAllocation,
          deliverables: JSON.stringify(deliverableScope || ['Standard Campaign Deliverables']),
          status: 'PENDING_SIGNATURES',
        },
        include: {
          campaign: true,
          organization: true,
          creator: { include: { user: true } },
        },
      });

      // Industry Standard: Automated Contract Ready Notice
      try {
        await EmailService.sendContractReadyEmail({
          recipientName: contract.creator?.displayName || 'Creator',
          partyRole: 'CREATOR',
          campaignTitle: contract.campaign?.title || 'Brand Agreement',
          agreedAmount: Math.round(contract.agreedAmount / 100),
        });
      } catch (e) {
        console.warn('Contract ready email warning:', e);
      }

      return NextResponse.json({ success: true, contract: formatContract(contract) });
    }

    // Action 2: Digital Signature Execution
    if (action === 'SIGN' && contractId) {
      const isCreator = user.role === 'CREATOR';
      const existing = await prisma.campaignContract.findUnique({
        where: { id: contractId },
        include: {
          organization: { include: { members: true } },
          creator: true,
        },
      });

      if (!existing) {
        return NextResponse.json({ success: false, error: 'Contract not found' }, { status: 404 });
      }

      // Verify signing party identity
      if (isCreator && existing.creator?.userId !== user.id && existing.creatorId !== user.creatorProfile?.id && !isAdmin) {
        return NextResponse.json({ success: false, error: 'Forbidden: You cannot sign on behalf of this creator' }, { status: 403 });
      }

      if (!isCreator && !isAdmin) {
        const isMember = existing.organization?.members?.some((m) => m.userId === user.id);
        if (!isMember) {
          return NextResponse.json({ success: false, error: 'Forbidden: You cannot sign on behalf of this brand' }, { status: 403 });
        }
      }

      const updateData: any = {};
      if (isCreator) {
        updateData.creatorSignedAt = new Date();
      } else {
        updateData.brandSignedAt = new Date();
      }

      if ((isCreator && existing.brandSignedAt) || (!isCreator && existing.creatorSignedAt)) {
        updateData.status = 'ACTIVE';
        updateData.whitelistingActivatedAt = new Date();
      }

      const updated = await prisma.campaignContract.update({
        where: { id: contractId },
        data: updateData,
        include: {
          campaign: true,
          organization: true,
          creator: { include: { user: true } },
        },
      });

      return NextResponse.json({ success: true, contract: formatContract(updated) });
    }

    return NextResponse.json({ success: false, error: 'Invalid action specified' }, { status: 400 });
  } catch (error: any) {
    console.error('Contract Action Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Contract operation failed' }, { status: 500 });
  }
}

function formatContract(contract: any) {
  return {
    id: contract.id,
    campaignId: contract.campaignId,
    campaignTitle: contract.campaign?.title || 'Brand Agreement',
    brandName: contract.organization?.name || 'Enterprise Brand',
    creatorName: contract.creator?.displayName || 'Verified Creator',
    creatorHandle: contract.creator?.username || 'creator',
    creatorEmail: contract.creator?.user?.email || 'creator@tia.agency',
    totalAgreedAmount: Math.round(contract.agreedAmount / 100),
    tiaCommissionAmount: Math.round(contract.commissionAmount / 100),
    netCreatorPayout: Math.round(contract.creatorAllocationAmount / 100),
    status: contract.status,
    brandSigned: Boolean(contract.brandSignedAt),
    creatorSigned: Boolean(contract.creatorSignedAt),
    createdAt: contract.createdAt?.toISOString(),
  };
}
