'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
  CheckIcon,
  LockIcon,
} from '@/components/ui/Icons';

export const BusinessBentoSection: React.FC = () => {
  return (
    <section style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      padding: '80px clamp(16px, 4vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Header Container */}
      <div style={{ maxWidth: '840px', margin: '0 auto 48px auto', textAlign: 'center', padding: '0 12px' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4.5vw, 48px)',
          fontWeight: 400,
          lineHeight: 1.18,
          letterSpacing: '-0.025em',
          color: '#0F172A',
          marginBottom: '16px',
        }}>
          India’s Leading <span style={{ color: '#0052FF', fontWeight: 700 }}>Brand-Creator Network</span>
        </h2>

        <p style={{
          fontSize: 'clamp(14px, 2vw, 16.5px)',
          lineHeight: 1.6,
          color: '#64748B',
          fontWeight: 400,
          marginBottom: '24px',
        }}>
          Collaborate, negotiate, and scale high-converting creator campaigns alongside 5,000+ fast-growing brands, verified agencies, and talent managers.
        </p>

        <Link
          href="/register?role=BRAND_ADMIN"
          className="tia-btn-primary"
          style={{
            padding: '14px 32px',
            fontSize: '15px',
            fontWeight: 700,
            backgroundColor: '#0052FF',
            borderColor: '#0052FF',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
          }}
        >
          <span>Get Started Today</span>
          <ArrowRightIcon size={15} color="#FFFFFF" />
        </Link>
      </div>

      {/* Bento Grid Layout */}
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        {/* ROW 1: Two Large Cards (60% / 40%) */}
        <div style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          width: '100%',
        }}>
          {/* Card 1 (Top Left, TIA Signature Light Blue) */}
          <div
            className="bento-card bento-discovery-card"
            style={{
              flex: '1.4 1 480px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #DBEAFE',
              padding: '36px clamp(20px, 3vw, 40px) 0 clamp(20px, 3vw, 40px)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '400px',
            }}
          >
            <div className="bento-discovery-text" style={{ position: 'relative', zIndex: 2, maxWidth: '380px' }}>
              <h3 style={{
                fontSize: 'clamp(20px, 3vw, 24px)',
                fontWeight: 700,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}>
                Creator Discovery & Verification
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#475569',
                lineHeight: 1.5,
              }}>
                Simplifying influencer verification, fraud audits, and audience authenticity for high-growth brands.
              </p>
            </div>

            {/* Bottom Visual Mockup + Overlapping Director Image */}
            <div
              className="bento-discovery-bottom"
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: '28px',
                position: 'relative',
              }}
            >
              {/* Floating UI Verification Card */}
              <div
                className="bento-verification-badge"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #BFDBFE',
                  boxShadow: '0 16px 36px rgba(0, 82, 255, 0.12)',
                  padding: '18px 22px',
                  maxWidth: '280px',
                  marginBottom: '28px',
                  position: 'relative',
                  zIndex: 3,
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#EFF6FF',
                  color: '#0052FF',
                  padding: '3px 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  marginBottom: '10px',
                }}>
                  <CheckIcon size={11} color="#0052FF" />
                  <span>VERIFIED AUDIENCE</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                  Smart Creator Match
                </div>
                <div style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: '#94A3B8',
                }}>
                  Search niche, tier & reach...
                </div>
              </div>

              {/* Business Director Image */}
              <img
                src="/home-business.png"
                alt="Brand Marketing Director"
                className="bento-discovery-img"
                style={{
                  position: 'absolute',
                  right: '-10px',
                  bottom: '0',
                  height: '350px',
                  width: 'auto',
                  maxWidth: '460px',
                  objectFit: 'contain',
                  objectPosition: 'bottom right',
                  zIndex: 1,
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Card 2 (Top Right, Guaranteed Escrow Engine) */}
          <div
            className="bento-card"
            style={{
              flex: '1 1 360px',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              border: '1px solid #1E293B',
              padding: '36px clamp(20px, 3vw, 36px) 24px clamp(20px, 3vw, 36px)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '400px',
            }}
          >
            <div>
              <h3 style={{
                fontSize: 'clamp(20px, 3vw, 24px)',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}>
                Guaranteed Milestone Protection
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#93C5FD',
                lineHeight: 1.5,
              }}>
                Zero financial risk. Budgets locked in secure milestone vault and released only upon verified milestone delivery.
              </p>
            </div>

            {/* Escrow Agreement Container */}
            <div style={{
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              padding: '18px 20px',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)',
              marginTop: '20px',
            }}>
              {/* Header Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
                paddingBottom: '10px',
                borderBottom: '1px solid #334155',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <LockIcon size={13} color="#60A5FA" />
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>
                    Milestone Vault #TIA-8491
                  </span>
                </div>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  backgroundColor: 'rgba(0, 82, 255, 0.25)',
                  color: '#60A5FA',
                  padding: '2px 8px',
                  border: '1px solid rgba(96, 165, 250, 0.4)',
                }}>
                  LOCKED SAFE
                </span>
              </div>

              {/* Amount */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>Total Campaign Value</span>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF' }}>INR 1,50,000</span>
              </div>

              {/* Milestones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#0F172A',
                  padding: '8px 10px',
                  fontSize: '11px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}>
                    <CheckIcon size={12} color="#10B981" />
                    <span>Milestone 1: Script Review (20%)</span>
                  </div>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>PAID</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#0F172A',
                  padding: '8px 10px',
                  fontSize: '11px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#93C5FD' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#60A5FA' }} />
                    <span>Milestone 2: Final 4K Reel Post (80%)</span>
                  </div>
                  <span style={{ color: '#60A5FA', fontWeight: 700 }}>READY</span>
                </div>
              </div>

              {/* Action Button */}
              <button style={{
                width: '100%',
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                border: 'none',
                padding: '11px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}>
                <span>Authorize Milestone Release</span>
                <ArrowRightIcon size={13} color="#FFFFFF" />
              </button>
            </div>
          </div>
        </div>

        {/* ROW 2: Three Cards (25% / 45% / 30%) */}
        <div style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          width: '100%',
        }}>
          {/* Card 3 (Bottom Left, Brand Community) */}
          <div
            className="bento-card"
            style={{
              flex: '1 1 280px',
              backgroundColor: '#F0F7FF',
              border: '1px solid #DBEAFE',
              padding: '32px 24px 0 24px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px',
            }}
          >
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}>
                Brand Community
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#64748B',
                lineHeight: 1.5,
              }}>
                Building India’s most trusted network of 5,000+ D2C, Tech, and Retail brand leaders.
              </p>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
              <img
                src="/home-community.png"
                alt="Brand Community Network"
                style={{
                  width: '100%',
                  height: '210px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Card 4 (Bottom Center, Content Review Studio) */}
          <div
            className="bento-card"
            style={{
              flex: '1.4 1 360px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              padding: '32px clamp(20px, 3vw, 32px) 24px clamp(20px, 3vw, 32px)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px',
            }}
          >
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}>
                Content Review Studio
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#64748B',
                lineHeight: 1.5,
              }}>
                Frame-accurate video reviews, timestamped revision markers, and legal usage sign-offs.
              </p>
            </div>

            {/* Video Review Interface Mockup */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 12px 28px rgba(0, 0, 0, 0.06)',
              padding: '16px 18px',
              marginTop: '16px',
            }}>
              {/* Media Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0052FF' }} />
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>
                    Reel_Final_Cut_v2.mp4
                  </span>
                </div>
                <span style={{ fontSize: '10.5px', color: '#059669', fontWeight: 700, backgroundColor: '#ECFDF5', padding: '2px 6px' }}>
                  ✓ 100% SPEC MATCH
                </span>
              </div>

              {/* Timestamp Markers Bar */}
              <div style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                padding: '10px 12px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '6px',
              }}>
                <span style={{ fontSize: '11px', color: '#0052FF', fontWeight: 700 }}>
                  0:15 Brand Hook
                </span>
                <span style={{ color: '#CBD5E1' }}>•</span>
                <span style={{ fontSize: '11px', color: '#0052FF', fontWeight: 700 }}>
                  0:38 Product Showcase
                </span>
                <span style={{ color: '#CBD5E1' }}>•</span>
                <span style={{ fontSize: '11px', color: '#0052FF', fontWeight: 700 }}>
                  0:58 CTA Tag
                </span>
              </div>

              {/* One-Click Approval Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  Auto-releases proof-of-post tracking
                </div>
                <button style={{
                  backgroundColor: '#0052FF',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '7px 14px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <CheckIcon size={12} color="#FFFFFF" />
                  <span>Approve Draft</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 5 (Bottom Right, Automated Tax & Invoicing) */}
          <div
            className="bento-card"
            style={{
              flex: '1 1 280px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #DBEAFE',
              padding: '32px 24px 24px 24px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px',
            }}
          >
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}>
                Automated Invoicing & Tax
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#64748B',
                lineHeight: 1.5,
              }}>
                Instant GST tax compliance, 10% TDS deduction certificates, and audit-ready financial reporting.
              </p>
            </div>

            {/* Tax Invoice Document Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #BFDBFE',
              boxShadow: '0 12px 24px rgba(0, 82, 255, 0.08)',
              padding: '16px 18px',
              marginTop: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#0052FF' }}>
                  GST INVOICE #TIA-9941
                </span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '2px 6px' }}>
                  ✓ COMPLIANT B2B
                </span>
              </div>

              <div style={{ fontSize: '17px', fontWeight: 900, color: '#0F172A', marginBottom: '4px' }}>
                INR 95,000.00
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '12px' }}>
                18% GST Breakdown Included • TDS Sec 194J
              </div>

              <div style={{
                paddingTop: '8px',
                borderTop: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#0052FF',
                fontWeight: 700,
              }}>
                <span>Download Tax Invoice (PDF)</span>
                <span>↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
