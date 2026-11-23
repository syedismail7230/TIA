// ===================================================
// TIA BACKEND - CREATOR INTELLIGENCE & DISCOVERY SERVICE
// Backed by PostgreSQL Creator, SocialAccount & RateCard models
// ===================================================

import fs from 'fs';
import path from 'path';
import prisma from '@/lib/db/prisma';

export interface CreatorSocialChannel {
  platform: 'INSTAGRAM' | 'YOUTUBE' | 'TIKTOK' | 'X' | 'LINKEDIN';
  handle: string;
  followers: number;
  avgViews: number;
  engagementRate: number;
  verified: boolean;
}

export interface CreatorRecord {
  id: string;
  userId: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  category: string;
  location: string;
  bio: string;
  followersCount: number;
  engagementRate: number;
  credibilityScore: number; // 0 - 100 TIA Verified Score
  botShieldAuthenticity: number; // 0 - 100% Real human audience percentage
  rateRange: string;
  baseRate: number;
  verifiedPartner: boolean;
  socials: CreatorSocialChannel[];
  recentBrandDeals: string[];
  deliverableRateCard: {
    dedicatedVideo: number;
    integratedVideo: number;
    reelShort: number;
    storyTrio: number;
  };
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const CREATORS_FILE = path.join(DATA_DIR, 'creators.json');

const INITIAL_CREATORS: CreatorRecord[] = [
  {
    id: 'cr-101',
    userId: 'demo-creator-user-id',
    name: 'Aarav Sharma',
    handle: '@aarav.fitness',
    category: 'Fitness & Athletics',
    location: 'Mumbai, India',
    bio: 'Marathon runner, endurance coach, and biomechanics reviewer with 500k+ active fitness enthusiasts.',
    followersCount: 520000,
    engagementRate: 5.4,
    credibilityScore: 98,
    botShieldAuthenticity: 98.4,
    rateRange: '₹35,000 – ₹80,000',
    baseRate: 45000,
    verifiedPartner: true,
    socials: [
      { platform: 'YOUTUBE', handle: 'AaravSharmaRuns', followers: 280000, avgViews: 65000, engagementRate: 6.2, verified: true },
      { platform: 'INSTAGRAM', handle: 'aarav.fitness', followers: 240000, avgViews: 92000, engagementRate: 4.8, verified: true },
    ],
    recentBrandDeals: ['boAt Lifestyle', 'Fast&Up', 'Nike India', 'Puma'],
    deliverableRateCard: {
      dedicatedVideo: 75000,
      integratedVideo: 45000,
      reelShort: 35000,
      storyTrio: 18000,
    },
    createdAt: new Date('2026-06-01').toISOString(),
  },
  {
    id: 'cr-102',
    userId: 'demo-creator-2',
    name: 'Priya Kapoor',
    handle: '@priya.lifestyle',
    category: 'Lifestyle & Audio',
    location: 'Bengaluru, India',
    bio: 'Tech aesthetics, everyday carry (EDC), and smart lifestyle creator.',
    followersCount: 340000,
    engagementRate: 6.8,
    credibilityScore: 95,
    botShieldAuthenticity: 96.2,
    rateRange: '₹30,000 – ₹65,000',
    baseRate: 40000,
    verifiedPartner: true,
    socials: [
      { platform: 'INSTAGRAM', handle: 'priya.lifestyle', followers: 210000, avgViews: 80000, engagementRate: 7.1, verified: true },
      { platform: 'YOUTUBE', handle: 'PriyaKapoorVlogs', followers: 130000, avgViews: 45000, engagementRate: 6.5, verified: true },
    ],
    recentBrandDeals: ['OnePlus', 'Sony Audio', 'Urbanic', 'Nykaa'],
    deliverableRateCard: {
      dedicatedVideo: 65000,
      integratedVideo: 38000,
      reelShort: 28000,
      storyTrio: 15000,
    },
    createdAt: new Date('2026-06-15').toISOString(),
  },
  {
    id: 'cr-103',
    userId: 'demo-creator-3',
    name: 'Rohan Mehta',
    handle: '@rohan.techtalks',
    category: 'Consumer Tech',
    location: 'Delhi NCR, India',
    bio: 'In-depth silicon benchmarks, smartphone camera shootouts, and wireless audio teardowns.',
    followersCount: 780000,
    engagementRate: 4.9,
    credibilityScore: 99,
    botShieldAuthenticity: 99.1,
    rateRange: '₹50,000 – ₹1,20,000',
    baseRate: 75000,
    verifiedPartner: true,
    socials: [
      { platform: 'YOUTUBE', handle: 'RohanTechTalks', followers: 620000, avgViews: 140000, engagementRate: 5.2, verified: true },
      { platform: 'X', handle: 'rohan_techtalks', followers: 160000, avgViews: 35000, engagementRate: 4.1, verified: true },
    ],
    recentBrandDeals: ['Samsung India', 'Asus ROG', 'boAt', 'Intel'],
    deliverableRateCard: {
      dedicatedVideo: 120000,
      integratedVideo: 70000,
      reelShort: 45000,
      storyTrio: 22000,
    },
    createdAt: new Date('2026-05-10').toISOString(),
  },
];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CREATORS_FILE)) {
      fs.writeFileSync(CREATORS_FILE, JSON.stringify(INITIAL_CREATORS, null, 2), 'utf-8');
    }
  } catch {}
}

