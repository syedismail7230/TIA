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
    const { deliverableId, fileUrl, fileName, caption, tags, notes, action, submissionId, comment } = body;

    // 1. Creator Submits Deliverable Draft
    if (action === 'SUBMIT') {
      if (!deliverableId || !fileUrl) {
        return NextResponse.json({ error: 'Deliverable ID and file URL required' }, { status: 400 });
      }

      const deliverable = await prisma.campaignDeliverable.findUnique({
        where: { id: deliverableId },
        include: { submissions: { orderBy: { version: 'desc' }, take: 1 } },
      });

      if (!deliverable) {
        return NextResponse.json({ error: 'Deliverable not found' }, { status: 404 });
      }

      const latestVersion = deliverable.submissions[0]?.version || 0;
      const nextVersion = latestVersion + 1;

      const submission = await prisma.contentSubmission.create({
        data: {
          deliverableId,
          version: nextVersion,
          fileUrl,
          fileName: fileName || 'campaign_deliverable_v' + nextVersion,
          caption: caption || null,
          tags: tags || null,
          notes: notes || null,
          status: 'SUBMITTED',
        },
      });

      await prisma.campaignDeliverable.update({
        where: { id: deliverableId },
        data: { status: 'DRAFT_SUBMITTED' },
      });

      // Advance campaign state to CONTENT_REVIEW
      await prisma.campaign.update({
        where: { id: deliverable.campaignId },
        data: { status: 'CONTENT_REVIEW' },
      });

      await logAuditEvent({
        userId: user.id,
        userRole: user.role,
        action: 'CONTENT_SUBMIT',
        entityType: 'CONTENT_SUBMISSION',
        entityId: submission.id,
      });

      return NextResponse.json({ message: 'Content submitted successfully for brand review', submission }, { status: 201 });
    }

    // 2. Brand Approves Submission
    if (action === 'APPROVE') {
      if (!submissionId) {
        return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
      }

      const submission = await prisma.contentSubmission.findUnique({
        where: { id: submissionId },
        include: { deliverable: true },
      });

      if (!submission) {
        return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
      }

      await prisma.contentSubmission.update({
        where: { id: submissionId },
        data: { status: 'APPROVED' },
      });

      await prisma.campaignDeliverable.update({
        where: { id: submission.deliverableId },
        data: { status: 'APPROVED', approvedAt: new Date() },
      });

      await prisma.campaign.update({
        where: { id: submission.deliverable.campaignId },
        data: { status: 'APPROVED' },
      });

      await logAuditEvent({
        userId: user.id,
        userRole: user.role,
        action: 'CONTENT_APPROVE',
        entityType: 'CONTENT_SUBMISSION',
        entityId: submissionId,
      });

      return NextResponse.json({ message: 'Deliverable approved successfully' });
    }

    // 3. Brand Requests Revision
    if (action === 'REQUEST_REVISION') {
      if (!submissionId || !comment) {
        return NextResponse.json({ error: 'Submission ID and revision comment are required' }, { status: 400 });
      }

      const submission = await prisma.contentSubmission.findUnique({
        where: { id: submissionId },
        include: { deliverable: true },
      });

      if (!submission) {
        return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
      }

      await prisma.contentRevision.create({
        data: {
          submissionId,
          requestedByUserId: user.id,
          comment,
        },
      });

      await prisma.contentSubmission.update({
        where: { id: submissionId },
        data: { status: 'REVISION_REQUESTED' },
      });

      await prisma.campaignDeliverable.update({
        where: { id: submission.deliverableId },
        data: { status: 'REVISION_REQUESTED' },
      });

      await logAuditEvent({
        userId: user.id,
        userRole: user.role,
        action: 'REVISION_REQUEST',
        entityType: 'CONTENT_SUBMISSION',
        entityId: submissionId,
      });

      return NextResponse.json({ message: 'Revision requested from creator' });
    }

    return NextResponse.json({ error: 'Invalid submission action' }, { status: 400 });
  } catch (error: any) {
    console.error('Content Submission Error:', error);
    return NextResponse.json({ error: 'Failed to process content submission' }, { status: 500 });
  }
}
