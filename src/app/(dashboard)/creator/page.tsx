'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';

// ============================================================================
// VECTOR SVG BRAND ICONS
// ============================================================================

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad-mobile" cx="20%" cy="100%" r="130%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="25%" stopColor="#FF543E" />
          <stop offset="50%" stopColor="#C837AB" />
          <stop offset="100%" stopColor="#377424" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ig-linear-mobile" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#405DE6" />
          <stop offset="30%" stopColor="#5851DB" />
          <stop offset="50%" stopColor="#833AB4" />
          <stop offset="70%" stopColor="#C13584" />
          <stop offset="85%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#FD1D1D" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-linear-mobile)" />
      <rect width="24" height="24" rx="6" fill="url(#ig-grad-mobile)" />
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

function SparklesIcon({ size = 14, color = '#0052FF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" />
    </svg>
  );
}

function CommissionTargetIcon({ size = 13, color = '#7C3AED' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill={color} fillOpacity="0.3" />
      <path d="M12 2V6M12 18V22M2 12H6M18 12H22" strokeLinecap="round" />
    </svg>
  );
}

function FlatFeeBagIcon({ size = 13, color = '#D97706' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function InfoCircleIcon({ size = 14, color = '#D97706' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
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
  const [replyMessage, setReplyMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Social accounts state
  const [socialAccounts, setSocialAccounts] = useState<any[]>([
    { platform: 'INSTAGRAM', username: 'creator.official', audienceSize: 320000, engagementRate: 4.85, connected: true },
    { platform: 'YOUTUBE', username: 'creatortech', audienceSize: 185000, engagementRate: 6.2, connected: true },
    { platform: 'TIKTOK', username: '', audienceSize: 0, engagementRate: 0, connected: false },
    { platform: 'X', username: 'creator_x', audienceSize: 45000, engagementRate: 2.1, connected: true },
  ]);

  // Teaser Marketplace Campaigns with Blurred Aesthetic
  const [campaigns] = useState<any[]>([
    {
      id: 'camp-1',
      title: 'EcoVibe Sustainable Living Challenge',
      brandName: 'EcoVibe Global',
      bannerImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #C2B39B 0%, #8E7A62 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 10%',
      categories: ['Sustainability', 'Cooking', 'Food', '+5'],
      isNew: true,
      requirementMet: false,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'Australia',
      countryFlag: '🇦🇺',
      socials: ['INSTAGRAM', 'TIKTOK', 'YOUTUBE'],
      description: 'Create 2x Instagram Reels showcasing zero-waste kitchen lifestyle habits and authentic sustainable cooking tips.',
    },
    {
      id: 'camp-2',
      title: 'Festive Season Artisan Gourmet Unboxing',
      brandName: 'Nectar Bites Gourmet',
      bannerImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #E2E8F0 0%, #94A3B8 50%, #475569 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 12%',
      categories: ['Festivals', 'Food', 'Lifestyle', '+2'],
      isNew: true,
      requirementMet: false,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'Italy',
      countryFlag: '🇮🇹',
      socials: ['INSTAGRAM', 'PINTEREST', 'TIKTOK', 'YOUTUBE'],
      description: 'Review artisan gift hampers and holiday snack collections with dedicated link-in-bio attribution.',
    },
    {
      id: 'camp-3',
      title: 'Bio-Active Herbal Vitality Booster Launch',
      brandName: 'PureBotanics Laboratory',
      bannerImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #B58D67 0%, #7C5A3E 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 20%',
      categories: ['Entrepreneurship', 'Dietary Supplements'],
      isNew: true,
      requirementMet: false,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'United States',
      countryFlag: '🇺🇸',
      socials: ['INSTAGRAM', 'TIKTOK'],
      description: '30-day morning routine vlog integration featuring clean herbal extracts and lab-tested purity certificates.',
    },
    {
      id: 'camp-4',
      title: 'Nexus X1 Ultra 4K Camera Showcase',
      brandName: 'Nexus Tech Global',
      bannerImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 20%',
      categories: ['Technology', 'Gadgets', 'AI', '+3'],
      isNew: true,
      requirementMet: false,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'India',
      countryFlag: '🇮🇳',
      socials: ['INSTAGRAM', 'YOUTUBE', 'TIKTOK'],
      description: 'Dedicated 8-10 minute review emphasizing low-light camera sensor performance and AI editing capabilities.',
    },
    {
      id: 'camp-5',
      title: 'Velocity Pro Marathon Performance Shoe',
      brandName: 'Stride Athletics',
      bannerImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 12%',
      categories: ['Fitness', 'Running', 'Athleisure'],
      isNew: true,
      requirementMet: false,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'United Kingdom',
      countryFlag: '🇬🇧',
      socials: ['INSTAGRAM', 'TIKTOK'],
      description: 'High-energy running montage with direct swipe-up discount code for community followers.',
    },
    {
      id: 'camp-6',
      title: 'LuxeDerm Anti-Aging Night Serum',
      brandName: 'LuxeDerm Skin Labs',
      bannerImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #D4B08C 0%, #A07850 100%)',
      commercialType: 'FLAT_FEE',
      commercialLabel: 'Flat Fee $500',
      categories: ['Beauty', 'Skincare', 'Cosmetics', '+2'],
      isNew: true,
      requirementMet: false,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'France',
      countryFlag: '🇫🇷',
      socials: ['INSTAGRAM', 'YOUTUBE', 'TIKTOK'],
      description: '7-day nighttime skin transformation diary with macro camera closeups.',
    },
  ]);

  // Collabs & Inbox Threads
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
    const popupUrl = `/api/connectors/${platform.toLowerCase()}/auth?flow=onboarding&role=CREATOR`;
    window.open(
      popupUrl,
      `TIA_CONNECT_${platform}`,
      'width=600,height=750,scrollbars=yes,status=yes'
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
        brandInitials: 'EV',
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

  const renderSocialIcon = (platform: string, size = 15) => {
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
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh', fontFamily: 'inherit', width: '100%', overflowX: 'hidden' }}>
      {/* Dynamic Global Mobile CSS Rules */}
      <style jsx global>{`
        /* Global Reset & Smooth Scroll */
        * {
          box-sizing: border-box;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Desktop Layout Defaults */
        .portal-header-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .portal-main-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          padding: 24px;
        }
        .portal-search-banner-box {
          background: linear-gradient(90deg, #EFF6FF 0%, #EEF2FF 50%, #F5F3FF 100%);
          border: 1px solid #E0E7FF;
          border-radius: 12px;
          padding: 24px 28px;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .portal-banner-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .portal-banner-cta-btn {
          background-color: #0052FF;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          padding: 10px 24px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 82, 255, 0.25);
        }
        .portal-grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }
        .portal-kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .portal-split-collabs {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 300px 1fr;
          min-height: 520px;
        }

        /* Mobile Responsive Adaptations (< 768px) */
        @media (max-width: 768px) {
          .portal-header-wrapper {
            height: auto;
            padding: 12px 14px 0 14px;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .portal-header-row-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
          .portal-tabs-scroller {
            display: flex;
            width: 100%;
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 0px;
            gap: 4px;
            border-top: 1px solid #F3F4F6;
          }
          .portal-tab-btn {
            padding: 12px 14px !important;
            font-size: 13px !important;
            flex-shrink: 0 !important;
          }
          .portal-main-wrapper {
            padding: 16px 12px;
          }
          .portal-search-banner-box {
            padding: 18px 16px;
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            margin-bottom: 20px;
          }
          .portal-banner-left {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            width: 100%;
          }
          .portal-banner-cta-btn {
            width: 100%;
            padding: 12px 0;
            font-size: 14px;
            text-align: center;
          }
          .portal-grid-layout {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .portal-kpi-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .portal-split-collabs {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Top Header Navigation Bar */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="portal-header-wrapper">
          {/* Top Row: Logo + User Profile */}
          <div className="portal-header-row-top" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link
              href="/creator"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <img
                src="/logo-cropped.png"
                alt="The Influencer's Agency"
                style={{
                  height: '28px',
                  width: 'auto',
                  maxWidth: '140px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 800,
                  color: '#0052FF',
                  backgroundColor: '#EFF6FF',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  letterSpacing: '0.04em',
                }}
              >
                PORTAL
              </span>
            </Link>

            {/* User Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '12px', color: '#374151', fontWeight: 600 }}>
                  {currentUser?.email ? currentUser.email.split('@')[0] : 'creator'}
                </span>
                <BlueCheckBadge size={14} title="Verified Creator" />
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
                  gap: '3px',
                  fontSize: '11.5px',
                  color: '#6B7280',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <span>Logout</span>
                <ArrowRightIcon size={10} color="#6B7280" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs (Smooth touch scrolling on Mobile) */}
          <nav className="portal-tabs-scroller no-scrollbar">
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
                  className="portal-tab-btn"
                  onClick={() => handleTabChange(tab.id as TabType)}
                  style={{
                    padding: '18px 14px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#0052FF' : '#4B5563',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2px solid #0052FF' : '2px solid transparent',
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
      </header>

      {/* Main Content Area */}
      <main className="portal-main-wrapper">
        {/* ==================================================================== */}
        {/* TAB 1: MARKETPLACE                                                   */}
        {/* ==================================================================== */}
        {activeTab === 'marketplace' && (
          <div>
            {/* Top Responsive Search Banner */}
            <div className="portal-search-banner-box">
              <div className="portal-banner-left">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <InstagramIcon size={22} />
                  <YouTubeIcon size={22} />
                  <TikTokIcon size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '15.5px', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px 0', lineHeight: 1.35 }}>
                    We&apos;re actively searching for your perfect campaign! 👀
                  </h2>
                  <p style={{ fontSize: '12.5px', color: '#4338CA', margin: 0, lineHeight: 1.45 }}>
                    The more socials you link, the better the chances of finding the right fit for your audience and style!
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="portal-banner-cta-btn"
                onClick={() => handleTabChange('social-media')}
              >
                Connect
              </button>
            </div>

            {/* Section Heading */}
            <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>🎁</span>
              <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#111827', margin: 0 }}>
                Keep growing, and these could be yours soon!
              </h3>
            </div>

            {/* Responsive Blurred Campaign Teaser Cards Grid */}
            <div className="portal-grid-layout">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  onClick={() => handleApply(camp)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Blurred Banner */}
                  <div
                    style={{
                      height: '130px',
                      position: 'relative',
                      overflow: 'hidden',
                      padding: '14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      backgroundColor: '#E2E8F0',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: -10,
                        left: -10,
                        right: -10,
                        bottom: -10,
                        backgroundImage: `url(${camp.bannerImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(16px) saturate(1.15)',
                        transform: 'scale(1.2)',
                        zIndex: 1,
                      }}
                    />

                    {/* Translucent Commercial Pill */}
                    <div
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                        color: camp.commercialType === 'FLAT_FEE' ? '#B45309' : '#6D28D9',
                        padding: '3px 10px',
                        borderRadius: '14px',
                        fontSize: '11px',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        zIndex: 2,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                      }}
                    >
                      {camp.commercialType === 'FLAT_FEE' ? (
                        <FlatFeeBagIcon size={11} color="#B45309" />
                      ) : (
                        <CommissionTargetIcon size={11} color="#6D28D9" />
                      )}
                      <span>{camp.commercialLabel}</span>
                    </div>

                    {/* Metallic Avatar */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-16px',
                        left: '16px',
                        width: '42px',
                        height: '42px',
                        background: camp.avatarGradient,
                        border: '2px solid #FFFFFF',
                        borderRadius: '10px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        zIndex: 2,
                      }}
                    />
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '24px 16px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Brand Pill + Categories */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          color: '#6B7280',
                          backgroundColor: '#F3F4F6',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          filter: 'blur(3px)',
                          userSelect: 'none',
                        }}
                      >
                        Anonymized brand
                      </span>

                      {camp.categories.map((cat: string, idx: number) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 600,
                            color: '#374151',
                            backgroundColor: '#F3F4F6',
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Anonymized Title + New */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#111827',
                          filter: 'blur(3.5px)',
                          userSelect: 'none',
                        }}
                      >
                        Anonymized campaign name
                      </span>
                      {camp.isNew && (
                        <span
                          style={{
                            backgroundColor: '#EFF6FF',
                            color: '#0052FF',
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '1px 5px',
                            borderRadius: '4px',
                            whiteSpace: 'nowrap',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          <SparklesIcon size={9} color="#0052FF" />
                          <span>New</span>
                        </span>
                      )}
                    </div>

                    {/* Requirements Section */}
                    <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '12px', marginTop: 'auto' }}>
                      <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px', color: '#D97706', fontSize: '11.5px', fontWeight: 700 }}>
                        <InfoCircleIcon size={12} color="#D97706" />
                        <span>{camp.requirementLabel}</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11.5px', color: '#4B5563' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#9CA3AF' }}>Language</span>
                          <span style={{ fontWeight: 600, color: '#111827' }}>{camp.language}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#9CA3AF' }}>Country</span>
                          <span style={{ fontSize: '13px' }}>{camp.countryFlag}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#9CA3AF' }}>Socials</span>
                          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                            {camp.socials.map((s: string) => (
                              <div key={s} title={s}>
                                {renderSocialIcon(s, 14)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: COLLABS                                                       */}
        {/* ==================================================================== */}
        {activeTab === 'collabs' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
              {[
                { id: 'awaiting', label: '⏳ Awaiting', count: collabs.filter((c) => c.status === 'AWAITING').length },
                { id: 'accepted', label: '🌿 Accepted', count: collabs.filter((c) => c.status === 'ACCEPTED').length },
                { id: 'rejected', label: '🚫 Rejected', count: collabs.filter((c) => c.status === 'REJECTED').length },
              ].map((pill) => {
                const isActive = collabFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setCollabFilter(pill.id as CollabFilter)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      backgroundColor: isActive ? '#FEF3C7' : '#FFFFFF',
                      color: isActive ? '#92400E' : '#4B5563',
                      border: isActive ? '1px solid #FCD34D' : '1px solid #E5E7EB',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>{pill.label}</span>
                    <span style={{ fontSize: '11px', opacity: 0.8 }}>({pill.count})</span>
                  </button>
                );
              })}
            </div>

            {collabs.filter((c) => c.status.toLowerCase() === collabFilter).length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 16px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div style={{ fontSize: '42px', marginBottom: '12px' }}>🗂️</div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>
                  Nothing pending to review—for now!
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280', maxWidth: '400px', margin: '0 auto 20px auto', lineHeight: 1.45 }}>
                  Once you apply to a campaign, it&apos;ll appear here while the brand checks out your profile.
                </p>
                <button
                  type="button"
                  onClick={() => handleTabChange('marketplace')}
                  style={{
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 22px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Explore opportunities
                </button>
              </div>
            ) : (
              <div className="portal-split-collabs">
                {/* Left Thread List */}
                <div style={{ borderRight: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}>
                  <div style={{ padding: '14px', borderBottom: '1px solid #E5E7EB', fontSize: '12.5px', fontWeight: 800, color: '#111827' }}>
                    Emails ({collabs.length})
                  </div>
                  {collabs.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCollabId(c.id)}
                      style={{
                        padding: '14px',
                        borderBottom: '1px solid #F3F4F6',
                        backgroundColor: c.id === selectedCollabId ? '#EFF6FF' : '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>
                        {c.campaignTitle}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#6B7280' }}>
                        {c.brandName} • {c.appliedAt}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Active Message Pane */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', margin: 0 }}>
                        {selectedCollab.subject}
                      </h3>
                      <div style={{ fontSize: '11.5px', color: '#6B7280' }}>
                        {selectedCollab.brandName} • Rate {selectedCollab.proposedRate}
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '16px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedCollab.messages.map((msg: any) => (
                      <div
                        key={msg.id}
                        style={{
                          backgroundColor: msg.sender === 'CREATOR' ? '#EFF6FF' : '#F9FAFB',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          padding: '12px 14px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>
                            {msg.senderName}
                          </span>
                          <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>{msg.date}</span>
                        </div>
                        <p style={{ fontSize: '12.5px', color: '#374151', margin: 0, lineHeight: 1.4 }}>{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: '12px 16px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your reply..."
                      style={{ flex: 1, padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '12.5px' }}
                    />
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      style={{ backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '9px 16px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: PAYMENTS                                                      */}
        {/* ==================================================================== */}
        {activeTab === 'payments' && (
          <div>
            {claimSuccess && (
              <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '12.5px', fontWeight: 600 }}>
                ✓ Payout claimed successfully!
              </div>
            )}

            {/* Responsive Metric Cards */}
            <div className="portal-kpi-grid">
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>$</div>
                <div>
                  <div style={{ fontSize: '11.5px', color: '#6B7280' }}>Total received</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>$25,345.00</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⌛</div>
                <div>
                  <div style={{ fontSize: '11.5px', color: '#6B7280' }}>Total pending</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>$5,952.45</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#0052FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⏱</div>
                <div>
                  <div style={{ fontSize: '11.5px', color: '#6B7280' }}>Total unclaimed</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#0052FF' }}>$12,356.70</div>
                </div>
              </div>
            </div>

            {/* Scrollable Transactions Table */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: '11.5px', fontWeight: 700, color: '#6B7280' }}>
                    <th style={{ padding: '12px 16px' }}>Media Name</th>
                    <th style={{ padding: '12px 16px' }}>Campaign</th>
                    <th style={{ padding: '12px 16px' }}>Amount</th>
                    <th style={{ padding: '12px 16px' }}>Authorized at</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F3F4F6', fontSize: '12.5px' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#111827' }}>{p.mediaName}</td>
                      <td style={{ padding: '14px 16px', color: '#4B5563' }}>{p.campaign}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0052FF' }}>{p.amount}</td>
                      <td style={{ padding: '14px 16px', color: '#6B7280' }}>{p.authorizedAt}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', backgroundColor: p.status === 'PAID' ? '#ECFDF5' : '#F3F4F6', color: p.status === 'PAID' ? '#059669' : '#4B5563' }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button type="button" onClick={() => handleClaimPayout(p.id)} style={{ backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '5px 12px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}>
                          {p.status === 'UNCLAIMED' ? 'Claim!' : 'View'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ backgroundColor: '#EFF6FF', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: 700, color: '#1E40AF' }}>
                <span>Summary • Requests: 32 • Paid: 19</span>
                <span>Amount: $4,203.50</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: SOCIAL MEDIA                                                  */}
        {/* ==================================================================== */}
        {activeTab === 'social-media' && (
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>Social Media</h2>
              <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0 }}>
                TIA&apos;s Creator Portal allows you to integrate your social media accounts with official APIs.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
              {[
                { id: 'INSTAGRAM', name: 'Instagram', icon: <InstagramIcon size={20} /> },
                { id: 'TIKTOK', name: 'TikTok', icon: <TikTokIcon size={20} /> },
                { id: 'YOUTUBE', name: 'YouTube', icon: <YouTubeIcon size={20} /> },
              ].map((plat, idx) => {
                const account = socialAccounts.find((a) => a.platform === plat.id);
                return (
                  <div key={plat.id} style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx < 2 ? '1px solid #F3F4F6' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {plat.icon}
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827' }}>{plat.name}</div>
                        {account?.connected && <div style={{ fontSize: '11.5px', color: '#6B7280' }}>@{account.username}</div>}
                      </div>
                    </div>
                    {account?.connected ? (
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px' }}>✓ Connected</span>
                    ) : (
                      <button type="button" onClick={() => handleConnectOAuth(plat.id)} style={{ backgroundColor: '#FFFFFF', color: '#0052FF', border: '1px solid #0052FF', borderRadius: '6px', padding: '5px 14px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Connect</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: SETTINGS                                                      */}
        {/* ==================================================================== */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '24px 20px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '14px' }}>Profile Settings</h2>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '5px' }}>Display Name</label>
              <input type="text" defaultValue={displayName} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', marginBottom: '14px', fontSize: '13px' }} />
            </div>
            <button type="button" style={{ backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '9px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Save</button>
          </div>
        )}
      </main>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '12px', padding: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            {applySuccess ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ fontSize: '32px', marginBottom: '6px' }}>🎉</div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>Application Submitted!</h3>
                <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0 }}>Redirecting to Collabs...</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#7C3AED' }}>{selectedCampaign.commercialLabel}</span>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: '2px 0 0 0' }}>{selectedCampaign.title}</h3>
                    <div style={{ fontSize: '11.5px', color: '#6B7280' }}>{selectedCampaign.brandName} • {selectedCampaign.country}</div>
                  </div>
                  <button type="button" onClick={() => setSelectedCampaign(null)} style={{ backgroundColor: 'transparent', border: 'none', fontSize: '16px', cursor: 'pointer' }}>✕</button>
                </div>

                <div style={{ backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '12.5px', color: '#4B5563', lineHeight: 1.4 }}>
                  <strong>Brief:</strong> {selectedCampaign.description}
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setSelectedCampaign(null)} style={{ padding: '8px 14px', backgroundColor: '#F3F4F6', border: 'none', borderRadius: '6px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  <button type="button" onClick={submitApplication} style={{ padding: '8px 18px', backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}>Apply</button>
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
