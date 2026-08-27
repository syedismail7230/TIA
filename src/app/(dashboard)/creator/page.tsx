'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';

// ============================================================================
// VECTOR SVG BRAND & NAVIGATION ICONS
// ============================================================================

function MarketplaceIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CollabsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PaymentsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function SocialsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function SettingsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-g" cx="20%" cy="100%" r="130%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="25%" stopColor="#FF543E" />
          <stop offset="50%" stopColor="#C837AB" />
          <stop offset="100%" stopColor="#377424" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ig-l" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#405DE6" />
          <stop offset="30%" stopColor="#5851DB" />
          <stop offset="50%" stopColor="#833AB4" />
          <stop offset="70%" stopColor="#C13584" />
          <stop offset="85%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#FD1D1D" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-l)" />
      <rect width="24" height="24" rx="6" fill="url(#ig-g)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.75" fill="none" />
      <circle cx="12" cy="12" r="3.25" stroke="#FFFFFF" strokeWidth="1.75" fill="none" />
      <circle cx="15.5" cy="8.5" r="0.85" fill="#FFFFFF" />
    </svg>
  );
}

function YouTubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M9.5 8.5L16 12L9.5 15.5V8.5Z" fill="#FFFFFF" />
    </svg>
  );
}

function TikTokIcon({ size = 15 }: { size?: number }) {
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

function XIcon({ size = 15 }: { size?: number }) {
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

function PinterestIcon({ size = 15 }: { size?: number }) {
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

function PercentBadgeIcon({ size = 12, color = '#7C3AED' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="9" y1="15" x2="15" y2="9" />
      <circle cx="9.5" cy="9.5" r="1" fill={color} />
      <circle cx="14.5" cy="14.5" r="1" fill={color} />
    </svg>
  );
}

function SparklesIcon({ size = 13, color = '#0052FF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" />
    </svg>
  );
}

function InfoCircleIcon({ size = 13, color = '#D97706' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
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

  // Search & Filter State
  const [showMatchBanner, setShowMatchBanner] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedCommercialType, setSelectedCommercialType] = useState('ALL');
  const [sortBy, setSortBy] = useState<'success_rate' | 'applicants' | 'newest'>('success_rate');

  // Social accounts state
  const [socialAccounts, setSocialAccounts] = useState<any[]>([
    { platform: 'INSTAGRAM', username: 'creator.official', audienceSize: 320000, engagementRate: 4.85, connected: true },
    { platform: 'YOUTUBE', username: 'creatortech', audienceSize: 185000, engagementRate: 6.2, connected: true },
    { platform: 'X', username: 'creator_x', audienceSize: 45000, engagementRate: 2.1, connected: true },
  ]);

  // Clean Reference-Matched Campaigns Data
  const [campaigns] = useState<any[]>([
    {
      id: 'camp-1',
      title: 'EcoVibe Sustainable Living Challenge',
      brandName: 'EcoVibe Global',
      partnerLogo: '/logos/starbucks-full.svg',
      bannerImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #C2B39B 0%, #8E7A62 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Payment verified by brand',
      payoutAmount: '$750 – $1,500',
      creatorsApplied: 18,
      acceptanceChance: 86,
      eligibilityRate: 94,
      categories: ['Sustainability', 'Cooking', 'Food', '+5'],
      isNew: true,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'Australia',
      countryCode: 'AU',
      countryFlag: '🇦🇺',
      socials: ['INSTAGRAM', 'YOUTUBE'],
      description: 'Create 2x Instagram Reels showcasing zero-waste kitchen lifestyle habits and authentic sustainable cooking tips.',
    },
    {
      id: 'camp-2',
      title: 'Festive Season Artisan Gourmet Unboxing',
      brandName: 'Nectar Bites Gourmet',
      partnerLogo: '/logos/cocacola-full.svg',
      bannerImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #E2E8F0 0%, #94A3B8 50%, #475569 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Payment verified by brand',
      payoutAmount: '$600 – $950',
      creatorsApplied: 24,
      acceptanceChance: 92,
      eligibilityRate: 98,
      categories: ['Festivals', 'Food', 'Lifestyle', '+2'],
      isNew: true,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'Italy',
      countryCode: 'IT',
      countryFlag: '🇮🇹',
      socials: ['INSTAGRAM', 'PINTEREST', 'YOUTUBE'],
      description: 'Review artisan gift hampers and holiday snack collections with dedicated link-in-bio attribution.',
    },
    {
      id: 'camp-3',
      title: 'Bio-Active Herbal Vitality Booster Launch',
      brandName: 'PureBotanics Laboratory',
      partnerLogo: '/logos/redbull-full.svg',
      bannerImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #B58D67 0%, #7C5A3E 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Payment verified by brand',
      payoutAmount: '$1,200 – $2,400',
      creatorsApplied: 31,
      acceptanceChance: 78,
      eligibilityRate: 88,
      categories: ['Entrepreneurship', 'Supplements'],
      isNew: true,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'United States',
      countryCode: 'US',
      countryFlag: '🇺🇸',
      socials: ['INSTAGRAM', 'X'],
      description: '30-day morning routine vlog integration featuring clean herbal extracts and lab-tested purity certificates.',
    },
    {
      id: 'camp-4',
      title: 'Nexus X1 Ultra 4K Camera Showcase',
      brandName: 'Nexus Tech Global',
      partnerLogo: '/logos/sony-full.svg',
      bannerImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Payment verified by brand',
      payoutAmount: '$2,000 – $3,500',
      creatorsApplied: 42,
      acceptanceChance: 64,
      eligibilityRate: 75,
      categories: ['Technology', 'Gadgets', 'AI', '+3'],
      isNew: true,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'India',
      countryCode: 'IN',
      countryFlag: '🇮🇳',
      socials: ['INSTAGRAM', 'YOUTUBE'],
      description: 'Dedicated 8-10 minute review emphasizing low-light camera sensor performance and AI editing capabilities.',
    },
    {
      id: 'camp-5',
      title: 'Velocity Pro Marathon Performance Shoe',
      brandName: 'Stride Athletics',
      partnerLogo: '/logos/adidas-full.svg',
      bannerImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
      commercialType: 'COMMISSION',
      commercialLabel: 'Payment verified by brand',
      payoutAmount: '$800 – $1,400',
      creatorsApplied: 15,
      acceptanceChance: 89,
      eligibilityRate: 91,
      categories: ['Fitness', 'Running', 'Athleisure'],
      isNew: true,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'United Kingdom',
      countryCode: 'GB',
      countryFlag: '🇬🇧',
      socials: ['INSTAGRAM', 'X'],
      description: 'High-energy running montage with direct swipe-up discount code for community followers.',
    },
    {
      id: 'camp-6',
      title: 'LuxeDerm Anti-Aging Night Serum',
      brandName: 'LuxeDerm Skin Labs',
      partnerLogo: '/logos/zara-full.svg',
      bannerImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      avatarGradient: 'linear-gradient(135deg, #D4B08C 0%, #A07850 100%)',
      commercialType: 'FLAT_FEE',
      commercialLabel: 'Payment verified by brand',
      payoutAmount: '$500 Fixed',
      creatorsApplied: 27,
      acceptanceChance: 82,
      eligibilityRate: 85,
      categories: ['Beauty', 'Skincare', 'Cosmetics', '+2'],
      isNew: true,
      requirementLabel: 'Requirement not met',
      language: 'English',
      country: 'France',
      countryCode: 'FR',
      countryFlag: '🇫🇷',
      socials: ['INSTAGRAM', 'YOUTUBE'],
      description: '7-day nighttime skin transformation diary with macro camera closeups.',
    },
  ]);

  // Filter Categories & Countries Configuration
  const filterCategories = [
    { id: 'ALL', label: 'All Niches' },
    { id: 'Sustainability', label: 'Sustainability' },
    { id: 'Food', label: 'Food & Cooking' },
    { id: 'Lifestyle', label: 'Lifestyle' },
    { id: 'Supplements', label: 'Supplements' },
    { id: 'Technology', label: 'Tech & Gadgets' },
    { id: 'Fitness', label: 'Fitness & Running' },
    { id: 'Beauty', label: 'Beauty & Skincare' },
  ];

  const filterCountries = [
    { code: 'ALL', label: 'All Countries' },
    { code: 'AU', label: '🇦🇺 Australia' },
    { code: 'IT', label: '🇮🇹 Italy' },
    { code: 'US', label: '🇺🇸 United States' },
    { code: 'IN', label: '🇮🇳 India' },
    { code: 'GB', label: '🇬🇧 United Kingdom' },
    { code: 'FR', label: '🇫🇷 France' },
  ];

  // Compute Filtered & Sorted Campaigns
  const filteredCampaigns = campaigns
    .filter((camp) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = camp.title.toLowerCase().includes(q);
        const matchesBrand = camp.brandName.toLowerCase().includes(q);
        const matchesCountry =
          camp.country.toLowerCase().includes(q) || camp.countryCode.toLowerCase().includes(q);
        const matchesCategories = camp.categories.some((cat: string) =>
          cat.toLowerCase().includes(q)
        );
        const matchesDesc = camp.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesCountry && !matchesCategories && !matchesDesc) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'ALL') {
        const matchesCat = camp.categories.some((c: string) =>
          c.toLowerCase().includes(selectedCategory.toLowerCase())
        );
        if (!matchesCat) return false;
      }

      // 3. Country Filter
      if (selectedCountry !== 'ALL') {
        if (camp.countryCode.toLowerCase() !== selectedCountry.toLowerCase()) {
          return false;
        }
      }

      // 4. Commercial Type Filter
      if (selectedCommercialType !== 'ALL') {
        if (camp.commercialType !== selectedCommercialType) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'success_rate') {
        return b.eligibilityRate - a.eligibilityRate;
      }
      if (sortBy === 'applicants') {
        return b.creatorsApplied - a.creatorsApplied;
      }
      if (sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      return 0;
    });

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'ALL' ||
    selectedCountry !== 'ALL' ||
    selectedCommercialType !== 'ALL';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedCountry('ALL');
    setSelectedCommercialType('ALL');
    setSortBy('success_rate');
  };

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
        proposedRate: selectedCampaign.payoutAmount,
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

  const navTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'marketplace', label: 'Marketplace', icon: <MarketplaceIcon size={16} /> },
    { id: 'collabs', label: 'Collabs', icon: <CollabsIcon size={16} /> },
    { id: 'payments', label: 'Payments', icon: <PaymentsIcon size={16} /> },
    { id: 'social-media', label: 'Social Media', icon: <SocialsIcon size={16} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={16} /> },
  ];

  const renderThemeSocialIcon = (platform: string) => {
    switch (platform) {
      case 'INSTAGRAM':
        return (
          <span key={platform} title="Instagram" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </span>
        );
      case 'YOUTUBE':
        return (
          <span key={platform} title="YouTube" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
            </svg>
          </span>
        );
      case 'X':
        return (
          <span key={platform} title="X (Twitter)" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </span>
        );
      case 'PINTEREST':
        return (
          <span key={platform} title="Pinterest" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.14-.97.94-3.98.94-3.98s-.24-.48-.24-1.2c0-1.12.65-1.96 1.46-1.96.69 0 1.02.52 1.02 1.14 0 .7-.44 1.74-.67 2.7-.19.81.4 1.47 1.2 1.47 1.44 0 2.54-1.52 2.54-3.71 0-1.94-1.39-3.3-3.38-3.3-2.3 0-3.66 1.73-3.66 3.51 0 .7.27 1.44.6 1.84a.3.3 0 0 1 .07.29c-.08.32-.25 1.02-.28 1.16-.05.18-.15.22-.35.13-1.33-.62-2.16-2.56-2.16-4.12 0-3.36 2.44-6.44 7.04-6.44 3.7 0 6.57 2.63 6.57 6.15 0 3.67-2.31 6.63-5.52 6.63-1.08 0-2.09-.56-2.44-1.22l-.66 2.53c-.24.93-.89 2.09-1.33 2.79A12 12 0 1 0 12 0z"/>
            </svg>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'inherit', width: '100%', paddingBottom: '76px' }}>
      {/* Design System Global Styles */}
      <style jsx global>{`
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

        .portal-header-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .portal-main-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px;
        }

        .portal-nav-segmented {
          display: flex;
          align-items: center;
          gap: 28px;
          background: transparent;
          padding: 0;
          border: none;
          border-bottom: 1px solid #E2E8F0;
          width: 100%;
        }
        .portal-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 4px 14px 4px;
          font-size: 13.5px;
          font-weight: 500;
          border-radius: 0;
          border: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          cursor: pointer;
          transition: all 0.15s ease;
          color: #64748B;
          background: transparent;
        }
        .portal-tab-pill:hover:not(.active) {
          color: #0F172A;
          border-bottom: 2px solid #CBD5E1;
        }
        .portal-tab-pill.active {
          background: transparent;
          color: #0052FF;
          font-weight: 700;
          border-bottom: 2px solid #0052FF;
          box-shadow: none;
        }

        .upfluence-card {
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .upfluence-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        @media (max-width: 768px) {
          .portal-header-wrapper {
            height: 56px;
            padding: 0 16px;
          }
          .portal-main-wrapper {
            padding: 12px 14px 80px 14px;
          }
          .portal-nav-segmented-container {
            display: none !important;
          }
        }

        .portal-mobile-bottom-nav {
          display: none;
        }
        @media (max-width: 768px) {
          .portal-mobile-bottom-nav {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 62px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-top: 1px solid #E2E8F0;
            z-index: 999;
            justify-content: space-around;
            align-items: center;
            padding: 0 8px;
            box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.03);
          }
          .portal-bottom-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            border: none;
            background: transparent;
            cursor: pointer;
            padding: 6px 10px;
            border-radius: 8px;
            color: #64748B;
            font-size: 10.5px;
            font-weight: 600;
            transition: all 0.15s ease;
            flex: 1;
          }
          .portal-bottom-nav-item.active {
            color: #0052FF;
            font-weight: 800;
          }
          .portal-bottom-nav-item.active svg {
            stroke: #0052FF;
          }
        }
      `}</style>

      {/* Top Header Navigation Bar */}
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
        <div className="portal-header-wrapper">
          {/* Logo & Portal Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
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
                  padding: '2px 7px',
                  borderRadius: '4px',
                  letterSpacing: '0.04em',
                }}
              >
                PORTAL
              </span>
            </Link>
          </div>

          {/* User Profile & Sign Out on Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontSize: '12.5px', color: '#1E293B', fontWeight: 600 }}>
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
                fontSize: '12px',
                color: '#64748B',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                padding: '4px 8px',
                borderRadius: '6px',
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="portal-main-wrapper">
        {/* Nav Tabs (Desktop Only, Mobile uses bottom navigation) */}
        <div className="portal-nav-segmented-container" style={{ marginBottom: '20px' }}>
          <nav className="portal-nav-segmented no-scrollbar">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`portal-tab-pill ${isActive ? 'active' : ''}`}
                >
                  <span style={{ color: isActive ? '#0052FF' : '#94A3B8' }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.id === 'collabs' && collabs.length > 0 && (
                    <span
                      style={{
                        backgroundColor: isActive ? '#EFF6FF' : '#E2E8F0',
                        color: isActive ? '#0052FF' : '#64748B',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: '10px',
                      }}
                    >
                      {collabs.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

          {/* ==================================================================== */}
        {/* TAB 1: MARKETPLACE                                                   */}
        {/* ==================================================================== */}
        {activeTab === 'marketplace' && (
          <div>
            {/* High-End Match Booster Banner (Dismissible with ✕) */}
            {showMatchBanner && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #EFF6FF 100%)',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '20px 48px 20px 24px',
                  marginBottom: '20px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '18px',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 380px' }}>
                  {/* Overlapping Social Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', zIndex: 2 }}>
                      <InstagramIcon size={18} />
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', marginLeft: '-10px', zIndex: 1 }}>
                      <YouTubeIcon size={18} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px', letterSpacing: '0.03em' }}>
                        AUDIENCE INTELLIGENCE
                      </span>
                    </div>
                    <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 3px 0', lineHeight: 1.35 }}>
                      We&apos;re actively searching for your perfect campaign!
                    </h2>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                      The more socials you link, the better the chances of finding the right fit for your audience and style.
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
                    padding: '11px 22px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0, 82, 255, 0.25)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>Connect Socials</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                {/* Dismiss Button ✕ */}
                <button
                  type="button"
                  onClick={() => setShowMatchBanner(false)}
                  title="Hide banner"
                  aria-label="Hide banner"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F1F5F9';
                    e.currentTarget.style.color = '#0F172A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#94A3B8';
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}

            {/* Search, Filter & Sort Toolbar (Clean, Cardless) */}
            <div
              style={{
                marginBottom: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Row 1: Search Input + Select Dropdowns */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                {/* Search Input */}
                <div
                  style={{
                    position: 'relative',
                    flex: '1 1 240px',
                    minWidth: '200px',
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                    }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search campaigns, brands, or niches..."
                    style={{
                      width: '100%',
                      padding: '9px 32px 9px 36px',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#0F172A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      outline: 'none',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                      transition: 'all 0.15s ease',
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '12px',
                        padding: '2px',
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Country Filter */}
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  style={{
                    padding: '9px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#334155',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                  }}
                >
                  {filterCountries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>

                {/* Commercial Type Filter */}
                <select
                  value={selectedCommercialType}
                  onChange={(e) => setSelectedCommercialType(e.target.value)}
                  style={{
                    padding: '9px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#334155',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                  }}
                >
                  <option value="ALL">All Deal Types</option>
                  <option value="COMMISSION">Commission %</option>
                  <option value="FLAT_FEE">Flat Fee Guaranteed</option>
                </select>

                {/* Sort By Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  style={{
                    padding: '9px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#334155',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                  }}
                >
                  <option value="success_rate">Sort: Highest Match</option>
                  <option value="applicants">Sort: Most Popular</option>
                  <option value="newest">Sort: Newest</option>
                </select>
              </div>

              {/* Row 2: Category Quick Chips */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  overflowX: 'auto',
                  paddingBottom: '2px',
                  scrollbarWidth: 'none',
                }}
              >
                {filterCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        padding: '5px 12px',
                        fontSize: '11.5px',
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? '#0052FF' : '#64748B',
                        backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                        border: isSelected ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    style={{
                      padding: '5px 10px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: '#EF4444',
                      backgroundColor: '#FEF2F2',
                      border: '1px solid #FECACA',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      marginLeft: 'auto',
                    }}
                  >
                    Reset Filters ✕
                  </button>
                )}
              </div>
            </div>

            {/* Section Heading + Count */}
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>🎁</span>
                <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Keep growing, and these could be yours soon!
                </h3>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                Showing {filteredCampaigns.length} of {campaigns.length} opportunities
              </span>
            </div>

            {/* Exact Reference-Matched Clean Cards Grid */}
            {filteredCampaigns.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px dashed #CBD5E1',
                  borderRadius: '16px',
                  padding: '48px 24px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
                  No campaigns match your filters
                </h4>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0' }}>
                  Try changing your search terms, selecting a different niche, or clearing your active filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 18px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                  gap: '20px',
                }}
              >
                {filteredCampaigns.map((camp) => (
                  <div
                    key={camp.id}
                    onClick={() => handleApply(camp)}
                    className="upfluence-card"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '16px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Top Cover Banner */}
                    <div
                      style={{
                        height: '140px',
                        position: 'relative',
                        backgroundColor: '#CBD5E1',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                      }}
                    >
                      {/* Blurred Image Wrapper (Inner overflow hidden to maintain top corner radius) */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          overflow: 'hidden',
                          borderTopLeftRadius: '16px',
                          borderTopRightRadius: '16px',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: -12,
                            left: -12,
                            right: -12,
                            bottom: -12,
                            backgroundImage: `url(${camp.bannerImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(16px) saturate(1.2)',
                            transform: 'scale(1.2)',
                          }}
                        />
                      </div>

                      {/* Payment Verified Pill Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: '#FFFFFF',
                          color: '#7C3AED',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 800,
                          letterSpacing: '0.01em',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                          zIndex: 2,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <polyline points="9 12 11 14 15 10" />
                        </svg>
                        <span>{camp.commercialLabel}</span>
                      </div>

                      {/* Smooth Rounded Avatar Box with Blurred Brand Logo */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-18px',
                          left: '16px',
                          width: '48px',
                          height: '48px',
                          backgroundColor: '#FFFFFF',
                          border: '2.5px solid #FFFFFF',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                          zIndex: 3,
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px',
                        }}
                      >
                        <img
                          src={camp.partnerLogo}
                          alt="Partner Brand Logo"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            filter: 'blur(3.5px)',
                            transform: 'scale(1.15)',
                            display: 'block',
                          }}
                        />
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div style={{ padding: '26px 16px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Row 1: Blurred Brand + Divider + Category Capsule Pills */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 700,
                            color: '#64748B',
                            filter: 'blur(3.5px)',
                            userSelect: 'none',
                          }}
                        >
                          Anonymized brand
                        </span>

                        <span style={{ width: '1px', height: '11px', backgroundColor: '#E2E8F0', margin: '0 2px' }} />

                        {camp.categories.map((cat: string, idx: number) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color: '#334155',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              padding: '3px 10px',
                              borderRadius: '20px',
                            }}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Row 2: Blurred Title + "New" Sparkle Capsule Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span
                          style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: '#0F172A',
                            filter: 'blur(3.5px)',
                            userSelect: 'none',
                          }}
                        >
                          Anonymized campaign name
                        </span>

                        {camp.isNew && (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#0052FF',
                              backgroundColor: '#EFF6FF',
                              border: '1px solid #BFDBFE',
                              padding: '2px 8px',
                              borderRadius: '12px',
                            }}
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            New
                          </span>
                        )}
                      </div>

                      {/* Row 3: Status Badge */}
                      <div style={{ marginBottom: '14px' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#059669',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          <span>You are eligible ✓</span>
                        </div>
                      </div>

                      {/* Row 4: Clean Metadata List */}
                      <div
                        style={{
                          borderTop: '1px solid #F1F5F9',
                          paddingTop: '12px',
                          marginTop: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          fontSize: '12px',
                        }}
                      >
                        {/* Profile Success Rate */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Your profile success rate</span>
                          <span style={{ fontWeight: 700, color: '#0F172A' }}>
                            {camp.eligibilityRate}%
                          </span>
                        </div>

                        {/* Language */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Language</span>
                          <span style={{ fontWeight: 600, color: '#0F172A' }}>{camp.language}</span>
                        </div>

                        {/* Country Flag & Full Name */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Country</span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <img
                              src={`https://flagcdn.com/w40/${camp.countryCode.toLowerCase()}.png`}
                              alt={camp.country}
                              style={{
                                width: '16px',
                                height: '11px',
                                objectFit: 'cover',
                                borderRadius: '2px',
                                display: 'block',
                              }}
                            />
                            <span style={{ fontWeight: 600, color: '#0F172A' }}>
                              {camp.country}
                            </span>
                          </div>
                        </div>

                        {/* Socials - No Card Box, Clean Theme Icons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Socials</span>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {camp.socials.map((s: string) => renderThemeSocialIcon(s))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: COLLABS                                                       */}
        {/* ==================================================================== */}
        {activeTab === 'collabs' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', overflowX: 'auto', paddingBottom: '4px' }}>
              {[
                { id: 'awaiting', label: '⏳ Awaiting Review', count: collabs.filter((c) => c.status === 'AWAITING').length },
                { id: 'accepted', label: '🌿 Accepted & Active', count: collabs.filter((c) => c.status === 'ACCEPTED').length },
                { id: 'rejected', label: '🚫 Archived', count: collabs.filter((c) => c.status === 'REJECTED').length },
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
                      backgroundColor: isActive ? '#EFF6FF' : '#FFFFFF',
                      color: isActive ? '#0052FF' : '#475569',
                      border: isActive ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>{pill.label}</span>
                    <span style={{ fontSize: '11px', opacity: 0.85 }}>({pill.count})</span>
                  </button>
                );
              })}
            </div>

            {collabs.filter((c) => c.status.toLowerCase() === collabFilter).length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '50px 16px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>🗂️</div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
                  No active threads in this view
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '380px', margin: '0 auto 18px auto', lineHeight: 1.45 }}>
                  Once you apply to a campaign, your proposal and messages with brand managers will appear here.
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
                  Browse Marketplace Opportunities
                </button>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '480px',
                }}
              >
                {/* Thread Header */}
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
                  <div>
                    <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {selectedCollab.subject}
                    </h3>
                    <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                      {selectedCollab.brandName} • Rate {selectedCollab.proposedRate}
                    </div>
                  </div>
                </div>

                {/* Messages List */}
                <div style={{ padding: '16px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedCollab.messages.map((msg: any) => (
                    <div
                      key={msg.id}
                      style={{
                        backgroundColor: msg.sender === 'CREATOR' ? '#EFF6FF' : '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '12px 14px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                          {msg.senderName}
                        </span>
                        <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>{msg.date}</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: '#334155', margin: 0, lineHeight: 1.4 }}>{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Reply Input Bar */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your reply to brand manager..."
                    style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px' }}
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    style={{ backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '10px 18px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Reply
                  </button>
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
              <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', fontSize: '12.5px', fontWeight: 600 }}>
                ✓ Payout claimed successfully to your verified bank account!
              </div>
            )}

            {/* Metric Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '14px', marginBottom: '22px' }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '16px' }}>$</div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Total received</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>$25,345.00</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⌛</div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Total pending escrow</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>$5,952.45</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#0052FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⚡</div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Available to claim</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#0052FF' }}>$12,356.70</div>
                </div>
              </div>
            </div>

            {/* Scrollable Transactions Table */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '560px', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                    <th style={{ padding: '12px 16px' }}>Brand / Campaign</th>
                    <th style={{ padding: '12px 16px' }}>Contract Rate</th>
                    <th style={{ padding: '12px 16px' }}>Authorized Date</th>
                    <th style={{ padding: '12px 16px' }}>Escrow Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '12.5px' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{p.mediaName}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{p.campaign}</div>
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 900, color: '#0052FF' }}>{p.amount}</td>
                      <td style={{ padding: '14px 16px', color: '#64748B' }}>{p.authorizedAt}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: p.status === 'PAID' ? '#ECFDF5' : '#FEF3C7', color: p.status === 'PAID' ? '#059669' : '#92400E' }}>
                          {p.status === 'PAID' ? '✓ Disbursed' : '⏱ Ready to Claim'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button type="button" onClick={() => handleClaimPayout(p.id)} style={{ backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '6px 14px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}>
                          {p.status === 'UNCLAIMED' ? 'Claim Now' : 'Receipt'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: SOCIAL MEDIA                                                  */}
        {/* ==================================================================== */}
        {activeTab === 'social-media' && (
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>Connected Creator Channels</h2>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                Authenticate your official social media accounts to sync real-time follower counts and unlock higher brand rate cards.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
              {[
                { id: 'INSTAGRAM', name: 'Instagram Creator', icon: <InstagramIcon size={22} /> },
                { id: 'YOUTUBE', name: 'YouTube Partner Channel', icon: <YouTubeIcon size={22} /> },
                { id: 'X', name: 'X / Twitter Creator Account', icon: <XIcon size={22} /> },
              ].map((plat, idx) => {
                const account = socialAccounts.find((a) => a.platform === plat.id);
                return (
                  <div key={plat.id} style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx < 2 ? '1px solid #F1F5F9' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {plat.icon}
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>{plat.name}</div>
                        {account?.connected ? (
                          <div style={{ fontSize: '11.5px', color: '#64748B' }}>@{account.username} • {(account.audienceSize / 1000).toFixed(0)}k followers • {account.engagementRate}% ER</div>
                        ) : (
                          <div style={{ fontSize: '11.5px', color: '#94A3B8' }}>Not connected yet</div>
                        )}
                      </div>
                    </div>
                    {account?.connected ? (
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '4px 10px', borderRadius: '6px' }}>✓ Verified Active</span>
                    ) : (
                      <button type="button" onClick={() => handleConnectOAuth(plat.id)} style={{ backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '6px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Connect Channel</button>
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
          <div style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>Creator Profile & Rates</h2>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Public Display Name</label>
              <input type="text" defaultValue={displayName} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '16px', fontSize: '13px' }} />
            </div>
            <button type="button" style={{ backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Save Changes</button>
          </div>
        )}
      </main>

      {/* Fixed Mobile Bottom Navigation Bar */}
      <nav className="portal-mobile-bottom-nav">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`portal-bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <div>{tab.icon}</div>
              <span>{tab.label === 'Social Media' ? 'Socials' : tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Campaign Detail & Application Modal */}
      {selectedCampaign && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '480px', borderRadius: '20px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}>
            {applySuccess ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>Proposal Dispatched!</h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Opening your Collabs thread with {selectedCampaign.brandName}...</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#7C3AED', backgroundColor: '#F5F3FF', padding: '2px 8px', borderRadius: '6px' }}>
                        {selectedCampaign.commercialLabel}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '6px' }}>
                        {selectedCampaign.payoutAmount}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: '#0F172A', margin: '4px 0 0 0' }}>{selectedCampaign.title}</h3>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{selectedCampaign.brandName} • {selectedCampaign.countryFlag} {selectedCampaign.country}</div>
                  </div>
                  <button type="button" onClick={() => setSelectedCampaign(null)} style={{ backgroundColor: '#F1F5F9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer', color: '#64748B' }}>✕</button>
                </div>

                {/* Intelligence Metrics in Modal */}
                <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px', marginBottom: '16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>Your Profile Success Rate</div>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#0284C7', marginTop: '2px' }}>{selectedCampaign.eligibilityRate}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>Applicants</div>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>{selectedCampaign.creatorsApplied}</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '14px', borderRadius: '10px', marginBottom: '18px', fontSize: '12.5px', color: '#334155', lineHeight: 1.5 }}>
                  <strong style={{ color: '#0F172A' }}>Deliverables Brief:</strong> {selectedCampaign.description}
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setSelectedCampaign(null)} style={{ padding: '10px 18px', backgroundColor: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  <button type="button" onClick={submitApplication} style={{ padding: '10px 22px', backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,82,255,0.25)' }}>Submit Application</button>
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
