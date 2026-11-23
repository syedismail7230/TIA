// ===================================================
// TIA BACKEND - SUBMISSION & 72H SLA REVIEW SERVICE
// Backed by PostgreSQL ContentSubmission & ContentRevision models
// ===================================================

import fs from 'fs';
import path from 'path';
import { logAudit } from '@/lib/audit/logger';
import { PaymentService } from '@/lib/services/payment.service';
import prisma from '@/lib/db/prisma';

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

const INITIAL_SUBMISSIONS: DeliverableSubmissionRecord[] = [
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
    autoApprovalDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
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

let memorySubmissions: DeliverableSubmissionRecord[] = [...INITIAL_SUBMISSIONS];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(INITIAL_SUBMISSIONS, null, 2), 'utf-8');
    }
  } catch {}
}

function readSubmissions(): DeliverableSubmissionRecord[] {
  ensureDataFile();
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return memorySubmissions;
}

function writeSubmissions(submissions: DeliverableSubmissionRecord[]) {
  memorySubmissions = [...submissions];
  try {
    ensureDataFile();
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch {}
}

function mapPrismaToSubmissionRecord(row: any): DeliverableSubmissionRecord {
  let reviewNotes: SubmissionReviewNote[] = [];
  if (row.reviewNotes) {
    try {
      reviewNotes = typeof row.reviewNotes === 'string' ? JSON.parse(row.reviewNotes) : row.reviewNotes;
    } catch {
      reviewNotes = [];
    }
  }

  return {
    id: row.id,
    campaignId: row.campaignId || '',
    campaignTitle: row.campaignTitle || '',
    collabId: row.collabId || '',
    creatorId: row.creatorId || '',
    creatorName: row.creatorName || 'Creator',
    brandId: row.brandId || '',
    deliverableType: (row.deliverableType || 'DRAFT_VIDEO') as any,
    title: row.title || row.caption || 'Submission',
    assetUrl: row.fileUrl,
    previewThumbnailUrl: row.previewThumbnailUrl || undefined,
    notes: row.notes || undefined,
    milestoneStage: row.milestoneStage || 1,
    payoutTransactionId: row.payoutTransactionId || undefined,
    status: (row.status || 'PENDING_REVIEW') as any,
    revisionCount: row.version ? Math.max(0, row.version - 1) : 0,
    submittedAt: row.submittedAt ? new Date(row.submittedAt).toISOString() : new Date().toISOString(),
    autoApprovalDeadline: row.autoApprovalDeadline
      ? new Date(row.autoApprovalDeadline).toISOString()
      : new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    reviewNotes,
    approvedAt: row.approvedAt ? new Date(row.approvedAt).toISOString() : undefined,
  };
}

export class SubmissionService {
  static async list(filters?: {
    campaignId?: string;
    collabId?: string;
    creatorId?: string;
    brandId?: string;
    status?: string;
  }): Promise<DeliverableSubmissionRecord[]> {
    try {
      const whereClause: any = {};
      if (filters?.campaignId) whereClause.campaignId = filters.campaignId;
      if (filters?.collabId) whereClause.collabId = filters.collabId;
      if (filters?.creatorId) whereClause.creatorId = filters.creatorId;
      if (filters?.brandId) whereClause.brandId = filters.brandId;
      if (filters?.status && filters.status !== 'ALL') whereClause.status = filters.status;

      const dbRows = await prisma.contentSubmission.findMany({
        where: whereClause,
        orderBy: { submittedAt: 'desc' },
      });

      if (dbRows && dbRows.length > 0) {
        return dbRows.map(mapPrismaToSubmissionRecord);
      }
    } catch {
      // Fallback to local cache if PostgreSQL is unreachable or table empty
    }

    let list = readSubmissions();
    if (filters?.campaignId) list = list.filter((s) => s.campaignId === filters.campaignId);
    if (filters?.collabId) list = list.filter((s) => s.collabId === filters.collabId);
    if (filters?.creatorId) list = list.filter((s) => s.creatorId === filters.creatorId);
    if (filters?.brandId) list = list.filter((s) => s.brandId === filters.brandId);
    if (filters?.status && filters.status !== 'ALL') list = list.filter((s) => s.status === filters.status);

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
    const now = new Date();
    const deadline = new Date(now.getTime() + 72 * 60 * 60 * 1000); // 72 hours SLA
    const id = `sub-${Date.now()}`;

    let createdRecord: DeliverableSubmissionRecord = {
      id,
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

    try {
      const dbRow = await prisma.contentSubmission.create({
        data: {
          id,
          campaignId: input.campaignId,
          campaignTitle: input.campaignTitle,
          collabId: input.collabId,
          creatorId: input.creatorId,
          creatorName: input.creatorName,
          brandId: input.brandId,
          deliverableType: input.deliverableType,
          title: input.title,
          fileUrl: input.assetUrl,
          notes: input.notes || null,
          milestoneStage: input.milestoneStage,
          payoutTransactionId: input.payoutTransactionId || null,
          status: 'PENDING_REVIEW',
          submittedAt: now,
          autoApprovalDeadline: deadline,
          reviewNotes: JSON.stringify([]),
        },
      });
      createdRecord = mapPrismaToSubmissionRecord(dbRow);
    } catch {
      // Persisted to cache below
    }

    const list = readSubmissions();
    list.unshift(createdRecord);
    writeSubmissions(list);

    logAudit({
      actorId: input.creatorId,
      action: 'DELIVERABLE_SUBMITTED',
      targetType: 'DeliverableSubmission',
      targetId: createdRecord.id,
      details: { type: input.deliverableType, title: input.title },
    });

    return createdRecord;
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

    const newNote: SubmissionReviewNote = {
      id: `rn-${Date.now()}`,
      authorId: input.authorId,
      authorName: input.authorName,
      role: input.role,
      text: input.text,
      timestampLabel: input.timestampLabel,
      createdAt: new Date().toISOString(),
    };

    let targetSub: DeliverableSubmissionRecord | null = null;
    if (idx !== -1) {
      targetSub = list[idx];
      targetSub.reviewNotes.push(newNote);
      if (input.requestRevision) {
        targetSub.status = 'REVISION_REQUESTED';
        targetSub.revisionCount += 1;
      }
      writeSubmissions(list);
    }

    try {
      const existing = await prisma.contentSubmission.findUnique({
        where: { id: input.submissionId },
      });

      if (existing) {
        let existingNotes: SubmissionReviewNote[] = [];
        try {
          existingNotes = existing.reviewNotes ? JSON.parse(existing.reviewNotes) : [];
        } catch {}
        existingNotes.push(newNote);

        const updated = await prisma.contentSubmission.update({
          where: { id: input.submissionId },
          data: {
            reviewNotes: JSON.stringify(existingNotes),
            status: input.requestRevision ? 'REVISION_REQUESTED' : existing.status,
            version: input.requestRevision ? existing.version + 1 : existing.version,
          },
        });
        targetSub = mapPrismaToSubmissionRecord(updated);
      }
    } catch {
      // Local cache already updated
    }

    return targetSub;
  }

  static async approve(submissionId: string, approvedBy: string): Promise<DeliverableSubmissionRecord | null> {
    const list = readSubmissions();
    const idx = list.findIndex((s) => s.id === submissionId);
    let sub: DeliverableSubmissionRecord | null = idx !== -1 ? list[idx] : null;

    if (sub) {
      sub.status = 'APPROVED';
      sub.approvedAt = new Date().toISOString();
      writeSubmissions(list);
    }

    try {
      const updated = await prisma.contentSubmission.update({
        where: { id: submissionId },
        data: {
          status: 'APPROVED',
          approvedAt: new Date(),
        },
      });
      sub = mapPrismaToSubmissionRecord(updated);
    } catch {
      // Local cache already updated
    }

    // Disburse funds automatically if milestone transaction is attached
    if (sub?.payoutTransactionId) {
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
