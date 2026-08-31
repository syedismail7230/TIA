'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';

// ============================================================================
// THEMED SVG ICONS (NO RAW EMOJIS - STRICT BRAND SYSTEM)
// ============================================================================

const MapPinIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const VideoCameraIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const GlobeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IdBadgeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="2" />
    <line x1="15" y1="8" x2="17" y2="8" />
    <line x1="15" y1="12" x2="17" y2="12" />
    <line x1="7" y1="16" x2="17" y2="16" />
  </svg>
);

const StarIcon: React.FC<{ size?: number; color?: string; filled?: boolean }> = ({ size = 14, color = '#F59E0B', filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ShieldCheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#059669' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ScaleIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#16A34A' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
    <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h18" />
  </svg>
);

const BarChartIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const HeadphonesIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const SmartphoneIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const LeafIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#059669' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const SpeakerIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <circle cx="12" cy="14" r="4" />
    <line x1="12" y1="6" x2="12.01" y2="6" />
  </svg>
);

const DumbbellIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6.5 6.5 11 11" />
    <path d="m21 21-1-1a5 5 0 0 0-7.07 0l-.93.93a5 5 0 0 0 0 7.07l1 1" />
    <path d="m3 3 1 1a5 5 0 0 0 7.07 0l.93-.93a5 5 0 0 0 0-7.07l-1-1" />
    <path d="m18 22 4-4" />
    <path d="m2 6 4-4" />
  </svg>
);

const ActivityIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

interface CreatorProfileViewProps {
  username?: string;
  initialProfile?: any;
}

