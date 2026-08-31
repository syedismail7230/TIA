// ===================================================
// TIA BACKEND - SUBMISSION & 72H SLA REVIEW SERVICE
// ===================================================

import fs from 'fs';
import path from 'path';
import { logAudit } from '@/lib/audit/logger';
import { PaymentService } from '@/lib/services/payment.service';

export interface SubmissionReviewNote {
  id: string;
  authorId: string;
  authorName: string;
  role: 'BRAND' | 'CREATOR' | 'TIA_SUPPORT';
  timestampMs?: number; // Video timestamp in ms or timestamp string
  timestampLabel?: string; // e.g. "01:45"
  text: string;
  createdAt: string;
}

export interface DeliverableSubmissionRecord {
  id: string;
  campaignId: string;
  campaignTitle: string;
  collabId: string;
  creatorId: string;
  creatorName: string;
  brandId: string;
  deliverableType: 'DRAFT_VIDEO' | 'SCRIPT' | 'LIVE_POST';
  title: string;
  assetUrl: string;
  previewThumbnailUrl?: string;
  notes?: string;
  milestoneStage: number;
  payoutTransactionId?: string;
  status: 'PENDING_REVIEW' | 'REVISION_REQUESTED' | 'APPROVED';
  revisionCount: number;
  submittedAt: string;
  autoApprovalDeadline: string; // Exactly 72 hours from submission
  reviewNotes: SubmissionReviewNote[];
  approvedAt?: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'deliverable_submissions.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    const initial: DeliverableSubmissionRecord[] = [
      {
        id: 'sub-101',
        campaignId: 'camp-101',
        campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
        collabId: 'collab-brand-1',
        creatorId: 'cr-101',
        creatorName: 'Aarav Sharma',
        brandId: 'demo-brand-user-id',
        deliverableType: 'DRAFT_VIDEO',
        title: 'Draft Video Cut 4K - 15km Tempo Test & Cushion Verdict',
        assetUrl: 'https://storage.tia.agency/deliverables/demo-draft-cut.mp4',
        previewThumbnailUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80',
        notes: 'Color grading completed. Timestamps: 0:00 Intro, 1:45 Midsole Cushion Test, 4:20 Long-distance verdict.',
        milestoneStage: 2,
        payoutTransactionId: 'TX-TIA-98102',
        status: 'PENDING_REVIEW',
        revisionCount: 0,
        submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        autoApprovalDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48h remaining of 72h
        reviewNotes: [
          {
            id: 'rn-1',
            authorId: 'demo-brand-user-id',
            authorName: 'Nike Brand Lead',
            role: 'BRAND',
            timestampLabel: '01:45',
            text: 'Ensure the shoe logo on the tongue is clearly visible during the slow-motion stride sequence.',
            createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
    ];
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  }
}

function readSubmissions(): DeliverableSubmissionRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeSubmissions(submissions: DeliverableSubmissionRecord[]) {
  ensureDataFile();
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
}

export class SubmissionService {
  static async list(filters?: {
    campaignId?: string;
    collabId?: string;
    creatorId?: string;
    brandId?: string;
    status?: string;
  }): Promise<DeliverableSubmissionRecord[]> {
    let list = readSubmissions();

    if (filters?.campaignId) {
      list = list.filter((s) => s.campaignId === filters.campaignId);
    }
    if (filters?.collabId) {
      list = list.filter((s) => s.collabId === filters.collabId);
    }
    if (filters?.creatorId) {
      list = list.filter((s) => s.creatorId === filters.creatorId);
    }
    if (filters?.brandId) {
      list = list.filter((s) => s.brandId === filters.brandId);
    }
    if (filters?.status && filters.status !== 'ALL') {
      list = list.filter((s) => s.status === filters.status);
    }

    return list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }

  static async submit(input: {
    campaignId: string;
    campaignTitle: string;
    collabId: string;
    creatorId: string;
    creatorName: string;
    brandId: string;
    deliverableType: 'DRAFT_VIDEO' | 'SCRIPT' | 'LIVE_POST';
    title: string;
    assetUrl: string;
    notes?: string;
    milestoneStage: number;
    payoutTransactionId?: string;
  }): Promise<DeliverableSubmissionRecord> {
    const list = readSubmissions();
    const now = new Date();
    const deadline = new Date(now.getTime() + 72 * 60 * 60 * 1000); // 72 hours

    const newSub: DeliverableSubmissionRecord = {
      id: `sub-${Date.now()}`,
      campaignId: input.campaignId,
      campaignTitle: input.campaignTitle,
      collabId: input.collabId,
      creatorId: input.creatorId,
      creatorName: input.creatorName,
      brandId: input.brandId,
      deliverableType: input.deliverableType,
      title: input.title,
      assetUrl: input.assetUrl,
      notes: input.notes,
      milestoneStage: input.milestoneStage,
      payoutTransactionId: input.payoutTransactionId,
      status: 'PENDING_REVIEW',
      revisionCount: 0,
      submittedAt: now.toISOString(),
      autoApprovalDeadline: deadline.toISOString(),
      reviewNotes: [],
    };

    list.unshift(newSub);
    writeSubmissions(list);

    logAudit({
      actorId: input.creatorId,
      action: 'DELIVERABLE_SUBMITTED',
      targetType: 'DeliverableSubmission',
      targetId: newSub.id,
      details: { type: input.deliverableType, title: input.title },
    });

    return newSub;
  }

  static async addReviewNote(input: {
    submissionId: string;
    authorId: string;
    authorName: string;
    role: 'BRAND' | 'CREATOR' | 'TIA_SUPPORT';
    text: string;
    timestampLabel?: string;
    requestRevision?: boolean;
  }): Promise<DeliverableSubmissionRecord | null> {
    const list = readSubmissions();
    const idx = list.findIndex((s) => s.id === input.submissionId);
    if (idx === -1) return null;

    const sub = list[idx];
    const newNote: SubmissionReviewNote = {
      id: `rn-${Date.now()}`,
      authorId: input.authorId,
      authorName: input.authorName,
      role: input.role,
      text: input.text,
      timestampLabel: input.timestampLabel,
      createdAt: new Date().toISOString(),
    };

    sub.reviewNotes.push(newNote);

    if (input.requestRevision) {
      sub.status = 'REVISION_REQUESTED';
      sub.revisionCount += 1;
    }

    writeSubmissions(list);
    return sub;
  }

  static async approve(submissionId: string, approvedBy: string): Promise<DeliverableSubmissionRecord | null> {
    const list = readSubmissions();
    const idx = list.findIndex((s) => s.id === submissionId);
    if (idx === -1) return null;

    const sub = list[idx];
    sub.status = 'APPROVED';
    sub.approvedAt = new Date().toISOString();

    writeSubmissions(list);

    // If transaction ID is attached, disburse funds automatically
    if (sub.payoutTransactionId) {
      try {
        await PaymentService.disbursePayout(sub.payoutTransactionId);
      } catch (err) {
        console.error('Auto-disbursement error upon approval:', err);
      }
    }

    logAudit({
      actorId: approvedBy,
      action: 'DELIVERABLE_APPROVED',
      targetType: 'DeliverableSubmission',
      targetId: submissionId,
    });

    return sub;
  }
}
