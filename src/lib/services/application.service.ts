// ===================================================
// TIA BACKEND - APPLICATION & PROPOSAL SERVICE
// ===================================================

import fs from 'fs';
import path from 'path';
import { logAudit } from '@/lib/audit/logger';

export interface CampaignApplicationRecord {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brandId: string;
  creatorId: string;
  creatorName: string;
  creatorHandle: string;
  creatorFollowers: number;
  creatorCredibility: number;
  pitch: string;
  proposedRate: number;
  deliverablesSummary: string;
  timelineDays: number;
  status: 'AWAITING' | 'SHORTLISTED' | 'ACCEPTED' | 'REJECTED';
  matchScore: number;
  submittedAt: string;
  counterOffers?: {
    sender: 'BRAND' | 'CREATOR';
    rate: number;
    notes: string;
    date: string;
  }[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');

const INITIAL_APPLICATIONS: CampaignApplicationRecord[] = [
  {
    id: 'app-101',
    campaignId: 'camp-101',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    brandId: 'demo-brand-user-id',
    creatorId: 'cr-101',
    creatorName: 'Aarav Sharma',
    creatorHandle: '@aarav.fitness',
    creatorFollowers: 520000,
    creatorCredibility: 98,
    pitch: 'I will test these carbon-plated shoes over a 15km tempo run and break down the midsole foam recovery on 4K camera.',
    proposedRate: 65000,
    deliverablesSummary: '1x Dedicated YouTube Review (8-10m) + 2x IG Reels',
    timelineDays: 14,
    status: 'AWAITING',
    matchScore: 96,
    submittedAt: new Date('2026-08-27T10:00:00Z').toISOString(),
  },
  {
    id: 'app-102',
    campaignId: 'camp-102',
    campaignTitle: 'Pro Wireless ANC Earbuds Creator Benchmark',
    brandId: 'demo-brand-user-id',
    creatorId: 'cr-102',
    creatorName: 'Priya Kapoor',
    creatorHandle: '@priya.lifestyle',
    creatorFollowers: 340000,
    creatorCredibility: 95,
    pitch: 'Will produce aesthetic commute reels showing ANC noise cancellation in metro transit.',
    proposedRate: 40000,
    deliverablesSummary: '2x Aesthetic Instagram Reels + Story Set',
    timelineDays: 10,
    status: 'AWAITING',
    matchScore: 92,
    submittedAt: new Date('2026-08-28T14:30:00Z').toISOString(),
  },
  {
    id: 'app-103',
    campaignId: 'camp-102',
    campaignTitle: 'Pro Wireless ANC Earbuds Creator Benchmark',
    brandId: 'demo-brand-user-id',
    creatorId: 'cr-103',
    creatorName: 'Rohan Mehta',
    creatorHandle: '@rohan.techtalks',
    creatorFollowers: 780000,
    creatorCredibility: 99,
    pitch: 'Frequency response curve analyzer and decibel mic test in crowded studio.',
    proposedRate: 75000,
    deliverablesSummary: '1x Dedicated Benchmark Review on YouTube + X Thread',
    timelineDays: 12,
    status: 'AWAITING',
    matchScore: 98,
    submittedAt: new Date('2026-08-29T09:15:00Z').toISOString(),
  },
];

let memoryApplications: CampaignApplicationRecord[] = [...INITIAL_APPLICATIONS];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(APPLICATIONS_FILE)) {
      fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(INITIAL_APPLICATIONS, null, 2), 'utf-8');
    }
  } catch {}
}

function readApplications(): CampaignApplicationRecord[] {
  ensureDataFile();
  try {
    if (fs.existsSync(APPLICATIONS_FILE)) {
      const raw = fs.readFileSync(APPLICATIONS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return memoryApplications;
}

function writeApplications(apps: CampaignApplicationRecord[]) {
  memoryApplications = [...apps];
  try {
    ensureDataFile();
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(apps, null, 2), 'utf-8');
  } catch {}
}

export class ApplicationService {
  static async list(filters?: {
    campaignId?: string;
    brandId?: string;
    creatorId?: string;
    status?: string;
  }): Promise<CampaignApplicationRecord[]> {
    let list = readApplications();

    if (filters?.campaignId) {
      list = list.filter((a) => a.campaignId === filters.campaignId);
    }
    if (filters?.brandId) {
      list = list.filter((a) => a.brandId === filters.brandId);
    }
    if (filters?.creatorId) {
      list = list.filter((a) => a.creatorId === filters.creatorId);
    }
    if (filters?.status && filters.status !== 'ALL') {
      list = list.filter((a) => a.status === filters.status);
    }

    return list.sort((a, b) => b.matchScore - a.matchScore);
  }

  static async submit(input: {
    campaignId: string;
    campaignTitle: string;
    brandId: string;
    creatorId: string;
    creatorName: string;
    creatorHandle: string;
    creatorFollowers: number;
    creatorCredibility: number;
    pitch: string;
    proposedRate: number;
    deliverablesSummary: string;
    timelineDays: number;
  }): Promise<CampaignApplicationRecord> {
    const list = readApplications();

    const newApp: CampaignApplicationRecord = {
      id: `app-${Date.now()}`,
      campaignId: input.campaignId,
      campaignTitle: input.campaignTitle,
      brandId: input.brandId,
      creatorId: input.creatorId,
      creatorName: input.creatorName,
      creatorHandle: input.creatorHandle,
      creatorFollowers: input.creatorFollowers,
      creatorCredibility: input.creatorCredibility,
      pitch: input.pitch.trim(),
      proposedRate: input.proposedRate,
      deliverablesSummary: input.deliverablesSummary,
      timelineDays: input.timelineDays,
      status: 'AWAITING',
      matchScore: Math.min(99, Math.floor(85 + Math.random() * 14)),
      submittedAt: new Date().toISOString(),
    };

    list.unshift(newApp);
    writeApplications(list);

    logAudit({
      actorId: input.creatorId,
      action: 'PROPOSAL_SUBMITTED',
      targetType: 'CampaignApplication',
      targetId: newApp.id,
      details: { campaignId: input.campaignId, rate: input.proposedRate },
    });

    return newApp;
  }

  static async updateStatus(
    id: string,
    status: CampaignApplicationRecord['status']
  ): Promise<CampaignApplicationRecord | null> {
    const list = readApplications();
    const idx = list.findIndex((a) => a.id === id);
    if (idx === -1) return null;

    list[idx].status = status;
    writeApplications(list);

    logAudit({
      actorId: 'system',
      action: `APPLICATION_${status}`,
      targetType: 'CampaignApplication',
      targetId: id,
    });

    return list[idx];
  }
}
