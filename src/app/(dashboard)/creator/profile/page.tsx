'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';

// ============================================================================
// THEMED SVG ICONS (NO RAW EMOJIS - STRICT BRAND SYSTEM)
// ============================================================================

const MapPinIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const VideoCameraIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" />
  </svg>
);

const GlobeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IdBadgeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <rect x="3" y="4" width="18" height="16" />
    <circle cx="9" cy="10" r="2" />
    <line x1="15" y1="8" x2="17" y2="8" />
    <line x1="15" y1="12" x2="17" y2="12" />
    <line x1="7" y1="16" x2="17" y2="16" />
  </svg>
);

const StarIcon: React.FC<{ size?: number; color?: string; filled?: boolean }> = ({ size = 14, color = '#F59E0B', filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ShieldCheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#059669' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ScaleIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#16A34A' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
    <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h18" />
  </svg>
);

const BarChartIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const HeadphonesIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19v2h-1v-2v-3h2zM3 19v2h1v-2v-3H3z" />
  </svg>
);

const SmartphoneIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <rect x="5" y="2" width="14" height="20" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const LeafIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#059669' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const SpeakerIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <rect x="4" y="2" width="16" height="20" />
    <circle cx="12" cy="14" r="4" />
    <line x1="12" y1="6" x2="12.01" y2="6" />
  </svg>
);

const DumbbellIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="m6.5 6.5 11 11" />
    <path d="m21 21-1-1a5 5 0 0 0-7.07 0l-.93.93a5 5 0 0 0 0 7.07l1 1" />
    <path d="m3 3 1 1a5 5 0 0 0 7.07 0l.93-.93a5 5 0 0 0 0-7.07l-1-1" />
    <path d="m18 22 4-4" />
    <path d="m2 6 4-4" />
  </svg>
);

