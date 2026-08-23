import React from 'react';
import Link from 'next/link';
import {
  SearchIcon,
  CreditCardIcon,
  BarChartIcon,
  ScaleIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from '@/components/ui/Icons';

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Hero Section with Responsive Atmospheric Background */}
      <section className="hero-section" style={{
        position: 'relative',
        maxWidth: '1440px',
        margin: '0 auto',
        backgroundImage: 'radial-gradient(circle at 85% 35%, rgba(0, 82, 255, 0.08) 0%, rgba(255, 255, 255, 0) 65%), radial-gradient(circle at 10% 60%, rgba(59, 130, 246, 0.05) 0%, rgba(255, 255, 255, 0) 50%)',
      }}>
        <div className="hero-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
          {/* Left Column: Hero Copy & Actions */}
          <div className="hero-copy-column" style={{ flex: '1 1 400px', maxWidth: '580px' }}>
            <h1 className="hero-headline" style={{
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}>
              <span style={{ color: '#0052FF', fontWeight: 600 }}>Effortless Creator Campaigns</span><br />
              <span style={{ color: '#0F172A', fontWeight: 400 }}>for brands and talent defying all odds</span>
            </h1>

            {/* Feature Sub-pills */}
            <div className="hero-feature-tags" style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#64748B',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px 12px',
            }}>
              <span>Audience Authenticity</span>
              <span className="tag-separator" style={{ color: '#CBD5E1' }}>•</span>
              <span>Deterministic 5% Escrow</span>
              <span className="tag-separator" style={{ color: '#CBD5E1' }}>•</span>
              <span>Instant Settlements</span>
            </div>

            {/* Action Buttons */}
            <div className="hero-cta-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/register?role=BRAND_ADMIN"
                className="tia-btn-primary hero-btn"
                style={{
                  padding: '14px 28px',
                  fontSize: '14px',
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
                <ArrowRightIcon size={15} color="#FFFFFF" />
              </Link>
              <Link
                href="/brand/creators"
                className="tia-btn-secondary hero-btn"
                style={{
                  padding: '14px 24px',
                  fontSize: '14px',
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
            flex: '2 1 480px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '280px',
            position: 'relative',
          }}>
            <div className="hero-image-wrapper" style={{
              width: '100%',
              maxWidth: '960px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img
                src="/hero.png"
                alt="The Influencer's Agency Hero Graphic"
                className="hero-graphic-img"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 20px 40px rgba(0, 82, 255, 0.18))',
                }}
              />
            </div>
          </div>
        </div>

        {/* Razorpay-Style Interactive Quick Navigation */}
        <div className="hero-nav-bar" style={{
          marginTop: '48px',
          border: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
            <SparklesIcon size={14} color="#0052FF" />
            <span>Quick Navigation:</span>
          </div>

          <div className="hero-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              href="/brand/creators"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#0052FF',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <SearchIcon size={14} color="#0052FF" />
              <span>Discover Creators</span>
            </Link>

            <Link
              href="/brand"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <CreditCardIcon size={14} color="#334155" />
              <span>Escrow Payments</span>
            </Link>

            <Link
              href="/creator"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <BarChartIcon size={14} color="#334155" />
              <span>Creator Intelligence Score</span>
            </Link>

            <Link
              href="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <ScaleIcon size={14} color="#334155" />
              <span>Platform Governance</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Brand Logos Bar */}
      <section style={{
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        backgroundColor: '#F8FAFC',
        padding: '28px 16px',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '16px',
          }}>
            Trusted by 5,000+ Fast-Growing Brands & Tier-1 Creators
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px 36px',
            flexWrap: 'wrap',
            color: '#475569',
            fontWeight: 800,
            fontSize: '16px',
            letterSpacing: '-0.02em',
            opacity: 0.75,
          }}>
            <span>ZOMATO</span>
            <span>BLINKIT</span>
            <span>ZEPTO</span>
            <span>SWIGGY</span>
            <span>LENSKART</span>
            <span>NYKAA</span>
            <span>ZERODHA</span>
            <span>URBAN COMPANY</span>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section style={{ padding: '48px 16px', maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px auto' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#0052FF',
            marginBottom: '8px',
          }}>
            Complete Ecosystem
          </div>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A' }}>
            Built for High-Growth Brands & Top Tier Talent
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {/* Card 1 */}
          <div style={{
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF', marginBottom: '8px' }}>01 / DECISION LAYER</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#0F172A' }}>
                TIA Creator Intelligence Score™
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '18px' }}>
                Multi-dimensional composite scoring analyzing measured audience authenticity, engagement consistency, reputation history, and brand safety signals.
              </p>
            </div>
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="tia-badge tia-badge-blue font-tabular">SCORE: 0–100 GAUGES</span>
              <Link href="/brand/creators" style={{ fontSize: '12px', fontWeight: 700, color: '#0052FF' }}>Inspect Models →</Link>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF', marginBottom: '8px' }}>02 / TRANSACTION LAYER</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#0F172A' }}>
                Closed-Loop Campaign Execution
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '18px' }}>
                In-platform counter-offer negotiations, versioned digital agreements, milestone content approvals, and anti-circumvention protected messaging.
              </p>
            </div>
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="tia-badge tia-badge-success">ANTI-CIRCUMVENTION</span>
              <Link href="/brand" style={{ fontSize: '12px', fontWeight: 700, color: '#0052FF' }}>View Workspaces →</Link>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF', marginBottom: '8px' }}>03 / FINANCIAL LAYER</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#0F172A' }}>
                5% Platform Commission & Escrow
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '18px' }}>
                Integer-precision accounting, immutable transaction ledger, escrow funding protection, automated VAT/GST invoices, and scheduled net payouts.
              </p>
            </div>
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheckIcon size={16} color="#0052FF" />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF' }}>ESCROW GUARANTEE</span>
              </div>
              <Link href="/admin" style={{ fontSize: '12px', fontWeight: 700, color: '#0052FF' }}>Audit Ledger →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closed Loop Marketplace Workflow Table */}
      <section style={{ borderTop: '1px solid #E2E8F0', padding: '48px 16px', backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', marginBottom: '6px' }}>
              Execution Lifecycle Machine
            </div>
            <h2 style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A' }}>
              From Discovery to Automated Escrow Settlement
            </h2>
          </div>

          <div className="tia-table-container">
            <table className="tia-table">
              <thead>
                <tr>
                  <th>Phase</th>
                  <th>Stage</th>
                  <th>Brand Action</th>
                  <th>Creator Action</th>
                  <th>TIA Engine Automation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-tabular" style={{ fontWeight: 700 }}>01</td>
                  <td><strong>Discovery & Match</strong></td>
                  <td>Filters creators by intelligence metrics & location</td>
                  <td>Maintains verified rate card & availability</td>
                  <td>Computes TIA Match Score™ (0-100%) & rationale</td>
                </tr>
                <tr>
                  <td className="font-tabular" style={{ fontWeight: 700 }}>02</td>
                  <td><strong>Commercial Negotiation</strong></td>
                  <td>Reviews applications & counter-offers</td>
                  <td>Submits custom concept & pricing proposal</td>
                  <td>Maintains immutable negotiation history & terms</td>
                </tr>
                <tr>
                  <td className="font-tabular" style={{ fontWeight: 700 }}>03</td>
                  <td><strong>Agreement & Escrow</strong></td>
                  <td>Signs digital contract & deposits funds</td>
                  <td>Signs digital contract terms</td>
                  <td>Locks 95% creator allocation in escrow & logs 5% TIA fee</td>
                </tr>
                <tr>
                  <td className="font-tabular" style={{ fontWeight: 700 }}>04</td>
                  <td><strong>Milestones & Completion</strong></td>
                  <td>Reviews deliverable draft & approves</td>
                  <td>Submits content & proof of publication</td>
                  <td>Disburses net payout, issues tax invoice, updates trust score</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
