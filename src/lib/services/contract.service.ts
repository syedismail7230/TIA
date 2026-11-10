// ===================================================
// TIA BACKEND - CONTRACT & DIGITAL SIGNATURE SERVICE
// ===================================================

import fs from 'fs';
import path from 'path';
import { logAudit } from '@/lib/audit/logger';

export interface CampaignContractRecord {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brandId: string;
  brandName: string;
  creatorId: string;
  creatorName: string;
  agreedAmount: number;
  currency: 'INR';
  platformCommissionRate: number; // 5%
  tdsRate: number; // 1%
  deliverableScope: string;
  milestoneStagesCount: number;
  revisionRoundsAllowed: number; // Maximum 2
  slaAutoApprovalHours: number; // 72 hours
  brandSignedAt?: string;
  creatorSignedAt?: string;
  status: 'PENDING_SIGNATURES' | 'ACTIVE' | 'FULFILLED' | 'TERMINATED';
  contractPdfUrl?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const CONTRACTS_FILE = path.join(DATA_DIR, 'contracts.json');

const INITIAL_CONTRACTS: CampaignContractRecord[] = [
  {
    id: 'CTR-TIA-2026-081',
    campaignId: 'camp-101',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    brandId: 'demo-brand-user-id',
    brandName: 'Nike India Private Limited',
    creatorId: 'cr-101',
    creatorName: 'Aarav Sharma',
    agreedAmount: 65000,
    currency: 'INR',
    platformCommissionRate: 5.0,
    tdsRate: 1.0,
    deliverableScope: '1x Dedicated 4K Review (8-10m) on YouTube + 2x IG Reels (9:16). Includes raw footage archival access for 90 days.',
    milestoneStagesCount: 4,
    revisionRoundsAllowed: 2,
    slaAutoApprovalHours: 72,
    brandSignedAt: new Date('2026-08-20T10:00:00Z').toISOString(),
    creatorSignedAt: new Date('2026-08-20T11:15:00Z').toISOString(),
    status: 'ACTIVE',
    contractPdfUrl: '/documents/contracts/CTR-TIA-2026-081.pdf',
    createdAt: new Date('2026-08-20T09:00:00Z').toISOString(),
  },
];

let memoryContracts: CampaignContractRecord[] = [...INITIAL_CONTRACTS];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CONTRACTS_FILE)) {
      fs.writeFileSync(CONTRACTS_FILE, JSON.stringify(INITIAL_CONTRACTS, null, 2), 'utf-8');
    }
  } catch {}
}

function readContracts(): CampaignContractRecord[] {
  ensureDataFile();
  try {
    if (fs.existsSync(CONTRACTS_FILE)) {
      const raw = fs.readFileSync(CONTRACTS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return memoryContracts;
}

function writeContracts(contracts: CampaignContractRecord[]) {
  memoryContracts = [...contracts];
  try {
    ensureDataFile();
    fs.writeFileSync(CONTRACTS_FILE, JSON.stringify(contracts, null, 2), 'utf-8');
  } catch {}
}

export class ContractService {
  static async getById(id: string): Promise<CampaignContractRecord | null> {
    const list = readContracts();
    return list.find((c) => c.id === id) || null;
  }

  static async listByParty(partyId: string): Promise<CampaignContractRecord[]> {
    const list = readContracts();
    return list.filter((c) => c.brandId === partyId || c.creatorId === partyId);
  }

  static async create(input: {
    campaignId: string;
    campaignTitle: string;
    brandId: string;
    brandName: string;
    creatorId: string;
    creatorName: string;
    agreedAmount: number;
    deliverableScope: string;
  }): Promise<CampaignContractRecord> {
    const list = readContracts();
    const id = `CTR-TIA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newContract: CampaignContractRecord = {
      id,
      campaignId: input.campaignId,
      campaignTitle: input.campaignTitle,
      brandId: input.brandId,
      brandName: input.brandName,
      creatorId: input.creatorId,
      creatorName: input.creatorName,
      agreedAmount: input.agreedAmount,
      currency: 'INR',
      platformCommissionRate: 5.0,
      tdsRate: 1.0,
      deliverableScope: input.deliverableScope,
      milestoneStagesCount: 3,
      revisionRoundsAllowed: 2,
      slaAutoApprovalHours: 72,
      status: 'PENDING_SIGNATURES',
      createdAt: new Date().toISOString(),
    };

    list.unshift(newContract);
    writeContracts(list);

    logAudit({
      actorId: input.brandId,
      action: 'CONTRACT_GENERATED',
      targetType: 'CampaignContract',
      targetId: id,
      details: { amount: input.agreedAmount, creator: input.creatorName },
    });

    return newContract;
  }

  static async sign(
    contractId: string,
    party: 'BRAND' | 'CREATOR',
    signerId: string
  ): Promise<CampaignContractRecord | null> {
    const list = readContracts();
    const idx = list.findIndex((c) => c.id === contractId);
    if (idx === -1) return null;

    const contract = list[idx];
    const now = new Date().toISOString();

    if (party === 'BRAND') {
      contract.brandSignedAt = now;
    } else {
      contract.creatorSignedAt = now;
    }

    if (contract.brandSignedAt && contract.creatorSignedAt) {
      contract.status = 'ACTIVE';
    }

    writeContracts(list);

    logAudit({
      actorId: signerId,
      action: `CONTRACT_SIGNED_BY_${party}`,
      targetType: 'CampaignContract',
      targetId: contractId,
    });

    return contract;
  }
}
