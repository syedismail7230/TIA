// ===================================================
// TIA BACKEND - DISPUTE RESOLUTION SERVICE
// Backed by PostgreSQL Dispute & DisputeEvidence models
// ===================================================

import fs from 'fs';
import path from 'path';
import { logAudit } from '@/lib/audit/logger';
import prisma from '@/lib/db/prisma';

export interface DisputeRecord {
  id: string;
  campaignId: string;
  campaignTitle: string;
  collabId: string;
  initiatorId: string;
  initiatorRole: 'BRAND' | 'CREATOR';
  reason: string;
  disputedAmount: number;
  evidenceNotes: string;
  evidenceAttachments?: string[];
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED_REFUND' | 'RESOLVED_DISBURSED' | 'RESOLVED_SPLIT' | 'DISMISSED';
  arbitratorNotes?: string;
  resolvedAt?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DISPUTES_FILE = path.join(DATA_DIR, 'disputes.json');

let memoryDisputes: DisputeRecord[] = [];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DISPUTES_FILE)) {
      fs.writeFileSync(DISPUTES_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch {}
}

function readDisputes(): DisputeRecord[] {
  ensureDataFile();
  try {
    if (fs.existsSync(DISPUTES_FILE)) {
      const raw = fs.readFileSync(DISPUTES_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return memoryDisputes;
}

function writeDisputes(disputes: DisputeRecord[]) {
  memoryDisputes = [...disputes];
  try {
    ensureDataFile();
    fs.writeFileSync(DISPUTES_FILE, JSON.stringify(disputes, null, 2), 'utf-8');
  } catch {}
}

function mapPrismaToDisputeRecord(row: any): DisputeRecord {
  let evidenceAttachments: string[] = [];
  if (row.evidence && Array.isArray(row.evidence)) {
    evidenceAttachments = row.evidence.map((e: any) => e.fileUrl).filter(Boolean);
  }

  return {
    id: row.id,
    campaignId: row.campaignId,
    campaignTitle: row.campaignTitle || 'Campaign Dispute',
    collabId: row.collabId || '',
    initiatorId: row.initiatorUserId,
    initiatorRole: row.initiatorRole as any,
    reason: row.reason,
    disputedAmount: row.disputedAmount || Math.round(row.claimedAmount / 100),
    evidenceNotes: row.evidenceNotes || row.description,
    evidenceAttachments,
    status: (row.status || 'OPEN') as any,
    arbitratorNotes: row.arbitratorNotes || row.decisionSummary || undefined,
    resolvedAt: row.decidedAt ? new Date(row.decidedAt).toISOString() : undefined,
    createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : new Date().toISOString(),
  };
}

export class DisputeService {
  static async list(filters?: {
    campaignId?: string;
    initiatorId?: string;
    status?: string;
  }): Promise<DisputeRecord[]> {
    try {
      const whereClause: any = {};
      if (filters?.campaignId) whereClause.campaignId = filters.campaignId;
      if (filters?.initiatorId) whereClause.initiatorUserId = filters.initiatorId;
      if (filters?.status && filters.status !== 'ALL') whereClause.status = filters.status;

      const dbRows = await prisma.dispute.findMany({
        where: whereClause,
        include: { evidence: true },
        orderBy: { createdAt: 'desc' },
      });

      if (dbRows && dbRows.length > 0) {
        return dbRows.map(mapPrismaToDisputeRecord);
      }
    } catch {
      // Fallback to cache if PostgreSQL is unreachable or table empty
    }

    let list = readDisputes();
    if (filters?.campaignId) {
      list = list.filter((d) => d.campaignId === filters.campaignId);
    }
    if (filters?.initiatorId) {
      list = list.filter((d) => d.initiatorId === filters.initiatorId);
    }
    if (filters?.status && filters.status !== 'ALL') {
      list = list.filter((d) => d.status === filters.status);
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static async create(input: {
    campaignId: string;
    campaignTitle: string;
    collabId: string;
    initiatorId: string;
    initiatorRole: 'BRAND' | 'CREATOR';
    reason: string;
    disputedAmount: number;
    evidenceNotes: string;
    evidenceAttachments?: string[];
  }): Promise<DisputeRecord> {
    const id = `DSP-TIA-${Math.floor(1000 + Math.random() * 9000)}`;

    let newDispute: DisputeRecord = {
      id,
      campaignId: input.campaignId,
      campaignTitle: input.campaignTitle,
      collabId: input.collabId,
      initiatorId: input.initiatorId,
      initiatorRole: input.initiatorRole,
      reason: input.reason,
      disputedAmount: input.disputedAmount,
      evidenceNotes: input.evidenceNotes,
      evidenceAttachments: input.evidenceAttachments,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };

    try {
      const dbRow = await prisma.dispute.create({
        data: {
          id,
          campaignId: input.campaignId,
          campaignTitle: input.campaignTitle,
          collabId: input.collabId,
          initiatorUserId: input.initiatorId,
          initiatorRole: input.initiatorRole,
          reason: input.reason,
          description: input.evidenceNotes,
          claimedAmount: Math.round(input.disputedAmount * 100), // Minor currency units (paise)
          disputedAmount: input.disputedAmount,
          evidenceNotes: input.evidenceNotes,
          status: 'OPEN',
          evidence: input.evidenceAttachments && input.evidenceAttachments.length > 0
            ? {
                create: input.evidenceAttachments.map((url) => ({
                  submittedByUserId: input.initiatorId,
                  description: 'Dispute evidentiary artifact',
                  fileUrl: url,
                })),
              }
            : undefined,
        },
        include: { evidence: true },
      });
      newDispute = mapPrismaToDisputeRecord(dbRow);
    } catch {
      // Persisted to cache below
    }

    const list = readDisputes();
    list.unshift(newDispute);
    writeDisputes(list);

    logAudit({
      actorId: input.initiatorId,
      action: 'DISPUTE_FILED',
      targetType: 'Dispute',
      targetId: id,
      details: { amount: input.disputedAmount, reason: input.reason },
    });

    return newDispute;
  }

  static async resolve(
    id: string,
    decision: DisputeRecord['status'],
    arbitratorNotes: string,
    decidedBy: string
  ): Promise<DisputeRecord | null> {
    const list = readDisputes();
    const idx = list.findIndex((d) => d.id === id);

    let updatedRecord: DisputeRecord | null = null;
    if (idx !== -1) {
      list[idx].status = decision;
      list[idx].arbitratorNotes = arbitratorNotes;
      list[idx].resolvedAt = new Date().toISOString();
      writeDisputes(list);
      updatedRecord = list[idx];
    }

    try {
      const dbRow = await prisma.dispute.update({
        where: { id },
        data: {
          status: decision,
          arbitratorNotes,
          decisionSummary: arbitratorNotes,
          decidedByUserId: decidedBy,
          decidedAt: new Date(),
        },
        include: { evidence: true },
      });
      updatedRecord = mapPrismaToDisputeRecord(dbRow);
    } catch {
      // Local cache already updated
    }

    logAudit({
      actorId: decidedBy,
      action: `DISPUTE_RESOLVED_${decision}`,
      targetType: 'Dispute',
      targetId: id,
      details: { decision, notes: arbitratorNotes },
    });

    return updatedRecord;
  }
}
