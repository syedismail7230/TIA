// ===================================================
// TIA BACKEND - CONTRACTS & SIGNATURES API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { ContractService } from '@/lib/services/contract.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get('id');

    if (contractId) {
      const contract = await ContractService.getById(contractId);
      if (!contract) {
        return NextResponse.json({ success: false, error: 'Contract not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, contract });
    }

    const contracts = await ContractService.listByParty(user?.id || 'demo-brand-user-id');
    return NextResponse.json({ success: true, contracts });
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
      campaignTitle,
      brandId,
      brandName,
      creatorId,
      creatorName,
      agreedAmount,
      deliverableScope,
    } = body;

    // Action 1: Generate Standard TIA MSA Contract
    if (action === 'CREATE') {
      if (!campaignId || !agreedAmount || !deliverableScope) {
        return NextResponse.json({ success: false, error: 'Missing contract creation parameters' }, { status: 400 });
      }

      const contract = await ContractService.create({
        campaignId,
        campaignTitle: campaignTitle || 'Campaign Milestone Agreement',
        brandId: brandId || user?.id || 'demo-brand-user-id',
        brandName: brandName || user?.name || 'Nike India Private Limited',
        creatorId: creatorId || 'demo-creator-user-id',
        creatorName: creatorName || 'Aarav Sharma',
        agreedAmount: Number(agreedAmount),
        deliverableScope,
      });

      return NextResponse.json({ success: true, contract });
    }

    // Action 2: Digital Signature Execution
    if (action === 'SIGN' && contractId) {
      const party = user?.role === 'CREATOR' ? 'CREATOR' : 'BRAND';
      const signed = await ContractService.sign(contractId, party, user?.id || 'demo-brand-user-id');

      if (!signed) {
        return NextResponse.json({ success: false, error: 'Contract not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        contract: signed,
        message: `Contract digitally signed by ${party}.`,
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid contract action' }, { status: 400 });
  } catch (error: any) {
    console.error('Contract API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Contract operation failed' }, { status: 500 });
  }
}
