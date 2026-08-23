'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
  SearchIcon,
  CreditCardIcon,
  DocumentIcon,
  BarChartIcon,
  ShieldCheckIcon,
  ScaleIcon,
  CheckIcon,
} from '@/components/ui/Icons';

interface ProductCard {
  id: string;
  title: string;
  description: string;
  href: string;
  bgGradient: string;
  graphic: React.ReactNode;
}

const PRODUCT_CARDS: ProductCard[] = [
  {
    id: 'creator-intelligence',
    title: 'Creator Intelligence',
    description: 'Multi-dimensional authenticity scoring & bot detection for brands of all sizes',
    href: '/brand/creators',
    bgGradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Main Floating Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #BAE6FD',
          boxShadow: '0 8px 24px rgba(0, 82, 255, 0.12)',
          padding: '14px 18px',
          width: '78%',
          maxWidth: '220px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#0052FF' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A' }}>TIA Match™</span>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669' }}>98.4%</span>
          </div>
          {/* Mini Bar Graph */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '36px', marginBottom: '8px' }}>
            <div style={{ width: '14%', height: '40%', backgroundColor: '#DBEAFE' }} />
            <div style={{ width: '14%', height: '65%', backgroundColor: '#93C5FD' }} />
            <div style={{ width: '14%', height: '50%', backgroundColor: '#60A5FA' }} />
            <div style={{ width: '14%', height: '85%', backgroundColor: '#3B82F6' }} />
            <div style={{ width: '14%', height: '70%', backgroundColor: '#2563EB' }} />
            <div style={{ width: '14%', height: '100%', backgroundColor: '#0052FF' }} />
          </div>
          <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Reach: 2.4M Verified</div>
        </div>

        {/* Floating Pill 1 */}
        <div style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          backgroundColor: '#0052FF',
          color: '#FFFFFF',
          padding: '4px 10px',
          fontSize: '10px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 4px 12px rgba(0, 82, 255, 0.25)',
        }}>
          <CheckIcon size={10} color="#FFFFFF" />
          <span>Real Followers</span>
        </div>

        {/* Floating Pill 2 */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '6%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #CBD5E1',
          padding: '4px 8px',
          fontSize: '10px',
          fontWeight: 700,
          color: '#0F172A',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}>
          + Score 92/100
        </div>
      </div>
    ),
  },
  {
    id: 'escrow-protection',
    title: 'Escrow Protection',
    description: 'Deterministic 5% commission escrow management on autopilot',
    href: '/brand',
    bgGradient: 'linear-gradient(135deg, #ECFDF5 0%, #A7F3D0 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Main Grid/Vault Mockup */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #6EE7B7',
          boxShadow: '0 8px 24px rgba(5, 150, 105, 0.12)',
          padding: '14px 18px',
          width: '78%',
          maxWidth: '220px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#065F46' }}>Escrow Vault</span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#059669', backgroundColor: '#D1FAE5', padding: '2px 6px' }}>LOCKED</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            INR 1,50,000
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B' }}>
            <span>Creator: 95%</span>
            <span>Fee: 5.00%</span>
          </div>
        </div>

        {/* Floating Action Badge */}
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '8%',
          backgroundColor: '#059669',
          color: '#FFFFFF',
          padding: '4px 10px',
          fontSize: '10px',
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
        }}>
          + Auto Release
        </div>

        {/* Floating Shield Badge */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #A7F3D0',
          padding: '4px 10px',
          fontSize: '10px',
          fontWeight: 700,
          color: '#065F46',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <ShieldCheckIcon size={12} color="#059669" />
          <span>Protected</span>
        </div>
      </div>
    ),
  },
  {
    id: 'digital-agreements',
    title: 'Digital Agreements',
    description: 'Enforceable digital contracts with built-in anti-circumvention protection',
    href: '/brand',
    bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Document Mockup */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #93C5FD',
          boxShadow: '0 8px 24px rgba(37, 99, 235, 0.12)',
          padding: '14px 18px',
          width: '78%',
          maxWidth: '220px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <DocumentIcon size={14} color="#0052FF" />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A' }}>Campaign Contract</span>
          </div>
          <div style={{ height: '4px', backgroundColor: '#EFF6FF', marginBottom: '5px' }} />
          <div style={{ height: '4px', backgroundColor: '#EFF6FF', width: '75%', marginBottom: '10px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#059669' }}>✓ Brand Signed</span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#059669' }}>✓ Creator Signed</span>
          </div>
        </div>

        {/* Floating Tag */}
        <div style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          backgroundColor: '#1E40AF',
          color: '#FFFFFF',
          padding: '4px 8px',
          fontSize: '10px',
          fontWeight: 700,
        }}>
          Anti-Circumvention
        </div>

        {/* Floating Usage Rights */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '8%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #BFDBFE',
          padding: '4px 8px',
          fontSize: '10px',
          fontWeight: 700,
          color: '#1E40AF',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}>
          Usage: 12 Months
        </div>
      </div>
    ),
  },
  {
    id: 'audience-audit',
    title: 'Audience Demographics',
    description: 'Live geographic breakdown, age brackets, and bot audience detection',
    href: '/creator',
    bgGradient: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Audience Breakdown Mockup */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #FCD34D',
          boxShadow: '0 8px 24px rgba(217, 119, 6, 0.12)',
          padding: '14px 18px',
          width: '78%',
          maxWidth: '220px',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#92400E', marginBottom: '8px' }}>Audience Split</div>
          <div style={{ display: 'flex', height: '10px', width: '100%', marginBottom: '8px' }}>
            <div style={{ width: '68%', backgroundColor: '#0052FF' }} title="Tier 1 Metros" />
            <div style={{ width: '22%', backgroundColor: '#38BDF8' }} title="Tier 2 Cities" />
            <div style={{ width: '10%', backgroundColor: '#CBD5E1' }} title="International" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', fontWeight: 600 }}>
            <span>India: 90%</span>
            <span>Gen Z / Millennial</span>
          </div>
        </div>

        {/* Floating Pill */}
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '8%',
          backgroundColor: '#D97706',
          color: '#FFFFFF',
          padding: '4px 8px',
          fontSize: '10px',
          fontWeight: 700,
        }}>
          94.2% Real
        </div>

        {/* Floating Top Cities */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #FDE68A',
          padding: '4px 8px',
          fontSize: '10px',
          fontWeight: 700,
          color: '#92400E',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}>
          Mumbai • Delhi • Blr
        </div>
      </div>
    ),
  },
  {
    id: 'milestone-engine',
    title: 'Milestone Engine',
    description: 'Streamlined deliverable reviews, revision threads & instant approvals',
    href: '/brand',
    bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #E9D5FF 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Deliverable Review Mockup */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #D8B4FE',
          boxShadow: '0 8px 24px rgba(147, 51, 234, 0.12)',
          padding: '14px 18px',
          width: '78%',
          maxWidth: '220px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#6B21A8' }}>Draft 1 Review</span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#9333EA', backgroundColor: '#F3E8FF', padding: '2px 6px' }}>READY</span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Instagram Reel (60s)
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ flex: 1, backgroundColor: '#0052FF', color: '#FFFFFF', padding: '4px', fontSize: '10px', fontWeight: 700, textAlign: 'center' }}>
              Approve
            </div>
            <div style={{ flex: 1, backgroundColor: '#F1F5F9', color: '#475569', padding: '4px', fontSize: '10px', fontWeight: 600, textAlign: 'center' }}>
              Feedback
            </div>
          </div>
        </div>

        {/* Floating Badge */}
        <div style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          backgroundColor: '#7C3AED',
          color: '#FFFFFF',
          padding: '4px 8px',
          fontSize: '10px',
          fontWeight: 700,
        }}>
          Proof of Post
        </div>
      </div>
    ),
  },
  {
    id: 'instant-settlements',
    title: 'Instant Settlements',
    description: 'Automated tax invoices, ledger audit trails & instant direct payouts',
    href: '/admin',
    bgGradient: 'linear-gradient(135deg, #EEF2FF 0%, #C7D2FE 100%)',
    graphic: (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Invoice / Settlement Mockup */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #A5B4FC',
          boxShadow: '0 8px 24px rgba(79, 70, 229, 0.12)',
          padding: '14px 18px',
          width: '78%',
          maxWidth: '220px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3730A3' }}>GST Invoice #8491</span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#059669' }}>PAID</span>
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
            INR 95,000.00
          </div>
          <div style={{ fontSize: '10px', color: '#64748B' }}>IMPS/NEFT Settled in 24h</div>
        </div>

        {/* Floating Ledger Badge */}
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '8%',
          backgroundColor: '#4338CA',
          color: '#FFFFFF',
          padding: '4px 8px',
          fontSize: '10px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <ScaleIcon size={10} color="#FFFFFF" />
          <span>Audit-Ready</span>
        </div>
      </div>
    ),
  },
];

