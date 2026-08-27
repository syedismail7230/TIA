'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';

// ============================================================================
// SLEEK VECTOR SVG ICONS (No raw emojis in premium UI)
// ============================================================================

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad" cx="20%" cy="100%" r="130%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="25%" stopColor="#FF543E" />
          <stop offset="50%" stopColor="#C837AB" />
          <stop offset="100%" stopColor="#377424" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ig-linear" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#405DE6" />
          <stop offset="30%" stopColor="#5851DB" />
          <stop offset="50%" stopColor="#833AB4" />
          <stop offset="70%" stopColor="#C13584" />
          <stop offset="85%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#FD1D1D" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-linear)" />
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.75" fill="none" />
      <circle cx="12" cy="12" r="3.25" stroke="#FFFFFF" strokeWidth="1.75" fill="none" />
      <circle cx="15.5" cy="8.5" r="0.85" fill="#FFFFFF" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M9.5 8.5L16 12L9.5 15.5V8.5Z" fill="#FFFFFF" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#000000" />
      <path
        d="M14.5 6C15.2 7.2 16.3 8 17.8 8.1V10.5C16.6 10.5 15.5 10.1 14.5 9.4V14.3C14.5 16.8 12.5 18.8 10 18.8C7.5 18.8 5.5 16.8 5.5 14.3C5.5 11.8 7.5 9.8 10 9.8C10.4 9.8 10.8 9.9 11.2 10V12.4C10.8 12.2 10.4 12.1 10 12.1C8.8 12.1 7.8 13.1 7.8 14.3C7.8 15.5 8.8 16.5 10 16.5C11.2 16.5 12.2 15.5 12.2 14.3V6H14.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#0F172A" />
      <path
        d="M15.8 6.5H17.6L13.7 10.9L18.3 17.5H14.7L11.8 13.7L8.6 17.5H6.8L11 12.7L6.5 6.5H10.2L12.8 10.1L15.8 6.5ZM15.2 16.4H16.2L9.7 7.5H8.6L15.2 16.4Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#E60023" />
      <path
        d="M12 5.5C8.4 5.5 5.5 8.4 5.5 12C5.5 14.8 7.2 17.1 9.7 18C9.6 17.5 9.6 16.6 9.7 16.1C9.8 15.6 10.6 12.2 10.6 12.2C10.6 12.2 10.4 11.7 10.4 11C10.4 9.9 11 9.1 11.8 9.1C12.5 9.1 12.8 9.6 12.8 10.2C12.8 10.9 12.3 11.9 12.1 12.9C11.9 13.8 12.6 14.5 13.5 14.5C15.1 14.5 16.4 12.8 16.4 10.4C16.4 8.3 14.9 6.8 12.2 6.8C9.1 6.8 7.3 9.1 7.3 11.7C7.3 12.6 7.7 13.6 8.1 14.1C8.2 14.2 8.2 14.3 8.1 14.5C8 14.8 7.8 15.6 7.7 15.8C7.6 16 7.4 16.1 7.2 16C5.8 15.4 4.9 13.4 4.9 11.6C4.9 8.1 7.5 5 12.3 5C16.2 5 19.1 7.8 19.1 11.5C19.1 15.3 16.7 18.3 13.3 18.3C12.2 18.3 11.2 17.7 10.8 17C10.8 17 10.1 19.7 10 20.2C9.8 20.9 9.3 21.8 8.9 22.4C9.9 22.7 10.9 22.9 12 22.9C17.5 22.9 22 18.4 22 12.9C22 7.4 17.5 5.5 12 5.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function TwitchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#9146FF" />
      <path
        d="M6 6H18V14.5L14.5 18H11.5L9.5 20V18H6V6ZM16.5 13.5V7.5H15V13.5H16.5ZM13 13.5V7.5H11.5V13.5H13Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function SparklesIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" />
      <circle cx="12" cy="12" r="4" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

function TagIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function GlobePinIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function CheckCircleIcon({ size = 16, color = '#059669' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.15" />
      <path d="M8 12.5L10.5 15L16 9.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoCircleIcon({ size = 16, color = '#D97706' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.15" />
      <path d="M12 8V8.01M12 11V16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

type TabType = 'marketplace' | 'collabs' | 'payments' | 'social-media' | 'settings';
type CollabFilter = 'awaiting' | 'accepted' | 'rejected';

function CreatorPortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabType) || 'marketplace';

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [collabFilter, setCollabFilter] = useState<CollabFilter>('awaiting');
  const [selectedCollabId, setSelectedCollabId] = useState<string>('collab-1');
  const [collabSubTab, setCollabSubTab] = useState<'messages' | 'campaign' | 'deliverables' | 'notes'>('messages');
  const [replyMessage, setReplyMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [cashoutSuccess, setCashoutSuccess] = useState(false);

  // Social accounts state (synced with live OAuth)
  const [socialAccounts, setSocialAccounts] = useState<any[]>([
    { platform: 'INSTAGRAM', username: 'creator.official', audienceSize: 320000, engagementRate: 4.85, connected: true },
    { platform: 'YOUTUBE', username: 'creatortech', audienceSize: 185000, engagementRate: 6.2, connected: true },
    { platform: 'TIKTOK', username: '', audienceSize: 0, engagementRate: 0, connected: false },
    { platform: 'X', username: 'creator_x', audienceSize: 45000, engagementRate: 2.1, connected: true },
  ]);

  // High-Resolution Curated Campaign Imagery & Cards
  const [campaigns] = useState<any[]>([
    {
      id: 'camp-1',
      title: 'EcoVibe Sustainable Living Challenge',
      brandName: 'EcoVibe Global',
      brandInitials: 'EV',
      bannerImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 10%',
      categories: ['Sustainability', 'Cooking', 'Food', '+5'],
      isNew: true,
      requirementMet: true,
      language: 'English',
      country: 'India',
      countryCode: 'IN',
      socials: ['INSTAGRAM', 'TIKTOK', 'YOUTUBE'],
      budgetMinor: 3500000,
      description: 'Create 2x Instagram Reels showcasing zero-waste kitchen lifestyle habits and authentic sustainable cooking tips.',
    },
    {
      id: 'camp-2',
      title: 'Festive Season Artisan Snack Unboxing',
      brandName: 'Nectar Bites',
      brandInitials: 'NB',
      bannerImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 12%',
      categories: ['Festivals', 'Food', 'Lifestyle', '+2'],
      isNew: true,
      requirementMet: true,
      language: 'English',
      country: 'India',
      countryCode: 'IN',
      socials: ['INSTAGRAM', 'PINTEREST', 'TIKTOK', 'YOUTUBE'],
      budgetMinor: 4500000,
      description: 'Review artisan gift hampers and holiday snack collections with dedicated link-in-bio attribution.',
    },
    {
      id: 'camp-3',
      title: 'Bio-Active Herbal Vitality Booster Launch',
      brandName: 'PureBotanics Co.',
      brandInitials: 'PB',
      bannerImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 20%',
      categories: ['Entrepreneurship', 'Dietary Supplements'],
      isNew: true,
      requirementMet: false,
      requirementNote: 'Requires 500k+ YouTube Subscribers',
      language: 'English',
      country: 'United States',
      countryCode: 'US',
      socials: ['INSTAGRAM', 'TIKTOK'],
      budgetMinor: 6000000,
      description: '30-day morning routine vlog integration featuring clean herbal extracts and lab-tested purity certificates.',
    },
    {
      id: 'camp-4',
      title: 'Nexus X1 Ultra 4K Camera Showcase',
      brandName: 'Nexus Tech Global',
      brandInitials: 'NX',
      bannerImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      commercialType: 'FLAT_FEE',
      commercialLabel: 'Flat Fee ₹45,000',
      categories: ['Technology', 'Gadgets', 'AI', '+3'],
      isNew: false,
      requirementMet: true,
      language: 'English',
      country: 'India',
      countryCode: 'IN',
      socials: ['YOUTUBE', 'INSTAGRAM'],
      budgetMinor: 4500000,
      description: 'Dedicated 8-10 minute review emphasizing low-light camera sensor performance and AI editing capabilities.',
    },
    {
      id: 'camp-5',
      title: 'Velocity Pro Marathon Performance Shoe',
      brandName: 'Stride Athletics',
      brandInitials: 'SA',
      bannerImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      commercialType: 'FLAT_FEE',
      commercialLabel: 'Flat Fee ₹30,000',
      categories: ['Fitness', 'Running', 'Athleisure'],
      isNew: true,
      requirementMet: true,
      language: 'English',
      country: 'India',
      countryCode: 'IN',
      socials: ['INSTAGRAM', 'TIKTOK'],
      budgetMinor: 3000000,
      description: 'High-energy running montage with direct swipe-up discount code for community followers.',
    },
    {
      id: 'camp-6',
      title: 'GlowHydra Ceramide Overnight Recovery Cream',
      brandName: 'LuxeDerm Skin Labs',
      brandInitials: 'LD',
      bannerImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 15%',
      categories: ['Beauty', 'Skincare', 'Self-Care'],
      isNew: false,
      requirementMet: true,
      language: 'English',
      country: 'Global',
      countryCode: 'GL',
      socials: ['INSTAGRAM', 'YOUTUBE', 'TIKTOK'],
      budgetMinor: 2500000,
      description: '7-day nighttime skin transformation diary with macro camera closeups.',
    },
  ]);

  // Collabs and Inbox Threads
  const [collabs, setCollabs] = useState<any[]>([
    {
      id: 'collab-1',
      campaignTitle: 'Affiliation Program',
      subject: 'Holiday Creator Campaign Partnership',
      brandName: 'Nexus Tech Global',
      brandInitials: 'NX',
      status: 'ACCEPTED',
      appliedAt: 'Oct 26, 2026',
      proposedRate: '₹45,000',
      deliverables: '1x Dedicated YouTube Review, 2x IG Reels',
      unreadCount: 2,
      messages: [
        {
          id: 'msg-1',
          sender: 'BRAND',
          senderName: 'Alan W. (Brand Manager)',
          badge: 'Application Form',
          badgeColor: '#D97706',
          badgeBg: '#FEF3C7',
          date: 'Oct 26, 2026 - 11:22 AM',
          text: 'Hey! We are currently recruiting verified creators for our flagship smartphone launch and love your camera review content!',
        },
        {
          id: 'msg-2',
          sender: 'CREATOR',
          senderName: 'You',
          date: 'Oct 27, 2026 - 02:15 PM',
          text: 'Hi Alan, it would be a pleasure! I have reviewed the deliverable brief. My first draft will be ready by end of next week.',
        },
        {
          id: 'msg-3',
          sender: 'BRAND',
          senderName: 'Alan W. (Brand Manager)',
          badge: 'Product Shipment',
          badgeColor: '#059669',
          badgeBg: '#ECFDF5',
          date: 'Oct 28, 2026 - 10:40 AM',
          text: 'Awesome! Tracking ID #NX-998241 has been dispatched. Let us know when the package arrives safely.',
        },
        {
          id: 'msg-4',
          sender: 'BRAND',
          senderName: 'Alan W. (Brand Manager)',
          badge: 'Publication Instructions',
          badgeColor: '#0052FF',
          badgeBg: '#EFF6FF',
          date: 'Oct 30, 2026 - 04:10 PM',
          text: 'First draft looks brilliant! Please use the tracking link in the video description and mention the launch hashtag #NexusX1Ultra.',
        },
      ],
    },
    {
      id: 'collab-2',
      campaignTitle: 'Spring Campaign',
      subject: 'Aurora Hydra Skincare Collaboration',
      brandName: 'Aurora Organics',
      brandInitials: 'AO',
      status: 'AWAITING',
      appliedAt: 'Oct 28, 2026',
      proposedRate: '₹30,000',
      deliverables: '2x Instagram Reels, 3x Story Frame Sets',
      unreadCount: 1,
      messages: [
        {
          id: 'msg-21',
          sender: 'BRAND',
          senderName: 'Laura B. (Campaign Lead)',
          badge: 'Application Form',
          badgeColor: '#D97706',
          badgeBg: '#FEF3C7',
          date: 'Oct 28, 2026 - 09:30 AM',
          text: 'Hi! We received your proposal and our marketing team is reviewing your audience demographic match.',
        },
      ],
    },
    {
      id: 'collab-3',
      campaignTitle: 'Black Friday Mega Deals',
      subject: 'Stride Athletics Marathon Launch',
      brandName: 'Stride Athletics',
      brandInitials: 'SA',
      status: 'ACCEPTED',
      appliedAt: 'Oct 29, 2026',
      proposedRate: '₹35,000',
      deliverables: '1x YouTube Short + Community Post',
      unreadCount: 0,
      messages: [
        {
          id: 'msg-31',
          sender: 'BRAND',
          senderName: 'Nathan R. (Partnerships)',
          badge: 'Payment Disbursed',
          badgeColor: '#059669',
          badgeBg: '#ECFDF5',
          date: 'Oct 29, 2026 - 06:15 PM',
          text: 'Thank you! We have released Milestone 1 payment of ₹35,000 through TIA Escrow.',
        },
      ],
    },
  ]);

  // Financial Ledger
  const [payments, setPayments] = useState<any[]>([
    {
      id: 'tx-101',
      mediaName: 'Paul Homes',
      initials: 'PH',
      campaign: 'Winter Fashion 2026',
      amount: '₹25,000',
      authorizedAt: 'Aug 20, 2026',
      status: 'UNCLAIMED',
    },
    {
      id: 'tx-102',
      mediaName: 'Nathalie Case',
      initials: 'NC',
      campaign: 'Beach Collection Summer',
      amount: '₹32,800',
      authorizedAt: 'Aug 18, 2026',
      status: 'PAID',
    },
    {
      id: 'tx-103',
      mediaName: 'Marcus Vance',
      initials: 'MV',
      campaign: 'Tech Gadget Launch',
      amount: '₹56,000',
      authorizedAt: 'Aug 14, 2026',
      status: 'PAID',
    },
    {
      id: 'tx-104',
      mediaName: 'Elena Rostova',
      initials: 'ER',
      campaign: 'Fitness Energy Drink',
      amount: '₹18,500',
      authorizedAt: 'Aug 10, 2026',
      status: 'PENDING',
    },
    {
      id: 'tx-105',
      mediaName: 'David Kumar',
      initials: 'DK',
      campaign: 'Wireless ANC Headphones',
      amount: '₹42,000',
      authorizedAt: 'Aug 05, 2026',
      status: 'PAID',
    },
  ]);

  // Load User Session
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user);
        }
      } catch (err) {
        console.warn('Session load note:', err);
      }
    }
    loadUser();
  }, []);

  // Listen for real OAuth messages
  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      if (event.data?.type === 'TIA_SOCIAL_CONNECTED') {
        const { platform, profile } = event.data;
        setSocialAccounts((prev) =>
          prev.map((acc) =>
            acc.platform === platform
              ? {
                  ...acc,
                  username: profile.username || acc.username,
                  audienceSize: profile.audienceSize || acc.audienceSize,
                  engagementRate: profile.engagementRate || acc.engagementRate,
                  connected: true,
                }
              : acc
          )
        );
        setConnectingPlatform(null);
      }
    };
    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    router.replace(`/creator?tab=${tab}`);
  };

  const handleConnectOAuth = (platform: string) => {
    setConnectingPlatform(platform);
    const popupUrl = `/api/connectors/${platform.toLowerCase()}/auth?flow=onboarding&role=CREATOR`;
    const popup = window.open(
      popupUrl,
      `TIA_CONNECT_${platform}`,
      'width=600,height=750,scrollbars=yes,status=yes'
    );

    const checkTimer = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkTimer);
        setConnectingPlatform(null);
      }
    }, 1000);
  };

  const handleDisconnect = (platform: string) => {
    setSocialAccounts((prev) =>
      prev.map((acc) =>
        acc.platform === platform ? { ...acc, connected: false, username: '' } : acc
      )
    );
  };

  const handleApply = (campaign: any) => {
    setSelectedCampaign(campaign);
    setApplySuccess(false);
  };

  const submitApplication = () => {
    if (!selectedCampaign) return;
    setCollabs((prev) => [
      {
        id: `collab-${Date.now()}`,
        campaignTitle: selectedCampaign.title,
        subject: selectedCampaign.title,
        brandName: selectedCampaign.brandName,
        brandInitials: selectedCampaign.brandInitials,
        status: 'AWAITING',
        appliedAt: 'Just now',
        proposedRate: selectedCampaign.commercialLabel,
        deliverables: selectedCampaign.description,
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'CREATOR',
            senderName: 'You',
            badge: 'Application Form',
            badgeColor: '#D97706',
            badgeBg: '#FEF3C7',
            date: 'Just now',
            text: `Submitted proposal for ${selectedCampaign.title}. Ready to produce high-impact deliverables.`,
          },
        ],
      },
      ...prev,
    ]);
    setApplySuccess(true);
    setTimeout(() => {
      setSelectedCampaign(null);
      setApplySuccess(false);
      handleTabChange('collabs');
    }, 1200);
  };

  const handleClaimPayout = (txId: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === txId ? { ...p, status: 'PAID' } : p))
    );
    setClaimSuccess(true);
    setTimeout(() => setClaimSuccess(false), 3000);
  };

  const handleInstantCashout = () => {
    setCashoutSuccess(true);
    setTimeout(() => setCashoutSuccess(false), 3500);
  };

  const handleSendMessage = () => {
    if (!replyMessage.trim()) return;
    setCollabs((prev) =>
      prev.map((c) =>
        c.id === selectedCollabId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: `msg-${Date.now()}`,
                  sender: 'CREATOR',
                  senderName: 'You',
                  date: 'Just now',
                  text: replyMessage,
                },
              ],
            }
          : c
      )
    );
    setReplyMessage('');
  };

  const selectedCollab = collabs.find((c) => c.id === selectedCollabId) || collabs[0];
  const displayName =
    currentUser?.name ||
    (currentUser?.email ? currentUser.email.split('@')[0] : 'Creator');

  const renderSocialIcon = (platform: string, size = 16) => {
    switch (platform) {
      case 'INSTAGRAM':
        return <InstagramIcon size={size} />;
      case 'YOUTUBE':
        return <YouTubeIcon size={size} />;
      case 'TIKTOK':
        return <TikTokIcon size={size} />;
      case 'X':
        return <XIcon size={size} />;
      case 'PINTEREST':
        return <PinterestIcon size={size} />;
      case 'TWITCH':
        return <TwitchIcon size={size} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'inherit' }}>
      {/* Top Header Navigation Bar */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo & Navigation Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <Link
              href="/creator"
              style={{
                fontSize: '22px',
                fontWeight: 900,
                color: '#0052FF',
                textDecoration: 'none',
                letterSpacing: '-0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>TIA</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#0052FF',
                  backgroundColor: '#EFF6FF',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  letterSpacing: '0.04em',
                }}
              >
                PORTAL
              </span>
            </Link>

            <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[
                { id: 'marketplace', label: 'Marketplace' },
                { id: 'collabs', label: 'Collabs' },
                { id: 'payments', label: 'Payments' },
                { id: 'social-media', label: 'Social Media' },
                { id: 'settings', label: 'Settings' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id as TabType)}
                    style={{
                      padding: '20px 18px',
                      fontSize: '14px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#0052FF' : '#475569',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: isActive ? '3px solid #0052FF' : '3px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      outline: 'none',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Profile & Sign Out */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13.5px', color: '#1E293B', fontWeight: 600 }}>
                {currentUser?.email || 'creator@tia.agency'}
              </span>
              <BlueCheckBadge size={16} title="Verified Creator" />
            </div>

            <button
              type="button"
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST' });
                router.push('/login');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                color: '#64748B',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              <span>Logout</span>
              <ArrowRightIcon size={12} color="#64748B" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '28px 24px' }}>
        {/* ==================================================================== */}
        {/* TAB 1: MARKETPLACE DISCOVERY                                         */}
        {/* ==================================================================== */}
        {activeTab === 'marketplace' && (
          <div>
            {/* Mesh Gradient Search Banner with Floating Platform Icons */}
            <div
              style={{
                background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #F5F3FF 100%)',
                border: '1px solid #C7D2FE',
                borderRadius: '16px',
                padding: '28px 36px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', zIndex: 2 }}>
                {/* Floating Social Circles Cluster */}
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '64px', height: '64px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                    }}
                  >
                    <InstagramIcon size={28} />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 4,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                    }}
                  >
                    <YouTubeIcon size={28} />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: 18,
                      bottom: 0,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                    }}
                  >
                    <TikTokIcon size={28} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1E1B4B', margin: 0 }}>
                      We&apos;re actively searching for your perfect campaign!
                    </h2>
                    <SparklesIcon size={18} color="#4F46E5" />
                  </div>
                  <p style={{ fontSize: '14px', color: '#4338CA', margin: 0, lineHeight: 1.4 }}>
                    The more socials you link, the better the chances of finding the right fit for your audience and style!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleTabChange('social-media')}
                style={{
                  backgroundColor: '#0052FF',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 82, 255, 0.35)',
                  zIndex: 2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 0.15s ease',
                }}
              >
                <span>Connect Socials</span>
                <ArrowRightIcon size={13} color="#FFFFFF" />
              </button>
            </div>

            {/* Section Heading */}
            <div style={{ marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: '#EFF6FF',
                  color: '#0052FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TagIcon size={16} color="#0052FF" />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Keep growing, and these could be yours soon!
              </h3>
            </div>

            {/* Premium Campaign Discovery Grid with High-Res Photography */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '24px',
              }}
            >
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {/* Photo Banner with Gradient Overlay */}
                  <div
                    style={{
                      height: '150px',
                      backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.65) 100%), url(${camp.bannerImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Frosted Glassmorphism Commercial Pill */}
                    <div
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(10px)',
                        color: camp.commercialType === 'FLAT_FEE' ? '#B45309' : '#6D28D9',
                        padding: '5px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <TagIcon size={12} color={camp.commercialType === 'FLAT_FEE' ? '#B45309' : '#6D28D9'} />
                      <span>{camp.commercialLabel}</span>
                    </div>

                    {/* Brand Initials Avatar */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-22px',
                        left: '20px',
                        width: '52px',
                        height: '52px',
                        backgroundColor: '#0F172A',
                        color: '#FFFFFF',
                        border: '3px solid #FFFFFF',
                        borderRadius: '12px',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 900,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {camp.brandInitials}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '30px 22px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Brand Name & Categories */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>
                        {camp.brandName}
                      </span>
                      {camp.categories.map((cat: string, idx: number) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#475569',
                            backgroundColor: '#F1F5F9',
                            padding: '3px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Campaign Title & New Badge */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.35 }}>
                        {camp.title}
                      </h4>
                      {camp.isNew && (
                        <span
                          style={{
                            backgroundColor: '#EFF6FF',
                            color: '#0052FF',
                            fontSize: '10.5px',
                            fontWeight: 800,
                            padding: '3px 6px',
                            borderRadius: '4px',
                            whiteSpace: 'nowrap',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          <SparklesIcon size={11} color="#0052FF" />
                          <span>New</span>
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px 0', lineHeight: 1.45, flex: 1 }}>
                      {camp.description}
                    </p>

                    {/* Requirement Evaluation Section */}
                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', marginBottom: '16px' }}>
                      <div style={{ marginBottom: '12px' }}>
                        {camp.requirementMet ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '12.5px', fontWeight: 700 }}>
                            <CheckCircleIcon size={15} color="#059669" />
                            <span>Requirements Met</span>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontSize: '12.5px', fontWeight: 700 }}>
                            <InfoCircleIcon size={15} color="#D97706" />
                            <span>{camp.requirementNote || 'Requirement not met'}</span>
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#475569' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Language:</span>
                          <span style={{ fontWeight: 600, color: '#1E293B' }}>{camp.language}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <GlobePinIcon size={13} color="#94A3B8" />
                            <span>Country:</span>
                          </span>
                          <span style={{ fontWeight: 600, color: '#1E293B' }}>
                            {camp.country} ({camp.countryCode})
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Socials:</span>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            {camp.socials.map((s: string) => (
                              <div key={s} title={s}>
                                {renderSocialIcon(s, 18)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApply(camp)}
                      style={{
                        width: '100%',
                        backgroundColor: '#0052FF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '12px',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(0, 82, 255, 0.25)',
                      }}
                    >
                      <span>View Brief & Apply</span>
                      <ArrowRightIcon size={13} color="#FFFFFF" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: COLLABS & MULTI-PANE MESSAGING                                */}
        {/* ==================================================================== */}
        {activeTab === 'collabs' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              {[
                { id: 'awaiting', label: 'Awaiting', count: collabs.filter((c) => c.status === 'AWAITING').length },
                { id: 'accepted', label: 'Accepted', count: collabs.filter((c) => c.status === 'ACCEPTED').length },
                { id: 'rejected', label: 'Rejected', count: collabs.filter((c) => c.status === 'REJECTED').length },
              ].map((pill) => {
                const isActive = collabFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setCollabFilter(pill.id as CollabFilter)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      backgroundColor: isActive ? '#EFF6FF' : '#FFFFFF',
                      color: isActive ? '#0052FF' : '#475569',
                      border: isActive ? '1px solid #93C5FD' : '1px solid #E2E8F0',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>{pill.label}</span>
                    <span style={{ fontSize: '11px', opacity: 0.8 }}>({pill.count})</span>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '320px 1fr',
                minHeight: '620px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              }}
            >
              {/* Left Pane: Collaboration List */}
              <div style={{ borderRight: '1px solid #E2E8F0', backgroundColor: '#FAFAFA' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #E2E8F0', fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                  Campaign Threads ({collabs.length})
                </div>

                <div style={{ overflowY: 'auto' }}>
                  {collabs.map((c) => {
                    const isSelected = c.id === selectedCollabId;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setSelectedCollabId(c.id)}
                        style={{
                          padding: '16px',
                          borderBottom: '1px solid #F1F5F9',
                          backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: 800, color: isSelected ? '#0052FF' : '#0F172A' }}>
                            {c.campaignTitle}
                          </span>
                          <span style={{ fontSize: '11px', color: '#94A3B8' }}>{c.appliedAt}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 700, color: '#0F172A' }}>{c.brandInitials}</span>
                          <span>•</span>
                          <span>{c.brandName}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Pane: Thread & Deliverables */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                      {selectedCollab.subject || selectedCollab.campaignTitle}
                    </h3>
                    <div style={{ fontSize: '12.5px', color: '#64748B' }}>
                      {selectedCollab.brandName} • Budget {selectedCollab.proposedRate}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['messages', 'campaign', 'deliverables', 'notes'].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setCollabSubTab(tab as any)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '12.5px',
                          fontWeight: collabSubTab === tab ? 700 : 500,
                          backgroundColor: collabSubTab === tab ? '#0052FF' : '#F1F5F9',
                          color: collabSubTab === tab ? '#FFFFFF' : '#475569',
                          border: 'none',
                          cursor: 'pointer',
                          textTransform: 'capitalize',
                        }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {selectedCollab.messages.map((msg: any) => {
                    const isCreator = msg.sender === 'CREATOR';
                    return (
                      <div
                        key={msg.id}
                        style={{
                          backgroundColor: isCreator ? '#EFF6FF' : '#FFFFFF',
                          border: isCreator ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                          borderRadius: '12px',
                          padding: '18px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>
                              {msg.senderName}
                            </span>
                            {msg.badge && (
                              <span
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  backgroundColor: msg.badgeBg,
                                  color: msg.badgeColor,
                                  padding: '2px 8px',
                                  borderRadius: '12px',
                                }}
                              >
                                {msg.badge}
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>{msg.date}</span>
                        </div>

                        <p style={{ fontSize: '13.5px', color: '#334155', margin: 0, lineHeight: 1.5 }}>
                          {msg.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', display: 'flex', gap: '12px' }}>
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your reply to brand manager..."
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13.5px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    style={{
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: PAYMENTS & OVERPAY FINTECH WALLET                             */}
        {/* ==================================================================== */}
        {activeTab === 'payments' && (
          <div>
            {claimSuccess && (
              <div
                style={{
                  backgroundColor: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#065F46',
                  padding: '14px 20px',
                  borderRadius: '10px',
                  marginBottom: '24px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                }}
              >
                ✓ Payout claimed successfully! Transferred directly to your bank balance.
              </div>
            )}

            {cashoutSuccess && (
              <div
                style={{
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #93C5FD',
                  color: '#1E3A8A',
                  padding: '14px 20px',
                  borderRadius: '10px',
                  marginBottom: '24px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                }}
              >
                ✓ TIA Instant Escrow Cash Out Initiated! ₹80,000 sent via Stripe Direct Deposit.
              </div>
            )}

            {/* Top 3 Financial KPI Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                marginBottom: '32px',
              }}
            >
              {/* Total Received */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 900,
                  }}
                >
                  ₹
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                    Total received
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>
                    ₹2,53,450.00
                  </div>
                </div>
              </div>

              {/* Total Pending */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#FEF3C7',
                    color: '#D97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 900,
                  }}
                >
                  ⏳
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                    Total pending
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>
                    ₹59,520.45
                  </div>
                </div>
              </div>

              {/* Total Unclaimed */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#EFF6FF',
                    color: '#0052FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 900,
                  }}
                >
                  ⏱
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                    Total unclaimed
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#0052FF', marginTop: '2px' }}>
                    ₹1,23,560.70
                  </div>
                </div>
              </div>
            </div>

            {/* Layout Grid: Transactions Table + TIA Pay Cashout Widget */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'flex-start' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '12px', fontWeight: 700, color: '#64748B' }}>
                      <th style={{ padding: '14px 20px' }}>Media Name</th>
                      <th style={{ padding: '14px 20px' }}>Campaign</th>
                      <th style={{ padding: '14px 20px' }}>Amount</th>
                      <th style={{ padding: '14px 20px' }}>Authorized at</th>
                      <th style={{ padding: '14px 20px' }}>Status</th>
                      <th style={{ padding: '14px 20px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => {
                      const isUnclaimed = p.status === 'UNCLAIMED';
                      const isPaid = p.status === 'PAID';
                      return (
                        <tr
                          key={p.id}
                          style={{
                            borderBottom: '1px solid #F1F5F9',
                            fontSize: '13.5px',
                            transition: 'background 0.15s',
                          }}
                        >
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  backgroundColor: '#0F172A',
                                  color: '#FFFFFF',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '12px',
                                  fontWeight: 800,
                                }}
                              >
                                {p.initials}
                              </div>
                              <span style={{ fontWeight: 800, color: '#0F172A' }}>{p.mediaName}</span>
                            </div>
                          </td>

                          <td style={{ padding: '16px 20px', color: '#475569', fontWeight: 500 }}>
                            {p.campaign}
                          </td>

                          <td style={{ padding: '16px 20px', fontWeight: 800, color: '#0052FF' }}>
                            {p.amount}
                          </td>

                          <td style={{ padding: '16px 20px', color: '#64748B', fontSize: '12.5px' }}>
                            {p.authorizedAt}
                          </td>

                          <td style={{ padding: '16px 20px' }}>
                            <span
                              style={{
                                fontSize: '11.5px',
                                fontWeight: 700,
                                padding: '4px 12px',
                                borderRadius: '20px',
                                backgroundColor: isPaid ? '#ECFDF5' : isUnclaimed ? '#F1F5F9' : '#FEF3C7',
                                color: isPaid ? '#059669' : isUnclaimed ? '#475569' : '#D97706',
                              }}
                            >
                              {p.status}
                            </span>
                          </td>

                          <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                            {isUnclaimed ? (
                              <button
                                type="button"
                                onClick={() => handleClaimPayout(p.id)}
                                style={{
                                  backgroundColor: '#0052FF',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '6px 14px',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                }}
                              >
                                Claim!
                              </button>
                            ) : (
                              <button
                                type="button"
                                style={{
                                  backgroundColor: '#FFFFFF',
                                  color: '#0F172A',
                                  border: '1px solid #CBD5E1',
                                  borderRadius: '6px',
                                  padding: '6px 12px',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                              >
                                <span>View</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div
                  style={{
                    backgroundColor: '#EFF6FF',
                    padding: '16px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1E40AF',
                    borderTop: '1px solid #DBEAFE',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <span>SUMMARY</span>
                    <span>PAYMENT REQUESTS <strong style={{ color: '#0052FF' }}>32</strong></span>
                    <span>PAID PAYMENT REQUESTS <strong style={{ color: '#0052FF' }}>19</strong></span>
                  </div>
                  <div>
                    TOTAL AMOUNT SENT <strong style={{ fontSize: '15px', color: '#0052FF' }}>₹4,20,350.00</strong>
                  </div>
                </div>
              </div>

              {/* TIA Pay Instant Cashout Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #0052FF 0%, #1D4ED8 100%)',
                    borderRadius: '16px',
                    padding: '24px',
                    color: '#FFFFFF',
                    boxShadow: '0 8px 24px rgba(0, 82, 255, 0.25)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 900 }}>TIA PAY</div>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 800,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      ESCROW LEDGER
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px 0' }}>
                    Pay with TIA Pay
                  </h3>
                  <div style={{ fontSize: '11px', opacity: 0.85, marginBottom: '20px' }}>
                    powered by stripe & 5% flat ledger
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '16px' }}>
                    <div>
                      <div style={{ fontSize: '11px', opacity: 0.8 }}>Available to cash out</div>
                      <div style={{ fontSize: '20px', fontWeight: 900 }}>₹80,000.00</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleInstantCashout}
                      style={{
                        backgroundColor: '#FFFFFF',
                        color: '#0052FF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 18px',
                        fontSize: '13px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>Cash out</span>
                      <ArrowRightIcon size={12} color="#0052FF" />
                    </button>
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>
                      Milestone Security
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                    Brand funds are locked before content creation begins. Once your submission is approved, funds disburse with zero platform markup deductions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: SOCIAL MEDIA CONNECTORS                                       */}
        {/* ==================================================================== */}
        {activeTab === 'social-media' && (
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
                Social Media
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                TIA&apos;s Creator Intelligence Portal allows you to integrate your official social media accounts via live OAuth APIs. You may choose to remove these connections at any time.
              </p>
            </div>

            {/* Notice Callout Box */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '18px 22px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div>
                <InstagramIcon size={32} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                  Connect Instagram & YouTube with Live OAuth
                </div>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
                  Official API verification boosts your Creator Intelligence Score to 95+ and unlocks top marketplace visibility for global brands.
                </div>
              </div>
            </div>

            {/* Section 1: Connect Social Accounts (Live OAuth) */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Connect social accounts
                  </h3>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      backgroundColor: '#EFF6FF',
                      color: '#0052FF',
                      padding: '2px 8px',
                      borderRadius: '12px',
                    }}
                  >
                    Recommended
                  </span>
                </div>
                <span style={{ fontSize: '12.5px', color: '#0052FF', fontWeight: 600, cursor: 'pointer' }}>
                  How to connect? ⓘ
                </span>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
                {[
                  { id: 'INSTAGRAM', name: 'Instagram', icon: <InstagramIcon size={24} /> },
                  { id: 'TIKTOK', name: 'TikTok', icon: <TikTokIcon size={24} /> },
                  { id: 'YOUTUBE', name: 'YouTube', icon: <YouTubeIcon size={24} /> },
                ].map((plat, idx) => {
                  const account = socialAccounts.find((a) => a.platform === plat.id);
                  const isConnected = account?.connected;
                  const isBusy = connectingPlatform === plat.id;

                  return (
                    <div
                      key={plat.id}
                      style={{
                        padding: '18px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: idx < 2 ? '1px solid #F1F5F9' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div>{plat.icon}</div>
                        <div>
                          <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A' }}>
                            {plat.name}
                          </div>
                          {isConnected && (
                            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                              @{account.username || 'verified_channel'} • {(account.audienceSize || 0).toLocaleString()} followers
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        {isConnected ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px',
                                fontWeight: 700,
                                color: '#059669',
                                backgroundColor: '#ECFDF5',
                                padding: '4px 10px',
                                borderRadius: '6px',
                              }}
                            >
                              ✓ Connected
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDisconnect(plat.id)}
                              style={{
                                backgroundColor: 'transparent',
                                border: '1px solid #E2E8F0',
                                borderRadius: '6px',
                                padding: '4px 8px',
                                fontSize: '11.5px',
                                color: '#64748B',
                                cursor: 'pointer',
                              }}
                            >
                              Disconnect
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleConnectOAuth(plat.id)}
                            disabled={isBusy}
                            style={{
                              backgroundColor: '#FFFFFF',
                              color: '#0052FF',
                              border: '1px solid #0052FF',
                              borderRadius: '8px',
                              padding: '8px 20px',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            {isBusy ? 'Opening OAuth...' : 'Connect'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Add Social Handle */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 14px 0' }}>
                Add social handle
              </h3>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
                {[
                  { id: 'X', name: 'X (Twitter)', icon: <XIcon size={20} /> },
                  { id: 'twitch', name: 'Twitch', icon: <TwitchIcon size={20} /> },
                  { id: 'pinterest', name: 'Pinterest', icon: <PinterestIcon size={20} /> },
                ].map((item, idx) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '16px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: idx < 2 ? '1px solid #F1F5F9' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div>{item.icon}</div>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                        {item.name}
                      </span>
                    </div>

                    <button
                      type="button"
                      style={{
                        backgroundColor: '#F8FAFC',
                        color: '#334155',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        padding: '6px 16px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: SETTINGS                                                      */}
        {/* ==================================================================== */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '680px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>
              Creator Profile & Commercial Rates
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue={displayName}
                  className="tia-input"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Starting Commercial Rate (INR ₹)
                </label>
                <input
                  type="number"
                  defaultValue={25000}
                  className="tia-input"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Primary Content Niches
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Technology', 'Lifestyle', 'Fashion', 'Gaming', 'Finance'].map((cat) => (
                    <span
                      key={cat}
                      style={{
                        padding: '6px 14px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="tia-btn-primary"
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#0052FF',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '12px',
                }}
              >
                Save Settings
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Campaign Application Modal */}
      {selectedCampaign && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '24px',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxWidth: '540px',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
            }}
          >
            {applySuccess ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '44px', marginBottom: '12px' }}>🎉</div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
                  Application Submitted!
                </h3>
                <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
                  The brand will review your verified profile. Redirecting to Collabs tracker...
                </p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#0052FF' }}>
                      {selectedCampaign.commercialLabel}
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '2px 0 0 0' }}>
                      {selectedCampaign.title}
                    </h3>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>
                      {selectedCampaign.brandName} • {selectedCampaign.country}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCampaign(null)}
                    style={{ backgroundColor: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '10px', marginBottom: '22px', fontSize: '13.5px', color: '#334155' }}>
                  <strong>Brief:</strong> {selectedCampaign.description}
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedCampaign(null)}
                    style={{
                      padding: '10px 18px',
                      backgroundColor: '#F1F5F9',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      color: '#475569',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitApplication}
                    style={{
                      padding: '10px 24px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Confirm & Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreatorPortalPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading Creator Portal...</div>}>
      <CreatorPortalContent />
    </Suspense>
  );
}
