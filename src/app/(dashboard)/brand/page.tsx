'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';

// ============================================================================
// THEMED SVG ICONS (NO RAW EMOJIS - STRICT BRAND SYSTEM)
// ============================================================================

const SearchIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PlusIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ShieldCheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#059669' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const CheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#059669' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon: React.FC<{ size?: number; color?: string; filled?: boolean }> = ({ size = 14, color = '#F59E0B', filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UsersIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MessageSquareIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CreditCardIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const BriefcaseIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const SettingsIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const CompassIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const SendIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const DownloadIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const BellIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#475569' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const MenuIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = '#475569' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const VideoCameraIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

// Types
type BrandTabType = 'campaigns' | 'discovery' | 'applications' | 'workspace' | 'financials' | 'settings';

interface BrandCampaign {
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

interface CreatorApplicant {
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

interface BrandCollabMessage {
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

interface BrandCollabThread {
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

export default function BrandDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as BrandTabType) || 'campaigns';

  const [activeTab, setActiveTab] = useState<BrandTabType>(initialTab);
  const [orgProfile, setOrgProfile] = useState({
    name: 'Nike India Private Limited',
    handle: '@nike.india',
    industry: 'Sportswear, Lifestyle & Athletics',
    website: 'https://nike.com/in',
    contactEmail: 'campaigns@nike.co.in',
    hqLocation: 'Bengaluru, Karnataka, India',
    gstin: '29AAAAA0000A1Z5',
    panNumber: 'AAACN1234F',
    verified: true,
  });

