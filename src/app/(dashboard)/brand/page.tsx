'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';
import { CampaignsTab } from '@/components/brand/CampaignsTab';
import { DiscoveryTab } from '@/components/brand/DiscoveryTab';
import { ApplicationsTab } from '@/components/brand/ApplicationsTab';
import { WorkspaceTab } from '@/components/brand/WorkspaceTab';
import { FinancialsTab } from '@/components/brand/FinancialsTab';
import { BrandSettingsTab } from '@/components/brand/BrandSettingsTab';
import { CreateCampaignModal, AddFundsModal, CreatorProfileDrawer } from '@/components/brand/BrandModals';
import { BrandTabType, BrandCampaign, CreatorApplicant, BrandCollabMessage, BrandCollabThread, BrandNotification, BrandOrgProfile, BrandTransaction } from '@/components/brand/types';

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

function BrandDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as BrandTabType) || 'campaigns';

  const [activeTab, setActiveTab] = useState<BrandTabType>(initialTab);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [orgProfile, setOrgProfile] = useState({
    name: 'Brand Workspace',
    handle: '@brand',
    industry: 'Consumer Goods & Lifestyle',
    website: 'https://theinfluencers.agency',
    contactEmail: '',
    hqLocation: 'Mumbai, Maharashtra, India',
    gstin: '29AAAAA0000A1Z5',
    panNumber: 'AAACN1234F',
    verified: true,
  });

  // Load Brand Workspace Session
  useEffect(() => {
    async function loadBrandSession() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data?.user) {
            const user = data.user;
            setCurrentUser(user);
            const orgMembership = user.orgMemberships?.[0];
            const org = orgMembership?.organization;
            const bProfile = org?.brandProfile;

            const finalOrgName = org?.name || bProfile?.companyName || user.name || 'Brand Workspace';
            const finalHandle = `@${finalOrgName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

            setOrgProfile((prev) => ({
              ...prev,
              name: finalOrgName,
              handle: finalHandle,
              industry: bProfile?.industry || org?.businessCategory || prev.industry,
              website: bProfile?.website || prev.website,
              contactEmail: user.email,
              hqLocation: bProfile?.location || user.country || 'India',
            }));
          }
        }
      } catch (err) {
        console.warn('Brand session load note:', err);
      }
    }
    loadBrandSession();
  }, []);

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
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    router.push('/login');
    router.refresh();
  };

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

  const handleAddFundsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(addFundsAmount, 10) || 0;
    if (amt <= 0) return;

    try {
      if (typeof (window as any).Razorpay === 'undefined') {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Razorpay payment SDK'));
          document.head.appendChild(script);
        });
      }

      const res = await fetch('/api/payments/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CREATE_ORDER',
          amount: amt,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.order) {
        throw new Error(data.error || 'Failed to create payment order');
      }

      const activeKey = data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_RQuwNOxotGRMaW';

      const options = {
        key: activeKey,
        amount: data.order.amount,
        currency: data.order.currency || 'INR',
        name: "The Influencer's Agency",
        description: `Deposit to TIA Escrow Protection Wallet`,
        image: '/main-logo-cropped.png',
        order_id: data.order.id,
        handler: async function (response: any) {
          try {
            await fetch('/api/payments/wallet', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'VERIFY_AND_DEPOSIT',
                amount: amt,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
          } catch (verifyErr) {
            console.warn('Payment verify warning:', verifyErr);
          }

          setAddFundsSuccess(true);
          setWalletBalance((prev) => prev + amt);
          setTimeout(() => {
            setAddFundsSuccess(false);
            setShowAddFundsModal(false);
          }, 1500);
        },
        prefill: {
          name: currentUser?.name || orgProfile?.name || 'Brand Admin',
          email: currentUser?.email || 'brand@theinfluencers.agency',
          contact: `+91${(currentUser?.phone || (typeof window !== 'undefined' ? localStorage.getItem('tia_user_phone') : null) || '9820198201').replace(/[^0-9]/g, '').slice(-10) || '9820198201'}`,
          method: 'upi',
        },
        readonly: {
          contact: true,
          email: true,
          name: true,
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: 'Pay instantly via UPI (GPay, PhonePe, Paytm, QR)',
                instruments: [
                  {
                    method: 'upi',
                  },
                ],
              },
            },
            sequence: ['block.upi'],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
        theme: {
          color: '#0052FF',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        alert(`Payment Failed: ${resp.error?.description || 'Transaction cancelled or declined'}`);
      });
      rzp.open();
    } catch (err: any) {
      console.error('Razorpay Deposit Error:', err);
      alert(`Unable to open payment gateway: ${err.message || 'Please try again'}`);
    }
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
    { id: 'financials' as BrandTabType, label: 'Financials & Protection', icon: <CreditCardIcon size={15} /> },
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

            {/* Brand User Profile & Logout Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationsDropdownOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px 4px 5px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 900,
                  }}
                >
                  {orgProfile.name.substring(0, 2).toUpperCase()}
                </div>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', lineHeight: 1.15 }}>
                    {orgProfile.name.split(' ')[0]}
                  </span>
                  <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>
                    Admin
                  </span>
                </div>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '46px',
                    right: 0,
                    width: '270px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                    zIndex: 100,
                    overflow: 'hidden',
                  }}
                >
                  {/* User Identity Header */}
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{orgProfile.name}</span>
                      <BlueCheckBadge size={13} title="Verified" />
                    </div>
                    <div style={{ fontSize: '11px', color: '#0052FF', fontWeight: 700, marginTop: '2px' }}>
                      Enterprise Brand Admin
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                      {orgProfile.contactEmail}
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div style={{ padding: '6px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        handleTabChange('settings');
                        setProfileDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#334155',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <SettingsIcon size={14} color="#64748B" />
                      <span>Organization Settings</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleTabChange('financials');
                        setProfileDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#334155',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <CreditCardIcon size={14} color="#64748B" />
                      <span>Billing & Wallet (₹{walletBalance.toLocaleString('en-IN')})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleTabChange('discovery');
                        setProfileDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#334155',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <CompassIcon size={14} color="#64748B" />
                      <span>Creator Discovery Engine</span>
                    </button>
                  </div>

                  {/* Logout Divider & Button */}
                  <div style={{ padding: '6px', borderTop: '1px solid #F1F5F9' }}>
                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#FEF2F2',
                        color: '#DC2626',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Log Out of Brand Portal</span>
                    </button>
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
        {activeTab === 'campaigns' && (
          <CampaignsTab
            campaigns={campaigns}
            campaignSearchQuery={campaignSearchQuery}
            setCampaignSearchQuery={setCampaignSearchQuery}
            campaignStatusFilter={campaignStatusFilter}
            setCampaignStatusFilter={setCampaignStatusFilter}
            handleTabChange={handleTabChange}
          />
        )}

        {activeTab === 'discovery' && (
          <DiscoveryTab
            discoverySearchQuery={discoverySearchQuery}
            setDiscoverySearchQuery={setDiscoverySearchQuery}
            discoveryCategory={discoveryCategory}
            setDiscoveryCategory={setDiscoveryCategory}
            filteredCreators={filteredCreators}
            setSelectedCreatorProfile={setSelectedCreatorProfile}
            setShowCreateCampaignModal={setShowCreateCampaignModal}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsTab
            applicants={applicants}
            onAccept={handleAcceptApplicant}
            onDecline={(id) => setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'DECLINED' } : a)))}
          />
        )}

        {activeTab === 'workspace' && (
          <WorkspaceTab
            collabs={collabs}
            selectedCollabId={selectedCollabId}
            onSelectCollab={setSelectedCollabId}
            collabReplyInput={collabReplyInput}
            onCollabReplyChange={setCollabReplyInput}
            onSendMessage={handleSendMessageToCreator}
            onApproveDeliverable={handleApproveDeliverable}
          />
        )}

        {activeTab === 'financials' && (
          <FinancialsTab
            walletBalance={walletBalance}
            transactionsLedger={transactionsLedger}
            onOpenAddFunds={() => setShowAddFundsModal(true)}
            onDownloadInvoice={(id) => alert(`Downloading official GST Invoice for ${id}...`)}
          />
        )}

        {activeTab === 'settings' && (
          <BrandSettingsTab
            settingsActiveSubTab={settingsActiveSubTab}
            onSetSubTab={(s) => {
              setSettingsActiveSubTab(s);
              setMobileSettingsOpen(false);
            }}
            mobileSettingsOpen={mobileSettingsOpen}
            onToggleMobileSettings={() => setMobileSettingsOpen(!mobileSettingsOpen)}
            settingsSavedToast={settingsSavedToast}
            orgProfile={orgProfile}
            onOrgProfileChange={setOrgProfile}
            onSaveSettings={handleSaveSettings}
          />
        )}
      </main>

      {/* Modals & Drawers */}
      <CreateCampaignModal
        isOpen={showCreateCampaignModal}
        onClose={() => setShowCreateCampaignModal(false)}
        form={newCampaignForm}
        onFormChange={setNewCampaignForm}
        onSubmit={handleCreateCampaignSubmit}
      />

      <AddFundsModal
        isOpen={showAddFundsModal}
        onClose={() => setShowAddFundsModal(false)}
        amount={addFundsAmount}
        onAmountChange={setAddFundsAmount}
        isSuccess={addFundsSuccess}
        onSubmit={handleAddFundsSubmit}
      />

      <CreatorProfileDrawer
        creator={selectedCreatorProfile}
        onClose={() => setSelectedCreatorProfile(null)}
        onSendOffer={() => {
          setSelectedCreatorProfile(null);
          setShowCreateCampaignModal(true);
        }}
      />
    </div>
  );
}

export default function BrandDashboardPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', color: '#64748B', fontFamily: 'sans-serif', fontSize: '14px' }}>Loading Brand Dashboard...</div>}>
      <BrandDashboardContent />
    </Suspense>
  );
}
