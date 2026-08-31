// ===================================================
// TIA BACKEND - DELIVERABLE SUBMISSIONS API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { SubmissionService } from '@/lib/services/submission.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId') || undefined;
    const collabId = searchParams.get('collabId') || undefined;
    const status = searchParams.get('status') || undefined;

    const brandId = (user?.role === 'BRAND_ADMIN' || user?.role === 'BRAND_USER') ? user.id : undefined;
    const creatorId = user?.role === 'CREATOR' ? user.id : undefined;

    const submissions = await SubmissionService.list({
      campaignId,
      collabId,
      brandId,
      creatorId,
      status,
    });

    return NextResponse.json({ success: true, submissions });
  } catch (error: any) {
    console.error('Fetch Submissions Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const {
      action = 'SUBMIT',
      submissionId,
      campaignId,
      campaignTitle,
      collabId,
      deliverableType,
      title,
      assetUrl,
      notes,
      milestoneStage = 2,
      payoutTransactionId,
      text,
      timestampLabel,
      requestRevision,
    } = body;

    // Action 1: Creator Submits Deliverable Draft / Live Post
    if (action === 'SUBMIT') {
      if (!title || !assetUrl) {
        return NextResponse.json({ success: false, error: 'Title and Asset URL are required' }, { status: 400 });
      }

      const submission = await SubmissionService.submit({
        campaignId: campaignId || 'camp-101',
        campaignTitle: campaignTitle || 'Campaign Milestone Deliverable',
        collabId: collabId || 'collab-brand-1',
        creatorId: user?.id || 'demo-creator-user-id',
        creatorName: user?.name || 'Aarav Sharma',
        brandId: 'demo-brand-user-id',
        deliverableType: deliverableType || 'DRAFT_VIDEO',
        title,
        assetUrl,
        notes,
        milestoneStage: Number(milestoneStage),
        payoutTransactionId,
      });

      return NextResponse.json({ success: true, submission });
    }

    // Action 2: Add Review Feedback / Revision Request
    if (action === 'REVIEW_NOTE' && submissionId) {
      if (!text) {
        return NextResponse.json({ success: false, error: 'Review text is required' }, { status: 400 });
      }

      const updated = await SubmissionService.addReviewNote({
        submissionId,
        authorId: user?.id || 'demo-brand-user-id',
        authorName: user?.name || 'Brand Reviewer',
        role: user?.role === 'CREATOR' ? 'CREATOR' : 'BRAND',
        text,
        timestampLabel,
        requestRevision: Boolean(requestRevision),
      });

      return NextResponse.json({ success: true, submission: updated });
    }

    // Action 3: Final Brand Approval & Automated Payout Release
    if (action === 'APPROVE' && submissionId) {
      const approved = await SubmissionService.approve(submissionId, user?.id || 'demo-brand-user-id');
      return NextResponse.json({
        success: true,
        submission: approved,
        message: 'Deliverable approved! TIA Payment Protection disbursement initiated to creator account.',
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid submission action' }, { status: 400 });
  } catch (error: any) {
    console.error('Submission API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Submission operation failed' }, { status: 500 });
  }
}