export const RazorpayFeatureGrid: React.FC = () => {
  return (
    <section style={{
      padding: '72px clamp(20px, 4vw, 80px)',
      width: '100%',
      backgroundColor: '#FFFFFF',
    }}>
      <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
        {/* Section Header Matching Razorpay Typography */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4.5vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#0F172A',
            lineHeight: 1.2,
            marginBottom: '14px',
          }}>
            Empower the <span style={{ color: '#0052FF' }}>right creators</span> with the <span style={{ color: '#0052FF' }}>right agreements</span> at the <span style={{ color: '#0052FF' }}>right ROI!</span>
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#64748B',
            fontWeight: 500,
          }}>
            Drive Maximum ROI while you Discover, Contract, Verify & Settle
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          width: '100%',
        }}>
          {PRODUCT_CARDS.map((card) => (
            <div
              key={card.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                overflow: 'hidden',
              }}
              className="razorpay-product-card"
            >
              {/* Graphic Visual Header */}
              <div style={{
                height: '190px',
                background: card.bgGradient,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {card.graphic}
              </div>

              {/* Card Body */}
              <div style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
              }}>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginBottom: '8px',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: '#64748B',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}>
                    {card.description}
                  </p>
                </div>

                {/* Know More Action */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '14px',
                }}>
                  <Link
                    href={card.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#0052FF',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Know More</span>
                    <ArrowRightIcon size={12} color="#0052FF" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
