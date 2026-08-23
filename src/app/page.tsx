import React from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
} from '@/components/ui/Icons';
import { FeatureCardsSwiper } from '@/components/home/FeatureCardsSwiper';
import { BrandLogos } from '@/components/home/BrandLogos';
import { CreatorSpotlightSection } from '@/components/home/CreatorSpotlightSection';
import { BusinessBentoSection } from '@/components/home/BusinessBentoSection';

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      {/* Hero Section with Responsive Full-Bleed Atmospheric Background */}
      <section className="hero-section" style={{
        position: 'relative',
        width: '100%',
        margin: '0 auto',
        padding: '72px clamp(20px, 4vw, 80px) 60px clamp(20px, 4vw, 80px)',
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: 'radial-gradient(circle at 85% 35%, rgba(0, 82, 255, 0.10) 0%, rgba(255, 255, 255, 0) 65%), radial-gradient(circle at 10% 60%, rgba(59, 130, 246, 0.07) 0%, rgba(255, 255, 255, 0) 50%)',
      }}>
        <div className="hero-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '48px',
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          flex: '1 0 auto',
        }}>
          {/* Left Column: Hero Copy & Actions */}
          <div className="hero-copy-column" style={{ flex: '1 1 480px', maxWidth: '580px' }}>
            <h1 className="hero-headline" style={{
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              fontSize: 'clamp(38px, 4.8vw, 62px)',
              lineHeight: 1.15,
            }}>
              <span style={{ color: '#0052FF', fontWeight: 600 }}>Effortless Creator Campaigns</span><br />
              <span style={{ color: '#0F172A', fontWeight: 400 }}>for brands and talent defying all odds</span>
            </h1>

            {/* Feature Sub-pills */}
            <div className="hero-feature-tags" style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#64748B',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px 14px',
            }}>
              <span>Audience Authenticity</span>
              <span className="tag-separator" style={{ color: '#CBD5E1' }}>•</span>
              <span>Deterministic 5% Escrow</span>
              <span className="tag-separator" style={{ color: '#CBD5E1' }}>•</span>
              <span>Instant Settlements</span>
            </div>

            {/* Action Buttons */}
            <div className="hero-cta-group" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/register?role=BRAND_ADMIN"
                className="tia-btn-primary hero-btn"
                style={{
                  padding: '16px 32px',
                  fontSize: '15px',
                  fontWeight: 700,
                  backgroundColor: '#0052FF',
                  borderColor: '#0052FF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>Sign Up Now</span>
                <ArrowRightIcon size={16} color="#FFFFFF" />
              </Link>
              <Link
                href="/brand/creators"
                className="tia-btn-secondary hero-btn"
                style={{
                  padding: '16px 28px',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#0052FF',
                  borderColor: '#BFDBFE',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Explore Creators
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="hero-image-column" style={{
            flex: '1.3 1 560px',
            maxWidth: '780px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '280px',
            position: 'relative',
          }}>
            <div className="hero-image-wrapper" style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}>
              <img
                src="/hero.png"
                alt="The Influencer's Agency Hero Graphic"
                className="hero-graphic-img"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '840px',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 24px 48px rgba(0, 82, 255, 0.20))',
                }}
              />
            </div>
          </div>
        </div>

        {/* Feature Cards Swiper Carousel */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <FeatureCardsSwiper />
        </div>
      </section>

      {/* Real Vector SVG Brand Logos Bar */}
      <BrandLogos />

      {/* Creator Spotlight Section */}
      <CreatorSpotlightSection />

      {/* Business Bento Grid Section */}
      <BusinessBentoSection />

      {/* Razorpay-Style Sticky Mobile Bottom Bar */}
      <div className="mobile-sticky-bottom-bar" style={{
        display: 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        padding: '10px 16px',
        zIndex: 99,
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)',
      }}>
        <Link
          href="/register?role=BRAND_ADMIN"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#0052FF',
            color: '#FFFFFF',
            padding: '14px',
            fontSize: '14px',
            fontWeight: 700,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <span>Get Started Now</span>
          <ArrowRightIcon size={16} color="#FFFFFF" />
        </Link>
      </div>
    </div>
  );
}