const ActivityIcon: React.FC<{ size?: number; color?: string }> = ({ size = 15, color = '#0052FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export default function CreatorProfilePage() {
  const router = useRouter();
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

  // Cover Image Studio & Gallery Modal State
  const [coverBackground, setCoverBackground] = useState<string>('linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0052FF 100%)');
  const [tempSelectedCover, setTempSelectedCover] = useState<string>('linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0052FF 100%)');
  const [showCoverModal, setShowCoverModal] = useState<boolean>(false);
  const [uploadedCoverPreview, setUploadedCoverPreview] = useState<string | null>(null);
  const [coverSavedSuccess, setCoverSavedSuccess] = useState<boolean>(false);

  const galleryPresets = [
    { id: 'p1', name: 'TIA Cobalt Cyber', value: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0052FF 100%)' },
    { id: 'p2', name: 'Royal Cyber Purple', value: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 50%, #C084FC 100%)' },
    { id: 'p3', name: 'Sunset Coral Flame', value: 'linear-gradient(135deg, #E11D48 0%, #F43F5E 50%, #FB923C 100%)' },
    { id: 'p4', name: 'Electric Ocean Aura', value: 'linear-gradient(135deg, #0284C7 0%, #38BDF8 50%, #FDE047 100%)' },
    { id: 'p5', name: 'Emerald Wave', value: 'linear-gradient(135deg, #064E3B 0%, #059669 50%, #34D399 100%)' },
    { id: 'p6', name: 'Midnight Aurora', value: 'linear-gradient(135deg, #020617 0%, #0052FF 60%, #38BDF8 100%)' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setUploadedCoverPreview(result);
          setTempSelectedCover(`url(${result}) center / cover no-repeat`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCoverImage = () => {
    setCoverBackground(tempSelectedCover);
    setCoverSavedSuccess(true);
    setTimeout(() => {
      setCoverSavedSuccess(false);
      setShowCoverModal(false);
    }, 800);
  };

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
      deliverable: '4x IG Reels + 1x Live Workout Session',
      reach: '76,500 Verified Views',
      engagement: '5.1% ER',
      payout: '₹55,000',
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80',
      rating: '4.9',
      verifiedProof: 'Full Milestone Disbursed via TIA',
    },
  ];

  const renderBrandIcon = (type: string) => {
    switch (type) {
      case 'HEADPHONES': return <HeadphonesIcon size={14} color="#0052FF" />;
      case 'SMARTPHONE': return <SmartphoneIcon size={14} color="#0052FF" />;
      case 'LEAF': return <LeafIcon size={14} color="#059669" />;
      case 'SPEAKER': return <SpeakerIcon size={14} color="#0052FF" />;
      case 'DUMBBELL': return <DumbbellIcon size={14} color="#0052FF" />;
      case 'ACTIVITY': return <ActivityIcon size={14} color="#0052FF" />;
      default: return <SmartphoneIcon size={14} color="#0052FF" />;
    }
  };

  const filteredPortfolio = selectedPortfolioCategory === 'ALL'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === selectedPortfolioCategory);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '90px', fontFamily: 'inherit', color: '#0F172A' }}>
      {/* Design System Scoped CSS - NO CURVES / ZERO BORDER RADIUS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .profile-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (max-width: 768px) {
          .profile-container {
            padding: 0 16px;
          }
          .profile-hero-content {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 18px !important;
          }
          .profile-avatar-wrapper {
            margin-top: -50px !important;
          }
          .profile-stats-bar {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .profile-actions-row {
            width: 100% !important;
            justifyContent: stretch !important;
          }
          .profile-actions-row button, .profile-actions-row a {
            flex: 1 !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }
      `}} />

      {/* Top Header / Sticky Nav Bar */}
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
          className="profile-container"
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Logo & Back to Dashboard */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link
              href="/creator"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '6px 12px',
                borderRadius: '0px',
                backgroundColor: '#F1F5F9',
                color: '#334155',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Dashboard</span>
            </Link>

            <div style={{ height: '20px', width: '1px', backgroundColor: '#E2E8F0' }} />

            <Link href="/creator" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src="/logo-cropped.png"
                alt="The Influencer's Agency"
                style={{ height: '26px', width: 'auto', objectFit: 'contain' }}
              />
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#0052FF',
                  backgroundColor: '#EFF6FF',
                  padding: '2px 7px',
                  borderRadius: '0px',
                  letterSpacing: '0.04em',
                }}
              >
                PUBLIC CREATOR PROFILE
              </span>
            </Link>
          </div>

          {/* Right Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleCopyProfileLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                backgroundColor: copiedLink ? '#ECFDF5' : '#FFFFFF',
                border: copiedLink ? '1px solid #A7F3D0' : '1px solid #CBD5E1',
                borderRadius: '0px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: copiedLink ? '#059669' : '#334155',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {copiedLink ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span>Share Profile</span>
                </>
              )}
            </button>

            <Link
              href="/creator?tab=settings"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '0px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#334155',
                textDecoration: 'none',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span>Edit Profile</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowInquiryModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 16px',
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '0px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 82, 255, 0.25)',
              }}
            >
              <span>Book Collaboration →</span>
            </button>
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
            borderRadius: '0px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          }}
        >
          {/* Cover Artwork Banner */}
          <div
            style={{
              height: '180px',
              width: '100%',
              background: coverBackground,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              transition: 'background 0.3s ease',
            }}
          >
            {/* Ambient Lighting Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)',
              }}
            />

            {/* Change Cover Image Trigger Button */}
            <button
              type="button"
              onClick={() => {
                setTempSelectedCover(coverBackground);
                setShowCoverModal(true);
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '6px 14px',
                borderRadius: '0px',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 82, 255, 0.95)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.85)')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                <rect x="3" y="3" width="18" height="18" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Change Cover Image</span>
            </button>
          </div>

          {/* Profile Identity Body */}
          <div style={{ padding: '0 32px 28px 32px' }}>
            <div className="profile-hero-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
              
              {/* Left Column: Floating Square Avatar + Name & Bio */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '22px', flex: 1 }}>
                {/* Floating Square Avatar - NO CURVES */}
                <div
                  className="profile-avatar-wrapper"
                  style={{
                    position: 'relative',
                    marginTop: '-54px',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: '108px',
                      height: '108px',
                      borderRadius: '0px',
                      background: 'linear-gradient(135deg, #0052FF 0%, #2563EB 100%)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '34px',
                      fontWeight: 900,
                      border: '4px solid #FFFFFF',
                      boxShadow: '0 8px 24px rgba(0, 82, 255, 0.28)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    SJ
                  </div>
                </div>

                {/* Creator Title & Meta */}
                <div style={{ paddingTop: '12px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                      Sarah Jenkins
                    </h1>
                    <span style={{ fontSize: '14.5px', color: '#0052FF', fontWeight: 700 }}>
                      @creator.official
                    </span>
                    <BlueCheckBadge size={16} title="Verified TIA Creator" />
                  </div>

                  {/* Subtitle / Tagline */}
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#475569', marginTop: '4px' }}>
                    Tech Reviewer & AI Hardware Specialist • 615K+ Community
                  </div>

                  {/* Location & Quick Meta Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', fontSize: '12.5px', color: '#64748B', flexWrap: 'wrap' }}>
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
                    <span style={{ color: '#CBD5E1' }}>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <IdBadgeIcon size={13} color="#0052FF" />
                      <span style={{ fontFamily: 'monospace', color: '#475569', fontWeight: 600 }}>Card ID: TIA-CR-98420</span>
                    </span>
                  </div>

                  {/* Bio Paragraph */}
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, margin: '14px 0 0 0', maxWidth: '780px' }}>
                    Creating cinematic, deep-dive reviews and benchmark tests for consumer electronics, smartphones, audio gear, and emerging AI hardware tools. Known for uncompromising benchmark authenticity, prompt milestone delivery, and over 550,000+ verified cross-platform community members with consistent top-tier engagement.
                  </p>
                </div>
              </div>

              {/* Right Column: CTA Buttons & Credibility Box */}
              <div style={{ paddingTop: '12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '14px' }}>
                <div className="profile-actions-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '0px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: isBookmarked ? '#F59E0B' : '#64748B',
                      transition: 'all 0.15s ease',
                    }}
                    title="Bookmark Creator to Roster"
                  >
                    <StarIcon size={18} color={isBookmarked ? '#F59E0B' : '#64748B'} filled={isBookmarked} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowInquiryModal(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '10px 20px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '0px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 3px 8px rgba(0, 82, 255, 0.25)',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Direct Message / Inquiry</span>
                  </button>
                </div>

                {/* TIA Credibility Score Pill Card */}
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '0px',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      TIA Credibility Index
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
                      <span style={{ fontSize: '22px', fontWeight: 900, color: '#059669', lineHeight: 1 }}>98</span>
                      <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 700 }}>/ 100</span>
                      <span style={{ fontSize: '11px', color: '#059669', fontWeight: 800, marginLeft: '4px' }}>Grade A+</span>
                    </div>
                  </div>
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
                  borderRadius: '0px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#0052FF',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#0052FF">
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
                  borderRadius: '0px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#0052FF',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <rect x="2" y="2" width="20" height="20" />
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
                  borderRadius: '0px',
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
                  borderRadius: '0px',
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
                href="/creator?tab=social-media"
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
        {/* 2. PROFILE NAVIGATION TABS                                           */}
        {/* ==================================================================== */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', borderBottom: '1px solid #E2E8F0', paddingBottom: '2px', overflowX: 'auto' }}>
          {[
            { id: 'PORTFOLIO', label: 'Past Brand Work & Portfolio', count: 6 },
            { id: 'CREDIBILITY', label: 'Trust & BotShield Matrix', count: null },
            { id: 'RATES', label: 'Commercial Rates & Packages', count: 4 },
            { id: 'REVIEWS', label: 'Sponsor Endorsements', count: 14 },
          ].map((tab) => {
            const isActive = activeProfileTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveProfileTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 2px 14px 2px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #0052FF' : '3px solid transparent',
                  color: isActive ? '#0052FF' : '#64748B',
                  fontSize: '14px',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  borderRadius: '0px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: isActive ? '#0052FF' : '#64748B',
                      backgroundColor: isActive ? '#EFF6FF' : '#F1F5F9',
                      padding: '1px 7px',
                      borderRadius: '0px',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', marginRight: '4px' }}>Filter by:</span>
              {['ALL', 'TECH', 'FITNESS', 'LIFESTYLE'].map((cat) => {
                const isCatActive = selectedPortfolioCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedPortfolioCategory(cat)}
                    style={{
                      padding: '5px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      borderRadius: '0px',
                      cursor: 'pointer',
                      border: isCatActive ? '1px solid #0052FF' : '1px solid #E2E8F0',
                      backgroundColor: isCatActive ? '#EFF6FF' : '#FFFFFF',
                      color: isCatActive ? '#0052FF' : '#475569',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {cat === 'ALL' ? 'All Deliverables' : cat}
                  </button>
                );
              })}
            </div>

            {/* Portfolio Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '22px' }}>
              {filteredPortfolio.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0px',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 82, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';
                  }}
                >
                  {/* Thumbnail Hero */}
                  <div style={{ position: 'relative', height: '180px', width: '100%', backgroundColor: '#0F172A' }}>
                    <img
                      src={item.thumbnail}
                      alt={item.campaign}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(15,23,42,0.6) 100%)' }} />
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        border: '1px solid #A7F3D0',
                        padding: '3px 9px',
                        borderRadius: '0px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item.status}</span>
                    </span>
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                        padding: '3px 8px',
                        borderRadius: '0px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      {renderBrandIcon(item.iconType)}
                      <span>{item.brand}</span>
                    </span>
                  </div>

                  {/* Card Content Body */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {item.category} CAMPAIGN
                      </div>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '4px 0 6px 0', lineHeight: 1.35 }}>
                        {item.campaign}
                      </h4>
                      <div style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '14px' }}>
                        {item.deliverable}
                      </div>
                    </div>

                    {/* Stats Footer */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '0px', border: '1px solid #F1F5F9', marginBottom: '12px' }}>
                        <div>
                          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Audience Reach</div>
                          <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A' }}>{item.reach}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Engagement</div>
                          <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#059669' }}>{item.engagement}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <ShieldCheckIcon size={13} color="#059669" />
                          <span>{item.verifiedProof}</span>
                        </span>
                        <span style={{ fontWeight: 800, color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <StarIcon size={13} color="#F59E0B" />
                          <span>{item.rating}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 4. SUB-TAB 2: TRUST & BOTSHIELD MATRIX                               */}
        {/* ==================================================================== */}
        {activeProfileTab === 'CREDIBILITY' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Top 3 Trust Hero Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0px', border: '1px solid #E2E8F0', padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '0px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheckIcon size={20} color="#059669" />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>BotShield Verification</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#059669' }}>98.4% Real Audience</div>
                  </div>
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Audience verified via TIA BotShield AI engine. Zero artificial engagement pods or fake follower anomalies detected.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0px', border: '1px solid #E2E8F0', padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '0px', backgroundColor: '#EFF6FF', color: '#0052FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ClockIcon size={20} color="#0052FF" />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Milestone Reliability</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#0052FF' }}>100% On-Time Delivery</div>
                  </div>
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  18 out of 18 milestone deliverables submitted ahead of schedule with 100% brand agreement compliance.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0px', border: '1px solid #E2E8F0', padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '0px', backgroundColor: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ScaleIcon size={20} color="#16A34A" />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Dispute & Penalty Rate</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#16A34A' }}>0.0% Clean Record</div>
                  </div>
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Zero arbitration disputes or cancellation claims in the past 24 months. 100% smooth payment settlements.
                </p>
              </div>
            </div>

            {/* Audience Demographics Summary Table */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0px', border: '1px solid #E2E8F0', padding: '24px 28px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <BarChartIcon size={18} color="#0052FF" />
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Audience Geographic & Demographic Breakdown
                </h3>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '12px' }}>Top Audience Geographies</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { code: 'IN', name: 'India', pct: 68 },
                      { code: 'US', name: 'United States', pct: 14 },
                      { code: 'GB', name: 'United Kingdom', pct: 8 },
                      { code: 'AE', name: 'UAE & Middle East', pct: 6 },
                      { code: 'GL', name: 'Other International', pct: 4 },
                    ].map((g, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '1px 5px', borderRadius: '0px' }}>
                            {g.code}
                          </span>
                          <span style={{ fontWeight: 600, color: '#334155' }}>{g.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '90px', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '0px', overflow: 'hidden' }}>
                            <div style={{ width: `${g.pct}%`, height: '100%', backgroundColor: '#0052FF', borderRadius: '0px' }} />
                          </div>
                          <span style={{ fontWeight: 800, color: '#0F172A', minWidth: '32px', textAlign: 'right' }}>{g.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '12px' }}>Age & Gender Distribution</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { range: '18–24 Years', pct: 44 },
                      { range: '25–34 Years', pct: 38 },
                      { range: '35–44 Years', pct: 14 },
                      { range: '45+ Years', pct: 4 },
                    ].map((a, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ fontWeight: 600, color: '#334155' }}>{a.range}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '90px', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '0px', overflow: 'hidden' }}>
                            <div style={{ width: `${a.pct}%`, height: '100%', backgroundColor: '#059669', borderRadius: '0px' }} />
                          </div>
                          <span style={{ fontWeight: 800, color: '#0F172A', minWidth: '32px', textAlign: 'right' }}>{a.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 5. SUB-TAB 3: RATE CARD & COMMERCIAL PACKAGES                         */}
        {/* ==================================================================== */}
        {activeProfileTab === 'RATES' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Transparency Note */}
            <div
              style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '0px',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
                fontSize: '12.5px',
                color: '#1E40AF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheckIcon size={16} color="#0052FF" />
                <span><strong>TIA Payment Protection Policy</strong>: All rates are disbursed securely upon milestone approvals with 5% platform commission and 1% TDS compliance.</span>
              </div>
              <span style={{ fontWeight: 700, backgroundColor: '#FFFFFF', padding: '3px 8px', borderRadius: '0px', border: '1px solid #BFDBFE', fontSize: '11.5px' }}>
                GST Compliant Invoice
              </span>
            </div>

            {/* Packages Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                {
                  title: 'Dedicated YouTube Review',
                  price: '₹65,000',
                  deliverables: '8-12 Min Cinematic 4K Video, Dedicated Script, Pinned Comment, Link in Description, 30-Day Exclusivity',
                  turnaround: '7-10 Business Days',
                  revisions: '2 Free Script & Cut Revisions',
                  popular: true,
                },
                {
                  title: 'Instagram Reel Trio Package',
                  price: '₹45,000',
                  deliverables: '3x High Quality 9:16 Reels, Audio Sync, Brand Tag, Story Repost, 14-Day Link in Bio',
                  turnaround: '5 Business Days',
                  revisions: '1 Free Edit Revision',
                  popular: false,
                },
                {
                  title: 'YouTube 60s Mid-Roll Integration',
                  price: '₹35,000',
                  deliverables: '60s Dedicated Ad Read, Custom Product Demo, Description Callout & Discount Code Link',
                  turnaround: '5 Business Days',
                  revisions: '1 Free Script Revision',
                  popular: false,
                },
                {
                  title: 'Story Trio + Direct Swipe-Up Link',
                  price: '₹18,000',
                  deliverables: '3x Sequential Instagram Stories with Swipe-Up / Sticker Link, Highlight Pin for 7 Days',
                  turnaround: '2 Business Days',
                  revisions: 'Instant Publish',
                  popular: false,
                },
              ].map((rate, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0px',
                    border: rate.popular ? '2px solid #0052FF' : '1px solid #E2E8F0',
                    padding: '26px 24px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}
                >
                  {rate.popular && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-11px',
                        left: '20px',
                        backgroundColor: '#0052FF',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '3px 9px',
                        borderRadius: '0px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <StarIcon size={11} color="#FFFFFF" />
                      <span>MOST POPULAR PACKAGE</span>
                    </span>
                  )}
                  <div>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
                      {rate.title}
                    </h4>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#0052FF', marginBottom: '14px', letterSpacing: '-0.02em' }}>
                      {rate.price}
                    </div>
                    <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, marginBottom: '16px' }}>
                      {rate.deliverables}
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', color: '#475569', marginBottom: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ClockIcon size={13} color="#64748B" />
                      <span>Turnaround: <strong>{rate.turnaround}</strong></span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#059669', marginBottom: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{rate.revisions}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPackageForInquiry(rate.title);
                        setInquiryForm((prev) => ({ ...prev, deliverableType: rate.title, budget: rate.price.replace(/[^0-9]/g, '') }));
                        setShowInquiryModal(true);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        padding: '10px 16px',
                        backgroundColor: rate.popular ? '#0052FF' : '#F1F5F9',
                        color: rate.popular ? '#FFFFFF' : '#334155',
                        border: 'none',
                        borderRadius: '0px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      Book This Deliverable →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 6. SUB-TAB 4: SPONSOR REVIEWS & ENDORSEMENTS                         */}
        {/* ==================================================================== */}
        {activeProfileTab === 'REVIEWS' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Reviews Summary Header */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0px', border: '1px solid #E2E8F0', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '46px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>
                  4.95
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} size={17} color="#F59E0B" />
                    ))}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, marginTop: '3px' }}>
                    Based on 14 Enterprise Brand Endorsements
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12.5px', color: '#475569' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong style={{ color: '#059669' }}>100%</strong> Positive Feedback</span>
                </div>
                <div style={{ width: '1px', height: '18px', backgroundColor: '#CBD5E1' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheckIcon size={14} color="#0052FF" />
                  <span><strong style={{ color: '#0052FF' }}>100%</strong> Verified TIA Settlements</span>
                </div>
              </div>
            </div>

            {/* Individual Reviews List */}
            {[
              {
                brand: 'Nike Lifestyle India',
                iconType: 'ACTIVITY',
                reviewer: 'Ankit Sharma (Brand Lead)',
                rating: '5.0',
                comment: 'Sarah produced one of our highest-performing fitness reels this quarter. Clear communication, prompt script revisions, and finished ahead of schedule with remarkable click-through conversion.',
                date: '2 weeks ago',
                project: 'Air Zoom Running Series 2026',
              },
              {
                brand: 'OnePlus India',
                iconType: 'SMARTPHONE',
                reviewer: 'Priya Mehra (Senior Campaign Manager)',
                rating: '5.0',
                comment: 'The camera breakdown unboxing was thorough, cinematic, and our direct retail affiliate conversion was 2.3x higher than our benchmark. Highly recommended creator for enterprise tech rollouts.',
                date: '1 month ago',
                project: 'Flagship 13 Pro Camera Breakdown',
              },
              {
                brand: 'Boat Lifestyle Audio',
                iconType: 'HEADPHONES',
                reviewer: 'Rohan Gupta (Influencer Marketing Team)',
                rating: '4.9',
                comment: 'Exceptional audio production quality, stylish aesthetic, and seamless integration of product noise cancellation features. Looking forward to our next quarterly campaign.',
                date: '2 months ago',
                project: 'Airdopes Pro ANC Launch',
              },
              {
                brand: 'Mamaearth Organics',
                iconType: 'LEAF',
                reviewer: 'Deepika Nair (Marketing Director)',
                rating: '4.8',
                comment: 'Very authentic storytelling and high swipe-up CTR on the Story series. Audience engagement was organic and positive throughout.',
                date: '3 months ago',
                project: 'Vitamin C Morning Routine',
              },
            ].map((rev, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '0px',
                  border: '1px solid #E2E8F0',
                  padding: '20px 24px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '0px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderBrandIcon(rev.iconType)}
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>{rev.brand}</span>
                    <span style={{ fontSize: '12.5px', color: '#64748B' }}>• {rev.reviewer}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>{rev.date}</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <StarIcon size={13} color="#F59E0B" />
                      <span>{rev.rating}</span>
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '11.5px', color: '#0052FF', fontWeight: 700, marginBottom: '8px' }}>
                  Project: {rev.project}
                </div>

                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ==================================================================== */}
      {/* 7. INQUIRY / BOOKING MODAL (NO CURVES)                                */}
      {/* ==================================================================== */}
      {showInquiryModal && (
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
          onClick={() => setShowInquiryModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '0px',
              border: '1px solid #E2E8F0',
              padding: '28px 32px',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Book Collaboration with Sarah
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '3px 0 0 0' }}>
                  Submit your brief or inquiry directly to Sarah Jenkins.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowInquiryModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                  color: '#94A3B8',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {inquirySentSuccess ? (
              <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '0px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#059669', margin: '0 0 4px 0' }}>
                  Inquiry Sent Successfully!
                </h4>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                  Sarah Jenkins will review your campaign details and reply in your TIA Inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Brand or Agency Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Tech Global"
                    value={inquiryForm.brandName}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, brandName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '0px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Contact Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. partnerships@acmetech.com"
                    value={inquiryForm.contactEmail}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, contactEmail: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '0px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Deliverable Selected
                    </label>
                    <select
                      value={inquiryForm.deliverableType}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, deliverableType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 10px',
                        borderRadius: '0px',
                        border: '1px solid #CBD5E1',
                        fontSize: '12.5px',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <option value="Dedicated YouTube Review">Dedicated YouTube (₹65k)</option>
                      <option value="Instagram Reel Trio Package">Reels Trio (₹45k)</option>
                      <option value="YouTube 60s Mid-Roll Integration">60s Integration (₹35k)</option>
                      <option value="Story Trio + Direct Swipe-Up Link">Story Trio (₹18k)</option>
                      <option value="Custom Multi-Channel Campaign">Custom Campaign</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Estimated Budget (₹)
                    </label>
                    <input
                      type="text"
                      value={inquiryForm.budget}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, budget: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '0px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Campaign Objectives & Deliverable Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your product launch, key dates, or specific deliverable goals..."
                    value={inquiryForm.campaignGoals}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, campaignGoals: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '0px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setShowInquiryModal(false)}
                    style={{
                      padding: '9px 16px',
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '0px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '9px 20px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '0px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,82,255,0.25)',
                    }}
                  >
                    Send Direct Inquiry →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 8. UPLOAD COVER IMAGE & GALLERY MODAL (NO CURVES)                    */}
      {/* ==================================================================== */}
      {showCoverModal && (
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
          onClick={() => setShowCoverModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '0px',
              border: '1px solid #E2E8F0',
              padding: '32px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                Upload your cover image
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                Choose an image that will appear everywhere in our app.
              </p>
            </div>

            {/* Section 1: Upload New Image Dropzone */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                Upload new image:
              </label>

              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '28px 20px',
                  borderRadius: '0px',
                  border: '1.5px dashed #CBD5E1',
                  backgroundColor: uploadedCoverPreview ? '#EFF6FF' : '#F8FAFC',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0052FF';
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                }}
                onMouseLeave={(e) => {
                  if (!uploadedCoverPreview) {
                    e.currentTarget.style.borderColor = '#CBD5E1';
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }
                }}
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif, image/svg+xml, image/webp"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />

                {/* Folder Upload Icon */}
                <div style={{ width: '42px', height: '42px', borderRadius: '0px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                    <path d="m12 10 3 3m-3-3-3 3m3-3v7" />
                  </svg>
                </div>

                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  {uploadedCoverPreview ? '✓ Image Loaded — Click to replace' : 'Click or drag and drop to upload your file'}
                </div>
                <div style={{ fontSize: '11.5px', color: '#94A3B8' }}>
                  PNG, JPG, PDF, GIF, SVG (Max 5 MB)
                </div>
              </label>
            </div>

            {/* Divider: OR */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', letterSpacing: '0.06em' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
            </div>

            {/* Section 2: Choose from your gallery */}
            <div style={{ marginBottom: '26px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                Choose from your gallery:
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                {galleryPresets.map((preset) => {
                  const isSelected = tempSelectedCover === preset.value;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setUploadedCoverPreview(null);
                        setTempSelectedCover(preset.value);
                      }}
                      title={preset.name}
                      style={{
                        aspectRatio: '1/1',
                        width: '100%',
                        borderRadius: '0px',
                        background: preset.value,
                        border: isSelected ? '3px solid #0052FF' : '2px solid transparent',
                        boxShadow: isSelected ? '0 0 0 2px #BFDBFE, 0 4px 10px rgba(0,82,255,0.25)' : '0 1px 3px rgba(0,0,0,0.08)',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.15s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        padding: 0,
                      }}
                    >
                      {isSelected && (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,82,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowCoverModal(false)}
                style={{
                  padding: '11px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '0px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#334155',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveCoverImage}
                style={{
                  padding: '11px',
                  backgroundColor: '#0052FF',
                  border: 'none',
                  borderRadius: '0px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 82, 255, 0.3)',
                  transition: 'all 0.15s ease',
                }}
              >
                {coverSavedSuccess ? '✓ Saved!' : 'Save image'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
