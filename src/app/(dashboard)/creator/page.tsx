'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';
import { INITIAL_CAMPAIGNS, CampaignItem } from '@/data/campaigns-data';

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

function SlidersIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
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

function CountryFlag({ code, size = 18 }: { code: string; size?: number }) {
  if (!code || code.toUpperCase() === 'ALL') return null;
  const width = size;
  const height = Math.round((size * 3) / 4);

  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
      width={width}
      height={height}
      alt={code}
      style={{
        borderRadius: '2px',
        objectFit: 'cover',
        display: 'inline-block',
        flexShrink: 0,
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        verticalAlign: 'middle',
      }}
      loading="lazy"
    />
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
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#user-profile-dropdown-container')) {
        setProfileDropdownOpen(false);
      }
      if (!target.closest('#country-filter-dropdown-container')) {
        setCountryDropdownOpen(false);
      }
    };
    if (profileDropdownOpen || countryDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [profileDropdownOpen, countryDropdownOpen]);

  // Application Credits & Free Applies State (1 Free Apply initially, ₹99/credit thereafter)
  const [applyCredits, setApplyCredits] = useState<number>(1);
  const [totalAppliesCount, setTotalAppliesCount] = useState<number>(0);
  const [creditPurchaseSuccess, setCreditPurchaseSuccess] = useState<string | null>(null);
  const [showBuyCreditsModal, setShowBuyCreditsModal] = useState<boolean>(false);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [bidSubmittedSuccess, setBidSubmittedSuccess] = useState<boolean>(false);

  // Dynamic Time-Aware Personalized Greeting
  const [dynamicGreeting, setDynamicGreeting] = useState<{ title: string; subtitle: string }>({
    title: 'Welcome back, Creator!',
    subtitle: 'Explore the latest hand-picked brand deals tailored for you.',
  });

  useEffect(() => {
    const hour = new Date().getHours();
    const name = currentUser?.name ? currentUser.name.split(' ')[0] : 'Creator';

    let timeTitle = '';
    let pool: string[] = [];

    if (hour >= 5 && hour < 12) {
      timeTitle = `Good morning, ${name}!`;
      pool = [
        "Here are today's fresh brand sponsorships ready for your pitch.",
        "Start your morning with high-paying verified brand opportunities.",
        "Exciting campaigns just dropped in your niche today.",
        "Brands are actively seeking creative partners this morning.",
      ];
    } else if (hour >= 12 && hour < 17) {
      timeTitle = `Good afternoon, ${name}!`;
      pool = [
        "Take a look at newly verified brand deals waiting for you.",
        "Great time to submit your proposals and lock in new sponsorships.",
        "Discover the top brand opportunities matched to your audience.",
        "New campaigns have been added to your personalized feed.",
      ];
    } else if (hour >= 17 && hour < 22) {
      timeTitle = `Good evening, ${name}!`;
      pool = [
        "Wrap up your day by exploring top-paying brand collaborations.",
        "Check out high-converting campaigns open for bids tonight.",
        "New brand briefs match your content style and audience demographic.",
        "Review the latest verified campaigns and submit your bids.",
      ];
    } else {
      timeTitle = `Good night, ${name}!`;
      pool = [
        "Explore night-owl campaign drops and get ahead of the applicant queue.",
        "Plan tomorrow's sponsorships with these verified brand opportunities.",
        "Midnight opportunities matched directly to your profile.",
        "Discover handpicked brand collaborations ready for your pitch.",
      ];
    }

    const randomSubtitle = pool[Math.floor(Math.random() * pool.length)];
    setDynamicGreeting({
      title: timeTitle,
      subtitle: randomSubtitle,
    });
  }, [currentUser]);

  // Proposal & Bid State for Full-Page Project View (Freelancer.com Inspiration)
  const [bidAmount, setBidAmount] = useState<string>('700');
  const [bidDays, setBidDays] = useState<string>('14');
  const [proposalPitch, setProposalPitch] = useState<string>('');

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

  // Clean Reference-Matched Campaigns Data (56 Rich Campaigns with Localized Currency & Language)
  const [campaigns] = useState<CampaignItem[]>(INITIAL_CAMPAIGNS);

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
    { code: 'AR', label: 'Argentina' },
    { code: 'AU', label: 'Australia' },
    { code: 'AT', label: 'Austria' },
    { code: 'BH', label: 'Bahrain' },
    { code: 'BD', label: 'Bangladesh' },
    { code: 'BE', label: 'Belgium' },
    { code: 'BR', label: 'Brazil' },
    { code: 'BG', label: 'Bulgaria' },
    { code: 'CA', label: 'Canada' },
    { code: 'CL', label: 'Chile' },
    { code: 'CN', label: 'China' },
    { code: 'CO', label: 'Colombia' },
    { code: 'HR', label: 'Croatia' },
    { code: 'CY', label: 'Cyprus' },
    { code: 'CZ', label: 'Czech Republic' },
    { code: 'DK', label: 'Denmark' },
    { code: 'EG', label: 'Egypt' },
    { code: 'EE', label: 'Estonia' },
    { code: 'FI', label: 'Finland' },
    { code: 'FR', label: 'France' },
    { code: 'GE', label: 'Georgia' },
    { code: 'DE', label: 'Germany' },
    { code: 'GR', label: 'Greece' },
    { code: 'HK', label: 'Hong Kong' },
    { code: 'HU', label: 'Hungary' },
    { code: 'IS', label: 'Iceland' },
    { code: 'IN', label: 'India' },
    { code: 'ID', label: 'Indonesia' },
    { code: 'IE', label: 'Ireland' },
    { code: 'IL', label: 'Israel' },
    { code: 'IT', label: 'Italy' },
    { code: 'JP', label: 'Japan' },
    { code: 'JO', label: 'Jordan' },
    { code: 'KZ', label: 'Kazakhstan' },
    { code: 'KE', label: 'Kenya' },
    { code: 'KW', label: 'Kuwait' },
    { code: 'LV', label: 'Latvia' },
    { code: 'LB', label: 'Lebanon' },
    { code: 'LT', label: 'Lithuania' },
    { code: 'LU', label: 'Luxembourg' },
    { code: 'MY', label: 'Malaysia' },
    { code: 'MX', label: 'Mexico' },
    { code: 'MA', label: 'Morocco' },
    { code: 'NL', label: 'Netherlands' },
    { code: 'NZ', label: 'New Zealand' },
    { code: 'NG', label: 'Nigeria' },
    { code: 'NO', label: 'Norway' },
    { code: 'OM', label: 'Oman' },
    { code: 'PK', label: 'Pakistan' },
    { code: 'PH', label: 'Philippines' },
    { code: 'PL', label: 'Poland' },
    { code: 'PT', label: 'Portugal' },
    { code: 'QA', label: 'Qatar' },
    { code: 'RO', label: 'Romania' },
    { code: 'SA', label: 'Saudi Arabia' },
    { code: 'SG', label: 'Singapore' },
    { code: 'ZA', label: 'South Africa' },
    { code: 'KR', label: 'South Korea' },
    { code: 'ES', label: 'Spain' },
    { code: 'LK', label: 'Sri Lanka' },
    { code: 'SE', label: 'Sweden' },
    { code: 'CH', label: 'Switzerland' },
    { code: 'TW', label: 'Taiwan' },
    { code: 'TH', label: 'Thailand' },
    { code: 'TR', label: 'Turkey' },
    { code: 'UA', label: 'Ukraine' },
    { code: 'AE', label: 'United Arab Emirates' },
    { code: 'GB', label: 'United Kingdom' },
    { code: 'US', label: 'United States' },
    { code: 'VN', label: 'Vietnam' },
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

  const activeFiltersCount =
    (selectedCategory !== 'ALL' ? 1 : 0) +
    (selectedCountry !== 'ALL' ? 1 : 0) +
    (selectedCommercialType !== 'ALL' ? 1 : 0) +
    (sortBy !== 'success_rate' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'ALL' ||
    selectedCountry !== 'ALL' ||
    selectedCommercialType !== 'ALL' ||
    sortBy !== 'success_rate';

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
    setBidAmount(campaign.payoutAmount?.replace(/[^0-9]/g, '') || '45000');
    setBidDays('14');
    setProposalPitch('');
    setApplySuccess(false);
    setBidSubmittedSuccess(false);
    setShowApplyModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyCredits = (count: number, costInr: number) => {
    setApplyCredits((prev) => prev + count);
    setPayments((prev) => [
      {
        id: `tx-cred-${Date.now()}`,
        mediaName: 'TIA Application Credits Top-up',
        initials: 'CR',
        campaign: `${count} Application Credits Pack (₹99/credit)`,
        amount: `₹${costInr}`,
        authorizedAt: 'Just now',
        status: 'PAID',
      },
      ...prev,
    ]);
    setCreditPurchaseSuccess(`✓ Added ${count} Application Credits for ₹${costInr}!`);
    setShowBuyCreditsModal(false);
    setTimeout(() => setCreditPurchaseSuccess(null), 4000);
  };

  const submitApplication = () => {
    if (!selectedCampaign) return;
    if (applyCredits <= 0) {
      setShowApplyModal(false);
      setSelectedCampaign(null);
      handleTabChange('payments');
      return;
    }

    // Deduct 1 credit & increment total applies
    setApplyCredits((prev) => Math.max(0, prev - 1));
    setTotalAppliesCount((prev) => prev + 1);

    const currSym = selectedCampaign.currencySymbol || '$';
    const currCode = selectedCampaign.currencyCode || 'USD';
    const currAmount = bidAmount || selectedCampaign.payoutAmount?.replace(/[^0-9]/g, '') || '45000';

    setCollabs((prev) => [
      {
        id: `collab-${Date.now()}`,
        campaignTitle: selectedCampaign.title,
        subject: selectedCampaign.title,
        brandName: selectedCampaign.brandName,
        brandInitials: selectedCampaign.brandName.substring(0, 2).toUpperCase(),
        status: 'AWAITING',
        appliedAt: 'Just now',
        proposedRate: `${currSym}${currAmount} ${currCode}`,
        deliverables: selectedCampaign.deliverablesSummary || selectedCampaign.description,
        unreadCount: 1,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'BRAND',
            senderName: `${selectedCampaign.brandName} (Brand Lead)`,
            badge: 'Proposal Received',
            badgeColor: '#059669',
            badgeBg: '#ECFDF5',
            date: 'Just now',
            text: `Hi! We received your verified bid of ${currSym}${currAmount} ${currCode} (${bidDays || '14'} days delivery) for ${selectedCampaign.title}. Your profile matches our audience criteria. We will review your pitch and confirm the milestone deposit shortly.`,
          },
          {
            id: `msg-${Date.now() + 1}`,
            sender: 'CREATOR',
            senderName: 'You',
            badge: 'Application Form',
            badgeColor: '#0052FF',
            badgeBg: '#EFF6FF',
            date: 'Just now',
            text: proposalPitch || `Submitted proposal for ${selectedCampaign.title} at ${currSym}${currAmount} ${currCode}. Ready to deliver ${selectedCampaign.deliverablesSummary || selectedCampaign.description}.`,
          },
        ],
      },
      ...prev,
    ]);

    // Show bid placement confirmation screen in modal
    setBidSubmittedSuccess(true);
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

  const renderProfileRanksAndApplyWidget = () => {
    if (!selectedCampaign) return null;
    return (
      <>
        {/* Applicant Competition & Profile Standing Benchmark Graph */}
        <div className="cd-card">
          {/* Personalized User Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#0052FF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
              {displayName ? displayName.charAt(0).toUpperCase() : 'C'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  How Your Profile Ranks
                </h3>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <span>⭐</span> Top {Math.max(2, 100 - (selectedCampaign.eligibilityRate || 95))}%
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Comparing <strong>@{displayName}</strong> against {selectedCampaign.creatorsApplied} applicants
              </div>
            </div>
          </div>

          {/* Explicit Two-Side Legend (Flat / No Card) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', fontSize: '10.5px', fontWeight: 700, flexWrap: 'wrap', gap: '4px', padding: '0 2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748B' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#94A3B8' }}></div>
              <span>Other Applicants Avg</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#0052FF' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#0052FF' }}></div>
              <span>Your Profile (@{displayName})</span>
            </div>
          </div>

          {/* Hero Match Score Summary (Flat / No Card) */}
          <div style={{ marginBottom: '14px', padding: '0 2px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Your Profile Match Score
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#0052FF', marginTop: '2px', lineHeight: 1 }}>
                  {selectedCampaign.eligibilityRate || 98}%
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#059669' }}>
                  High Probability
                </span>
                <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', fontWeight: 600 }}>
                  Top {Math.max(2, 100 - (selectedCampaign.eligibilityRate || 95))}% tier
                </div>
              </div>
            </div>

            {/* Tiered Range Progress Bar */}
            <div style={{ position: 'relative', marginTop: '10px', marginBottom: '4px' }}>
              <div style={{ height: '7px', width: '100%', backgroundColor: '#E2E8F0', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '40%', height: '100%', backgroundColor: '#CBD5E1' }} title="Average Pool"></div>
                <div style={{ width: '35%', height: '100%', backgroundColor: '#93C5FD' }} title="Competitive Tier"></div>
                <div style={{ width: '25%', height: '100%', backgroundColor: '#0052FF' }} title="Your Tier (Top Match)"></div>
              </div>

              {/* Your Position Indicator Needle */}
              <div style={{ position: 'absolute', left: `${Math.min(96, selectedCampaign.eligibilityRate || 95)}%`, top: '-4px', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#0052FF', border: '2.5px solid #FFFFFF', boxShadow: '0 2px 6px rgba(0, 82, 255, 0.4)' }}></div>
              </div>

              {/* Tier Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748B', fontWeight: 700, marginTop: '6px' }}>
                <span>Avg: 45%</span>
                <span>75%</span>
                <span style={{ color: '#0052FF', fontWeight: 900 }}>You: {selectedCampaign.eligibilityRate || 98}%</span>
              </div>
            </div>
          </div>

          {/* 3 Circular Pie / Donut Charts in Grid (Flat / No Cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', marginBottom: '12px', padding: '4px 0' }}>
            {/* Chart 1: Engagement Rate */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '58px', height: '58px', marginBottom: '6px' }}>
                <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.42)}`} />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#0052FF" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.87)}`} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>8.7%</span>
                  <span style={{ fontSize: '7.5px', color: '#0052FF', fontWeight: 800 }}>YOU</span>
                </div>
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                Engagement
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                Avg: 4.2%
              </div>
              <div style={{ marginTop: '4px', fontSize: '9px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '1px 4px', borderRadius: '3px' }}>
                +107% vs Avg
              </div>
            </div>

            {/* Chart 2: Niche Relevance */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '58px', height: '58px', marginBottom: '6px' }}>
                <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.68)}`} />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.96)}`} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>96%</span>
                  <span style={{ fontSize: '7.5px', color: '#059669', fontWeight: 800 }}>YOU</span>
                </div>
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                Niche Match
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                Avg: 68%
              </div>
              <div style={{ marginTop: '4px', fontSize: '9px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '1px 4px', borderRadius: '3px' }}>
                Top Category
              </div>
            </div>

            {/* Chart 3: Audience Geography */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '58px', height: '58px', marginBottom: '6px' }}>
                <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.51)}`} />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#0052FF" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.84)}`} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>84%</span>
                  <span style={{ fontSize: '7.5px', color: '#0052FF', fontWeight: 800 }}>YOU</span>
                </div>
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                Audience Fit
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                Avg: 51%
              </div>
              <div style={{ marginTop: '4px', fontSize: '9px', fontWeight: 800, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '1px 4px', borderRadius: '3px' }}>
                Direct Fit
              </div>
            </div>
          </div>

          {/* Advantage Footnote */}
          <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#059669', fontWeight: 700 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Based on your connected stats, your bid has high client visibility</span>
          </div>
        </div>

        {/* Action Card (Apply to Project) */}
        <div className="cd-card">
          <button
            type="button"
            onClick={() => setShowApplyModal(true)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0052FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 82, 255, 0.25)',
              marginBottom: '10px',
            }}
          >
            Apply to this Project →
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#059669', fontWeight: 700, justifyContent: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span>100% Payment Protected</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'inherit', width: '100%', paddingBottom: '76px' }}>
      {/* Design System Global Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
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

        .upfluence-card {
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .upfluence-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }
      `}} />

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
        <div
          className="portal-header-wrapper"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Logo & Portal Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                className="tia-desktop-only"
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

          {/* User Profile, Remaining Credits & Sign Out on Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {/* Remaining Credits Inline Indicator (Clean, Borderless, SVG Icon) */}
            <button
              type="button"
              onClick={() => handleTabChange('payments')}
              title="Click to view & top up Application Credits"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '0',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                color: '#0052FF',
                cursor: 'pointer',
                outline: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="#0052FF"
                stroke="#0052FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span style={{ whiteSpace: 'nowrap' }}>{applyCredits} {applyCredits === 1 ? 'Credit' : 'Credits'}</span>
            </button>

            {/* User Profile Dropdown */}
            <div id="user-profile-dropdown-container" style={{ position: 'relative', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: profileDropdownOpen ? '#F1F5F9' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '4px 6px',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background-color 0.15s ease',
                }}
              >
                {/* Clean user profile icon (No card box) */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>

                <span style={{ fontSize: '12px', color: '#1E293B', fontWeight: 600, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser?.email ? currentUser.email.split('@')[0] : 'creator'}
                </span>
                
                <BlueCheckBadge size={13} title="Verified Creator" />

                {/* Subtle Caret */}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: profileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.15s ease',
                    flexShrink: 0,
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Floating Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    width: '210px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #E2E8F0',
                    padding: '6px',
                    zIndex: 1000,
                  }}
                >
                  {/* User info Header */}
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid #F1F5F9', marginBottom: '4px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      @{currentUser?.email ? currentUser.email.split('@')[0] : 'creator'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                      {currentUser?.email || 'creator@tia.agency'}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '5px', backgroundColor: '#EFF6FF', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, color: '#0052FF' }}>
                      <span>✓</span> Verified Creator
                    </div>
                  </div>

                  {/* Settings / Account Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleTabChange('settings');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: '#334155',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <SettingsIcon size={14} color="#64748B" />
                    <span>Account Settings</span>
                  </button>

                  <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '4px 0' }}></div>

                  {/* Logout Option */}
                  <button
                    type="button"
                    onClick={async () => {
                      setProfileDropdownOpen(false);
                      await fetch('/api/auth/logout', { method: 'POST' });
                      router.push('/login');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: '#DC2626',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="portal-main-wrapper" style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Nav Tabs (Desktop Only, Mobile uses bottom navigation) */}
        <div className="portal-nav-segmented-container tia-desktop-only" style={{ marginBottom: '20px' }}>
          <nav
            className="portal-nav-segmented no-scrollbar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              background: 'transparent',
              padding: 0,
              border: 'none',
              borderBottom: '1px solid #E2E8F0',
              width: '100%',
            }}
          >
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`portal-tab-pill ${isActive ? 'active' : ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 4px 14px 4px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 700 : 500,
                    borderRadius: 0,
                    border: 'none',
                    borderBottom: isActive ? '2px solid #0052FF' : '2px solid transparent',
                    marginBottom: '-1px',
                    cursor: 'pointer',
                    color: isActive ? '#0052FF' : '#64748B',
                    background: 'transparent',
                  }}
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
        {activeTab === 'marketplace' && selectedCampaign ? (
          /* ================================================================ */
          /* FULL-PAGE ZOOM-IN PROJECT DETAIL VIEW (FREELANCER.COM STYLE)     */
          /* ================================================================ */
          <div style={{ animation: 'fadeIn 0.2s ease-in-out' }}>
            {/* Top Navigation & Breadcrumbs Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setSelectedCampaign(null)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '7px 14px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#0F172A',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <span>Back to Marketplace</span>
                </button>

                <div className="tia-desktop-only" style={{ fontSize: '11.5px', fontWeight: 600, color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>FREELANCER</span>
                  <span>›</span>
                  <span>CAMPAIGNS</span>
                  <span>›</span>
                  <span style={{ color: '#64748B' }}>{selectedCampaign.categories?.[0] || 'LIFESTYLE'}</span>
                  <span>›</span>
                  <span style={{ color: '#0F172A', fontWeight: 700 }}>{selectedCampaign.title}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B' }}>
                  Project ID: <strong style={{ color: '#0F172A' }}>#TIA-{selectedCampaign.id?.replace('camp-', '406740') || '40674076'}</strong>
                </span>
              </div>
            </div>

            {/* Main 2-Column Freelancer Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', alignItems: 'start' }}>
              {/* LEFT MAIN CONTENT COLUMN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 1. Project Hero Header Card */}
                <div className="cd-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                    <div style={{ flex: '1 1 300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#059669' }}></span>
                          Open for Applications
                        </span>
                        <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>Posted {selectedCampaign.postedAt} • Ends in 18 days</span>
                        </span>
                      </div>
                      <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                        {selectedCampaign.title}
                      </h1>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', color: '#059669', fontWeight: 800, backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1px 6px', borderRadius: '4px' }}>
                          ✓ Verified Client
                        </span>
                        <span>•</span>
                        <span>{selectedCampaign.countryFlag} {selectedCampaign.country}</span>
                        <span>•</span>
                        <span>{selectedCampaign.language}</span>
                      </div>
                    </div>

                    {/* Big Payout & Deliverables Box */}
                    <div className="cd-payout-box">
                      <div style={{ fontSize: '26px', fontWeight: 900, color: '#0052FF', lineHeight: 1, letterSpacing: '-0.02em' }}>
                        {selectedCampaign.payoutAmount}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, marginTop: '4px' }}>
                        {selectedCampaign.payType || 'Fixed Pay'} (100% Protected)
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#0F172A', fontWeight: 700, marginTop: '3px' }}>
                        {selectedCampaign.deliverablesSummary}
                      </div>
                    </div>
                  </div>

                  {/* Quick Project Intelligence Bar */}
                  <div className="cd-intel-grid">
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Your Success Rate</div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0284C7', marginTop: '2px' }}>{selectedCampaign.eligibilityRate}%</div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Active Applicants</div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>{selectedCampaign.creatorsApplied} Creators</div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Project Timeline</div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedCampaign.projectTimeline || 'Sep 5 – Sep 20'}</div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Payment Security</div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#059669', marginTop: '3px' }}>100% Protected</div>
                    </div>
                  </div>
                </div>

                {/* Mobile-Only: Section 2 - How Your Profile Ranks & Apply Action */}
                <div className="tia-mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {renderProfileRanksAndApplyWidget()}
                </div>

                {/* 2. Detailed Campaign Narrative & Scope of Work */}
                <div className="cd-card">
                  <h2 style={{ fontSize: '16.5px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0' }}>
                    Campaign Overview & Creative Brief
                  </h2>
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: '0 0 14px 0' }}>
                    {selectedCampaign.description} We are seeking dynamic, authentic digital creators who have demonstrated high viewer engagement and aesthetic video production in {selectedCampaign.categories?.join(', ')}. The primary objective of this project is to craft captivating, native-feel content that drives high conversion, genuine community discussions, and click-throughs to the campaign tracking link.
                  </p>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Selected Scope of Work
                  </h3>
                  <ul style={{ paddingLeft: '18px', margin: '0 0 16px 0', fontSize: '12.5px', color: '#334155', lineHeight: 1.65 }}>
                    {selectedCampaign.scopeOfWork && selectedCampaign.scopeOfWork.length > 0 ? (
                      selectedCampaign.scopeOfWork.map((scope: any, idx: number) => (
                        <li key={idx}><strong>{scope.title}:</strong> {scope.detail}</li>
                      ))
                    ) : (
                      <>
                        <li><strong>High-Resolution Deliverable:</strong> Produce high-quality content optimized for {selectedCampaign.socials?.join(', ') || 'social platforms'}.</li>
                        <li><strong>Integrated Storytelling:</strong> Seamlessly integrate project themes with authentic voiceover and hook in the first 3 seconds.</li>
                        <li><strong>Tracking & Attribution:</strong> Include dedicated UTM campaign link and pinned comment during the active campaign window.</li>
                        <li><strong>Compliance & Creative Quality:</strong> Deliver raw exports without third-party watermarks or copyrighted audio tracks.</li>
                      </>
                    )}
                  </ul>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Content Directions & Aesthetic Guidelines
                  </h3>
                  <div className="cd-directions-grid">
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" y1="9" x2="9.01" y2="9" />
                          <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                        <span>Tone of Voice & Mood</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.tone || 'Authentic, vibrant, conversational, and energetic. Avoid overly rehearsed corporate sales scripts.'}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="23 7 16 12 23 17 23 7" />
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                        <span>Video & Lighting Setup</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.videoSetup || 'Natural daylight or soft studio lighting. Sharp macro focus when showcasing details.'}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                          <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                        <span>Hashtags & Mentions</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.hashtags || `Include #CreatorCollab and #${selectedCampaign.categories?.[0]?.replace(/\s+/g, '') || 'Lifestyle'}2026 in caption.`}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" y1="19" x2="12" y2="23" />
                          <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                        <span>Audio & Voiceover</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.audio || 'Crystal-clear vocal recording with background ambient music mixed at -18dB. Subtitles mandatory.'}
                      </div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Client Expectations & Milestone Schedule
                  </h3>
                  <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', padding: '12px 14px', marginBottom: '16px', fontSize: '12px', color: '#1E3A8A', lineHeight: 1.55 }}>
                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>Milestone Review Process:</div>
                    {selectedCampaign.milestones && selectedCampaign.milestones.length > 0 ? (
                      selectedCampaign.milestones.map((m: string, idx: number) => (
                        <div key={idx}>{m}</div>
                      ))
                    ) : (
                      <>
                        <div>1. <strong>Concept & Rough Cut:</strong> Due within 5 days of confirmation.</div>
                        <div>2. <strong>Client Review Window:</strong> Approval or revisions within 48 hours.</div>
                        <div>3. <strong>Final Publication:</strong> Post live on feed during peak hours ({selectedCampaign.projectTimeline}).</div>
                        <div>4. <strong>Analytics Verification:</strong> Submit reach insights after 7 days.</div>
                      </>
                    )}
                  </div>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Campaign Terms & Payment Protection
                  </h3>
                  <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '12px 14px', fontSize: '12px', color: '#334155', lineHeight: 1.55 }}>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                      <li><strong>100% Payment Protection:</strong> Full {selectedCampaign.payoutAmount} secured through TIA verified settlement.</li>
                      <li><strong>Usage Rights:</strong> 90 days organic digital promotional distribution rights.</li>
                      <li><strong>Exclusivity:</strong> 30-day category exclusivity against direct competitors.</li>
                      <li><strong>Automated Disbursement:</strong> Funds released to your wallet upon automated URL verification.</li>
                    </ul>
                  </div>

                  {/* Skills / Niches Pill Chips */}
                  <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B' }}>Skills / Niches:</span>
                    {selectedCampaign.categories?.map((cat: string) => (
                      <span key={cat} style={{ fontSize: '11px', fontWeight: 600, color: '#0052FF', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '2px 8px', borderRadius: '14px' }}>
                        {cat}
                      </span>
                    ))}
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '14px' }}>Instagram Reels</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '14px' }}>4K Video Editing</span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDEBAR COLUMN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 1. About the Client Card */}
                <div className="cd-card">
                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
                    About the Client
                  </h3>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 800, fontSize: '13.5px', color: '#0F172A' }}>
                        Verified Enterprise Client
                      </span>
                      <span style={{ fontSize: '10.5px', color: '#059669', fontWeight: 800, backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1px 5px', borderRadius: '4px' }}>
                        ✓ Verified
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                      {selectedCampaign.countryFlag} {selectedCampaign.country}
                    </div>
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#D97706', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#F59E0B' }}>★</span>
                    <span style={{ color: '#0F172A' }}>5.0</span>
                    <span style={{ color: '#64748B', fontWeight: 500 }}>(42 reviews)</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11.5px', color: '#475569', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontWeight: 600 }}>
                      <span>✓</span> <span>Payment method verified</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontWeight: 600 }}>
                      <span>✓</span> <span>Milestone deposit authorized</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Member since Mar 26, 2021</span>
                    </div>
                  </div>
                </div>

                {/* 2. Client Verification Checklist (Clean Green Outline SVG Vector Icons - Vertical Layout) */}
                <div className="cd-card">
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
                    Client Verification
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Payment */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Payment Verified</span>
                    </div>

                    {/* Email */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Email Address Verified</span>
                    </div>

                    {/* Identity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Identity Verified</span>
                    </div>

                    {/* Phone */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Phone Number Verified</span>
                    </div>

                    {/* Deposit */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Deposit Verified</span>
                    </div>
                  </div>
                </div>

                {/* Desktop-Only: How Your Profile Ranks & Apply Action */}
                <div className="tia-desktop-only" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {renderProfileRanksAndApplyWidget()}
                </div>

                {/* 5. Other Campaigns from this Client */}
                <div className="cd-card">
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0' }}>
                    Other jobs from this client
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(selectedCampaign.otherJobs || [
                      { title: 'Summer Lifestyle Reel Launch', payout: '$850 Fixed Pay' },
                      { title: 'YouTube Product Integration', payout: '$1,400 Fixed Pay' },
                      { title: '24-Hour Story Takeover & Review', payout: '$450 Fixed Pay' }
                    ]).map((job: any, idx: number, arr: any[]) => (
                      <div key={idx} style={{ borderBottom: idx < arr.length - 1 ? '1px solid #F1F5F9' : 'none', paddingBottom: idx < arr.length - 1 ? '6px' : '0' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{job.title}</div>
                        <div style={{ fontSize: '11px', color: '#0052FF', fontWeight: 700, marginTop: '2px' }}>{job.payout}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'marketplace' ? (
          <div>
            {/* High-End Match Booster Banner (Only shown if no social account is connected, and dismissible with ✕) */}
            {showMatchBanner && !socialAccounts.some((a) => a.connected) && (
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

            {/* Embedded CSS for seamless desktop/mobile filter responsiveness */}
            <style>{`
              @media (max-width: 768px) {
                .tia-filter-desktop-group {
                  display: none !important;
                }
                .tia-filter-desktop-chips {
                  display: none !important;
                }
                .tia-filter-btn-mobile {
                  display: inline-flex !important;
                }
              }
              @media (min-width: 769px) {
                .tia-filter-desktop-group {
                  display: flex !important;
                }
                .tia-filter-desktop-chips {
                  display: flex !important;
                }
                .tia-filter-btn-mobile {
                  display: none !important;
                }
                .tia-filter-mobile-panel {
                  display: none !important;
                }
              }
            `}</style>

            {/* Search, Filter & Sort Toolbar (Clean, Responsive) */}
            <div
              style={{
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {/* Row 1: Search Input + Mobile Filter Button + Desktop Select Dropdowns */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                }}
              >
                {/* Search Input */}
                <div
                  style={{
                    position: 'relative',
                    flex: '1',
                    minWidth: '0',
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
                    placeholder="Search campaigns..."
                    style={{
                      width: '100%',
                      padding: '9px 30px 9px 34px',
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
                        right: '8px',
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

                {/* Mobile Filter Toggle Button (Compact Icon Button) */}
                <button
                  type="button"
                  aria-label="Filter campaigns"
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="tia-filter-btn-mobile"
                  style={{
                    position: 'relative',
                    width: '38px',
                    height: '38px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: activeFiltersCount > 0 || mobileFilterOpen ? '#0052FF' : '#475569',
                    backgroundColor: activeFiltersCount > 0 || mobileFilterOpen ? '#EFF6FF' : '#FFFFFF',
                    border: activeFiltersCount > 0 || mobileFilterOpen ? '1px solid #0052FF' : '1px solid #CBD5E1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.15s ease',
                    flexShrink: 0,
                  }}
                >
                  <SlidersIcon size={16} color={activeFiltersCount > 0 || mobileFilterOpen ? '#0052FF' : '#475569'} />
                  {activeFiltersCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '16px',
                        height: '16px',
                        padding: '0 3px',
                        fontSize: '9.5px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        backgroundColor: '#0052FF',
                        borderRadius: '10px',
                        border: '2px solid #FFFFFF',
                      }}
                    >
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Desktop-Only Filter Group */}
                <div
                  className="tia-filter-desktop-group"
                  style={{
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Custom Country Filter Dropdown with Real Flag SVGs */}
                  <div id="country-filter-dropdown-container" style={{ position: 'relative' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setCountryDropdownOpen(!countryDropdownOpen);
                        setCountrySearchQuery('');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: selectedCountry === 'ALL' ? '4px' : '8px',
                        padding: '8px 12px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: '#334155',
                        backgroundColor: '#FFFFFF',
                        border: countryDropdownOpen ? '1px solid #0052FF' : '1px solid #CBD5E1',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        outline: 'none',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                        transition: 'all 0.15s ease',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {selectedCountry !== 'ALL' && <CountryFlag code={selectedCountry} size={17} />}
                      <span>
                        {filterCountries.find((c) => c.code === selectedCountry)?.label || 'All Countries'}
                      </span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: countryDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.15s ease',
                          marginLeft: '2px',
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {countryDropdownOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 4px)',
                          left: 0,
                          width: '230px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '10px',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
                          border: '1px solid #E2E8F0',
                          padding: '6px',
                          zIndex: 100,
                        }}
                      >
                        {/* Search box inside dropdown */}
                        <div style={{ padding: '2px 4px 6px 4px', borderBottom: '1px solid #F1F5F9', marginBottom: '4px' }}>
                          <input
                            type="text"
                            value={countrySearchQuery}
                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                            placeholder="Search country..."
                            autoFocus
                            style={{
                              width: '100%',
                              padding: '6px 8px',
                              fontSize: '12px',
                              color: '#0F172A',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              outline: 'none',
                            }}
                          />
                        </div>

                        <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                          {filterCountries
                            .filter((c) =>
                              c.label.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
                              c.code.toLowerCase().includes(countrySearchQuery.toLowerCase())
                            )
                            .map((c) => {
                              const isSelected = selectedCountry === c.code;
                              return (
                                <button
                                  key={c.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(c.code);
                                    setCountryDropdownOpen(false);
                                    setCountrySearchQuery('');
                                  }}
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '8px',
                                    padding: '7px 8px',
                                    fontSize: '12px',
                                    fontWeight: isSelected ? 700 : 500,
                                    color: isSelected ? '#0052FF' : '#334155',
                                    backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'background-color 0.1s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: c.code === 'ALL' ? '0px' : '8px' }}>
                                    {c.code !== 'ALL' && <CountryFlag code={c.code} size={17} />}
                                    <span>{c.label}</span>
                                  </div>
                                  {isSelected && (
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>

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
              </div>

              {/* Row 2: Category Quick Chips (Desktop Only) */}
              <div
                className="tia-filter-desktop-chips"
                style={{
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

              {/* Mobile Filter Collapsible Panel (Rendered only on Mobile when toggled) */}
              {mobileFilterOpen && (
                <div
                  className="tia-filter-mobile-panel"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '12px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <SlidersIcon size={14} color="#0052FF" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Filters & Sorting</span>
                      {activeFiltersCount > 0 && (
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 7px', borderRadius: '10px' }}>
                          {activeFiltersCount} active
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '2px',
                          }}
                        >
                          Reset all
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setMobileFilterOpen(false)}
                        style={{
                          background: '#F1F5F9',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#64748B',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Dropdowns Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {/* Deal Type */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                        Deal Type
                      </label>
                      <select
                        value={selectedCommercialType}
                        onChange={(e) => setSelectedCommercialType(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#334155',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          borderRadius: '8px',
                          outline: 'none',
                        }}
                      >
                        <option value="ALL">All Deals</option>
                        <option value="COMMISSION">Commission %</option>
                        <option value="FLAT_FEE">Flat Fee</option>
                      </select>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e: any) => setSortBy(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#334155',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          borderRadius: '8px',
                          outline: 'none',
                        }}
                      >
                        <option value="success_rate">Highest Match</option>
                        <option value="applicants">Most Popular</option>
                        <option value="newest">Newest</option>
                      </select>
                    </div>
                  </div>

                  {/* Country Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                      Country ({filterCountries.length} Countries)
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#334155',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        outline: 'none',
                      }}
                    >
                      {filterCountries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Categories / Niches */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
                      Niche / Category
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {filterCategories.map((cat) => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                              padding: '5px 11px',
                              fontSize: '11px',
                              fontWeight: isSelected ? 700 : 500,
                              color: isSelected ? '#0052FF' : '#64748B',
                              backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                              border: isSelected ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                              borderRadius: '16px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: '4px',
                    }}
                  >
                    View Results ({filteredCampaigns.length})
                  </button>
                </div>
              )}
            </div>

            {/* Dynamic Time-Aware Personalized Greeting Header */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
                {dynamicGreeting.title}
              </h3>
              <p style={{ fontSize: '14.5px', color: '#64748B', margin: 0, fontWeight: 500, lineHeight: 1.45 }}>
                {dynamicGreeting.subtitle}
              </p>
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
                      cursor: 'default',
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
                          color: '#059669',
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
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

                      {/* Middle Section: Left (Title + Status) & Right (Pricing + Requirements Details) */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '12px',
                          marginBottom: '14px',
                        }}
                      >
                        {/* Left: Campaign Name + Eligibility */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {/* Title + "New" Sparkle Capsule Badge */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                            <span
                              style={{
                                fontSize: '13.5px',
                                fontWeight: 700,
                                color: '#0F172A',
                                filter: 'blur(3.5px)',
                                userSelect: 'none',
                              }}
                            >
                              Anonymized campaign name
                            </span>

                            {/* Posted Time & Date (Clean, Borderless Text) */}
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '11px',
                                fontWeight: 500,
                                color: '#94A3B8',
                              }}
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{camp.postedAt || 'Aug 27, 2026 • 2:30 PM'}</span>
                            </span>
                          </div>

                          {/* Status Badge */}
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
                            <span>You are eligible</span>
                          </div>
                        </div>

                        {/* Right: Pricing & Requirements Details */}
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                            {camp.payoutAmount}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500, marginTop: '3px' }}>
                            {camp.payType || 'Fixed Pay'}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500, marginTop: '2px', whiteSpace: 'nowrap' }}>
                            {camp.deliverablesSummary || '7 Posts • 7 Stories • 7 Reels'}
                          </div>
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

                        {/* Project Timeline */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Project timeline</span>
                          <span style={{ fontWeight: 600, color: '#0F172A' }}>
                            {camp.projectTimeline || 'Sep 1 – Sep 15, 2026'}
                          </span>
                        </div>

                        {/* Socials - No Card Box, Clean Theme Icons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Socials</span>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {camp.socials.map((s: string) => renderThemeSocialIcon(s))}
                          </div>
                        </div>
                      </div>

                      {/* Apply to Campaign Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(camp);
                        }}
                        style={{
                          marginTop: '16px',
                          width: '100%',
                          padding: '10px 16px',
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 8px rgba(0, 82, 255, 0.18)',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#0045D8';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 82, 255, 0.28)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#0052FF';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 82, 255, 0.18)';
                        }}
                      >
                        <span>Apply to Campaign</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

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
            {creditPurchaseSuccess && (
              <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🎉</span>
                <span>{creditPurchaseSuccess}</span>
              </div>
            )}

            {claimSuccess && (
              <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', fontSize: '12.5px', fontWeight: 600 }}>
                ✓ Payout claimed successfully to your verified bank account!
              </div>
            )}

            {/* Application Credits & Deals Section */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '20px 22px',
                marginBottom: '22px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
              }}
            >
              {/* Header with Balance */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '18px' }}>⚡</span>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      Application Credits Wallet
                    </h3>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '2px 8px', borderRadius: '12px' }}>
                      ₹99 / Credit
                    </span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, maxWidth: '640px', lineHeight: 1.45 }}>
                    You receive 1 free application with basic preview. Use application credits to apply for verified brand deals, unlock the full campaign brief, and initiate direct deal contracts.
                  </p>
                </div>

                {/* Balance Pill */}
                <div
                  style={{
                    backgroundColor: applyCredits > 0 ? '#EFF6FF' : '#FEF3C7',
                    border: applyCredits > 0 ? '1.5px solid #BFDBFE' : '1.5px solid #FDE68A',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    textAlign: 'right',
                    minWidth: '160px',
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: applyCredits > 0 ? '#1E40AF' : '#92400E', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Available Balance
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: applyCredits > 0 ? '#0052FF' : '#B45309', marginTop: '2px' }}>
                    {applyCredits} {applyCredits === 1 ? 'Credit' : 'Credits'}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
                    {totalAppliesCount} applied so far
                  </div>
                </div>
              </div>

              {/* Purchase Packs Grid (Highlighting 2 Credits Option) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '14px' }}>
                {/* Option 1: 2 Credits (₹198) - Requested Featured Pack */}
                <div
                  style={{
                    border: '2px solid #0052FF',
                    backgroundColor: '#F8FAFF',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'absolute', top: '-10px', right: '14px', backgroundColor: '#0052FF', color: '#FFFFFF', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Recommended
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>2 Application Credits</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '8px 0 4px 0' }}>
                      <span style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>₹198</span>
                      <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>/ 2 applies (₹99 ea)</span>
                    </div>
                    <ul style={{ paddingLeft: '16px', margin: '10px 0 16px 0', fontSize: '12px', color: '#334155', lineHeight: 1.6 }}>
                      <li>Apply to 2 verified brand deals</li>
                      <li>Unlock full campaign briefs</li>
                      <li>Direct brand manager messaging</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBuyCredits(2, 198)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0, 82, 255, 0.25)',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0045D8')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0052FF')}
                  >
                    Buy 2 Credits — ₹198
                  </button>
                </div>

                {/* Option 2: 5 Credits (₹495) */}
                <div
                  style={{
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>5 Application Credits</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '8px 0 4px 0' }}>
                      <span style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>₹495</span>
                      <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>/ 5 applies (₹99 ea)</span>
                    </div>
                    <ul style={{ paddingLeft: '16px', margin: '10px 0 16px 0', fontSize: '12px', color: '#334155', lineHeight: 1.6 }}>
                      <li>Apply to 5 verified brand deals</li>
                      <li>Priority application review queue</li>
                      <li>Milestone escrow guarantee</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBuyCredits(5, 495)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#F1F5F9',
                      color: '#0F172A',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E2E8F0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F1F5F9';
                    }}
                  >
                    Buy 5 Credits — ₹495
                  </button>
                </div>

                {/* Option 3: 10 Credits (₹990) */}
                <div
                  style={{
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>10 Application Credits</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '8px 0 4px 0' }}>
                      <span style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>₹990</span>
                      <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>/ 10 applies (₹99 ea)</span>
                    </div>
                    <ul style={{ paddingLeft: '16px', margin: '10px 0 16px 0', fontSize: '12px', color: '#334155', lineHeight: 1.6 }}>
                      <li>Apply to 10 verified brand deals</li>
                      <li>VIP creator matchmaking priority</li>
                      <li>Dedicated campaign advisor</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBuyCredits(10, 990)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#F1F5F9',
                      color: '#0F172A',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E2E8F0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F1F5F9';
                    }}
                  >
                    Buy 10 Credits — ₹990
                  </button>
                </div>
              </div>
            </div>

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



      {/* Buy Credits Modal */}
      {showBuyCreditsModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '440px', borderRadius: '20px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>⚡ Get Application Credits</h3>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>₹99 per Application Credit</div>
              </div>
              <button type="button" onClick={() => setShowBuyCreditsModal(false)} style={{ backgroundColor: '#F1F5F9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer', color: '#64748B' }}>✕</button>
            </div>

            <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.45, marginBottom: '16px' }}>
              You need credits to apply for high-paying brand campaigns. Choose a pack below:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              <button
                type="button"
                onClick={() => handleBuyCredits(2, 198)}
                style={{
                  padding: '14px 16px',
                  backgroundColor: '#EFF6FF',
                  border: '2px solid #0052FF',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0052FF' }}>2 Application Credits ⭐</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>₹99 per credit • Most Popular</div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>₹198</div>
              </button>

              <button
                type="button"
                onClick={() => handleBuyCredits(5, 495)}
                style={{
                  padding: '14px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>5 Application Credits</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>₹99 per credit</div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>₹495</div>
              </button>

              <button
                type="button"
                onClick={() => handleBuyCredits(10, 990)}
                style={{
                  padding: '14px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>10 Application Credits</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>₹99 per credit • Best Value</div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>₹990</div>
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowBuyCreditsModal(false)} style={{ padding: '10px 18px', backgroundColor: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Place Your Bid & Submit Proposal Modal Popup */}
      {showApplyModal && selectedCampaign && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowApplyModal(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #E2E8F0',
              position: 'relative',
            }}
          >
            {/* Modal Body: Either Confirmation Screen or Place Bid Form */}
            {bidSubmittedSuccess ? (
              <div style={{ textAlign: 'center', padding: '6px 4px' }}>
                {/* SVG Success Checkmark Icon */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#ECFDF5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
                  Bid Placed Successfully!
                </h2>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '13px', fontWeight: 700, margin: '0 0 20px 0' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>1 Application Credit Deducted</span>
                </div>

                {/* Flat Clean Key-Value List (No Card Container) */}
                <div
                  style={{
                    textAlign: 'left',
                    marginBottom: '20px',
                    borderTop: '1px solid #E2E8F0',
                    borderBottom: '1px solid #E2E8F0',
                    padding: '6px 0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: '13px', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Campaign</span>
                    <span style={{ color: '#0F172A', fontWeight: 700, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedCampaign.title}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: '13px', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Brand Client</span>
                    <span style={{ color: '#0F172A', fontWeight: 700 }}>{selectedCampaign.brandName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: '13px', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Your Proposed Rate</span>
                    <span style={{ color: '#0052FF', fontWeight: 900 }}>{selectedCampaign.currencySymbol || '$'}{bidAmount || selectedCampaign.payoutAmount?.replace(/[^0-9]/g, '') || '45000'} {selectedCampaign.currencyCode || 'INR'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: '13px', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Delivery Time</span>
                    <span style={{ color: '#0F172A', fontWeight: 700 }}>{bidDays || '14'} Days</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: '13px' }}>
                    <span style={{ color: '#64748B' }}>Remaining Balance</span>
                    <span style={{ color: applyCredits > 0 ? '#059669' : '#D97706', fontWeight: 800 }}>{applyCredits} Available Credit{applyCredits === 1 ? '' : 's'}</span>
                  </div>
                </div>

                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.45, marginBottom: '20px' }}>
                  The brand manager has received your verified bid and proposal. Track their response and milestones under your <strong>Collabs</strong> messenger tab.
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowApplyModal(false);
                      setBidSubmittedSuccess(false);
                      setSelectedCampaign(null);
                      handleTabChange('collabs');
                    }}
                    style={{
                      flex: '1 1 200px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '13px 20px',
                      fontSize: '13.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 82, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>View in Collabs &amp; Messages</span>
                    <span>→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowApplyModal(false);
                      setBidSubmittedSuccess(false);
                      setSelectedCampaign(null);
                    }}
                    style={{
                      padding: '13px 20px',
                      backgroundColor: '#F1F5F9',
                      color: '#334155',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                        Place Your Bid &amp; Submit Proposal
                      </h2>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                        <span>1 Credit Required</span>
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>
                      Campaign: <strong>{selectedCampaign.title}</strong> by <strong>{selectedCampaign.brandName}</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    aria-label="Close modal"
                    style={{
                      backgroundColor: '#F1F5F9',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      cursor: 'pointer',
                      color: '#64748B',
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Rate and Days Inputs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Proposed Rate ({selectedCampaign.currencyCode || 'INR'})
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748B', fontSize: '14px' }}>
                        {selectedCampaign.currencySymbol || '$'}
                      </span>
                      <input
                        type="text"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={selectedCampaign.payoutAmount?.replace(/[^0-9]/g, '') || '45000'}
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 28px',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#0F172A',
                          border: '1px solid #CBD5E1',
                          borderRadius: '10px',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Delivery Time (Days)
                    </label>
                    <input
                      type="number"
                      value={bidDays}
                      onChange={(e) => setBidDays(e.target.value)}
                      placeholder="14"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#0F172A',
                        border: '1px solid #CBD5E1',
                        borderRadius: '10px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Pitch Textarea */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Describe Your Proposal <span style={{ color: '#94A3B8', fontWeight: 500 }}>(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={proposalPitch}
                    onChange={(e) => setProposalPitch(e.target.value)}
                    placeholder="Outline your creative vision, camera equipment, or any specific angle you'd like to propose..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '13px',
                      color: '#0F172A',
                      border: '1px solid #CBD5E1',
                      borderRadius: '10px',
                      outline: 'none',
                      resize: 'vertical',
                      lineHeight: 1.5,
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* Flat Benefits Rows */}
                <div
                  style={{
                    padding: '10px 0',
                    marginBottom: '18px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#475569',
                    borderTop: '1px solid #F1F5F9',
                    borderBottom: '1px solid #F1F5F9',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Set your budget &amp; timeframe</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>100% Payment protection</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Direct client messaging</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Keep 100% of your earnings</span>
                  </div>
                </div>

                {/* Action Button with Credit Check */}
                {applyCredits > 0 ? (
                  <div>
                    <div style={{ fontSize: '12px', color: '#059669', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{applyCredits} Available Credit{applyCredits === 1 ? '' : 's'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={submitApplication}
                      style={{
                        width: '100%',
                        backgroundColor: '#0052FF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '13px 20px',
                        fontSize: '14px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 82, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      <span>Bid on this Project (Uses 1 Credit)</span>
                      <span>→</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ padding: '14px 16px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', marginBottom: '14px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#991B1B', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#991B1B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>0 Application Credits Remaining</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#7F1D1D', lineHeight: 1.45 }}>
                        You have used all available application credits. Redirect to the Payments page to purchase credits and submit your bid.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowApplyModal(false);
                        setSelectedCampaign(null);
                        handleTabChange('payments');
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: '#0052FF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '13px 20px',
                        fontSize: '14px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 82, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      <span>Go to Payments to Buy Credits</span>
                      <span>→</span>
                    </button>
                  </div>
                )}
              </>
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
