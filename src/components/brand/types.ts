// ===================================================
// TIA BRAND DASHBOARD - TYPE DEFINITIONS
// ===================================================

export type BrandTabType = 'campaigns' | 'discovery' | 'applications' | 'workspace' | 'financials' | 'settings';

export interface BrandCampaign {
  id: string;
  title: string;
  category: string;
  budget: number;
  spent: number;
  status: 'PUBLISHED' | 'IN_PROGRESS' | 'CONTENT_REVIEW' | 'COMPLETED' | 'DRAFT';
  applicationsCount: number;
  acceptedCount: number;
  deliverables: string;
  deadline: string;
  stage: number; // 1 to 4
  stageLabel: string;
}

export interface CreatorApplicant {
  id: string;
  campaignId: string;
  campaignTitle: string;
  creatorName: string;
  creatorHandle: string;
  avatarText: string;
  category: string;
  reach: string;
  engagement: string;
  intelligenceScore: number;
  proposedRate: number;
  proposedDays: number;
  pitch: string;
  status: 'AWAITING' | 'ACCEPTED' | 'DECLINED';
  appliedAt: string;
}

export interface BrandCollabMessage {
  id: string;
  sender: 'BRAND' | 'CREATOR' | 'SYSTEM';
  senderName: string;
  text: string;
  date: string;
  type?: 'TEXT' | 'DELIVERABLE' | 'APPROVAL' | 'MILESTONE';
  deliverableMeta?: {
    title: string;
    url: string;
    notes?: string;
    type: 'DRAFT_VIDEO' | 'SCRIPT' | 'LIVE_POST';
    status: 'PENDING_REVIEW' | 'APPROVED' | 'REVISION_REQUESTED';
  };
}

export interface BrandCollabThread {
  id: string;
  campaignTitle: string;
  creatorName: string;
  creatorHandle: string;
  deliverableSummary: string;
  agreedAmount: number;
  milestoneStage: number;
  milestoneName: string;
  escrowFunded: boolean;
  status: 'IN_PROGRESS' | 'DELIVERABLE_SUBMITTED' | 'APPROVED' | 'SETTLED';
  messages: BrandCollabMessage[];
}

export interface BrandNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  tab: BrandTabType;
}

export interface BrandOrgProfile {
  name: string;
  handle: string;
  industry: string;
  website: string;
  contactEmail: string;
  hqLocation: string;
  gstin: string;
  panNumber: string;
  verified: boolean;
}

export interface BrandTransaction {
  id: string;
  date: string;
  campaign: string;
  creator: string;
  grossAmount: number;
  tiaFee: number;
  tds?: number;
  netCreator: number;
  status: 'PROTECTED_ESCROW' | 'HELD_IN_PROTECTION' | 'DISBURSED' | 'REFUNDED' | string;
  utr?: string;
}
