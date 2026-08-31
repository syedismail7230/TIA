import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { SubmissionService } from '../../src/lib/services/submission.service';

describe('TIA Backend - Submission & 72h SLA Engine QA Tests', () => {
  it('submits a deliverable and automatically sets exactly 72-hour auto-approval deadline', async () => {
    const before = Date.now();
    const submission = await SubmissionService.submit({
      campaignId: 'camp-101',
      campaignTitle: 'Summer 2026 Running Series',
      collabId: 'collab-brand-1',
      creatorId: 'cr-101',
      creatorName: 'Aarav Sharma',
      brandId: 'demo-brand-user-id',
      deliverableType: 'DRAFT_VIDEO',
      title: '4K Draft Video - Cushion Benchmark',
      assetUrl: 'https://storage.tia.agency/deliverables/sample-draft.mp4',
      notes: 'Timestamp 01:45 shows midsole compression.',
      milestoneStage: 2,
    });

    const submittedAtMs = new Date(submission.submittedAt).getTime();
    const deadlineMs = new Date(submission.autoApprovalDeadline).getTime();
    const diffHours = (deadlineMs - submittedAtMs) / (1000 * 60 * 60);

    assert.equal(diffHours, 72); // Exactly 72 hours SLA
    assert.equal(submission.status, 'PENDING_REVIEW');
    assert.equal(submission.revisionCount, 0);
  });

  it('records timestamped review notes and tracks revision rounds', async () => {
    const submission = await SubmissionService.submit({
      campaignId: 'camp-101',
      campaignTitle: 'Summer 2026 Running Series',
      collabId: 'collab-brand-1',
      creatorId: 'cr-101',
      creatorName: 'Aarav Sharma',
      brandId: 'demo-brand-user-id',
      deliverableType: 'DRAFT_VIDEO',
      title: 'Revision Test Cut',
      assetUrl: 'https://storage.tia.agency/deliverables/cut1.mp4',
      milestoneStage: 2,
    });

    const updated = await SubmissionService.addReviewNote({
      submissionId: submission.id,
      authorId: 'demo-brand-user-id',
      authorName: 'Nike Brand Lead',
      role: 'BRAND',
      timestampLabel: '02:15',
      text: 'Please enhance the color saturation during the outdoor sunlight sequence.',
      requestRevision: true,
    });

    assert.ok(updated);
    assert.equal(updated?.status, 'REVISION_REQUESTED');
    assert.equal(updated?.revisionCount, 1);
    assert.equal(updated?.reviewNotes.length, 1);
    assert.equal(updated?.reviewNotes[0].timestampLabel, '02:15');
  });

  it('approves submission and marks status as APPROVED', async () => {
    const submission = await SubmissionService.submit({
      campaignId: 'camp-101',
      campaignTitle: 'Summer 2026 Running Series',
      collabId: 'collab-brand-1',
      creatorId: 'cr-101',
      creatorName: 'Aarav Sharma',
      brandId: 'demo-brand-user-id',
      deliverableType: 'LIVE_POST',
      title: 'Live Post URL Verification',
      assetUrl: 'https://instagram.com/p/sample-reel-live',
      milestoneStage: 3,
    });

    const approved = await SubmissionService.approve(submission.id, 'demo-brand-user-id');
    assert.ok(approved);
    assert.equal(approved?.status, 'APPROVED');
    assert.ok(approved?.approvedAt);
  });
});