  // Notifications State
  const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'New Creator Bid Received',
      message: 'Sarah Jenkins (@creator.official) submitted a proposal of ₹65,000 for Summer 2026 Running Series.',
      timeAgo: '5m ago',
      read: false,
      tab: 'applications' as BrandTabType,
    },
    {
      id: 'notif-2',
      title: 'Draft Video Deliverable Submitted',
      message: 'Aarav Sharma submitted 4K video draft for review on boAt Airdopes Pro Campaign.',
      timeAgo: '1h ago',
      read: false,
      tab: 'workspace' as BrandTabType,
    },
    {
      id: 'notif-3',
      title: 'Payment Protection Milestone Settled',
      message: 'Milestone 1 (₹45,000) disbursed to Priya Kapoor upon approved live YouTube upload.',
      timeAgo: '4h ago',
      read: true,
      tab: 'financials' as BrandTabType,
    },
  ]);

  // Campaign State
  const [campaigns, setCampaigns] = useState<BrandCampaign[]>([
    {
      id: 'camp-1',
      title: 'Summer 2026 Running Series & Shoe Launch',
      category: 'Fitness & Athletics',
      budget: 350000,
      spent: 130000,
      status: 'IN_PROGRESS',
      applicationsCount: 14,
      acceptedCount: 3,
      deliverables: '1x Dedicated YouTube Review + 2x IG Reels',
      deadline: 'Sep 15, 2026',
      stage: 2,
      stageLabel: 'Draft Video Review',
    },
    {
      id: 'camp-2',
      title: 'Pro Wireless ANC Earbuds Creator Benchmark',
      category: 'Consumer Tech',
      budget: 250000,
      spent: 90000,
      status: 'CONTENT_REVIEW',
      applicationsCount: 22,
      acceptedCount: 4,
      deliverables: '3x Instagram Reels + Bio Link Placement',
      deadline: 'Sep 22, 2026',
      stage: 3,
      stageLabel: 'Deliverable Approval',
    },
    {
      id: 'camp-3',
      title: 'Monsoon Fitness & Hydration Routine Series',
      category: 'Health & Wellness',
      budget: 180000,
      spent: 0,
      status: 'PUBLISHED',
      applicationsCount: 8,
      acceptedCount: 0,
      deliverables: 'Story Trio + Link Sticker + Community Post',
      deadline: 'Oct 05, 2026',
      stage: 1,
      stageLabel: 'Creator Bidding Open',
    },
  ]);

  const [campaignStatusFilter, setCampaignStatusFilter] = useState<string>('ALL');
  const [campaignSearchQuery, setCampaignSearchQuery] = useState<string>('');
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState<boolean>(false);
  const [newCampaignForm, setNewCampaignForm] = useState({
    title: '',
    category: 'Consumer Tech',
    budget: '150000',
    deliverables: '1x Dedicated YouTube Video + 2x IG Reels',
    deadline: 'Oct 15, 2026',
    objectives: 'Product Awareness & Click-through conversions',
    targetNiches: 'Tech, Gadgets, Lifestyle',
  });

  // Creator Discovery State
  const [discoverySearchQuery, setDiscoverySearchQuery] = useState<string>('');
  const [discoveryCategory, setDiscoveryCategory] = useState<string>('ALL');
  const [discoveryPlatform, setDiscoveryPlatform] = useState<string>('ALL');
  const [selectedCreatorProfile, setSelectedCreatorProfile] = useState<any | null>(null);

  const discoverableCreators = [
    {
      id: 'cr-1',
      name: 'Sarah Jenkins',
      handle: '@creator.official',
      avatarText: 'SJ',
      category: 'Tech & AI SaaS',
      location: 'Mumbai, India',
      totalReach: '615,000',
      engagementRate: '8.7%',
      intelligenceScore: 98,
      botShieldScore: '98.4%',
      startingRate: 45000,
      youtubeFollowers: '185K',
      instagramFollowers: '320K',
      topGeo: 'India (68%), USA (14%)',
      bio: 'Creating cinematic benchmark reviews for smartphones, consumer audio, and emerging AI hardware tools.',
    },
    {
      id: 'cr-2',
      name: 'Aarav Sharma',
      handle: '@aarav.fitness',
      avatarText: 'AS',
      category: 'Fitness & Athletics',
      location: 'Bengaluru, India',
      totalReach: '420,000',
      engagementRate: '6.4%',
      intelligenceScore: 95,
      botShieldScore: '97.8%',
      startingRate: 35000,
      youtubeFollowers: '110K',
      instagramFollowers: '275K',
      topGeo: 'India (78%), UK (8%)',
      bio: 'Certified strength trainer and running enthusiast documenting marathon prep and nutrition protocols.',
    },
    {
      id: 'cr-3',
      name: 'Priya Kapoor',
      handle: '@priya.lifestyle',
      avatarText: 'PK',
      category: 'Lifestyle & Wellness',
      location: 'Delhi NCR, India',
      totalReach: '540,000',
      engagementRate: '7.1%',
      intelligenceScore: 96,
      botShieldScore: '99.1%',
      startingRate: 40000,
      youtubeFollowers: '240K',
      instagramFollowers: '280K',
      topGeo: 'India (82%), UAE (6%)',
      bio: 'Authentic daily vlogging, organic skincare breakdowns, and mindful morning routine inspiration.',
    },
    {
      id: 'cr-4',
      name: 'Rohan Verma',
      handle: '@rohan_tech',
      avatarText: 'RV',
      category: 'Tech & Gaming',
      location: 'Hyderabad, India',
      totalReach: '380,000',
      engagementRate: '5.9%',
      intelligenceScore: 93,
      botShieldScore: '96.5%',
      startingRate: 30000,
      youtubeFollowers: '190K',
      instagramFollowers: '160K',
      topGeo: 'India (72%), USA (11%)',
      bio: 'PC hardware benchmarks, custom mechanical keyboards, and gaming workstation setups.',
    },
  ];

  // Applications & Proposals Pipeline State
  const [applicants, setApplicants] = useState<CreatorApplicant[]>([
    {
      id: 'app-1',
      campaignId: 'camp-1',
      campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
      creatorName: 'Sarah Jenkins',
      creatorHandle: '@creator.official',
      avatarText: 'SJ',
      category: 'Tech & Lifestyle',
      reach: '615,000',
      engagement: '8.7% ER',
      intelligenceScore: 98,
      proposedRate: 65000,
      proposedDays: 10,
      pitch: 'I would love to produce a dedicated 4K on-track running stress test of the new sole technology combined with 2 high-converting Instagram Reels highlighting aesthetic colorways.',
      status: 'AWAITING',
      appliedAt: '20 mins ago',
    },
    {
      id: 'app-2',
      campaignId: 'camp-1',
      campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
      creatorName: 'Aarav Sharma',
      creatorHandle: '@aarav.fitness',
      avatarText: 'AS',
      category: 'Fitness & Athletics',
      reach: '420,000',
      engagement: '6.4% ER',
      intelligenceScore: 95,
      proposedRate: 50000,
      proposedDays: 7,
      pitch: 'I can integrate the running series into my 30-day half marathon training program with real workout footage, cadence comparisons, and a dedicated swipe-up discount code.',
      status: 'AWAITING',
      appliedAt: '2 hours ago',
    },
    {
      id: 'app-3',
      campaignId: 'camp-2',
      campaignTitle: 'Pro Wireless ANC Earbuds Creator Benchmark',
      creatorName: 'Rohan Verma',
      creatorHandle: '@rohan_tech',
      avatarText: 'RV',
      category: 'Consumer Tech',
      reach: '380,000',
      engagement: '5.9% ER',
      intelligenceScore: 93,
      proposedRate: 35000,
      proposedDays: 6,
      pitch: 'Studio decibel isolation benchmark testing against competitors with sound frequency graph overlays and mic clarity samples.',
      status: 'AWAITING',
      appliedAt: 'Yesterday',
    },
  ]);

  // Collabs & 2-Way Workspace State
  const [selectedCollabId, setSelectedCollabId] = useState<string>('collab-brand-1');
  const [collabReplyInput, setCollabReplyInput] = useState<string>('');
  const [collabs, setCollabs] = useState<BrandCollabThread[]>([
    {
      id: 'collab-brand-1',
      campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
      creatorName: 'Sarah Jenkins',
      creatorHandle: '@creator.official',
      deliverableSummary: '1x YouTube Dedicated Review + 2x IG Reels',
      agreedAmount: 65000,
      milestoneStage: 3,
      milestoneName: 'Milestone 2: Draft Video Review',
      escrowFunded: true,
      status: 'DELIVERABLE_SUBMITTED',
      messages: [
        {
          id: 'msg-1',
          sender: 'SYSTEM',
          senderName: 'TIA Platform System',
          text: 'Milestone deposit of ₹65,000 secured in TIA Payment Protection. Agreement activated.',
          date: 'Aug 26, 2026',
          type: 'MILESTONE',
        },
        {
          id: 'msg-2',
          sender: 'CREATOR',
          senderName: 'Sarah Jenkins',
          text: 'Hi Team Nike! I have completed the script and storyboard for the on-track review. Here is the draft video link for review.',
          date: 'Yesterday at 4:30 PM',
          type: 'DELIVERABLE',
          deliverableMeta: {
            title: 'Nike Air Zoom Running Series - 4K Draft Cut',
            url: 'https://drive.google.com/file/d/sample-nike-draft-video/view',
            notes: 'Color grading completed. Timestamps: 0:00 Intro, 1:45 Midsole Cushion Test, 4:20 Long-distance verdict.',
            type: 'DRAFT_VIDEO',
            status: 'PENDING_REVIEW',
          },
        },
      ],
    },
    {
      id: 'collab-brand-2',
      campaignTitle: 'Pro Wireless ANC Earbuds Creator Benchmark',
      creatorName: 'Aarav Sharma',
      creatorHandle: '@aarav.fitness',
      deliverableSummary: '3x Instagram Reels + Bio Link Placement',
      agreedAmount: 45000,
      milestoneStage: 4,
      milestoneName: 'Milestone 3: Live Posts Verified',
      escrowFunded: true,
      status: 'APPROVED',
      messages: [
        {
          id: 'msg-3',
          sender: 'SYSTEM',
          senderName: 'TIA Platform System',
          text: 'Milestone deposit of ₹45,000 secured in TIA Payment Protection.',
          date: 'Aug 24, 2026',
          type: 'MILESTONE',
        },
        {
          id: 'msg-4',
          sender: 'CREATOR',
          senderName: 'Aarav Sharma',
          text: 'All 3 Instagram Reels are live! Verified reach has crossed 88,000 impressions in the first 48 hours.',
          date: 'Aug 28, 2026',
          type: 'DELIVERABLE',
          deliverableMeta: {
            title: 'Live Post Links - boAt Airdopes Pro Launch',
            url: 'https://instagram.com/p/sample-reel-1',
            notes: 'Links placed in Bio and Story Highlights.',
            type: 'LIVE_POST',
            status: 'APPROVED',
          },
        },
      ],
    },
  ]);

  // Financials State
  const [walletBalance, setWalletBalance] = useState<number>(450000);
  const [showAddFundsModal, setShowAddFundsModal] = useState<boolean>(false);
  const [addFundsAmount, setAddFundsAmount] = useState<string>('100000');
  const [addFundsSuccess, setAddFundsSuccess] = useState<boolean>(false);

  const transactionsLedger = [
    {
      id: 'TX-TIA-98214',
      date: 'Aug 28, 2026',
      campaign: 'Pro Wireless ANC Earbuds Creator Benchmark',
      creator: 'Aarav Sharma (@aarav.fitness)',
      grossAmount: 45000,
      tiaFee: 2250, // 5%
      tds: 450, // 1%
      netCreator: 42300,
      status: 'DISBURSED',
      utr: 'HDFC98219482914',
    },
    {
      id: 'TX-TIA-98102',
      date: 'Aug 26, 2026',
      campaign: 'Summer 2026 Running Series & Shoe Launch',
      creator: 'Sarah Jenkins (@creator.official)',
      grossAmount: 65000,
      tiaFee: 3250,
      tds: 650,
      netCreator: 61100,
      status: 'HELD_IN_PROTECTION',
      utr: 'PROTECTED_TIA_ESC',
    },
    {
      id: 'TX-TIA-97840',
      date: 'Aug 20, 2026',
      campaign: 'Lifestyle Audio Ambient Launch',
      creator: 'Priya Kapoor (@priya.lifestyle)',
      grossAmount: 40000,
      tiaFee: 2000,
      tds: 400,
      netCreator: 37600,
      status: 'DISBURSED',
      utr: 'ICIC00291848201',
    },
  ];

  // Settings State
  const [settingsActiveSubTab, setSettingsActiveSubTab] = useState<'profile' | 'team' | 'billing' | 'contracts' | 'notifications' | 'security'>('profile');
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState<boolean>(false);
  const [settingsSavedToast, setSettingsSavedToast] = useState<boolean>(false);

  const handleTabChange = (tab: BrandTabType) => {
    setActiveTab(tab);
    router.replace(`/brand?tab=${tab}`);
  };

  const handleCreateCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignForm.title.trim()) return;

    const newCamp: BrandCampaign = {
      id: `camp-${Date.now()}`,
      title: newCampaignForm.title,
      category: newCampaignForm.category,
      budget: parseInt(newCampaignForm.budget, 10) || 100000,
      spent: 0,
      status: 'PUBLISHED',
      applicationsCount: 0,
      acceptedCount: 0,
      deliverables: newCampaignForm.deliverables,
      deadline: newCampaignForm.deadline,
      stage: 1,
      stageLabel: 'Creator Bidding Open',
    };

    setCampaigns((prev) => [newCamp, ...prev]);
    setShowCreateCampaignModal(false);
    setNewCampaignForm({
      title: '',
      category: 'Consumer Tech',
      budget: '150000',
      deliverables: '1x Dedicated YouTube Video + 2x IG Reels',
      deadline: 'Oct 15, 2026',
      objectives: 'Product Awareness & Click-through conversions',
      targetNiches: 'Tech, Gadgets, Lifestyle',
    });
  };

  const handleAcceptApplicant = (appId: string) => {
    const app = applicants.find((a) => a.id === appId);
    if (!app) return;

    setApplicants((prev) => prev.map((a) => (a.id === appId ? { ...a, status: 'ACCEPTED' } : a)));

    // Create active collab thread
    const newCollab: BrandCollabThread = {
      id: `collab-brand-${Date.now()}`,
      campaignTitle: app.campaignTitle,
      creatorName: app.creatorName,
      creatorHandle: app.creatorHandle,
      deliverableSummary: `${app.campaignTitle} Deal`,
      agreedAmount: app.proposedRate,
      milestoneStage: 2,
      milestoneName: 'Milestone 1: Script & Storyboard',
      escrowFunded: true,
      status: 'IN_PROGRESS',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'SYSTEM',
          senderName: 'TIA Platform System',
          text: `Proposal of ₹${app.proposedRate.toLocaleString('en-IN')} accepted by Brand. 100% milestone payment secured in TIA Payment Protection.`,
          date: 'Just now',
          type: 'MILESTONE',
        },
      ],
    };

    setCollabs((prev) => [newCollab, ...prev]);
    setSelectedCollabId(newCollab.id);
    handleTabChange('workspace');
  };

  const handleSendMessageToCreator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collabReplyInput.trim()) return;

    const newMsg: BrandCollabMessage = {
      id: `msg-${Date.now()}`,
      sender: 'BRAND',
      senderName: orgProfile.name,
      text: collabReplyInput.trim(),
      date: 'Just now',
      type: 'TEXT',
    };

    setCollabs((prev) =>
      prev.map((c) => (c.id === selectedCollabId ? { ...c, messages: [...c.messages, newMsg] } : c))
    );
    setCollabReplyInput('');

    // Simulate creator reply
    setTimeout(() => {
      const creatorReply: BrandCollabMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'CREATOR',
        senderName: collabs.find((c) => c.id === selectedCollabId)?.creatorName || 'Creator',
        text: 'Thank you for the feedback! I am reviewing the revision notes and will upload the updated render shortly.',
        date: 'Just now',
        type: 'TEXT',
      };
      setCollabs((prev) =>
        prev.map((c) => (c.id === selectedCollabId ? { ...c, messages: [...c.messages, creatorReply] } : c))
      );
    }, 1800);
  };

  const handleApproveDeliverable = (collabId: string) => {
    setCollabs((prev) =>
      prev.map((c) => {
        if (c.id === collabId) {
          const approvalMsg: BrandCollabMessage = {
            id: `msg-appr-${Date.now()}`,
            sender: 'BRAND',
            senderName: orgProfile.name,
            text: 'Deliverable approved! 100% milestone payment has been authorized and disbursed to creator account.',
            date: 'Just now',
            type: 'APPROVAL',
          };
          return {
            ...c,
            status: 'SETTLED',
            milestoneStage: 4,
            milestoneName: 'Milestone Completed & Disbursed',
            messages: [...c.messages, approvalMsg],
          };
        }
        return c;
      })
    );
  };

  const handleAddFundsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(addFundsAmount, 10) || 0;
    if (amt <= 0) return;

    setAddFundsSuccess(true);
    setWalletBalance((prev) => prev + amt);
    setTimeout(() => {
      setAddFundsSuccess(false);
      setShowAddFundsModal(false);
    }, 1500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 2500);
  };

  const navTabs = [
    { id: 'campaigns' as BrandTabType, label: 'Campaigns', icon: <BriefcaseIcon size={15} /> },
    { id: 'discovery' as BrandTabType, label: 'Creator Discovery', icon: <CompassIcon size={15} /> },
    { id: 'applications' as BrandTabType, label: 'Bids & Proposals', count: applicants.filter((a) => a.status === 'AWAITING').length, icon: <UsersIcon size={15} /> },
    { id: 'workspace' as BrandTabType, label: 'Active Collabs', count: collabs.length, icon: <MessageSquareIcon size={15} /> },
    { id: 'financials' as BrandTabType, label: 'Financials & Escrow', icon: <CreditCardIcon size={15} /> },
    { id: 'settings' as BrandTabType, label: 'Brand Settings', icon: <SettingsIcon size={15} /> },
  ];

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesStatus = campaignStatusFilter === 'ALL' || c.status === campaignStatusFilter;
    const matchesSearch = c.title.toLowerCase().includes(campaignSearchQuery.toLowerCase()) || c.category.toLowerCase().includes(campaignSearchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredCreators = discoverableCreators.filter((cr) => {
    const matchesSearch = cr.name.toLowerCase().includes(discoverySearchQuery.toLowerCase()) || cr.handle.toLowerCase().includes(discoverySearchQuery.toLowerCase()) || cr.category.toLowerCase().includes(discoverySearchQuery.toLowerCase());
    const matchesCategory = discoveryCategory === 'ALL' || cr.category.toLowerCase().includes(discoveryCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const activeCollab = collabs.find((c) => c.id === selectedCollabId) || collabs[0];

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'inherit', color: '#0F172A', paddingBottom: '80px' }}>
      {/* Design System Scoped CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .brand-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .brand-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .brand-campaigns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 20px;
        }
        .brand-creators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .brand-settings-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 28px;
        }
        @media (max-width: 1024px) {
          .brand-kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .brand-settings-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .brand-container {
            padding: 0 16px !important;
          }
          .brand-kpi-grid {
            grid-template-columns: 1fr !important;
          }
          .brand-collab-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />

      {/* ==================================================================== */}
      {/* 1. TOP HEADER NAVIGATION BAR                                         */}
      {/* ==================================================================== */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
        }}
      >
        <div
          className="brand-container"
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Logo & Enterprise Portal Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link href="/brand" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src="/logo-cropped.png"
                alt="The Influencer's Agency"
                style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
              />
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#0052FF',
                  backgroundColor: '#EFF6FF',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  letterSpacing: '0.04em',
                }}
              >
                ENTERPRISE PORTAL
              </span>
            </Link>

            <div style={{ height: '20px', width: '1px', backgroundColor: '#E2E8F0' }} />

            {/* Org Brand Identity Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>
                {orgProfile.name}
              </span>
              <BlueCheckBadge size={15} title="Verified Enterprise Organization" />
            </div>
          </div>

          {/* Right Header Actions: Quick + Campaign, Balance Chip, Notifications Bell, Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Payment Protection Wallet Balance Chip */}
            <div
              onClick={() => handleTabChange('financials')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#0052FF',
                cursor: 'pointer',
              }}
              title="Click to view Payment Protection wallet & transactions"
            >
              <ShieldCheckIcon size={14} color="#0052FF" />
              <span>Wallet: ₹{walletBalance.toLocaleString('en-IN')}</span>
            </div>

            {/* Quick + Create Campaign Button */}
            <button
              type="button"
              onClick={() => setShowCreateCampaignModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 16px',
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 82, 255, 0.25)',
              }}
            >
              <PlusIcon size={14} color="#FFFFFF" />
              <span>Create Campaign</span>
            </button>

            {/* Realtime Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                title="Notifications"
              >
                <BellIcon size={16} color="#475569" />
                {notifications.some((n) => !n.read) && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#0052FF',
                    }}
                  />
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '46px',
                    right: 0,
                    width: '340px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                    zIndex: 100,
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Enterprise Notifications</span>
                    <button
                      type="button"
                      onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                      style={{ background: 'transparent', border: 'none', fontSize: '11px', color: '#0052FF', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          handleTabChange(notif.tab);
                          setNotificationsDropdownOpen(false);
                        }}
                        style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #F8FAFC',
                          backgroundColor: notif.read ? '#FFFFFF' : '#EFF6FF',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                        }}
                      >
                        <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                          {notif.title}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.4 }}>
                          {notif.message}
                        </div>
                        <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '4px' }}>
                          {notif.timeAgo}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 2. SEGMENTED NAVIGATION TABS                                         */}
      {/* ==================================================================== */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div className="brand-container">
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px', overflowX: 'auto' }}>
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 2px 14px 2px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2.5px solid #0052FF' : '2.5px solid transparent',
                    color: isActive ? '#0052FF' : '#64748B',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 800 : 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ color: isActive ? '#0052FF' : '#94A3B8' }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      style={{
                        backgroundColor: isActive ? '#EFF6FF' : '#E2E8F0',
                        color: isActive ? '#0052FF' : '#475569',
                        fontSize: '10.5px',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: '10px',
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. MAIN DASHBOARD CONTENT AREA                                       */}
      {/* ==================================================================== */}
      <main className="brand-container" style={{ marginTop: '24px' }}>

        {/* ------------------------------------------------------------------ */}
        {/* TAB 1: CAMPAIGNS COMMAND CENTER                                    */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'campaigns' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 4-Card Executive KPI Grid */}
            <div className="brand-kpi-grid">
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Active Campaigns
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>
                  {campaigns.filter((c) => c.status !== 'COMPLETED').length}
                </div>
                <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <CheckIcon size={12} color="#059669" />
                  <span>3 Active in Pipeline</span>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Creator Proposals
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>
                  44
                </div>
                <div style={{ fontSize: '11.5px', color: '#0052FF', fontWeight: 700, marginTop: '4px' }}>
                  +12 Fresh Applications Today
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Protected Budget Spend
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#0052FF', marginTop: '4px' }}>
                  ₹7,80,000
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                  100% TIA Payment Protection
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Verified Human Reach
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>
                  1.42M
                </div>
                <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
                  98.2% BotShield Certified
                </div>
              </div>
            </div>

            {/* Campaign Filters & Search Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              {/* Search Box */}
              <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
                <div style={{ position: 'absolute', left: '12px', top: '11px' }}>
                  <SearchIcon size={15} color="#94A3B8" />
                </div>
                <input
                  type="text"
                  placeholder="Search campaigns by title, category, or objective..."
                  value={campaignSearchQuery}
                  onChange={(e) => setCampaignSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              </div>

              {/* Status Filter Tabs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFFFFF', padding: '4px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                {['ALL', 'PUBLISHED', 'IN_PROGRESS', 'CONTENT_REVIEW'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setCampaignStatusFilter(status)}
                    style={{
                      padding: '5px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: campaignStatusFilter === status ? '#0052FF' : 'transparent',
                      color: campaignStatusFilter === status ? '#FFFFFF' : '#64748B',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {status === 'ALL' ? 'All Campaigns' : status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaigns Grid */}
            <div className="brand-campaigns-grid">
              {filteredCampaigns.map((camp) => (
                <div
                  key={camp.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Top Row: Category + Status Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
                        {camp.category}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          color: camp.status === 'COMPLETED' ? '#059669' : '#0052FF',
                          backgroundColor: camp.status === 'COMPLETED' ? '#ECFDF5' : '#EFF6FF',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {camp.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0', lineHeight: 1.35 }}>
                      {camp.title}
                    </h3>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: '0 0 16px 0' }}>
                      {camp.deliverables}
                    </p>

                    {/* Progress Stage */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                        <span>Stage {camp.stage}/4: {camp.stageLabel}</span>
                        <span>{Math.round((camp.stage / 4) * 100)}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${(camp.stage / 4) * 100}%`, height: '100%', backgroundColor: '#0052FF', borderRadius: '999px' }} />
                      </div>
                    </div>
                  </div>

                  {/* Budget & Applicants Footer */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #F1F5F9', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 700 }}>Total Budget</div>
                        <div style={{ fontSize: '15px', fontWeight: 900, color: '#0F172A' }}>₹{camp.budget.toLocaleString('en-IN')}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 700 }}>Proposals</div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#0052FF' }}>{camp.applicationsCount} Applicants</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleTabChange('applications')}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Review Bids ({camp.applicationsCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTabChange('workspace')}
                        style={{
                          padding: '8px 14px',
                          backgroundColor: '#F1F5F9',
                          color: '#334155',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Workspace
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 2: CREATOR DISCOVERY & INTELLIGENCE ENGINE                      */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'discovery' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Discovery Header & Filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', minWidth: '320px', flex: 1 }}>
                <div style={{ position: 'absolute', left: '12px', top: '11px' }}>
                  <SearchIcon size={15} color="#94A3B8" />
                </div>
                <input
                  type="text"
                  placeholder="Search by creator name, handle, or niche..."
                  value={discoverySearchQuery}
                  onChange={(e) => setDiscoverySearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              </div>

              {/* Category Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
                {['ALL', 'Tech', 'Fitness', 'Lifestyle', 'Gaming'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setDiscoveryCategory(cat)}
                    style={{
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: 700,
                      borderRadius: '8px',
                      border: discoveryCategory === cat ? '1px solid #0052FF' : '1px solid #E2E8F0',
                      backgroundColor: discoveryCategory === cat ? '#EFF6FF' : '#FFFFFF',
                      color: discoveryCategory === cat ? '#0052FF' : '#475569',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cat === 'ALL' ? 'All Niches' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Creators Grid */}
            <div className="brand-creators-grid">
              {filteredCreators.map((creator) => (
                <div
                  key={creator.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '22px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Avatar & Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          fontWeight: 900,
                          flexShrink: 0,
                        }}
                      >
                        {creator.avatarText}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                            {creator.name}
                          </h4>
                          <BlueCheckBadge size={14} title="TIA Verified" />
                        </div>
                        <div style={{ fontSize: '12px', color: '#0052FF', fontWeight: 700 }}>
                          {creator.handle}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                          {creator.category} • {creator.location}
                        </div>
                      </div>
                    </div>

                    <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.45, margin: '0 0 16px 0' }}>
                      {creator.bio}
                    </p>

                    {/* Stats Grid Box */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #F1F5F9', marginBottom: '16px', textAlign: 'center' }}>
                      <div>
                        <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>Audience</div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{creator.totalReach}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>Engagement</div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>{creator.engagementRate}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>Credibility</div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0052FF' }}>{creator.intelligenceScore}/100</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748B', marginBottom: '12px' }}>
                      <span>Starting Package:</span>
                      <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '14px' }}>₹{creator.startingRate.toLocaleString('en-IN')}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedCreatorProfile(creator)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Inspect Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCreateCampaignModal(true);
                        }}
                        style={{
                          padding: '8px 14px',
                          backgroundColor: '#EFF6FF',
                          color: '#0052FF',
                          border: '1px solid #BFDBFE',
                          borderRadius: '8px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Invite
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 3: PROPOSALS & APPLICATIONS PIPELINE                            */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'applications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Inbound Creator Bids & Proposals
                </h2>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                  Review creator pitches, proposed deliverable rates, and fund agreements securely into TIA Payment Protection.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {applicants.map((app) => (
                <div
                  key={app.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '22px 24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#0052FF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
                        {app.avatarText}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A' }}>{app.creatorName}</span>
                          <span style={{ fontSize: '13px', color: '#0052FF', fontWeight: 700 }}>{app.creatorHandle}</span>
                          <BlueCheckBadge size={14} title="Verified" />
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          Campaign: <strong>{app.campaignTitle}</strong> • {app.appliedAt}
                        </div>
                      </div>
                    </div>

                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '10px 0 14px 0', backgroundColor: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                      &ldquo;{app.pitch}&rdquo;
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#64748B' }}>
                      <span>Reach: <strong style={{ color: '#0F172A' }}>{app.reach}</strong></span>
                      <span>•</span>
                      <span>Engagement: <strong style={{ color: '#059669' }}>{app.engagement}</strong></span>
                      <span>•</span>
                      <span>TIA Score: <strong style={{ color: '#0052FF' }}>{app.intelligenceScore}/100</strong></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', minWidth: '180px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>Proposed Rate</div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#0052FF' }}>
                        ₹{app.proposedRate.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        Delivery in {app.proposedDays} business days
                      </div>
                    </div>

                    {app.status === 'ACCEPTED' ? (
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '6px 14px', borderRadius: '8px' }}>
                        ✓ Deal Accepted & Funded
                      </span>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => setApplicants((prev) => prev.map((a) => (a.id === app.id ? { ...a, status: 'DECLINED' } : a)))}
                          style={{
                            padding: '8px 14px',
                            backgroundColor: '#F1F5F9',
                            color: '#475569',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Decline
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAcceptApplicant(app.id)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#0052FF',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(0,82,255,0.25)',
                          }}
                        >
                          Accept & Fund Deal →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 4: ACTIVE COLLABS & DELIVERABLE REVIEW WORKSPACE               */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'workspace' && (
          <div className="brand-collab-split" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'flex-start' }}>
            {/* Left Thread List */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                Active Deals ({collabs.length})
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {collabs.map((c) => {
                  const isSelected = c.id === selectedCollabId;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCollabId(c.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                        border: isSelected ? '1px solid #BFDBFE' : '1px solid #F1F5F9',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 800, color: isSelected ? '#0052FF' : '#0F172A' }}>
                          {c.creatorName}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: c.status === 'SETTLED' ? '#059669' : '#0052FF' }}>
                          ₹{c.agreedAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.campaignTitle}
                      </div>
                      <div style={{ fontSize: '10px', color: isSelected ? '#0052FF' : '#94A3B8', fontWeight: 700, marginTop: '4px' }}>
                        Stage {c.milestoneStage}/4: {c.milestoneName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Chat & Review Workspace */}
            {activeCollab && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                {/* Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9', marginBottom: '18px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {activeCollab.creatorName} ({activeCollab.creatorHandle})
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                      Campaign: <strong>{activeCollab.campaignTitle}</strong> • Deliverable: {activeCollab.deliverableSummary}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldCheckIcon size={13} color="#059669" />
                      <span>Protected Amount: ₹{activeCollab.agreedAmount.toLocaleString('en-IN')}</span>
                    </span>
                  </div>
                </div>

                {/* Milestone Progress Bar */}
                <div style={{ backgroundColor: '#F8FAFC', padding: '12px 16px', borderRadius: '10px', border: '1px solid #F1F5F9', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                    <span>Stage {activeCollab.milestoneStage}/4: {activeCollab.milestoneName}</span>
                    <span style={{ color: '#0052FF' }}>{Math.round((activeCollab.milestoneStage / 4) * 100)}% Completed</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${(activeCollab.milestoneStage / 4) * 100}%`, height: '100%', backgroundColor: '#0052FF', borderRadius: '999px' }} />
                  </div>
                </div>

                {/* Messages Feed */}
                <div style={{ minHeight: '260px', maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px', paddingRight: '6px' }}>
                  {activeCollab.messages.map((msg) => {
                    const isBrand = msg.sender === 'BRAND';
                    const isSystem = msg.sender === 'SYSTEM';

                    if (isSystem) {
                      return (
                        <div key={msg.id} style={{ textAlign: 'center', padding: '8px 12px', backgroundColor: '#EFF6FF', borderRadius: '8px', fontSize: '11.5px', color: '#1E40AF', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <ShieldCheckIcon size={14} color="#0052FF" />
                          <span>{msg.text}</span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={msg.id}
                        style={{
                          alignSelf: isBrand ? 'flex-end' : 'flex-start',
                          maxWidth: '80%',
                          backgroundColor: isBrand ? '#0052FF' : '#F1F5F9',
                          color: isBrand ? '#FFFFFF' : '#0F172A',
                          padding: '12px 16px',
                          borderRadius: '14px',
                          borderBottomRightRadius: isBrand ? '2px' : '14px',
                          borderBottomLeftRadius: isBrand ? '14px' : '2px',
                        }}
                      >
                        <div style={{ fontSize: '11px', fontWeight: 700, color: isBrand ? '#BFDBFE' : '#64748B', marginBottom: '4px' }}>
                          {msg.senderName} • {msg.date}
                        </div>
                        <div style={{ fontSize: '13px', lineHeight: 1.45 }}>{msg.text}</div>

                        {/* Deliverable Review Box if Attached */}
                        {msg.deliverableMeta && (
                          <div style={{ marginTop: '10px', padding: '12px', backgroundColor: isBrand ? 'rgba(255,255,255,0.1)' : '#FFFFFF', borderRadius: '8px', border: isBrand ? '1px solid rgba(255,255,255,0.2)' : '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '12px', fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <VideoCameraIcon size={14} color={isBrand ? '#FFFFFF' : '#0052FF'} />
                              <span>{msg.deliverableMeta.title}</span>
                            </div>
                            <div style={{ fontSize: '11.5px', opacity: 0.85, marginBottom: '8px' }}>
                              {msg.deliverableMeta.notes}
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <a
                                href={msg.deliverableMeta.url}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  padding: '5px 10px',
                                  backgroundColor: isBrand ? '#FFFFFF' : '#0052FF',
                                  color: isBrand ? '#0052FF' : '#FFFFFF',
                                  borderRadius: '6px',
                                  fontSize: '11.5px',
                                  fontWeight: 700,
                                  textDecoration: 'none',
                                }}
                              >
                                Open Deliverable Link ↗
                              </a>
                              {msg.deliverableMeta.status === 'PENDING_REVIEW' && (
                                <button
                                  type="button"
                                  onClick={() => handleApproveDeliverable(activeCollab.id)}
                                  style={{
                                    padding: '5px 12px',
                                    backgroundColor: '#059669',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '11.5px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                  }}
                                >
                                  ✓ Approve & Release Payout
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Send Reply Form */}
                <form onSubmit={handleSendMessageToCreator} style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Type feedback, approve edits, or ask a question..."
                    value={collabReplyInput}
                    onChange={(e) => setCollabReplyInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <SendIcon size={14} color="#FFFFFF" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 5: FINANCIALS & TIA PAYMENT PROTECTION LEDGER                   */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'financials' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Top 4 Financial KPI Stat Cards */}
            <div className="brand-kpi-grid">
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                  Total Committed Budget
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>
                  ₹7,80,000
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                  Across 3 Active Campaigns
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                  Held in Payment Protection
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#0052FF', marginTop: '4px' }}>
                  ₹1,10,000
                </div>
                <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
                  100% Secured in TIA Escrow
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                  Disbursed to Creators
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#059669', marginTop: '4px' }}>
                  ₹85,000
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                  Approved Milestone Payouts
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                  Platform Commission
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>
                  5.00%
                </div>
                <div style={{ fontSize: '11.5px', color: '#0052FF', fontWeight: 700, marginTop: '4px' }}>
                  + 1% TDS Compliant (Sec 194J)
                </div>
              </div>
            </div>

            {/* Wallet Action & Policy Banner */}
            <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '14px', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1E40AF', margin: 0 }}>
                  Available Wallet Balance: ₹{walletBalance.toLocaleString('en-IN')}.00
                </h4>
                <p style={{ fontSize: '12.5px', color: '#3B82F6', margin: '3px 0 0 0' }}>
                  Funds are held in dedicated RBI-compliant accounts and released only when deliverables meet brief requirements.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddFundsModal(true)}
                style={{
                  padding: '9px 18px',
                  backgroundColor: '#0052FF',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,82,255,0.25)',
                }}
              >
                + Add Funds to Wallet
              </button>
            </div>

            {/* Transactions Ledger Table */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Payment Protection Financial Ledger
                </h3>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 700, fontSize: '11.5px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 18px' }}>Tx ID & Date</th>
                      <th style={{ padding: '12px 18px' }}>Campaign & Creator</th>
                      <th style={{ padding: '12px 18px' }}>Gross Budget</th>
                      <th style={{ padding: '12px 18px' }}>5% TIA Fee</th>
                      <th style={{ padding: '12px 18px' }}>Net Creator</th>
                      <th style={{ padding: '12px 18px' }}>Status</th>
                      <th style={{ padding: '12px 18px' }}>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionsLedger.map((tx) => (
                      <tr key={tx.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: 800, color: '#0F172A' }}>{tx.id}</div>
                          <div style={{ fontSize: '11px', color: '#94A3B8' }}>{tx.date}</div>
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: 700, color: '#0F172A' }}>{tx.campaign}</div>
                          <div style={{ fontSize: '11.5px', color: '#0052FF' }}>{tx.creator}</div>
                        </td>
                        <td style={{ padding: '14px 18px', fontWeight: 800, color: '#0F172A' }}>
                          ₹{tx.grossAmount.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '14px 18px', color: '#64748B' }}>
                          ₹{tx.tiaFee.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '14px 18px', fontWeight: 800, color: '#059669' }}>
                          ₹{tx.netCreator.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 800,
                              color: tx.status === 'DISBURSED' ? '#059669' : '#0052FF',
                              backgroundColor: tx.status === 'DISBURSED' ? '#ECFDF5' : '#EFF6FF',
                              padding: '3px 8px',
                              borderRadius: '6px',
                            }}
                          >
                            {tx.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <button
                            type="button"
                            onClick={() => alert(`Downloading official GST Invoice for ${tx.id}...`)}
                            style={{
                              padding: '5px 10px',
                              backgroundColor: '#F1F5F9',
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              color: '#334155',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <DownloadIcon size={12} color="#475569" />
                            <span>Invoice</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 6: ENTERPRISE BRAND ORGANIZATION SETTINGS                      */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'settings' && (
          <div>
            {/* Mobile Hamburger Drawer for Sub-Tabs */}
            <div style={{ display: 'none', marginBottom: '14px' }} className="mobile-settings-toggle">
              <button
                type="button"
                onClick={() => setMobileSettingsOpen(!mobileSettingsOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                <MenuIcon size={16} color="#0052FF" />
                <span>Settings Menu ({settingsActiveSubTab.toUpperCase()})</span>
              </button>
            </div>

            <div className="brand-settings-grid">
              {/* Left Settings Sidebar */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px', height: 'fit-content' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '10px', paddingLeft: '8px' }}>
                  Enterprise Settings
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[
                    { id: 'profile', label: 'Organization Profile', icon: <BriefcaseIcon size={14} /> },
                    { id: 'team', label: 'Team & Permissions', icon: <UsersIcon size={14} /> },
                    { id: 'billing', label: 'Billing & GST Details', icon: <CreditCardIcon size={14} /> },
                    { id: 'contracts', label: 'Contract Standards', icon: <ShieldCheckIcon size={14} /> },
                    { id: 'notifications', label: 'Notification Alerts', icon: <BellIcon size={14} /> },
                    { id: 'security', label: 'Security & API Keys', icon: <SettingsIcon size={14} /> },
                  ].map((sub) => {
                    const isSubActive = settingsActiveSubTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          setSettingsActiveSubTab(sub.id as any);
                          setMobileSettingsOpen(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          backgroundColor: isSubActive ? '#EFF6FF' : 'transparent',
                          color: isSubActive ? '#0052FF' : '#475569',
                          fontSize: '13px',
                          fontWeight: isSubActive ? 800 : 600,
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ color: isSubActive ? '#0052FF' : '#94A3B8' }}>{sub.icon}</span>
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Settings Form Canvas */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '28px 32px' }}>
                {settingsSavedToast && (
                  <div style={{ marginBottom: '16px', padding: '10px 16px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#059669', fontSize: '13px', fontWeight: 700 }}>
                    ✓ Organization settings saved successfully.
                  </div>
                )}

                {/* Sub-Tab 1: Organization Profile */}
                {settingsActiveSubTab === 'profile' && (
                  <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        Organization Profile
                      </h3>
                      <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                        Public corporate details displayed to verified creators on campaign briefs.
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                          Company Legal Name
                        </label>
                        <input
                          type="text"
                          value={orgProfile.name}
                          onChange={(e) => setOrgProfile({ ...orgProfile, name: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                          Brand Tag / Handle
                        </label>
                        <input
                          type="text"
                          value={orgProfile.handle}
                          onChange={(e) => setOrgProfile({ ...orgProfile, handle: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                          Industry & Vertical
                        </label>
                        <input
                          type="text"
                          value={orgProfile.industry}
                          onChange={(e) => setOrgProfile({ ...orgProfile, industry: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                          Corporate Website
                        </label>
                        <input
                          type="text"
                          value={orgProfile.website}
                          onChange={(e) => setOrgProfile({ ...orgProfile, website: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Corporate Headquarters Location
                      </label>
                      <input
                        type="text"
                        value={orgProfile.hqLocation}
                        onChange={(e) => setOrgProfile({ ...orgProfile, hqLocation: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                      />
                    </div>

                    <div style={{ paddingTop: '10px' }}>
                      <button
                        type="submit"
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Save Profile Changes
                      </button>
                    </div>
                  </form>
                )}

                {/* Sub-Tab 2: Team Members */}
                {settingsActiveSubTab === 'team' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                          Team & Brand Members
                        </h3>
                        <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                          Manage marketing leads and reviewers with access to campaign briefs.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Opening member invite modal...')}
                        style={{
                          padding: '7px 14px',
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        + Invite Member
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        { name: 'Sameer Verma', email: 'sameer@nike.co.in', role: 'Brand Admin & Billing', status: 'ACTIVE' },
                        { name: 'Ananya Roy', email: 'ananya@nike.co.in', role: 'Campaign Marketing Lead', status: 'ACTIVE' },
                        { name: 'Vikram Joshi', email: 'vikram@nike.co.in', role: 'Deliverable Reviewer', status: 'ACTIVE' },
                      ].map((m, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                          <div>
                            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>{m.name}</div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>{m.email} • <span style={{ color: '#0052FF', fontWeight: 700 }}>{m.role}</span></div>
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px' }}>
                            {m.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-Tab 3: Billing & GST */}
                {settingsActiveSubTab === 'billing' && (
                  <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        Billing & GST Compliance
                      </h3>
                      <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                        Tax identification for automated monthly GST credit invoices.
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                          GSTIN Identification Number
                        </label>
                        <input
                          type="text"
                          value={orgProfile.gstin}
                          onChange={(e) => setOrgProfile({ ...orgProfile, gstin: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                          Corporate PAN Number
                        </label>
                        <input
                          type="text"
                          value={orgProfile.panNumber}
                          onChange={(e) => setOrgProfile({ ...orgProfile, panNumber: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                        />
                      </div>
                    </div>

                    <div style={{ paddingTop: '10px' }}>
                      <button
                        type="submit"
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Update Tax Information
                      </button>
                    </div>
                  </form>
                )}

                {/* Sub-Tab 4: Contract Standards */}
                {settingsActiveSubTab === 'contracts' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        Standard Contract Guidelines
                      </h3>
                      <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                        Default parameters automatically applied to new creator agreements.
                      </p>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748B' }}>Standard Exclusivity Window</span>
                        <span style={{ fontWeight: 800, color: '#0F172A' }}>30 Days Post-Publish</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748B' }}>Free Script Revisions</span>
                        <span style={{ fontWeight: 800, color: '#0F172A' }}>2 Included Rounds</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748B' }}>Payment Release Trigger</span>
                        <span style={{ fontWeight: 800, color: '#0052FF' }}>Explicit Brand Approval via Portal</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Tab 5 & 6: Notification & Security Placeholders */}
                {(settingsActiveSubTab === 'notifications' || settingsActiveSubTab === 'security') && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        {settingsActiveSubTab === 'notifications' ? 'Real-Time Notification Preferences' : 'Security & Session Management'}
                      </h3>
                      <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                        {settingsActiveSubTab === 'notifications' ? 'Manage email and SMS push alerts for deliverable approvals.' : 'Two-factor authentication and enterprise SSO login controls.'}
                      </p>
                    </div>

                    <div style={{ padding: '14px', backgroundColor: '#EFF6FF', borderRadius: '10px', border: '1px solid #BFDBFE', fontSize: '13px', color: '#1E40AF', fontWeight: 600 }}>
                      ✓ All enterprise security and notification channels are active and monitored by TIA BotShield.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================================================================== */}
      {/* 4. MODAL: CREATE NEW CAMPAIGN STUDIO                                 */}
      {/* ==================================================================== */}
      {showCreateCampaignModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowCreateCampaignModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: '28px 32px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Create New Brand Campaign Brief
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '3px 0 0 0' }}>
                  Publish your brief to verified creators across India with TIA Payment Protection.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateCampaignModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', color: '#94A3B8', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCampaignSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flagship ANC Headphones Product Launch"
                  value={newCampaignForm.title}
                  onChange={(e) => setNewCampaignForm({ ...newCampaignForm, title: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Niche Category
                  </label>
                  <select
                    value={newCampaignForm.category}
                    onChange={(e) => setNewCampaignForm({ ...newCampaignForm, category: e.target.value })}
                    style={{ width: '100%', padding: '9px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="Consumer Tech">Consumer Tech</option>
                    <option value="Fitness & Athletics">Fitness & Athletics</option>
                    <option value="Lifestyle & Wellness">Lifestyle & Wellness</option>
                    <option value="Gaming & Esports">Gaming & Esports</option>
                    <option value="Finance & SaaS">Finance & SaaS</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Total Budget Allocation (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newCampaignForm.budget}
                    onChange={(e) => setNewCampaignForm({ ...newCampaignForm, budget: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Deliverables Required *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1x Dedicated YouTube Review + 2x IG Reels"
                  value={newCampaignForm.deliverables}
                  onChange={(e) => setNewCampaignForm({ ...newCampaignForm, deliverables: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Campaign Objectives & Guidelines
                </label>
                <textarea
                  rows={3}
                  value={newCampaignForm.objectives}
                  onChange={(e) => setNewCampaignForm({ ...newCampaignForm, objectives: e.target.value })}
                  placeholder="Describe your product launch, key talking points, and audience criteria..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateCampaignModal(false)}
                  style={{ padding: '9px 16px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 20px', backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,82,255,0.25)' }}
                >
                  Publish Campaign Brief →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 5. MODAL: ADD FUNDS TO PAYMENT PROTECTION WALLET                     */}
      {/* ==================================================================== */}
      {showAddFundsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowAddFundsModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: '28px 32px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Top-Up Payment Protection Wallet
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '3px 0 0 0' }}>
                  Add funds via Corporate NetBanking, NEFT/RTGS, or Razorpay.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddFundsModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', color: '#94A3B8', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {addFundsSuccess ? (
              <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
                  <CheckIcon size={20} color="#059669" />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#059669', margin: '0 0 4px 0' }}>
                  Funds Added Successfully!
                </h4>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                  ₹{parseInt(addFundsAmount, 10).toLocaleString('en-IN')} has been credited to your TIA Escrow Wallet.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddFundsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Deposit Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={addFundsAmount}
                    onChange={(e) => setAddFundsAmount(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px', fontWeight: 800, color: '#0F172A' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {['50000', '100000', '250000', '500000'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAddFundsAmount(preset)}
                      style={{
                        flex: 1,
                        padding: '6px 4px',
                        backgroundColor: addFundsAmount === preset ? '#EFF6FF' : '#FFFFFF',
                        border: addFundsAmount === preset ? '1px solid #0052FF' : '1px solid #E2E8F0',
                        color: addFundsAmount === preset ? '#0052FF' : '#475569',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      ₹{(parseInt(preset, 10) / 1000)}k
                    </button>
                  ))}
                </div>

                <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #F1F5F9', fontSize: '12px', color: '#64748B' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Platform Settlement:</span>
                    <span style={{ fontWeight: 700, color: '#059669' }}>Instant Penny-Drop Verified</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>GST Credit Invoice:</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>Automated (Sec 194J)</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddFundsModal(false)}
                    style={{ padding: '9px 16px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '9px 20px', backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,82,255,0.25)' }}
                  >
                    Authorize Deposit →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 6. DRAWER: CREATOR PROFILE INSPECTION                                */}
      {/* ==================================================================== */}
      {selectedCreatorProfile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(3px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setSelectedCreatorProfile(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxWidth: '480px',
              height: '100%',
              padding: '28px 24px',
              overflowY: 'auto',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
                  CREATOR INTELLIGENCE DOSSIER
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCreatorProfile(null)}
                  style={{ background: 'transparent', border: 'none', fontSize: '20px', color: '#94A3B8', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#0052FF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 900 }}>
                  {selectedCreatorProfile.avatarText}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {selectedCreatorProfile.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#0052FF', fontWeight: 700 }}>
                    {selectedCreatorProfile.handle}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {selectedCreatorProfile.category} • {selectedCreatorProfile.location}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '20px' }}>
                {selectedCreatorProfile.bio}
              </p>

              {/* BotShield Audit Box */}
              <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <ShieldCheckIcon size={18} color="#059669" />
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>
                    BotShield Audit: {selectedCreatorProfile.botShieldScore} Real Audience
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#065F46' }}>
                  Zero engagement pods or artificial follower anomalies detected across active channels.
                </div>
              </div>

              {/* Demographics & Channels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#64748B' }}>YouTube Channel</span>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>{selectedCreatorProfile.youtubeFollowers} Subscribers</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#64748B' }}>Instagram Profile</span>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>{selectedCreatorProfile.instagramFollowers} Followers</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#64748B' }}>Top Geographic Fit</span>
                  <span style={{ fontWeight: 800, color: '#0052FF' }}>{selectedCreatorProfile.topGeo}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Starting Rate</span>
                  <span style={{ fontWeight: 900, color: '#059669', fontSize: '15px' }}>₹{selectedCreatorProfile.startingRate.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
              <button
                type="button"
                onClick={() => setSelectedCreatorProfile(null)}
                style={{ flex: 1, padding: '10px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                Close Dossier
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCreatorProfile(null);
                  setShowCreateCampaignModal(true);
                }}
                style={{ flex: 1, padding: '10px', backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,82,255,0.25)' }}
              >
                Send Direct Offer →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
