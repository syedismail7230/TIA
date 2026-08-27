'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';
import {
  CheckIcon,
  SearchIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  GlobeIcon,
  TagIcon,
  LockIcon,
} from '@/components/ui/Icons';

type TabType = 'marketplace' | 'collabs' | 'payments' | 'social-media' | 'settings';
type CollabFilter = 'awaiting' | 'accepted' | 'rejected';

export default function CreatorPortalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabType) || 'marketplace';

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [collabFilter, setCollabFilter] = useState<CollabFilter>('awaiting');
  const [selectedCollabId, setSelectedCollabId] = useState<string>('collab-1');
  const [collabSubTab, setCollabSubTab] = useState<'messages' | 'campaign' | 'deliverables' | 'notes'>('messages');
  const [replyMessage, setReplyMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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

  // Marketplace Campaigns
  const [campaigns, setCampaigns] = useState<any[]>([
    {
      id: 'camp-1',
      title: 'EcoVibe Sustainable Living Challenge',
      brandName: 'EcoVibe Global',
      brandLogo: '🌱',
      bannerBg: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 10%',
      badgeColor: '#7C3AED',
      badgeBg: '#F3E8FF',
      categories: ['Sustainability', 'Cooking', 'Food', '+5'],
      isNew: true,
      requirementMet: true,
      language: 'English',
      country: 'India',
      countryFlag: '🇮🇳',
      socials: ['INSTAGRAM', 'TIKTOK', 'YOUTUBE'],
      budgetMinor: 3500000,
      description: 'Create 2x Instagram Reels showcasing zero-waste kitchen lifestyle habits and authentic sustainable cooking tips.',
    },
    {
      id: 'camp-2',
      title: 'Festive Season Artisan Snack Unboxing',
      brandName: 'Nectar Bites',
      brandLogo: '🍯',
      bannerBg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 12%',
      badgeColor: '#7C3AED',
      badgeBg: '#F3E8FF',
      categories: ['Festivals', 'Food', 'Lifestyle', '+2'],
      isNew: true,
      requirementMet: true,
      language: 'English',
      country: 'India',
      countryFlag: '🇮🇳',
      socials: ['INSTAGRAM', 'PINTEREST', 'TIKTOK', 'YOUTUBE'],
      budgetMinor: 4500000,
      description: 'Review artisan gift hampers and holiday snack collections with dedicated link-in-bio attribution.',
    },
    {
      id: 'camp-3',
      title: 'Bio-Active Herbal Vitality Booster Launch',
      brandName: 'PureBotanics Co.',
      brandLogo: '🌿',
      bannerBg: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 20%',
      badgeColor: '#7C3AED',
      badgeBg: '#F3E8FF',
      categories: ['Entrepreneurship', 'Dietary Supplements'],
      isNew: true,
      requirementMet: false,
      requirementNote: 'Requires 500k+ YouTube Subscribers',
      language: 'English',
      country: 'United States',
      countryFlag: '🇺🇸',
      socials: ['INSTAGRAM', 'TIKTOK'],
      budgetMinor: 6000000,
      description: '30-day morning routine vlog integration featuring clean herbal extracts and lab-tested purity certificates.',
    },
    {
      id: 'camp-4',
      title: 'Nexus X1 Ultra 4K Camera Showcase',
      brandName: 'Nexus Tech Global',
      brandLogo: '⚡',
      bannerBg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
      commercialType: 'FLAT_FEE',
      commercialLabel: 'Flat Fee ₹45,000',
      badgeColor: '#D97706',
      badgeBg: '#FEF3C7',
      categories: ['Technology', 'Gadgets', 'AI', '+3'],
      isNew: false,
      requirementMet: true,
      language: 'English',
      country: 'India',
      countryFlag: '🇮🇳',
      socials: ['YOUTUBE', 'INSTAGRAM'],
      budgetMinor: 4500000,
      description: 'Dedicated 8-10 minute review emphasizing low-light camera sensor performance and AI editing capabilities.',
    },
    {
      id: 'camp-5',
      title: 'Velocity Pro Marathon Performance Shoe',
      brandName: 'Stride Athletics',
      brandLogo: '👟',
      bannerBg: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
      commercialType: 'FLAT_FEE',
      commercialLabel: 'Flat Fee ₹30,000',
      badgeColor: '#D97706',
      badgeBg: '#FEF3C7',
      categories: ['Fitness', 'Running', 'Athleisure'],
      isNew: true,
      requirementMet: true,
      language: 'English',
      country: 'India',
      countryFlag: '🇮🇳',
      socials: ['INSTAGRAM', 'TIKTOK'],
      budgetMinor: 3000000,
      description: 'High-energy running montage with direct swipe-up discount code for community followers.',
    },
    {
      id: 'camp-6',
      title: 'GlowHydra Ceramide Overnight Recovery Cream',
      brandName: 'LuxeDerm Skin Labs',
      brandLogo: '✨',
      bannerBg: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Commission 15%',
      badgeColor: '#7C3AED',
      badgeBg: '#F3E8FF',
      categories: ['Beauty', 'Skincare', 'Self-Care'],
      isNew: false,
      requirementMet: true,
      language: 'English',
      country: 'Global',
      countryFlag: '🌐',
      socials: ['INSTAGRAM', 'YOUTUBE', 'TIKTOK'],
      budgetMinor: 2500000,
      description: '7-day nighttime skin transformation diary with macro camera closeups.',
    },
  ]);

  // Collabs and Inbox Threads (Image 4 Design Inspiration)
  const [collabs, setCollabs] = useState<any[]>([
    {
      id: 'collab-1',
      campaignTitle: 'Affiliation Program',
      subject: 'Holiday Creator Campaign Partnership',
      brandName: 'Nexus Tech Global',
      brandLogo: '⚡',
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
          avatar: '👨‍💼',
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
          avatar: '📸',
          date: 'Oct 27, 2026 - 02:15 PM',
          text: 'Hi Alan, it would be a pleasure! I have reviewed the deliverable brief. My first draft will be ready by end of next week.',
        },
        {
          id: 'msg-3',
          sender: 'BRAND',
          senderName: 'Alan W. (Brand Manager)',
          avatar: '👨‍💼',
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
          avatar: '👨‍💼',
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
      brandLogo: '🌿',
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
          avatar: '👩‍💼',
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
      brandLogo: '👟',
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
          avatar: '🏃‍♂️',
          badge: 'Payment Disbursed',
          badgeColor: '#059669',
          badgeBg: '#ECFDF5',
          date: 'Oct 29, 2026 - 06:15 PM',
          text: 'Thank you! We have released Milestone 1 payment of ₹35,000 through TIA Escrow.',
        },
      ],
    },
  ]);

  // Financial Ledger (Image 1, 2, 3 Design Inspiration)
  const [payments, setPayments] = useState<any[]>([
    {
      id: 'tx-101',
      mediaName: 'Paul Homes',
      avatar: '👨‍🦰',
      campaign: 'Winter Fashion 2026',
      amount: '₹25,000',
      authorizedAt: 'Aug 20, 2026',
      status: 'UNCLAIMED',
      type: 'Deliverable Approval',
    },
    {
      id: 'tx-102',
      mediaName: 'Nathalie Case',
      avatar: '👩‍🦰',
      campaign: 'Beach Collection Summer',
      amount: '₹32,800',
      authorizedAt: 'Aug 18, 2026',
      status: 'PAID',
      type: 'Milestone 2 Release',
    },
    {
      id: 'tx-103',
      mediaName: 'Marcus Vance',
      avatar: '🧑‍💻',
      campaign: 'Tech Gadget Launch',
      amount: '₹56,000',
      authorizedAt: 'Aug 14, 2026',
      status: 'PAID',
      type: 'Final Completion Payout',
    },
    {
      id: 'tx-104',
      mediaName: 'Elena Rostova',
      avatar: '👱‍♀️',
      campaign: 'Fitness Energy Drink',
      amount: '₹18,500',
      authorizedAt: 'Aug 10, 2026',
      status: 'PENDING',
      type: 'Escrow Lock (In Review)',
    },
    {
      id: 'tx-105',
      mediaName: 'David K.',
      avatar: '🧔',
      campaign: 'Wireless ANC Headphones',
      amount: '₹42,000',
      authorizedAt: 'Aug 05, 2026',
      status: 'PAID',
      type: 'Contract Completion',
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
      } finally {
        setLoading(false);
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
        brandLogo: selectedCampaign.brandLogo,
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
            avatar: '📸',
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
                  avatar: '📸',
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

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'inherit' }}>
      {/* ==================================================================== */}
      {/* TOP HEADER NAVIGATION BAR (Upfluence SaaS Portal Style)             */}
      {/* ==================================================================== */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
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

      {/* ==================================================================== */}
      {/* MAIN PORTAL BODY                                                     */}
      {/* ==================================================================== */}
      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '28px 24px' }}>
        {/* ==================================================================== */}
        {/* TAB 1: MARKETPLACE DISCOVERY (Upfluence Reference 1)                 */}
        {/* ==================================================================== */}
        {activeTab === 'marketplace' && (
          <div>
            {/* Top Gradient Banner */}
            <div
              style={{
                background: 'linear-gradient(90deg, #EFF6FF 0%, #EEF2FF 40%, #F5F3FF 100%)',
                border: '1px solid #DBEAFE',
                borderRadius: '16px',
                padding: '28px 36px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 16px rgba(0, 82, 255, 0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
                    fontSize: '28px',
                    flexShrink: 0,
                  }}
                >
                  🚀
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1E1B4B', margin: '0 0 6px 0' }}>
                    We&apos;re actively searching for your perfect campaign! 👀
                  </h2>
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
                  boxShadow: '0 4px 12px rgba(0, 82, 255, 0.35)',
                  flexShrink: 0,
                }}
              >
                Connect Socials
              </button>
            </div>

            {/* Section Heading */}
            <div style={{ marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🎁</span>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Keep growing, and these could be yours soon!
              </h3>
            </div>

            {/* Campaign Discovery Cards */}
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
                    borderRadius: '14px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Card Banner */}
                  <div
                    style={{
                      height: '140px',
                      background: camp.bannerBg,
                      position: 'relative',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: camp.badgeBg,
                        color: camp.badgeColor,
                        padding: '5px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <span>🏷️</span>
                      <span>{camp.commercialLabel}</span>
                    </div>

                    {/* Brand Logo Avatar */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-22px',
                        left: '20px',
                        width: '56px',
                        height: '56px',
                        backgroundColor: '#FFFFFF',
                        border: '3px solid #FFFFFF',
                        borderRadius: '12px',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '26px',
                      }}
                    >
                      {camp.brandLogo}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '30px 22px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
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

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '14px' }}>
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
                          }}
                        >
                          ✨ New
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px 0', lineHeight: 1.45, flex: 1 }}>
                      {camp.description}
                    </p>

                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', marginBottom: '16px' }}>
                      <div style={{ marginBottom: '10px' }}>
                        {camp.requirementMet ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontSize: '12.5px', fontWeight: 700 }}>
                            <span>✓</span>
                            <span>Requirements Met</span>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#D97706', fontSize: '12.5px', fontWeight: 700 }}>
                            <span>ⓘ</span>
                            <span>{camp.requirementNote || 'Requirement not met'}</span>
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: '#475569' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#94A3B8' }}>Language:</span>
                          <span style={{ fontWeight: 600 }}>{camp.language}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#94A3B8' }}>Country:</span>
                          <span style={{ fontWeight: 600 }}>
                            {camp.countryFlag} {camp.country}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Socials:</span>
                          <div style={{ display: 'flex', gap: '5px' }}>
                            {camp.socials.map((s: string, idx: number) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: '10.5px',
                                  fontWeight: 700,
                                  backgroundColor: '#F1F5F9',
                                  padding: '2px 7px',
                                  borderRadius: '4px',
                                  color: '#334155',
                                }}
                              >
                                {s}
                              </span>
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
        {/* TAB 2: COLLABS & MULTI-PANE MESSAGING (Upfluence Reference 4)        */}
        {/* ==================================================================== */}
        {activeTab === 'collabs' && (
          <div>
            {/* Filter Pills Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
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
                      padding: '8px 18px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      backgroundColor: isActive ? '#FEF3C7' : '#FFFFFF',
                      color: isActive ? '#92400E' : '#475569',
                      border: isActive ? '1px solid #FCD34D' : '1px solid #E2E8F0',
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

            {/* Multi-Pane Campaign Collaboration Workspace (Upfluence Ref 4) */}
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
                          <span>{c.brandLogo}</span>
                          <span>{c.brandName}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Pane: Thread & Deliverables */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Detail Header & Sub-Tabs */}
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

                {/* Messages Stream */}
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
                            <span style={{ fontSize: '18px' }}>{msg.avatar}</span>
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

                {/* Compose Reply Box */}
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
        {/* TAB 3: PAYMENTS & OVERPAY FINTECH WALLET (Upfluence Ref 1, 2, 3)     */}
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

            {/* Top 3 Financial KPI Cards (Upfluence Ref 1 Exact Layout) */}
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
                    fontWeight: 800,
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
                  }}
                >
                  ⌛
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
                  }}
                >
                  ⏱️
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
              {/* Transactions Table (Upfluence Ref 1 Style) */}
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
                          {/* Media / Creator Name */}
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontSize: '20px' }}>{p.avatar}</span>
                              <span style={{ fontWeight: 800, color: '#0F172A' }}>{p.mediaName}</span>
                            </div>
                          </td>

                          {/* Campaign Title */}
                          <td style={{ padding: '16px 20px', color: '#475569', fontWeight: 500 }}>
                            {p.campaign}
                          </td>

                          {/* Amount */}
                          <td style={{ padding: '16px 20px', fontWeight: 800, color: '#0052FF' }}>
                            {p.amount}
                          </td>

                          {/* Date */}
                          <td style={{ padding: '16px 20px', color: '#64748B', fontSize: '12.5px' }}>
                            {p.authorizedAt}
                          </td>

                          {/* Status */}
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

                          {/* Action Button */}
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
                                <span>👁️</span>
                                <span>View</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Bottom Summary Bar (Upfluence Ref 1 Exact Layout) */}
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

              {/* TIA Pay Instant Cashout Card (Upfluence Ref 2 & Overpay Ref 3) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Cobalt Blue Card */}
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
                    <div style={{ fontSize: '28px' }}>💳</div>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 800,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      TIA PAY ESCROW
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

                {/* Instant Escrow Protections */}
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <ShieldCheckIcon size={18} color="#0052FF" />
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
        {/* TAB 4: SOCIAL MEDIA CONNECTORS (Upfluence Reference 4)               */}
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
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#FDF2F8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0,
                }}
              >
                📸
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
                  { id: 'INSTAGRAM', name: 'Instagram', icon: '📸', color: '#E1306C' },
                  { id: 'TIKTOK', name: 'TikTok', icon: '🎵', color: '#000000' },
                  { id: 'YOUTUBE', name: 'YouTube', icon: '▶️', color: '#FF0000' },
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
                        <div style={{ fontSize: '24px' }}>{plat.icon}</div>
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
                  { id: 'X', name: 'X (Twitter)', icon: '✖️' },
                  { id: 'twitch', name: 'Twitch', icon: '👾' },
                  { id: 'pinterest', name: 'Pinterest', icon: '📌' },
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
                      <div style={{ fontSize: '18px' }}>{item.icon}</div>
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
