// ===================================================
// TIA BACKEND - CAMPAIGN SERVICE
// ===================================================

import fs from 'fs';
import path from 'path';
import { logAudit } from '@/lib/audit/logger';

export interface CampaignMilestone {
  stage: number;
  name: string;
  percentage: number;
  amount: number;
  status: 'PENDING' | 'LOCKED_IN_PROTECTION' | 'IN_REVIEW' | 'APPROVED' | 'DISBURSED';
}

export interface CampaignRecord {
  id: string;
  brandId: string;
  brandName: string;
  title: string;
  category: string;
  budget: number;
  spent: number;
  status: 'DRAFT' | 'PUBLISHED' | 'IN_PROGRESS' | 'CONTENT_REVIEW' | 'COMPLETED' | 'ARCHIVED';
  deliverables: string;
  deadline: string;
  objectives?: string;
  targetNiches?: string;
  stage: number;
  stageLabel: string;
  applicationsCount: number;
  acceptedCount: number;
  milestones: CampaignMilestone[];
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const CAMPAIGNS_FILE = path.join(DATA_DIR, 'campaigns.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CAMPAIGNS_FILE)) {
    const initial: CampaignRecord[] = [
      {
        id: 'camp-101',
        brandId: 'demo-brand-user-id',
        brandName: 'Nike India Private Limited',
        title: 'Summer 2026 Running Series & Shoe Launch',
        category: 'Fitness & Athletics',
        budget: 350000,
        spent: 175000,
        status: 'IN_PROGRESS',
        deliverables: '1x Dedicated YouTube Review + 2x IG Reels',
        deadline: 'Sep 15, 2026',
        objectives: 'Product Awareness & Click-through conversions',
        targetNiches: 'Running, Marathon, Fitness',
        stage: 2,
        stageLabel: 'Draft Video Review',
        applicationsCount: 14,
        acceptedCount: 2,
        milestones: [
          { stage: 1, name: 'Milestone 1: Script & Storyboard', percentage: 25, amount: 87500, status: 'APPROVED' },
          { stage: 2, name: 'Milestone 2: Rough Video Cut', percentage: 25, amount: 87500, status: 'IN_REVIEW' },
          { stage: 3, name: 'Milestone 3: Final Render & Captions', percentage: 25, amount: 87500, status: 'LOCKED_IN_PROTECTION' },
          { stage: 4, name: 'Milestone 4: Live Verification & Reach Audit', percentage: 25, amount: 87500, status: 'PENDING' },
        ],
        createdAt: new Date('2026-08-15').toISOString(),
        updatedAt: new Date('2026-08-28').toISOString(),
      },
      {
        id: 'camp-102',
        brandId: 'demo-brand-user-id',
        brandName: 'Nike India Private Limited',
        title: 'Pro Wireless ANC Earbuds Creator Benchmark',
        category: 'Consumer Tech',
        budget: 250000,
        spent: 187500,
        status: 'CONTENT_REVIEW',
        deliverables: '3x Instagram Reels + Bio Link Placement',
        deadline: 'Sep 20, 2026',
        objectives: 'Audio quality benchmark and unboxing',
        targetNiches: 'Tech, Gadgets, Lifestyle',
        stage: 3,
        stageLabel: 'Deliverable Approval',
        applicationsCount: 22,
        acceptedCount: 3,
        milestones: [
          { stage: 1, name: 'Milestone 1: Brief Acceptance', percentage: 20, amount: 50000, status: 'APPROVED' },
          { stage: 2, name: 'Milestone 2: Script & Audio Test', percentage: 30, amount: 75000, status: 'APPROVED' },
          { stage: 3, name: 'Milestone 3: Final Reels Render', percentage: 25, amount: 62500, status: 'IN_REVIEW' },
          { stage: 4, name: 'Milestone 4: Live Verification', percentage: 25, amount: 62500, status: 'LOCKED_IN_PROTECTION' },
        ],
        createdAt: new Date('2026-08-18').toISOString(),
        updatedAt: new Date('2026-08-29').toISOString(),
      },
      {
        id: 'camp-103',
        brandId: 'demo-brand-user-id',
        brandName: 'Nike India Private Limited',
        title: 'Monsoon Fitness & Hydration Routine Series',
        category: 'Health & Wellness',
        budget: 180000,
        spent: 0,
        status: 'PUBLISHED',
        deliverables: 'Story Trio + Link Sticker + Community Post',
        deadline: 'Oct 05, 2026',
        objectives: 'Hydration bottle awareness & lifestyle integration',
        targetNiches: 'Wellness, Yoga, Daily Fitness',
        stage: 1,
        stageLabel: 'Creator Bidding Open',
        applicationsCount: 8,
        acceptedCount: 0,
        milestones: [
          { stage: 1, name: 'Milestone 1: Creative Concept', percentage: 30, amount: 54000, status: 'PENDING' },
          { stage: 2, name: 'Milestone 2: Storyboard & Frames', percentage: 35, amount: 63000, status: 'PENDING' },
          { stage: 3, name: 'Milestone 3: Live Post Deployment', percentage: 35, amount: 63000, status: 'PENDING' },
        ],
        createdAt: new Date('2026-08-25').toISOString(),
        updatedAt: new Date('2026-08-25').toISOString(),
      },
    ];
    fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  }
}

