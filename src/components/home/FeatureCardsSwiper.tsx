'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldCheckIcon,
  DocumentIcon,
  ScaleIcon,
} from '@/components/ui/Icons';

interface SwiperProductCard {
  id: string;
  title: string;
  description: string;
  href: string;
  bgGradient: string;
  tag: string;
  graphic: React.ReactNode;
}

const SWIPER_CARDS: SwiperProductCard[] = [
  {
    id: 'creator-vibe-check',
    tag: 'VIBE CHECK & REACH',
    title: 'Creator Vibe Check™',
    description: 'Find verified talent with authentic engagement, zero ghost followers, and 100% genuine creator aura.',
    href: '/brand/creators',
    bgGradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #BAE6FD',
          boxShadow: '0 6px 20px rgba(0, 82, 255, 0.10)',
          padding: '12px 14px',
          width: '80%',
          maxWidth: '200px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '7px', height: '7px', backgroundColor: '#0052FF' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#0F172A' }}>Vibe Match™</span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#059669' }}>98.4% Match</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '28px', marginBottom: '6px' }}>
            <div style={{ width: '14%', height: '40%', backgroundColor: '#DBEAFE' }} />
            <div style={{ width: '14%', height: '65%', backgroundColor: '#93C5FD' }} />
            <div style={{ width: '14%', height: '50%', backgroundColor: '#60A5FA' }} />
            <div style={{ width: '14%', height: '85%', backgroundColor: '#3B82F6' }} />
            <div style={{ width: '14%', height: '70%', backgroundColor: '#2563EB' }} />
            <div style={{ width: '14%', height: '100%', backgroundColor: '#0052FF' }} />
          </div>
          <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 600 }}>Reach: 2.4M Superfans</div>
        </div>

        <div style={{
          position: 'absolute',
          top: '10%',
          right: '6%',
          backgroundColor: '#0052FF',
          color: '#FFFFFF',
          padding: '3px 8px',
          fontSize: '9px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          boxShadow: '0 4px 10px rgba(0, 82, 255, 0.20)',
        }}>
          <CheckIcon size={9} color="#FFFFFF" />
          <span>Real Followers</span>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '8%',
          left: '5%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #CBD5E1',
          padding: '3px 6px',
          fontSize: '9px',
          fontWeight: 700,
          color: '#0F172A',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        }}>
          + Aura 92/100
        </div>
      </div>
    ),
  },
  {
    id: 'bag-protection',
    tag: 'BAG PROTECTION',
    title: 'Guaranteed Bag Protection',
    description: 'Brand funds locked upfront before you shoot. Drop your content, get your full bag with zero stress.',
    href: '/brand',
    bgGradient: 'linear-gradient(135deg, #ECFDF5 0%, #A7F3D0 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #6EE7B7',
          boxShadow: '0 6px 20px rgba(5, 150, 105, 0.10)',
          padding: '12px 14px',
          width: '80%',
          maxWidth: '200px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#065F46' }}>Creator Vault</span>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#059669', backgroundColor: '#D1FAE5', padding: '1px 5px' }}>LOCKED SAFE</span>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
            INR 1,50,000
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748B' }}>
            <span>You Keep: 95%</span>
            <span>Fee: 5.00%</span>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '10%',
          left: '6%',
          backgroundColor: '#059669',
          color: '#FFFFFF',
          padding: '3px 8px',
          fontSize: '9px',
          fontWeight: 700,
          boxShadow: '0 4px 10px rgba(5, 150, 105, 0.20)',
        }}>
          + Auto Payout
        </div>

        <div style={{
          position: 'absolute',
          bottom: '8%',
          right: '6%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #A7F3D0',
          padding: '3px 8px',
          fontSize: '9px',
          fontWeight: 700,
          color: '#065F46',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
        }}>
          <ShieldCheckIcon size={11} color="#059669" />
          <span>Bag Secured</span>
        </div>
      </div>
    ),
  },
  {
    id: 'collab-deals',
    tag: 'DEAL MAKER',
    title: 'No-BS Collab Deals',
    description: 'Locked deliverables, clear usage rights, and guaranteed protection against sneaky edits or unpaid briefs.',
    href: '/brand',
    bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #93C5FD',
          boxShadow: '0 6px 20px rgba(37, 99, 235, 0.10)',
          padding: '12px 14px',
          width: '80%',
          maxWidth: '200px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
            <DocumentIcon size={12} color="#0052FF" />
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#0F172A' }}>Collab Deal Locked</span>
          </div>
          <div style={{ height: '3px', backgroundColor: '#EFF6FF', marginBottom: '4px' }} />
          <div style={{ height: '3px', backgroundColor: '#EFF6FF', width: '75%', marginBottom: '8px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#059669' }}>✓ 1 Reel</span>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#059669' }}>✓ 2 Stories</span>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '10%',
          right: '6%',
          backgroundColor: '#1E40AF',
          color: '#FFFFFF',
          padding: '3px 7px',
          fontSize: '9px',
          fontWeight: 700,
        }}>
          No Scope Creep
        </div>

        <div style={{
          position: 'absolute',
          bottom: '8%',
          left: '6%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #BFDBFE',
          padding: '3px 7px',
          fontSize: '9px',
          fontWeight: 700,
          color: '#1E40AF',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        }}>
          Usage: 12 Mo
        </div>
      </div>
    ),
  },
  {
    id: 'community-deep-dive',
    tag: 'FANBASE DEEP DIVE',
    title: 'Real Community Breakdown',
    description: 'Live Gen Z & Millennial demographics, top city hotspots, and verified authentic superfan reach.',
    href: '/creator',
    bgGradient: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #FCD34D',
          boxShadow: '0 6px 20px rgba(217, 119, 6, 0.10)',
          padding: '12px 14px',
          width: '80%',
          maxWidth: '200px',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#92400E', marginBottom: '6px' }}>Fanbase Split</div>
          <div style={{ display: 'flex', height: '8px', width: '100%', marginBottom: '6px' }}>
            <div style={{ width: '68%', backgroundColor: '#0052FF' }} title="Tier 1 Metros" />
            <div style={{ width: '22%', backgroundColor: '#38BDF8' }} title="Tier 2 Cities" />
            <div style={{ width: '10%', backgroundColor: '#CBD5E1' }} title="Global" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748B', fontWeight: 600 }}>
            <span>India: 90%</span>
            <span>Gen Z / Superfans</span>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '10%',
          left: '6%',
          backgroundColor: '#D97706',
          color: '#FFFFFF',
          padding: '3px 7px',
          fontSize: '9px',
          fontWeight: 700,
        }}>
          94.2% Real Fans
        </div>

        <div style={{
          position: 'absolute',
          bottom: '8%',
          right: '6%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #FDE68A',
          padding: '3px 7px',
          fontSize: '9px',
          fontWeight: 700,
          color: '#92400E',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        }}>
          Mumbai • Delhi • Blr
        </div>
      </div>
    ),
  },
  {
    id: 'content-drop',
    tag: 'CONTENT DROP',
    title: 'Smooth Draft Reviews',
    description: 'Drop your reels & scripts, get quick timestamp feedback, and lock approvals with zero back-and-forth.',
    href: '/brand',
    bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #E9D5FF 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #D8B4FE',
          boxShadow: '0 6px 20px rgba(147, 51, 234, 0.10)',
          padding: '12px 14px',
          width: '80%',
          maxWidth: '200px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#6B21A8' }}>Draft 1 Ready</span>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#9333EA', backgroundColor: '#F3E8FF', padding: '1px 5px' }}>HYPED</span>
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
            Instagram Reel (60s)
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div style={{ flex: 1, backgroundColor: '#0052FF', color: '#FFFFFF', padding: '3px', fontSize: '9px', fontWeight: 700, textAlign: 'center' }}>
              Approve
            </div>
            <div style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#475569', padding: '3px', fontSize: '9px', fontWeight: 600, textAlign: 'center' }}>
              Feedback
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '10%',
          right: '6%',
          backgroundColor: '#7C3AED',
          color: '#FFFFFF',
          padding: '3px 7px',
          fontSize: '9px',
          fontWeight: 700,
        }}>
          Proof of Post
        </div>
      </div>
    ),
  },
  {
    id: 'money-moves',
    tag: 'MONEY MOVES',
    title: 'Lightning Bank Payouts',
    description: 'No 90-day waiting games. No chasing brand managers. Payout hits your bank account in 24 hours.',
    href: '/admin',
    bgGradient: 'linear-gradient(135deg, #EEF2FF 0%, #C7D2FE 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #A5B4FC',
          boxShadow: '0 6px 20px rgba(79, 70, 229, 0.10)',
          padding: '12px 14px',
          width: '80%',
          maxWidth: '200px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#3730A3' }}>Collab Payout #8491</span>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#059669' }}>PAID</span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginBottom: '3px' }}>
            INR 95,000.00
          </div>
          <div style={{ fontSize: '9px', color: '#64748B' }}>Direct to Bank in 24h</div>
        </div>

        <div style={{
          position: 'absolute',
          top: '10%',
          left: '6%',
          backgroundColor: '#4338CA',
          color: '#FFFFFF',
          padding: '3px 7px',
          fontSize: '9px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
        }}>
          <CheckIcon size={9} color="#FFFFFF" />
          <span>Instant Drop</span>
        </div>
      </div>
    ),
  },
];

