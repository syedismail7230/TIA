// ===================================================
// TIA BACKEND - CONTRACTS & SIGNATURES API ROUTE (100% REAL DATABASE)
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { EmailService } from '@/lib/services/email.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get('id');

    if (contractId) {
      const contract = await prisma.campaignContract.findUnique({
        where: { id: contractId },
        include: {
          campaign: true,
          organization: true,
          creator: {
            include: { user: true },
          },
        },
      });

      if (!contract) {
        return NextResponse.json({ success: false, error: 'Contract not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        contract: formatContract(contract),
      });
    }

    const contracts = await prisma.campaignContract.findMany({
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
    const body = await request.json();
    const {
      action = 'CREATE',
      contractId,
      campaignId,
      creatorId,
      agreedAmount,
      deliverableScope,
    } = body;

    // Action 1: Generate Standard TIA Contract
    if (action === 'CREATE') {
      if (!campaignId || !agreedAmount) {
        return NextResponse.json({ success: false, error: 'Missing contract creation parameters' }, { status: 400 });
      }

      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
      });

      if (!campaign) {
        return NextResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 });
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
      const isCreator = user?.role === 'CREATOR';
      const updateData: any = {};

      if (isCreator) {
        updateData.creatorSignedAt = new Date();
      } else {
        updateData.brandSignedAt = new Date();
      }

      // Check if other party already signed
      const existing = await prisma.campaignContract.findUnique({ where: { id: contractId } });
      if (!existing) {
        return NextResponse.json({ success: false, error: 'Contract not found' }, { status: 404 });
      }

      if ((isCreator && existing.brandSignedAt) || (!isCreator && existing.creatorSignedAt)) {
        updateData.status = 'SIGNED';
      }

      const signed = await prisma.campaignContract.update({
        where: { id: contractId },
        data: updateData,
        include: {
          campaign: true,
          organization: true,
          creator: { include: { user: true } },
        },
      });

      // Industry Standard: If bilaterally signed, dispatch execution notice
      if (signed.status === 'SIGNED') {
        try {
          await EmailService.sendContractExecutedEmail({
            creatorName: signed.creator?.displayName || 'Creator',
            brandName: signed.organization?.name || 'Brand Partner',
            campaignTitle: signed.campaign?.title || 'Brand Agreement',
            contractNumber: `TIA-AGR-2026-${signed.id.slice(0, 6).toUpperCase()}`,
            agreedAmount: Math.round(signed.agreedAmount / 100),
          });
        } catch (e) {
          console.warn('Contract executed email warning:', e);
        }
      }

      return NextResponse.json({
        success: true,
        contract: formatContract(signed),
        message: `Contract digitally signed by ${isCreator ? 'Creator' : 'Brand'}.`,
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid contract action' }, { status: 400 });
  } catch (error: any) {
    console.error('Contract API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Contract operation failed' }, { status: 500 });
  }
}

function formatContract(contract: any) {
  let deliverables: string[] = [];
  try {
    deliverables = typeof contract.deliverables === 'string' ? JSON.parse(contract.deliverables) : contract.deliverables;
  } catch {
    deliverables = [contract.deliverables || 'Standard Deliverables'];
  }

  return {
    id: contract.id,
    contractNumber: `TIA-AGR-2026-${contract.id.slice(0, 6).toUpperCase()}`,
    campaignId: contract.campaignId,
    campaignTitle: contract.campaign?.title || 'Brand Partnership',
    brandId: contract.organizationId,
    brandName: contract.organization?.name || 'Nike India Private Limited',
    creatorId: contract.creatorId,
    creatorName: contract.creator?.displayName || contract.creator?.user?.name || 'Creator',
    creatorHandle: `@${contract.creator?.username || 'creator'}`,
    agreedAmount: Math.round(contract.agreedAmount / 100),
    platformFeeRate: contract.commissionRate,
    platformFeeAmount: Math.round(contract.commissionAmount / 100),
    netCreatorPayout: Math.round(contract.creatorAllocationAmount / 100),
    deliverables,
    revisionRoundsAllowed: contract.revisionLimit,
    status: contract.status,
    brandSignature: {
      signed: Boolean(contract.brandSignedAt),
      timestamp: contract.brandSignedAt ? contract.brandSignedAt.toISOString() : null,
      signerName: contract.organization?.name || 'Brand Signer',
    },
    creatorSignature: {
      signed: Boolean(contract.creatorSignedAt),
      timestamp: contract.creatorSignedAt ? contract.creatorSignedAt.toISOString() : null,
      signerName: contract.creator?.displayName || 'Creator Signer',
    },
    createdAt: contract.createdAt.toISOString(),
  };
}
