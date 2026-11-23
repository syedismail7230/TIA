// ===================================================
// TIA CREATOR DASHBOARD - TYPE DEFINITIONS
// ===================================================

export type TabType = 'marketplace' | 'collabs' | 'payments' | 'social-media' | 'settings';
export type CollabFilter = 'awaiting' | 'accepted' | 'rejected';

export interface PlatformNotification {
  id: string;
  type: 'ESCROW' | 'MATCH' | 'MESSAGE' | 'APPROVAL' | 'PAYMENT' | 'SYSTEM' | 'PROPOSAL' | 'CREDIT';
  category: 'COLLABS' | 'PAYMENTS' | 'SYSTEM';
  title: string;
  message: string;
  timeAgo: string;
  timestamp: number;
  read: boolean;
  actionTab?: TabType;
  actionCollabId?: string;
  actionLabel?: string;
  badgeText?: string;
  badgeBg?: string;
  badgeColor?: string;
}

export interface CreatorMessage {
  id: string;
  sender: 'BRAND' | 'CREATOR' | 'SYSTEM';
  senderName: string;
  badge?: string;
  badgeColor?: string;
  badgeBg?: string;
  date: string;
  text: string;
  type?: 'TEXT' | 'ESCROW' | 'DELIVERABLE' | 'APPROVAL';
  escrowMeta?: {
    amount: string;
    milestone: string;
    status: string;
  };
  deliverableMeta?: {
    title: string;
    url: string;
    notes?: string;
    type: string;
    status: string;
  };
}

export interface CreatorCollab {
  id: string;
  campaignTitle: string;
  subject: string;
  brandName: string;
  brandRole: string;
  brandInitials: string;
  brandAvatarBg: string;
  brandAvatarColor: string;
  status: 'AWAITING' | 'ACCEPTED' | 'REJECTED';
  milestoneStage: number;
  milestoneName: string;
  appliedAt: string;
  proposedRate: string;
  escrowFunded: boolean;
  escrowAmount: string;
  deliveryTimeline: string;
  deliverables: string;
  unreadCount: number;
  messages: CreatorMessage[];
}

export interface CreatorPayment {
  id: string;
  invoiceCode: string;
  mediaName: string;
  initials: string;
  logoBg: string;
  email: string;
  campaign: string;
  deliverableDesc: string;
  amount: string;
  priceFormatted: string;
  grossAmount: number;
  tdsDeduction: number;
  platformFee: number;
  netAmount: number;
  authorizedAt: string;
  dueDate: string;
  status: 'PAID' | 'ESCROW_HELD' | 'PROCESSING';
  statusLabel: string;
  utrNumber: string;
  invoiceNumber: string;
  billedTo: string;
  currency: string;
  fromName: string;
  fromEmail: string;
  disbursedAt: string;
}

export interface CreatorSettingsProfile {
  displayName: string;
  handle: string;
  tagline: string;
  bio: string;
  primaryNiches: string[];
  languages: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
}

export interface CreatorSettingsRates {
  minCollabBudget: number;
  youtubeDedicated: number;
  youtubeIntegration: number;
  instagramReel: number;
  instagramStory: number;
  linkedinPost: number;
  twitterThread: number;
  allowNegotiation: boolean;
}

export interface CreatorBankAccount {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: 'SAVINGS' | 'CURRENT';
  upiId: string;
  panNumber: string;
  verified: boolean;
  verifiedAt: string;
}
