// ===================================================
// TIA BACKEND - CAMPAIGN SERVICE
// Enterprise PostgreSQL Integration via Prisma
// ===================================================

import fs from 'fs';
import path from 'path';
import prisma from '@/lib/db/prisma';
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

const INITIAL_CAMPAIGNS: CampaignRecord[] = [
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

let memoryCampaigns: CampaignRecord[] = [...INITIAL_CAMPAIGNS];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CAMPAIGNS_FILE)) {
      fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(INITIAL_CAMPAIGNS, null, 2), 'utf-8');
    }
  } catch {}
}

function readCampaigns(): CampaignRecord[] {
  ensureDataFile();
  try {
    if (fs.existsSync(CAMPAIGNS_FILE)) {
      const raw = fs.readFileSync(CAMPAIGNS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return memoryCampaigns;
}

function writeCampaigns(campaigns: CampaignRecord[]) {
  memoryCampaigns = [...campaigns];
  try {
    ensureDataFile();
    fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2), 'utf-8');
  } catch {}
}

export class CampaignService {
  static async getAll(filters?: {
    brandId?: string;
    category?: string;
    status?: string;
    search?: string;
  }): Promise<CampaignRecord[]> {
    // 1. Try PostgreSQL query
    try {
      const where: any = {};
      if (filters?.brandId) where.organizationId = filters.brandId;
      if (filters?.status && filters.status !== 'ALL') where.status = filters.status;
      if (filters?.category && filters.category !== 'ALL') where.category = { contains: filters.category, mode: 'insensitive' };
      if (filters?.search) {
        where.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { category: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      const dbCampaigns = await prisma.campaign.findMany({
        where,
        include: {
          organization: true,
          applications: true,
          contracts: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      if (dbCampaigns.length > 0) {
        return dbCampaigns.map((c) => ({
          id: c.id,
          brandId: c.organizationId,
          brandName: c.organization?.name || 'Brand',
          title: c.title,
          category: c.category || 'General',
          budget: Math.round(c.budget / 100),
          spent: (c as any).spent ? Math.round((c as any).spent / 100) : 0,
          status: (c.status as any) || 'PUBLISHED',
          deliverables: c.deliverables || '',
          deadline: c.applicationDeadline ? c.applicationDeadline.toDateString() : 'Flexible',
          objectives: c.objective || undefined,
          stage: 1,
          stageLabel: 'Active Campaign',
          applicationsCount: c.applications.length,
          acceptedCount: c.contracts.length,
          milestones: [
            { stage: 1, name: 'Milestone 1: Brief Acceptance', percentage: 30, amount: Math.round(c.budget * 0.003), status: 'PENDING' },
            { stage: 2, name: 'Milestone 2: Content Creation', percentage: 35, amount: Math.round(c.budget * 0.0035), status: 'PENDING' },
            { stage: 3, name: 'Milestone 3: Final Deployment', percentage: 35, amount: Math.round(c.budget * 0.0035), status: 'PENDING' },
          ],
          createdAt: c.createdAt.toISOString(),
          updatedAt: c.updatedAt.toISOString(),
        }));
      }
    } catch (e: any) {
      console.warn('PostgreSQL campaign getAll fallback notice:', e.message);
    }

    // 2. Fallback to local store
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
    try {
      const c = await prisma.campaign.findUnique({
        where: { id },
        include: { organization: true, applications: true, contracts: true },
      });

      if (c) {
        return {
          id: c.id,
          brandId: c.organizationId,
          brandName: c.organization?.name || 'Brand',
          title: c.title,
          category: c.category || 'General',
          budget: Math.round(c.budget / 100),
          spent: (c as any).spent ? Math.round((c as any).spent / 100) : 0,
          status: (c.status as any) || 'PUBLISHED',
          deliverables: c.deliverables || '',
          deadline: c.applicationDeadline ? c.applicationDeadline.toDateString() : 'Flexible',
          objectives: c.objective || undefined,
          stage: 1,
          stageLabel: 'Active Campaign',
          applicationsCount: c.applications.length,
          acceptedCount: c.contracts.length,
          milestones: [
            { stage: 1, name: 'Milestone 1: Concept', percentage: 30, amount: Math.round(c.budget * 0.003), status: 'PENDING' },
            { stage: 2, name: 'Milestone 2: Production', percentage: 35, amount: Math.round(c.budget * 0.0035), status: 'PENDING' },
            { stage: 3, name: 'Milestone 3: Release', percentage: 35, amount: Math.round(c.budget * 0.0035), status: 'PENDING' },
          ],
          createdAt: c.createdAt.toISOString(),
          updatedAt: c.updatedAt.toISOString(),
        };
      }
    } catch (e: any) {
      console.warn('PostgreSQL campaign getById fallback notice:', e.message);
    }

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

    // Try PostgreSQL creation
    try {
      await prisma.campaign.create({
        data: {
          id,
          organizationId: input.brandId,
          title: input.title.trim(),
          description: input.deliverables || input.title.trim(),
          category: input.category,
          budget: Math.round(input.budget * 100),
          deliverables: input.deliverables,
          objective: input.objectives || 'AWARENESS',
          status: 'PUBLISHED',
        },
      });
    } catch (e: any) {
      console.warn('PostgreSQL campaign creation fallback notice:', e.message);
    }

    const list = readCampaigns();
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
    try {
      const updateData: any = {};
      if (updates.title) updateData.title = updates.title;
      if (updates.category) updateData.category = updates.category;
      if (updates.status) updateData.status = updates.status;
      if (updates.budget) updateData.budget = Math.round(updates.budget * 100);

      await prisma.campaign.updateMany({
        where: { id },
        data: updateData,
      });
    } catch (e: any) {
      console.warn('PostgreSQL campaign update fallback notice:', e.message);
    }

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
    try {
      await prisma.campaign.deleteMany({
        where: { id, organizationId: brandId },
      });
    } catch (e: any) {
      console.warn('PostgreSQL campaign delete fallback notice:', e.message);
    }

    const list = readCampaigns();
    const filtered = list.filter((c) => !(c.id === id && c.brandId === brandId));
    if (filtered.length === list.length) return false;

    writeCampaigns(filtered);
    return true;
  }
}
