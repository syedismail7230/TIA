// ===================================================
// TIA BACKEND - CAMPAIGN APPLICATIONS API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { ApplicationService } from '@/lib/services/application.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId') || undefined;
    const status = searchParams.get('status') || undefined;

    const brandId = (user?.role === 'BRAND_ADMIN' || user?.role === 'BRAND_USER') ? user.id : undefined;
    const creatorId = user?.role === 'CREATOR' ? user.id : undefined;

    const applications = await ApplicationService.list({
      campaignId,
      brandId,
      creatorId,
      status,
    });

    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    console.error('Fetch Applications Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const {
      campaignId,
      campaignTitle,
      brandId,
      pitch,
      proposedRate,
      deliverablesSummary,
      timelineDays = 14,
    } = body;

    if (!campaignId || !pitch || !proposedRate) {
      return NextResponse.json({ success: false, error: 'Missing proposal requirements' }, { status: 400 });
    }

    const application = await ApplicationService.submit({
      campaignId,
      campaignTitle: campaignTitle || 'Campaign Collaboration',
      brandId: brandId || 'demo-brand-user-id',
      creatorId: user?.id || 'demo-creator-user-id',
      creatorName: user?.name || 'Aarav Sharma',
      creatorHandle: '@creator.official',
      creatorFollowers: 520000,
      creatorCredibility: 98,
      pitch,
      proposedRate: Number(proposedRate),
      deliverablesSummary: deliverablesSummary || 'Standard deliverable package',
      timelineDays: Number(timelineDays),
    });

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error('Submit Proposal Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to submit proposal' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { applicationId, status } = body;

    if (!applicationId || !status) {
      return NextResponse.json({ success: false, error: 'Application ID and status are required' }, { status: 400 });
    }

    const updated = await ApplicationService.updateStatus(applicationId, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    console.error('Update Application Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to update application' }, { status: 500 });
  }
}
