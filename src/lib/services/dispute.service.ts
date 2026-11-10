// ===================================================
// TIA BACKEND - DISPUTE RESOLUTION SERVICE
// ===================================================

import fs from 'fs';
import path from 'path';
import { logAudit } from '@/lib/audit/logger';

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

export class DisputeService {
  static async list(filters?: {
    campaignId?: string;
    initiatorId?: string;
    status?: string;
  }): Promise<DisputeRecord[]> {
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
    const list = readDisputes();
    const id = `DSP-TIA-${Math.floor(1000 + Math.random() * 9000)}`;

    const newDispute: DisputeRecord = {
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
    if (idx === -1) return null;

    list[idx].status = decision;
    list[idx].arbitratorNotes = arbitratorNotes;
    list[idx].resolvedAt = new Date().toISOString();

    writeDisputes(list);

    logAudit({
      actorId: decidedBy,
      action: `DISPUTE_RESOLVED_${decision}`,
      targetType: 'Dispute',
      targetId: id,
      details: { decision, notes: arbitratorNotes },
    });

    return list[idx];
  }
}