export function CreatorProfileView({ username = 'creator.official', initialProfile }: CreatorProfileViewProps) {
  const router = useRouter();
  const cleanUsername = (username || 'creator.official').replace(/^@/, '');

  // Auth & Session State
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isOwnerActual, setIsOwnerActual] = useState<boolean>(false);
  // View Mode: 'OWNER' | 'PUBLIC' (Allows owner to preview what public/brands see)
  const [viewMode, setViewMode] = useState<'OWNER' | 'PUBLIC'>('OWNER');

  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'PORTFOLIO' | 'CREDIBILITY' | 'RATES' | 'REVIEWS'>('PORTFOLIO');
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] = useState<string>('ALL');
  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);
  const [selectedPackageForInquiry, setSelectedPackageForInquiry] = useState<string>('Dedicated YouTube Review');
  const [inquirySentSuccess, setInquirySentSuccess] = useState<boolean>(false);
  const [inquiryForm, setInquiryForm] = useState({
    brandName: '',
    contactEmail: '',
    budget: '50000',
    deliverableType: 'Dedicated YouTube Review',
    campaignGoals: '',
  });

  // Fetch session to check ownership
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data?.authenticated && data?.user) {
            setIsAuthenticated(true);
            setCurrentUser(data.user);
            const userHandle = data.user.creatorProfile?.username || data.user.email?.split('@')[0];
            const isSelf = userHandle === cleanUsername || cleanUsername === 'creator.official' || cleanUsername === 'profile';
            setIsOwnerActual(isSelf);
            setViewMode(isSelf ? 'OWNER' : 'PUBLIC');
            return;
          }
        }
      } catch (err) {
        // Fallback for public visitors
      }
      setIsAuthenticated(false);
      setIsOwnerActual(false);
      setViewMode('PUBLIC');
    }
    checkAuth();
  }, [cleanUsername]);

  const isSarah = cleanUsername === 'creator.official' || cleanUsername === 'sarahjenkins' || cleanUsername === 'profile';
  const displayName = isSarah ? 'Sarah Jenkins' : cleanUsername.replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const handleTag = `@${cleanUsername}`;

  const isViewingAsOwner = isOwnerActual && viewMode === 'OWNER';

  const handleCopyProfileLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.brandName || !inquiryForm.contactEmail) return;
    setInquirySentSuccess(true);
    setTimeout(() => {
      setInquirySentSuccess(false);
      setShowInquiryModal(false);
      setInquiryForm({
        brandName: '',
        contactEmail: '',
        budget: '50000',
        deliverableType: 'Dedicated YouTube Review',
        campaignGoals: '',
      });
    }, 2000);
  };

  const portfolioProjects = [
    {
      id: 'proj-1',
      brand: 'Nike Lifestyle India',
      iconType: 'ACTIVITY',
      category: 'FITNESS',
      campaign: 'Air Zoom Running Series 2026',
      deliverable: '1x YouTube Dedicated Video + 2x IG Reels',
      reach: '142,500 Verified Views',
      engagement: '5.4% ER',
      payout: '₹65,000',
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80',
      rating: '5.0',
      verifiedProof: 'Full Milestone Disbursed via TIA',
    },
    {
      id: 'proj-2',
      brand: 'Boat Lifestyle Audio',
      iconType: 'HEADPHONES',
      category: 'TECH',
      campaign: 'Airdopes Pro ANC Launch & Sound Test',
      deliverable: '3x Instagram Reels + Bio Link Placement',
      reach: '88,200 Verified Views',
      engagement: '4.9% ER',
      payout: '₹45,000',
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
      rating: '4.9',
      verifiedProof: 'Full Milestone Disbursed via TIA',
    },
    {
      id: 'proj-3',
      brand: 'OnePlus India',
      iconType: 'SMARTPHONE',
      category: 'TECH',
      campaign: 'Flagship 13 Pro Camera Benchmark Test',
      deliverable: '1x YouTube Dedicated Tech Review',
      reach: '96,400 Verified Views',
      engagement: '6.2% ER',
      payout: '₹75,000',
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&auto=format&fit=crop&q=80',
      rating: '5.0',
      verifiedProof: 'Full Milestone Disbursed via TIA',
    },
    {
      id: 'proj-4',
      brand: 'Mamaearth Organics',
      iconType: 'LEAF',
      category: 'LIFESTYLE',
      campaign: 'Vitamin C Morning Routine & Skin Health',
      deliverable: '3x Instagram Story Trio + Direct Affiliate Link',
      reach: '32,400 Verified Views',
      engagement: '4.2% ER',
      payout: '₹18,000',
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&auto=format&fit=crop&q=80',
      rating: '4.8',
      verifiedProof: 'Full Milestone Disbursed via TIA',
    },
    {
      id: 'proj-5',
      brand: 'Sony India Audio',
      iconType: 'SPEAKER',
      category: 'TECH',
      campaign: 'WH-1000XM5 Noise Cancellation Review',
      deliverable: '1x Long-Form Video + Community Post',
      reach: '118,000 Verified Views',
      engagement: '5.8% ER',
      payout: '₹80,000',
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&auto=format&fit=crop&q=80',
      rating: '5.0',
      verifiedProof: 'Full Milestone Disbursed via TIA',
    },
    {
      id: 'proj-6',
      brand: 'Cult.fit Fitness',
      iconType: 'DUMBBELL',
      category: 'FITNESS',
      campaign: '30-Day Strength Transformation Series',
      deliverable: '4x IG Reels + Live Workout Session',
      reach: '94,600 Verified Views',
      engagement: '6.5% ER',
      payout: '₹55,000',
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&auto=format&fit=crop&q=80',
      rating: '4.9',
      verifiedProof: 'Full Milestone Disbursed via TIA',
    },
  ];

  const filteredProjects = selectedPortfolioCategory === 'ALL'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === selectedPortfolioCategory);

  const commercialPackages = [
    {
      id: 'pkg-1',
      title: 'Full Dedicated Video Review',
      platform: 'YouTube Long-Form',
      duration: '8-12 Minutes 4K',
      price: '₹45,000',
      deliveryTime: '5 Business Days',
      revisions: '2 Rounds Included',
      description: 'In-depth benchmark testing, cinematic product shots, high-retention storytelling, and permanent SEO indexing.',
      features: [
        'Cinematic 4K UHD Production',
        'Custom Benchmark Graph Integration',
        'Pinned Comment with Direct Attribution Link',
        'Full Commercial Licensing for 90 Days',
        '30-Day Exclusivity in Category',
      ],
      popular: true,
    },
    {
      id: 'pkg-2',
      title: 'Reel / Short + Story Blitz',
      platform: 'Instagram & Shorts',
      duration: '60-Sec High Paced',
      price: '₹25,000',
      deliveryTime: '3 Business Days',
      revisions: '1 Round Included',
      description: 'Fast-paced, hook-driven vertical video with viral audio pacing, tailored for rapid CTR and organic explore feed distribution.',
      features: [
        '9:16 Vertical Master Format',
        'Direct Link in Bio for 72 Hours',
        '2x Interactive Poll Stories included',
        'Paid Partnership Tag Support',
      ],
      popular: false,
    },
    {
      id: 'pkg-3',
      title: 'Integrated Video Segment',
      platform: 'YouTube Sponsor Slot',
      duration: '60-90 Seconds',
      price: '₹20,000',
      deliveryTime: '4 Business Days',
      revisions: '1 Round Included',
      description: 'High-converting organic product placement seamlessly woven into a trending organic benchmark topic.',
      features: [
        'Mid-Roll Organic Placement',
        'Verbal Call to Action & Promo Code',
        'Description Link Box Placement',
      ],
      popular: false,
    },
    {
      id: 'pkg-4',
      title: 'Cross-Platform Omni Launch',
      platform: 'YouTube + IG + X + LinkedIn',
      duration: 'Multi-Asset Campaign',
      price: '₹80,000',
      deliveryTime: '7 Business Days',
      revisions: '3 Rounds Included',
      description: 'Complete 360-degree product launch package across all 4 verified channels for maximum market saturation.',
      features: [
        '1x Dedicated YouTube Review',
        '1x Instagram Reel + 3x Stories',
        '1x Viral X (Twitter) Breakdown Thread',
        '1x LinkedIn Executive Deep-Dive Article',
        'Full Analytics Post-Mortem Report',
      ],
      popular: false,
    },
  ];

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Design System Scoped CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .profile-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .profile-tabs-nav {
          display: flex;
          align-items: center;
          gap: 28px;
          border-bottom: 1px solid #E2E8F0;
          padding-bottom: 2px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .profile-tabs-nav::-webkit-scrollbar {
          display: none;
        }
        .tab-label-short {
          display: none;
        }
        .tab-label-full {
          display: inline;
        }
        @media (max-width: 768px) {
          .profile-container {
            padding: 0 12px;
          }
          .header-nav-logo-group {
            display: none !important;
          }
          .header-divider-bar {
            display: none !important;
          }
          .profile-cover-banner {
            min-height: unset !important;
            height: auto !important;
            aspect-ratio: 851 / 315 !important;
            background-size: 100% 100% !important;
            background-position: center center !important;
          }
          .profile-avatar-wrapper {
            margin-top: -65px !important;
            margin-bottom: 8px !important;
          }
          .profile-dp-container {
            width: 120px !important;
            height: 120px !important;
            border-radius: 16px !important;
          }
          .profile-stats-bar {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .profile-actions-row {
            width: 100% !important;
            justifyContent: stretch !important;
          }
          .profile-rating-strip {
            width: 100% !important;
            justify-content: flex-start !important;
            margin-top: 4px !important;
          }
          .profile-audience-block {
            align-items: flex-start !important;
            padding-left: 0 !important;
            border-left: none !important;
            border-top: 1px solid #F1F5F9 !important;
            padding-top: 12px !important;
            margin-top: 14px !important;
            width: 100% !important;
          }
          .tab-label-full {
            display: none !important;
          }
          .tab-label-short {
            display: inline !important;
          }
          .profile-tabs-nav {
            gap: 16px !important;
            padding-bottom: 0 !important;
            border-bottom: 2px solid #F1F5F9 !important;
          }
          .profile-tab-btn {
            padding: 8px 4px 10px 4px !important;
            font-size: 13.5px !important;
          }
        }
        @media (max-width: 480px) {
          .header-btn-label {
            display: none !important;
          }
          .header-action-btn {
            padding: 7px 10px !important;
          }
        }
      `}} />

      {/* ==================================================================== */}
      {/* HEADER NAVIGATION BAR (BRAND SYSTEM COMPLIANT)                       */}
      {/* ==================================================================== */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div
          className="profile-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
          }}
        >
          {/* Left Brand Identifier */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href={isViewingAsOwner ? '/creator' : '/'}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src="/logo-cropped.png"
                alt="The Influencer's Agency"
                style={{
                  height: '32px',
                  width: 'auto',
                  maxWidth: '160px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Link>

            <span className="header-divider-bar" style={{ color: '#CBD5E1' }}>|</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px' }}>
              <span style={{ fontWeight: 700, color: '#334155' }}>
                {displayName}
              </span>
              <span style={{ color: '#64748B', fontWeight: 500 }}>
                {handleTag}
              </span>
              <BlueCheckBadge size={15} title="Verified TIA Creator" />
            </div>
          </div>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Share Profile Link Button */}
            <button
              type="button"
              onClick={handleCopyProfileLink}
              className="header-action-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                backgroundColor: copiedLink ? '#ECFDF5' : '#FFFFFF',
                border: copiedLink ? '1px solid #10B981' : '1px solid #CBD5E1',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: copiedLink ? '#059669' : '#334155',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
              title="Share Profile Link"
            >
              {copiedLink ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="header-btn-label">Link Copied!</span>
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="header-btn-label">Share Profile</span>
                </>
              )}
            </button>

            {/* Public View Preview Toggle Icon Button (Visible for Owner) */}
            {isOwnerActual && (
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'OWNER' ? 'PUBLIC' : 'OWNER')}
                className="header-action-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  backgroundColor: viewMode === 'PUBLIC' ? '#EFF6FF' : '#FFFFFF',
                  border: viewMode === 'PUBLIC' ? '1px solid #0052FF' : '1px solid #CBD5E1',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: viewMode === 'PUBLIC' ? '#0052FF' : '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                title={viewMode === 'OWNER' ? 'View as Public' : 'Back to Owner View'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span className="header-btn-label">
                  {viewMode === 'OWNER' ? 'Public View' : 'Owner View'}
                </span>
              </button>
            )}

            {/* OWNER MODE: Edit Profile Button */}
            {isViewingAsOwner ? (
              <Link
                href="/creator?tab=settings"
                className="header-action-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  backgroundColor: '#0052FF',
                  border: '1px solid #0052FF',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
                title="Edit Profile Settings"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span className="header-btn-label">Edit Profile</span>
              </Link>
            ) : (
              /* PUBLIC / BRAND VISITOR MODE: Direct Brand Booking & Inquiry CTAs */
              <>
                <button
                  type="button"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="header-action-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 12px',
                    backgroundColor: isBookmarked ? '#FEF3C7' : '#FFFFFF',
                    border: isBookmarked ? '1px solid #F59E0B' : '1px solid #CBD5E1',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: isBookmarked ? '#B45309' : '#334155',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                  title="Bookmark Creator"
                >
                  <StarIcon size={13} color={isBookmarked ? '#F59E0B' : '#64748B'} filled={isBookmarked} />
                  <span className="header-btn-label">{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPackageForInquiry('Custom Brand Campaign');
                    setShowInquiryModal(true);
                  }}
                  className="header-action-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    backgroundColor: '#0052FF',
                    border: '1px solid #0052FF',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Book Collaboration</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Profile Canvas */}
      <main className="profile-container" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* ==================================================================== */}
        {/* 1. HERO COVER & PROFILE CARD                                         */}
        {/* ==================================================================== */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          }}
        >
          {/* Cover Artwork Banner (851x315 Aspect Ratio) */}
          <div
            className="profile-cover-banner"
            style={{
              width: '100%',
              aspectRatio: '851 / 315',
              maxHeight: '315px',
              minHeight: '180px',
              backgroundImage: 'url("/banner.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#FAFAFA',
              borderBottom: '1px solid #F1F5F9',
            }}
          />

          {/* Profile Identity Body */}
          <div style={{ padding: '0 36px 32px 36px' }}>
            {/* Floating Avatar Profile Picture (Extra Large, Top of Text) */}
            <div
              className="profile-avatar-wrapper"
              style={{
                position: 'relative',
                marginTop: '-145px',
                marginBottom: '12px',
                zIndex: 10,
                display: 'inline-block',
              }}
            >
              <div
                className="profile-dp-container"
                style={{
                  width: '230px',
                  height: '230px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                  position: 'relative',
                }}
              >
                <img
                  src="/profile.png"
                  alt={displayName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom left',
                    display: 'block',
                  }}
                />
              </div>
            </div>

            {/* Creator Title, Rating & Meta (Full Width) */}
            <div style={{ width: '100%' }}>
              {/* Top Row: Name + Handle on Left, Rating Pill on Right */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '8px' }}>
                {/* Left: Name & Handles */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    {displayName}
                  </h1>
                  <span style={{ fontSize: '15px', color: '#0052FF', fontWeight: 600 }}>
                    {handleTag}
                  </span>
                  <BlueCheckBadge size={18} title="Verified TIA Creator" />
                </div>

                {/* Right: Pure Text Star Rating Strip (No Box/Card) */}
                <div className="profile-rating-strip" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '14px' }}>4.9</span>
                    <span style={{ color: '#64748B', fontWeight: 600, fontSize: '12px' }}>/ 5.0</span>
                  </div>

                  <span style={{ color: '#CBD5E1' }}>•</span>

                  <span style={{ color: '#475569', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    48 Reviews
                  </span>
                </div>
              </div>

              {/* Subtitle / Tagline */}
              <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#475569', marginTop: '2px' }}>
                Tech Reviewer & AI Hardware Specialist • 615K+ Community
              </div>

              {/* Location & Quick Meta Text Strip (No Cards / Boxes) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px', fontSize: '12.5px', color: '#64748B', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <MapPinIcon size={13} color="#0052FF" />
                  <span>Mumbai, Maharashtra, India</span>
                </span>

                <span style={{ color: '#CBD5E1' }}>•</span>

                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <VideoCameraIcon size={13} color="#0052FF" />
                  <span>Consumer Tech, AI SaaS, Lifestyle</span>
                </span>

                <span style={{ color: '#CBD5E1' }}>•</span>

                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <GlobeIcon size={13} color="#0052FF" />
                  <span>English, Hindi</span>
                </span>
              </div>

              {/* Bio Paragraph & Total Followers Combined Metric */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', marginTop: '16px', flexWrap: 'wrap' }}>
                {/* Bio Paragraph */}
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.65, margin: 0, maxWidth: '800px', flex: 1, minWidth: '280px' }}>
                  Creating cinematic, deep-dive reviews and benchmark tests for consumer electronics, smartphones, audio gear, and emerging AI hardware tools. Known for uncompromising benchmark authenticity, prompt milestone delivery, and over 550,000+ verified cross-platform community members with consistent top-tier engagement.
                </p>

                {/* Total Combined Followers Stat */}
                <div
                  className="profile-audience-block"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    flexShrink: 0,
                    paddingLeft: '28px',
                    borderLeft: '1px solid #F1F5F9',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '48px', fontWeight: 400, color: '#0F172A', lineHeight: 1, letterSpacing: '-0.03em' }}>
                      615K+
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>
                    Total Audience Reach
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Channels Matrix Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '24px', flexWrap: 'wrap', paddingTop: '18px', borderTop: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Verified Live Channels:</span>

              {/* YouTube */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '6px 12px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#0052FF',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#0052FF">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>185K Subscribers</span>
              </div>

              {/* Instagram */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '6px 12px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#0052FF',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>320K Followers</span>
              </div>

              {/* X / Twitter */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '6px 12px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#0052FF',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#0052FF">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>45K Followers</span>
              </div>

              {/* LinkedIn */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '6px 12px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#0052FF',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#0052FF">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>65K Connections</span>
              </div>

              <Link
                href={isViewingAsOwner ? "/creator?tab=social-media" : "#"}
                onClick={(e) => {
                  if (!isViewingAsOwner) {
                    e.preventDefault();
                    setActiveProfileTab('CREDIBILITY');
                  }
                }}
                style={{
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#0052FF',
                  textDecoration: 'none',
                  marginLeft: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>View Full Social Intelligence</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. PROFILE NAVIGATION TABS (Mobile Responsive Horizontal Tabs)       */}
        {/* ==================================================================== */}
        <div className="profile-tabs-nav">
          {[
            { id: 'PORTFOLIO', fullLabel: 'Past Brand Work & Portfolio', shortLabel: 'Portfolio', count: 6 },
            { id: 'CREDIBILITY', fullLabel: 'Trust & BotShield Matrix', shortLabel: 'Trust & BotShield', count: null },
            { id: 'RATES', fullLabel: 'Commercial Rates & Packages', shortLabel: 'Rates & Packages', count: 4 },
            { id: 'REVIEWS', fullLabel: 'Sponsor Endorsements', shortLabel: 'Endorsements', count: 14 },
          ].map((tab) => {
            const isActive = activeProfileTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className="profile-tab-btn"
                onClick={() => setActiveProfileTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 2px 14px 2px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2.5px solid #0052FF' : '2.5px solid transparent',
                  color: isActive ? '#0052FF' : '#64748B',
                  fontSize: '14px',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                }}
              >
                <span className="tab-label-full">{tab.fullLabel}</span>
                <span className="tab-label-short">{tab.shortLabel}</span>
                {tab.count !== null && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: isActive ? '#0052FF' : '#64748B',
                      backgroundColor: isActive ? '#EFF6FF' : '#F1F5F9',
                      padding: '1px 7px',
                      borderRadius: '10px',
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ==================================================================== */}
        {/* 3. SUB-TAB 1: PORTFOLIO & PAST COLLABORATIONS                        */}
        {/* ==================================================================== */}
        {activeProfileTab === 'PORTFOLIO' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {['ALL', 'TECH', 'FITNESS', 'LIFESTYLE'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedPortfolioCategory(cat)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: selectedPortfolioCategory === cat ? '1px solid #0052FF' : '1px solid #E2E8F0',
                      backgroundColor: selectedPortfolioCategory === cat ? '#0052FF' : '#FFFFFF',
                      color: selectedPortfolioCategory === cat ? '#FFFFFF' : '#475569',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {cat === 'ALL' ? 'All Deliverables' : cat}
                  </button>
                ))}
              </div>

              {isViewingAsOwner && (
                <Link
                  href="/creator?tab=portfolio"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#0052FF',
                    textDecoration: 'none',
                    padding: '6px 12px',
                    backgroundColor: '#EFF6FF',
                    borderRadius: '8px',
                  }}
                >
                  <span>+ Add Past Collaboration</span>
                </Link>
              )}
            </div>

            {/* Grid of Verified Project Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '20px',
              }}
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  {/* Thumbnail Banner */}
                  <div
                    style={{
                      height: '160px',
                      width: '100%',
                      backgroundImage: `url(${project.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '4px 8px',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <ShieldCheckIcon size={13} color="#10B981" />
                      <span>{project.verifiedProof}</span>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        backgroundColor: '#FFFFFF',
                        color: '#0F172A',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <StarIcon size={12} color="#F59E0B" />
                      <span>{project.rating}</span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {project.brand}
                      </div>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '4px 0 0 0', lineHeight: 1.3 }}>
                        {project.campaign}
                      </h3>
                    </div>

                    <div style={{ fontSize: '12.5px', color: '#475569', backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px' }}>
                      <span style={{ fontWeight: 700, color: '#334155' }}>Deliverable:</span> {project.deliverable}
                    </div>

                    {/* Stats Metric Strip */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', paddingTop: '8px', borderTop: '1px solid #F1F5F9' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Total Verified Reach</div>
                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{project.reach}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Engagement Rate</div>
                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>{project.engagement}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 4. SUB-TAB 2: BOTSHIELD & TRUST CREDIBILITY MATRIX                    */}
        {/* ==================================================================== */}
        {activeProfileTab === 'CREDIBILITY' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Top Score Summary Banner */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '28px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '24px',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  TIA BotShield™ Score
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 900, color: '#059669', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    98.4%
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>Authentic Human Traffic</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                  Audited weekly using Google AI & multi-platform algorithmic verification.
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Milestone Escrow SLA
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 900, color: '#0052FF', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    100%
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0052FF' }}>On-Time Completion</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                  48 out of 48 brand deliverables approved without dispute.
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Repeat Sponsor Rate
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    94%
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Multi-Campaign Renewals</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                  Brands consistently re-book within 90 days.
                </div>
              </div>
            </div>

            {/* Credibility Safeguards Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <ShieldCheckIcon size={18} color="#059669" />
                  <h4 style={{ margin: 0, fontSize: '14.5px', fontWeight: 800, color: '#0F172A' }}>
                    TIA Smart Escrow Guarantee
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                  Brand deposits are locked in secure ICICI nodal escrow and disbursed only upon verified delivery and draft milestone approval.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <IdBadgeIcon size={18} color="#0052FF" />
                  <h4 style={{ margin: 0, fontSize: '14.5px', fontWeight: 800, color: '#0F172A' }}>
                    Government KYC & Tax Verified
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                  Aadhaar, PAN, and GST verification completed. Ready for compliant corporate invoices and TDS credit processing.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <ScaleIcon size={18} color="#16A34A" />
                  <h4 style={{ margin: 0, fontSize: '14.5px', fontWeight: 800, color: '#0F172A' }}>
                    ASCI Legal Compliance
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                  All deliverables adhere strictly to ASCI guidelines, including standard #Ad and #Collab disclosures on Indian social channels.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 5. SUB-TAB 3: COMMERCIAL RATES & PACKAGES                            */}
        {/* ==================================================================== */}
        {activeProfileTab === 'RATES' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                  Standard Commercial Packages
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                  Transparent rates backed by milestone escrow protection and guaranteed SLA turnaround.
                </p>
              </div>

              {isViewingAsOwner && (
                <Link
                  href="/creator?tab=rate-card"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#0052FF',
                    textDecoration: 'none',
                    padding: '6px 12px',
                    backgroundColor: '#EFF6FF',
                    borderRadius: '8px',
                  }}
                >
                  <span>⚙️ Manage Commercial Rates</span>
                </Link>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px' }}>
              {commercialPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: pkg.popular ? '2px solid #0052FF' : '1px solid #E2E8F0',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    boxShadow: pkg.popular ? '0 8px 24px rgba(0, 82, 255, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  {pkg.popular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-11px',
                        left: '20px',
                        backgroundColor: '#0052FF',
                        color: '#FFFFFF',
                        fontSize: '10.5px',
                        fontWeight: 800,
                        padding: '2px 10px',
                        borderRadius: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Most Booked
                    </div>
                  )}

                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>{pkg.platform}</div>
                    <h4 style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                      {pkg.title}
                    </h4>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{pkg.duration}</div>

                    <div style={{ margin: '16px 0', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A' }}>{pkg.price}</span>
                      <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>+ GST</span>
                    </div>

                    <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                      {pkg.description}
                    </p>

                    <div style={{ margin: '16px 0', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Includes:
                      </span>
                      <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px', fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {pkg.features.map((f, idx) => (
                          <li key={idx}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '14px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: '#64748B', marginBottom: '12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <ClockIcon size={12} color="#0052FF" />
                        <span>{pkg.deliveryTime}</span>
                      </span>
                      <span>{pkg.revisions}</span>
                    </div>

                    {!isViewingAsOwner ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPackageForInquiry(pkg.title);
                          setShowInquiryModal(true);
                        }}
                        style={{
                          width: '100%',
                          padding: '10px 0',
                          backgroundColor: pkg.popular ? '#0052FF' : '#F1F5F9',
                          color: pkg.popular ? '#FFFFFF' : '#0F172A',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        Book {pkg.title.split(' ')[0]}
                      </button>
                    ) : (
                      <Link
                        href="/creator?tab=rate-card"
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          padding: '8px 0',
                          backgroundColor: '#F8FAFC',
                          color: '#475569',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        Edit Package
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 6. SUB-TAB 4: SPONSOR ENDORSEMENTS & REVIEWS                          */}
        {/* ==================================================================== */}
        {activeProfileTab === 'REVIEWS' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                  Verified Brand Reviews & Endorsements
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                  Feedback left exclusively by verified brands upon successful escrow release.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                {
                  brand: 'Head of Growth • Boat Lifestyle Audio',
                  text: 'Sarah delivered exceptionally polished benchmark videos. The audio graphs were crystal clear and drove an immediate 28% spike in Amazon store traffic during our launch weekend. 100% on-time milestone delivery.',
                  rating: 5,
                  date: 'August 2026',
                  deliverable: 'Airdopes Pro ANC Launch',
                },
                {
                  brand: 'Senior Brand Manager • OnePlus India',
                  text: 'Hands down one of the most reliable and thorough tech creators in India. The raw benchmark accuracy builds tremendous trust with consumers. Our marketing team has already re-booked for Q4 flagship launch.',
                  rating: 5,
                  date: 'July 2026',
                  deliverable: '13 Pro Camera Tech Review',
                },
                {
                  brand: 'Marketing Lead • Cult.fit',
                  text: 'High energy, authentic lifestyle framing, and stellar audience engagement. Community comments were organically asking for our app discount codes. Great collaborator.',
                  rating: 5,
                  date: 'June 2026',
                  deliverable: 'Transformation Series Reels',
                },
              ].map((rev, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <StarIcon key={i} size={14} color="#F59E0B" />
                        ))}
                      </div>
                      <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>{rev.brand}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>{rev.date}</span>
                  </div>

                  <p style={{ margin: 0, fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
                    &ldquo;{rev.text}&rdquo;
                  </p>

                  <div style={{ fontSize: '12px', color: '#0052FF', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheckIcon size={13} color="#0052FF" />
                    <span>Verified Milestone: {rev.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ==================================================================== */}
      {/* 7. DIRECT BRAND INQUIRY & BOOKING MODAL                               */}
      {/* ==================================================================== */}
      {showInquiryModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              position: 'relative',
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Direct Brand Collaboration
                </div>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 900, color: '#0F172A' }}>
                  Book Collaboration with {displayName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInquiryModal(false)}
                style={{
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            {inquirySentSuccess ? (
              <div style={{ padding: '36px 12px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                    fontSize: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                  }}
                >
                  ✓
                </div>
                <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                  Collaboration Request Transmitted!
                </h4>
                <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                  Your campaign brief has been routed directly to {displayName}&apos;s verified creator management workspace on TIA.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Brand / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sony India, Nike, OnePlus"
                    value={inquiryForm.brandName}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, brandName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13.5px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marketing@yourbrand.com"
                    value={inquiryForm.contactEmail}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, contactEmail: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13.5px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Package Deliverable
                  </label>
                  <select
                    value={inquiryForm.deliverableType}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, deliverableType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13.5px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="Dedicated YouTube Review">Full Dedicated YouTube Video (₹45,000)</option>
                    <option value="Instagram Reel + Stories">Instagram Reel + Story Blitz (₹25,000)</option>
                    <option value="YouTube Mid-Roll Integration">YouTube Mid-Roll Segment (₹20,000)</option>
                    <option value="Cross-Platform Omni Launch">360° Omni Launch Blitz (₹80,000)</option>
                    <option value="Custom Campaign">Custom Campaign / Retainer</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Campaign Objectives / Brief
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your launch dates, product details, and deliverable expectations..."
                    value={inquiryForm.campaignGoals}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, campaignGoals: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13.5px',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#059669', fontWeight: 700 }}>
                  <ShieldCheckIcon size={14} color="#059669" />
                  <span>Protected by TIA Smart Escrow & SLA Guarantee</span>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: '8px',
                    padding: '12px 0',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  Transmit Collaboration Brief →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