function readCampaigns(): CampaignRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(CAMPAIGNS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeCampaigns(campaigns: CampaignRecord[]) {
  ensureDataFile();
  fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2), 'utf-8');
}

export class CampaignService {
  static async getAll(filters?: {
    brandId?: string;
    category?: string;
    status?: string;
    search?: string;
  }): Promise<CampaignRecord[]> {
    let list = readCampaigns();

    if (filters?.brandId) {
      list = list.filter((c) => c.brandId === filters.brandId);
    }
    if (filters?.status && filters.status !== 'ALL') {
      list = list.filter((c) => c.status === filters.status);
    }
    if (filters?.category && filters.category !== 'ALL') {
      list = list.filter((c) => c.category.toLowerCase().includes(filters.category!.toLowerCase()));
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static async getById(id: string): Promise<CampaignRecord | null> {
    const list = readCampaigns();
    return list.find((c) => c.id === id) || null;
  }

  static async create(input: {
    brandId: string;
    brandName: string;
    title: string;
    category: string;
    budget: number;
    deliverables: string;
    deadline: string;
    objectives?: string;
    targetNiches?: string;
  }): Promise<CampaignRecord> {
    const list = readCampaigns();
    const id = `camp-${Date.now()}`;

    const newCamp: CampaignRecord = {
      id,
      brandId: input.brandId,
      brandName: input.brandName,
      title: input.title.trim(),
      category: input.category,
      budget: input.budget,
      spent: 0,
      status: 'PUBLISHED',
      deliverables: input.deliverables,
      deadline: input.deadline,
      objectives: input.objectives,
      targetNiches: input.targetNiches,
      stage: 1,
      stageLabel: 'Creator Bidding Open',
      applicationsCount: 0,
      acceptedCount: 0,
      milestones: [
        { stage: 1, name: 'Milestone 1: Concept & Storyboard', percentage: 30, amount: Math.round(input.budget * 0.3), status: 'PENDING' },
        { stage: 2, name: 'Milestone 2: Rough Video Cut', percentage: 35, amount: Math.round(input.budget * 0.35), status: 'PENDING' },
        { stage: 3, name: 'Milestone 3: Final Render & Live Link', percentage: 35, amount: Math.round(input.budget * 0.35), status: 'PENDING' },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    list.unshift(newCamp);
    writeCampaigns(list);

    logAudit({
      actorId: input.brandId,
      action: 'CAMPAIGN_CREATED',
      targetType: 'Campaign',
      targetId: id,
      details: { title: input.title, budget: input.budget },
    });

    return newCamp;
  }

  static async update(id: string, updates: Partial<CampaignRecord>): Promise<CampaignRecord | null> {
    const list = readCampaigns();
    const idx = list.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    list[idx] = {
      ...list[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    writeCampaigns(list);
    return list[idx];
  }

  static async delete(id: string, brandId: string): Promise<boolean> {
    const list = readCampaigns();
    const filtered = list.filter((c) => !(c.id === id && c.brandId === brandId));
    if (filtered.length === list.length) return false;

    writeCampaigns(filtered);
    return true;
  }
}