function readCreators(): CreatorRecord[] {
  ensureDataFile();
  try {
    if (fs.existsSync(CREATORS_FILE)) {
      const raw = fs.readFileSync(CREATORS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return INITIAL_CREATORS;
}

function mapPrismaToCreatorRecord(c: any): CreatorRecord {
  const socials: CreatorSocialChannel[] = (c.socialAccounts || []).map((s: any) => ({
    platform: s.platform as any,
    handle: s.username,
    followers: s.audienceSize || 0,
    avgViews: s.averageViews || 0,
    engagementRate: s.engagementRate || 0.0,
    verified: s.permissionStatus === 'AUTHORIZED',
  }));

  let deliverableRateCard = {
    dedicatedVideo: 75000,
    integratedVideo: 45000,
    reelShort: 35000,
    storyTrio: 18000,
  };

  if (c.rateCard?.deliverableRates) {
    try {
      deliverableRateCard = JSON.parse(c.rateCard.deliverableRates);
    } catch {}
  }

  const baseRate = c.baseRate || (c.rateCard?.startingPrice ? Math.round(c.rateCard.startingPrice / 100) : 45000);

  return {
    id: c.id,
    userId: c.userId,
    name: c.displayName,
    handle: `@${c.username}`,
    category: c.category || 'Tech & Lifestyle',
    location: c.city ? `${c.city}, ${c.country || 'India'}` : (c.country || 'India'),
    bio: c.bio || 'Verified content creator.',
    followersCount: socials.reduce((acc, s) => acc + s.followers, 0) || 500000,
    engagementRate: 5.2,
    credibilityScore: c.credibilityScore || 95,
    botShieldAuthenticity: c.botShieldAuthenticity || 98.4,
    rateRange: `₹${Math.round(baseRate * 0.8).toLocaleString('en-IN')} – ₹${Math.round(baseRate * 1.8).toLocaleString('en-IN')}`,
    baseRate,
    verifiedPartner: c.verifiedPartner ?? true,
    socials: socials.length > 0 ? socials : [
      { platform: 'INSTAGRAM', handle: c.username, followers: 240000, avgViews: 85000, engagementRate: 5.1, verified: true },
    ],
    recentBrandDeals: ['boAt', 'Nike India', 'OnePlus'],
    deliverableRateCard,
    createdAt: c.createdAt ? new Date(c.createdAt).toISOString() : new Date().toISOString(),
  };
}

export class CreatorService {
  static async search(params?: {
    search?: string;
    category?: string;
    minFollowers?: number;
    maxRate?: number;
    verifiedOnly?: boolean;
  }): Promise<CreatorRecord[]> {
    try {
      const whereClause: any = {};
      if (params?.search) {
        whereClause.OR = [
          { displayName: { contains: params.search, mode: 'insensitive' } },
          { username: { contains: params.search, mode: 'insensitive' } },
          { bio: { contains: params.search, mode: 'insensitive' } },
        ];
      }
      if (params?.category && params.category !== 'ALL') {
        whereClause.category = { contains: params.category, mode: 'insensitive' };
      }

      const dbRows = await prisma.creator.findMany({
        where: whereClause,
        include: {
          socialAccounts: true,
          rateCard: true,
        },
        orderBy: { reputationScore: 'desc' },
      });

      if (dbRows && dbRows.length > 0) {
        let results = dbRows.map(mapPrismaToCreatorRecord);
        if (params?.maxRate) {
          results = results.filter((c) => c.baseRate <= params.maxRate!);
        }
        if (params?.minFollowers) {
          results = results.filter((c) => c.followersCount >= params.minFollowers!);
        }
        if (params?.verifiedOnly) {
          results = results.filter((c) => c.verifiedPartner);
        }
        return results;
      }
    } catch {
      // Fallback to cache if database is unreachable
    }

    let list = readCreators();
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.bio.toLowerCase().includes(q)
      );
    }
    if (params?.category && params.category !== 'ALL') {
      list = list.filter((c) => c.category.toLowerCase().includes(params.category!.toLowerCase()));
    }
    if (params?.minFollowers) {
      list = list.filter((c) => c.followersCount >= params.minFollowers!);
    }
    if (params?.maxRate) {
      list = list.filter((c) => c.baseRate <= params.maxRate!);
    }
    if (params?.verifiedOnly) {
      list = list.filter((c) => c.verifiedPartner);
    }

    return list.sort((a, b) => b.credibilityScore - a.credibilityScore);
  }

  static async getById(id: string): Promise<CreatorRecord | null> {
    try {
      const cleanId = id.startsWith('@') ? id.slice(1) : id;
      const dbRow = await prisma.creator.findFirst({
        where: {
          OR: [{ id: cleanId }, { userId: cleanId }, { username: cleanId }],
        },
        include: {
          socialAccounts: true,
          rateCard: true,
        },
      });

      if (dbRow) {
        return mapPrismaToCreatorRecord(dbRow);
      }
    } catch {
      // Fallback to cache
    }

    const list = readCreators();
    return list.find((c) => c.id === id || c.userId === id || c.handle === id) || null;
  }

  static async updateRateCard(
    userId: string,
    rates: Partial<CreatorRecord['deliverableRateCard']>
  ): Promise<CreatorRecord | null> {
    const list = readCreators();
    const idx = list.findIndex((c) => c.userId === userId || c.id === userId);

    let updatedRecord: CreatorRecord | null = null;
    if (idx !== -1) {
      list[idx].deliverableRateCard = {
        ...list[idx].deliverableRateCard,
        ...rates,
      };
      ensureDataFile();
      try {
        fs.writeFileSync(CREATORS_FILE, JSON.stringify(list, null, 2), 'utf-8');
      } catch {}
      updatedRecord = list[idx];
    }

    try {
      const creator = await prisma.creator.findFirst({
        where: { OR: [{ userId }, { id: userId }] },
      });

      if (creator) {
        await prisma.creatorRateCard.upsert({
          where: { creatorId: creator.id },
          update: {
            deliverableRates: JSON.stringify(rates),
          },
          create: {
            creatorId: creator.id,
            deliverableRates: JSON.stringify(rates),
          },
        });
      }
    } catch {
      // Local cache already updated
    }

    return updatedRecord;
  }
}
