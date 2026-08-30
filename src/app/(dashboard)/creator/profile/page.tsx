'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';

export default function CreatorProfilePage() {
  const router = useRouter();
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'PORTFOLIO' | 'CREDIBILITY' | 'RATES' | 'REVIEWS'>('PORTFOLIO');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');

  const handleCopyProfileLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px', fontFamily: 'inherit' }}>
      {/* Top Header / Nav Bar */}
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
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Logo & Back to Dashboard */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/creator"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: '#F1F5F9',
                color: '#334155',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                  padding: '2px 6px',
                  borderRadius: '4px',
                  letterSpacing: '0.04em',
                }}
              >
                CREATOR PROFILE
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
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: copiedLink ? '#059669' : '#334155',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {copiedLink ? (
                <>
                  <span>✓</span>
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                padding: '7px 16px',
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 6px rgba(0, 82, 255, 0.25)',
              }}
            >
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Profile Canvas */}
      <main style={{ maxWidth: '1200px', margin: '24px auto 0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* 1. HERO PROFILE & CREDIBILITY IDENTITY CARD */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '32px 36px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Decorative Accent Strip */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '5px',
              background: 'linear-gradient(90deg, #0052FF 0%, #7C3AED 50%, #059669 100%)',
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            {/* Left: Avatar & Identity Details */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0052FF 0%, #7C3AED 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 900,
                  flexShrink: 0,
                  boxShadow: '0 6px 20px rgba(0, 82, 255, 0.25)',
                  border: '3px solid #FFFFFF',
                }}
              >
                SJ
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                    Sarah Jenkins
                  </h1>
                  <span style={{ fontSize: '14px', color: '#0052FF', fontWeight: 700 }}>
                    @creator.official
                  </span>
                  <BlueCheckBadge size={16} title="Verified TIA Partner" />
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 800,
                      color: '#059669',
                      backgroundColor: '#ECFDF5',
                      border: '1px solid #A7F3D0',
                      padding: '2px 9px',
                      borderRadius: '12px',
                    }}
                  >
                    ✓ TIA Elite Verified Partner
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '13px', color: '#64748B', flexWrap: 'wrap' }}>
                  <span>📍 Mumbai, India 🇮🇳</span>
                  <span style={{ color: '#CBD5E1' }}>•</span>
                  <span>🎬 Tech, Fitness & Lifestyle</span>
                  <span style={{ color: '#CBD5E1' }}>•</span>
                  <span>🌐 English, Hindi</span>
                  <span style={{ color: '#CBD5E1' }}>•</span>
                  <span style={{ fontFamily: 'monospace', color: '#475569', fontWeight: 600 }}>Card ID: TIA-CR-98420</span>
                </div>

                {/* Creator Bio Statement */}
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, margin: '14px 0 0 0', maxWidth: '780px' }}>
                  Sarah Jenkins is an authentic lifestyle, fitness, and technology creator based in Mumbai. Known for high-production unboxings, rigorous gadget benchmarks, and inspiring wellness routines. Over 550,000+ verified cross-platform community members with consistent top-tier engagement.
                </p>
              </div>
            </div>

            {/* Right: Quick Action Buttons & Score Card */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: isBookmarked ? '#F59E0B' : '#64748B',
                    transition: 'all 0.15s ease',
                  }}
                  title="Bookmark Creator Profile"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>

                <Link
                  href="/creator?tab=collabs"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 18px',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 2px 6px rgba(0, 82, 255, 0.25)',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Direct Message</span>
                </Link>
              </div>

              {/* Credibility Score Box */}
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    TIA Credibility Index
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 900, color: '#059669' }}>98</span>
                    <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 700 }}>/ 100</span>
                    <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700, marginLeft: '4px' }}>(Grade A+)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Channels Pills Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '24px', flexWrap: 'wrap', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Verified Channels:</span>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#0F172A',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>185K Subscribers</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#0F172A',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="url(#igProfGrad)" />
                <circle cx="12" cy="12" r="4.5" stroke="#FFFFFF" strokeWidth="1.8" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="#FFFFFF" />
                <defs>
                  <linearGradient id="igProfGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F58529" />
                    <stop offset="0.5" stopColor="#DD2A7B" />
                    <stop offset="1" stopColor="#8134AF" />
                  </linearGradient>
                </defs>
              </svg>
              <span>320K Followers</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#0F172A',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0F172A">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>45K Followers</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#0F172A',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>65K Connections</span>
            </div>

            <Link
              href="/creator?tab=social-media"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#0052FF',
                textDecoration: 'none',
                marginLeft: 'auto',
              }}
            >
              View Detailed Social Analytics →
            </Link>
          </div>
        </div>

        {/* 2. PROFILE NAVIGATION TABS (PORTFOLIO | CREDIBILITY | RATE CARD | REVIEWS) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', borderBottom: '1px solid #E2E8F0' }}>
          {[
            { id: 'PORTFOLIO', label: 'Past Brand Work & Portfolio' },
            { id: 'CREDIBILITY', label: 'Trust & Verification Matrix' },
            { id: 'RATES', label: 'Rate Card & Packages' },
            { id: 'REVIEWS', label: 'Sponsor Endorsements (14)' },
          ].map((tab) => {
            const isActive = activeProfileTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveProfileTab(tab.id as any)}
                style={{
                  padding: '10px 4px 14px 4px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2.5px solid #0052FF' : '2.5px solid transparent',
                  color: isActive ? '#0052FF' : '#64748B',
                  fontSize: '14px',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3. TAB 1: PORTFOLIO & PAST COLLABORATIONS */}
        {activeProfileTab === 'PORTFOLIO' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                {
                  brand: 'Nike Lifestyle India',
                  campaign: 'Air Zoom Running Series 2026',
                  deliverable: '1x Dedicated Video + 2x IG Reels',
                  reach: '142,500 Verified Views',
                  engagement: '5.4% ER',
                  payout: '₹65,000',
                  status: 'Completed',
                  thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
                  rating: '5.0 ⭐',
                },
                {
                  brand: 'Boat Lifestyle Audio',
                  campaign: 'Airdopes Pro ANC Launch',
                  deliverable: '3x Instagram Reels + Bio Link',
                  reach: '88,200 Verified Views',
                  engagement: '4.9% ER',
                  payout: '₹45,000',
                  status: 'Completed',
                  thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
                  rating: '4.9 ⭐',
                },
                {
                  brand: 'OnePlus India',
                  campaign: 'Flagship 13 Pro Camera Breakdown',
                  deliverable: '1x YouTube Dedicated Review',
                  reach: '96,400 Verified Views',
                  engagement: '6.2% ER',
                  payout: '₹75,000',
                  status: 'Completed',
                  thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
                  rating: '5.0 ⭐',
                },
                {
                  brand: 'Mamaearth Organics',
                  campaign: 'Vitamin C Serum Daily Routine',
                  deliverable: 'Story Trio + Affiliate Link',
                  reach: '32,400 Verified Views',
                  engagement: '4.2% ER',
                  payout: '₹18,000',
                  status: 'Completed',
                  thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
                  rating: '4.8 ⭐',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ position: 'relative', height: '160px', width: '100%' }}>
                    <img
                      src={item.thumbnail}
                      alt={item.campaign}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        border: '1px solid #A7F3D0',
                        padding: '3px 8px',
                        borderRadius: '12px',
                      }}
                    >
                      ✓ {item.status}
                    </span>
                  </div>

                  <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {item.brand}
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '4px 0 6px 0' }}>
                        {item.campaign}
                      </h4>
                      <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '12px' }}>
                        {item.deliverable}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #F1F5F9', fontSize: '12px' }}>
                      <div>
                        <span style={{ fontWeight: 800, color: '#0F172A' }}>{item.reach}</span>
                      </div>
                      <span style={{ fontWeight: 800, color: '#059669' }}>{item.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TAB 2: CREDIBILITY & TRUST MATRIX */}
        {activeProfileTab === 'CREDIBILITY' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>
                🛡️ TIA Verification Standards
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#64748B' }}>Human Audience Ratio</span>
                  <span style={{ fontWeight: 800, color: '#059669' }}>98.4% (BotShield Verified)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#64748B' }}>On-Time Milestone Delivery</span>
                  <span style={{ fontWeight: 800, color: '#059669' }}>100% (18/18 Projects)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#64748B' }}>Dispute Rate</span>
                  <span style={{ fontWeight: 800, color: '#059669' }}>0.0% (Clean Record)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Payment Disbursal Reliability</span>
                  <span style={{ fontWeight: 800, color: '#0052FF' }}>100% Disbursed via TIA</span>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>
                ⭐ Brand Satisfaction
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '42px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>
                  4.95
                </div>
                <div>
                  <div style={{ fontSize: '16px', color: '#F59E0B' }}>⭐⭐⭐⭐⭐</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Based on 14 Enterprise Brand Reviews</div>
                </div>
              </div>
              <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                &ldquo;Sarah delivered beyond our expectations with prompt milestone communication, authentic script revisions, and high viewer retention.&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* 5. TAB 3: RATE CARD & PACKAGES */}
        {activeProfileTab === 'RATES' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              {
                title: 'Dedicated YouTube Review',
                price: '₹65,000',
                deliverables: '8-12 Min Full Video, Dedicated Script, Pinned Comment, Link in Description',
                turnaround: '7-10 Business Days',
                popular: true,
              },
              {
                title: 'Instagram Reel Trio Package',
                price: '₹45,000',
                deliverables: '3x High Quality 9:16 Reels, Audio Sync, Brand Tag, Story Repost',
                turnaround: '5 Business Days',
                popular: false,
              },
              {
                title: 'YouTube 60s Integration',
                price: '₹35,000',
                deliverables: '60s Mid-Roll Ad Read, Custom Demo, Description Callout',
                turnaround: '5 Business Days',
                popular: false,
              },
              {
                title: 'Story Trio + Direct Link',
                price: '₹18,000',
                deliverables: '3x Sequential Instagram Stories with Swipe-Up / Sticker Link',
                turnaround: '2 Business Days',
                popular: false,
              },
            ].map((rate, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: rate.popular ? '2px solid #0052FF' : '1px solid #E2E8F0',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
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
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    MOST POPULAR
                  </span>
                )}
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
                    {rate.title}
                  </h4>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#0052FF', marginBottom: '14px' }}>
                    {rate.price}
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '14px' }}>
                    {rate.deliverables}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '11.5px', color: '#94A3B8', marginBottom: '12px' }}>
                    ⏱ Turnaround: {rate.turnaround}
                  </div>
                  <Link
                    href="/creator?tab=collabs"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '8px',
                      backgroundColor: rate.popular ? '#0052FF' : '#F1F5F9',
                      color: rate.popular ? '#FFFFFF' : '#334155',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    Inquire / Book Deliverable
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. TAB 4: REVIEWS & SPONSOR ENDORSEMENTS */}
        {activeProfileTab === 'REVIEWS' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              {
                brand: 'Nike Lifestyle India',
                reviewer: 'Marketing Lead',
                rating: '5.0 ⭐',
                comment: 'Sarah produced one of our highest-performing fitness reels this quarter. Clear communication and delivery ahead of schedule.',
                date: '2 weeks ago',
              },
              {
                brand: 'OnePlus India',
                reviewer: 'Brand Campaign Manager',
                rating: '5.0 ⭐',
                comment: 'The camera breakdown unboxing was thorough and our click-through conversion was 2.3x higher than our benchmark. Highly recommended creator.',
                date: '1 month ago',
              },
              {
                brand: 'Boat Lifestyle Audio',
                reviewer: 'Influencer Marketing Team',
                rating: '4.9 ⭐',
                comment: 'Great audio quality, stylish aesthetic, and seamless integration of product key features. Looking forward to our next collaboration.',
                date: '2 months ago',
              },
            ].map((rev, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  padding: '18px 22px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{rev.brand}</span>
                    <span style={{ fontSize: '12px', color: '#94A3B8', marginLeft: '8px' }}>• {rev.reviewer}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>{rev.date}</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>{rev.rating}</span>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
