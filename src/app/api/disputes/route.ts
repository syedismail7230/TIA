// ===================================================
// TIA BACKEND - DISPUTES & ARBITRATION API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { DisputeService } from '@/lib/services/dispute.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId') || undefined;
    const status = searchParams.get('status') || undefined;

    const disputes = await DisputeService.list({
      campaignId,
      initiatorId: user?.id,
      status,
    });

    return NextResponse.json({ success: true, disputes });
  } catch (error: any) {
    console.error('Fetch Disputes Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve disputes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const {
      campaignId,
      campaignTitle,
      collabId,
      reason,
      disputedAmount,
      evidenceNotes,
      evidenceAttachments,
    } = body;

    if (!campaignId || !reason || !disputedAmount) {
      return NextResponse.json({ success: false, error: 'Missing required dispute fields' }, { status: 400 });
    }

    const initiatorRole = user?.role === 'CREATOR' ? 'CREATOR' : 'BRAND';

    const dispute = await DisputeService.create({
      campaignId,
      campaignTitle: campaignTitle || 'Campaign Collaboration',
      collabId: collabId || 'collab-brand-1',
      initiatorId: user?.id || 'demo-brand-user-id',
      initiatorRole,
      reason,
      disputedAmount: Number(disputedAmount),
      evidenceNotes: evidenceNotes || '',
      evidenceAttachments,
    });

    return NextResponse.json({ success: true, dispute });
  } catch (error: any) {
    console.error('Create Dispute Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to file dispute' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { disputeId, decision, arbitratorNotes } = body;

    if (!disputeId || !decision) {
      return NextResponse.json({ success: false, error: 'Dispute ID and decision are required' }, { status: 400 });
    }

    const resolved = await DisputeService.resolve(
      disputeId,
      decision,
      arbitratorNotes || 'Arbitration settled by TIA Platform Operations.',
      user?.id || 'admin-user-id'
    );

    return NextResponse.json({ success: true, dispute: resolved });
  } catch (error: any) {
    console.error('Resolve Dispute Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to resolve dispute' }, { status: 500 });
  }
}
