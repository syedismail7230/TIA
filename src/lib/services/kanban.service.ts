// ===================================================
// TIA CAMPAIGN KANBAN CRM DATA SERVICE
// Upfluence-Style CRM Pipeline Management
// ===================================================

import fs from 'fs';
import path from 'path';

export type KanbanColumnId = 
  | 'DISCOVERED'
  | 'APPLIED'
  | 'SHORTLISTED'
  | 'NEGOTIATING'
  | 'BUDGET_LOCKED'
  | 'CONTENT_REVIEW'
  | 'COMPLETED_PAID';

export interface KanbanCreatorCard {
  id: string;
  creatorId: string;
  name: string;
  handle: string;
  avatarUrl: string;
  category: string;
  followers: number;
  engagementRate: number;
  authenticityScore: number;
  stage: KanbanColumnId;
  dealValue: number;
  campaignId: string;
  campaignTitle: string;
  lastUpdated: string;
  notes?: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const KANBAN_FILE = path.join(DATA_DIR, 'kanban_crm.json');

const INITIAL_CARDS: KanbanCreatorCard[] = [
  {
    id: 'k-card-1',
    creatorId: 'cr-101',
    name: 'Aarav Sharma',
    handle: '@aarav.fitness',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    category: 'Fitness & Athletics',
    followers: 520000,
    engagementRate: 4.8,
    authenticityScore: 94,
    stage: 'CONTENT_REVIEW',
    dealValue: 45000,
    campaignId: 'camp-101',
    campaignTitle: 'Summer 2026 Running Series',
    lastUpdated: new Date().toISOString(),
    notes: 'Draft video uploaded. Midsole cushion test timestamped.',
  },
  {
    id: 'k-card-2',
    creatorId: 'cr-102',
    name: 'Priya Patel',
    handle: '@priya.techstyle',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    category: 'Tech & Lifestyle',
    followers: 340000,
    engagementRate: 5.2,
    authenticityScore: 98,
    stage: 'BUDGET_LOCKED',
    dealValue: 35000,
    campaignId: 'camp-101',
    campaignTitle: 'Summer 2026 Running Series',
    lastUpdated: new Date().toISOString(),
    notes: '100% Milestone locked in TIA Payment Protection.',
  },
  {
    id: 'k-card-3',
    creatorId: 'cr-103',
    name: 'Rohan Mehta',
    handle: '@rohan.culinary',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    category: 'Food & Culinary',
    followers: 180000,
    engagementRate: 3.9,
    authenticityScore: 91,
    stage: 'SHORTLISTED',
    dealValue: 20000,
    campaignId: 'camp-101',
    campaignTitle: 'Summer 2026 Running Series',
    lastUpdated: new Date().toISOString(),
    notes: 'Shortlisted for hydration & energy recipe integration.',
  },
  {
    id: 'k-card-4',
    creatorId: 'cr-104',
    name: 'Ananya Deshmukh',
    handle: '@ananya.wellness',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    category: 'Wellness & Health',
    followers: 95000,
    engagementRate: 6.4,
    authenticityScore: 96,
    stage: 'NEGOTIATING',
    dealValue: 15000,
    campaignId: 'camp-101',
    campaignTitle: 'Summer 2026 Running Series',
    lastUpdated: new Date().toISOString(),
    notes: 'Requested +1 Instagram Story set in deliverables.',
  },
];

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(KANBAN_FILE)) {
    fs.writeFileSync(KANBAN_FILE, JSON.stringify(INITIAL_CARDS, null, 2), 'utf-8');
  }
}

function readCards(): KanbanCreatorCard[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(KANBAN_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeCards(cards: KanbanCreatorCard[]) {
  ensureFile();
  fs.writeFileSync(KANBAN_FILE, JSON.stringify(cards, null, 2), 'utf-8');
}

export class KanbanCRMService {
  static getCards(campaignId?: string): KanbanCreatorCard[] {
    const cards = readCards();
    if (campaignId) {
      return cards.filter((c) => c.campaignId === campaignId);
    }
    return cards;
  }

  static updateCardStage(cardId: string, targetStage: KanbanColumnId, notes?: string): KanbanCreatorCard {
    const cards = readCards();
    const idx = cards.findIndex((c) => c.id === cardId);
    if (idx === -1) {
      throw new Error(`CRM card ${cardId} not found`);
    }

    cards[idx].stage = targetStage;
    cards[idx].lastUpdated = new Date().toISOString();
    if (notes) cards[idx].notes = notes;

    writeCards(cards);
    return cards[idx];
  }
}