export const FeatureCardsSwiper: React.FC = () => {
  // Start with center card focused (index 1)
  const [activeIndex, setActiveIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic Smooth Cycling Animation (3.2 seconds interval)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev < SWIPER_CARDS.length - 1 ? prev + 1 : 0));
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev < SWIPER_CARDS.length - 1 ? prev + 1 : 0));
      } else {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : SWIPER_CARDS.length - 1));
      }
    }
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ width: '100%', marginTop: '48px', overflow: 'hidden', padding: '16px 0 24px 0' }}
    >
      {/* Section Headline with High-Energy Creator Community Words */}
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 36px auto', padding: '0 16px' }}>
        <h2 style={{
          fontSize: 'clamp(26px, 4vw, 42px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: '#0F172A',
          lineHeight: 1.25,
          marginBottom: '12px',
        }}>
          Collab with <span style={{ color: '#0052FF', fontWeight: 600 }}>verified creators</span> on <span style={{ color: '#0052FF', fontWeight: 600 }}>dream brand deals</span> with <span style={{ color: '#0052FF', fontWeight: 600 }}>zero payment delays!</span>
        </h2>
        <p style={{
          fontSize: '15px',
          color: '#64748B',
          fontWeight: 400,
        }}>
          Find your vibe, lock the deal, drop viral content & secure the bag.
        </p>
      </div>

      {/* 3D Coverflow Stage with Auto-sliding Animation */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          height: '440px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
          width: '100%',
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1440px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {SWIPER_CARDS.map((card, index) => {
            const total = SWIPER_CARDS.length;
            // Calculate distance accounting for wrap
            let diff = index - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isAdjLeft = diff === -1;
            const isAdjRight = diff === 1;
            const isOuterLeft = diff === -2;
            const isOuterRight = diff === 2;
            const isHidden = Math.abs(diff) > 2;

            const isMobile = windowWidth < 640;
            const isTablet = windowWidth < 1024;
            const step1 = isMobile ? 190 : isTablet ? 260 : 330;
            const step2 = isMobile ? 320 : isTablet ? 470 : 610;
            const cardWidth = isMobile ? '270px' : isTablet ? '290px' : '320px';

            if (isHidden) return null;

            // Compute exact horizontal translation, scale, and opacity
            let translateX = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 1;

            if (isCenter) {
              translateX = 0;
              scale = isMobile ? 1.05 : 1.15;
              opacity = 1;
              zIndex = 10;
            } else if (isAdjLeft) {
              translateX = -step1;
              scale = isMobile ? 0.88 : 0.94;
              opacity = isMobile ? 0.7 : 0.88;
              zIndex = 5;
            } else if (isAdjRight) {
              translateX = step1;
              scale = isMobile ? 0.88 : 0.94;
              opacity = isMobile ? 0.7 : 0.88;
              zIndex = 5;
            } else if (isOuterLeft) {
              translateX = -step2;
              scale = isMobile ? 0.75 : 0.82;
              opacity = isMobile ? 0.3 : 0.55;
              zIndex = 2;
            } else if (isOuterRight) {
              translateX = step2;
              scale = isMobile ? 0.75 : 0.82;
              opacity = isMobile ? 0.3 : 0.55;
              zIndex = 2;
            }

            return (
              <div
                key={card.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  position: 'absolute',
                  width: cardWidth,
                  height: '380px',
                  backgroundColor: '#FFFFFF',
                  border: isCenter ? '2px solid #0052FF' : '1px solid #CBD5E1',
                  boxShadow: isCenter
                    ? '0 24px 48px rgba(0, 82, 255, 0.18), 0 8px 16px rgba(0, 0, 0, 0.06)'
                    : '0 8px 20px rgba(0, 0, 0, 0.05)',
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: isCenter ? 'default' : 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  userSelect: 'none',
                }}
                className={`coverflow-card ${isCenter ? 'coverflow-active' : ''}`}
              >
                {/* Top Visual Graphic Container */}
                <div style={{
                  height: '170px',
                  background: card.bgGradient,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {card.graphic}
                </div>

                {/* Bottom Card Body */}
                <div style={{
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                  <div>
                    <div style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      color: isCenter ? '#0052FF' : '#64748B',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}>
                      {card.tag}
                    </div>
                    <h3 style={{
                      fontSize: '17px',
                      fontWeight: 700,
                      color: '#0F172A',
                      marginBottom: '6px',
                      lineHeight: 1.3,
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#475569',
                      lineHeight: 1.5,
                      marginBottom: '12px',
                    }}>
                      {card.description}
                    </p>
                  </div>

                  {/* Know More Action Link */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    borderTop: '1px solid #F1F5F9',
                    paddingTop: '10px',
                  }}>
                    <Link
                      href={card.href}
                      onClick={(e) => {
                        if (!isCenter) {
                          e.preventDefault();
                          setActiveIndex(index);
                        }
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: '#0052FF',
                        textDecoration: 'none',
                      }}
                    >
                      <span>Know More</span>
                      <ArrowRightIcon size={11} color="#0052FF" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicator Pill Dots */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        marginTop: '16px',
      }}>
        {SWIPER_CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: activeIndex === i ? '24px' : '6px',
              height: '6px',
              backgroundColor: activeIndex === i ? '#0052FF' : '#CBD5E1',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};
