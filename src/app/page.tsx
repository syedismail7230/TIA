import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Hero Section with Soft Atmospheric Background */}
      <section style={{
        position: 'relative',
        padding: '56px 24px 72px 24px',
        maxWidth: '1440px',
        margin: '0 auto',
        backgroundImage: 'radial-gradient(circle at 85% 35%, rgba(0, 82, 255, 0.08) 0%, rgba(255, 255, 255, 0) 65%), radial-gradient(circle at 10% 60%, rgba(59, 130, 246, 0.05) 0%, rgba(255, 255, 255, 0) 50%)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}>
          {/* Left Column: Hero Copy & Actions */}
          <div style={{ maxWidth: '640px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#0052FF',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '24px',
            }}>
              <img
                src="/main-logo-cropped.png"
                alt="TIA"
                style={{ width: '15px', height: '15px', objectFit: 'contain' }}
              />
              The Creator Intelligence & Escrow Platform
            </div>

            <h1 style={{
              fontSize: 'clamp(34px, 5.5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: '#0F172A',
              marginBottom: '20px',
            }}>
              <span style={{ color: '#0052FF' }}>Effortless Creator Campaigns</span><br />
              for brands and talent defying all odds
            </h1>

            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#64748B',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}>
              <span>Audience Authenticity</span>
              <span style={{ color: '#CBD5E1' }}>|</span>
              <span>Deterministic 5% Escrow</span>
              <span style={{ color: '#CBD5E1' }}>|</span>
              <span>Instant Settlements</span>
            </div>

            <p style={{
              fontSize: 'clamp(14px, 2.5vw, 17px)',
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: '36px',
            }}>
              TIA eliminates information asymmetry in influencer marketing. Discover authentic creators, analyze real audience demographics, negotiate in-platform, and secure payouts with zero outside communication risk.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/register?role=BRAND_ADMIN"
                className="tia-btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: '14px',
                  fontWeight: 700,
                  backgroundColor: '#0052FF',
                  borderColor: '#0052FF',
                }}
              >
                Sign Up Now →
              </Link>
              <Link
                href="/brand/creators"
                className="tia-btn-secondary"
                style={{
                  padding: '14px 26px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#0052FF',
                  borderColor: '#BFDBFE',
                }}
              >
                Explore Creators ↗
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual & Floating Razorpay-Style Badges */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Top Right Floating Badge */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '-10px',
              zIndex: 10,
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              color: '#FFFFFF',
              padding: '14px 18px',
              boxShadow: '0 12px 28px rgba(0, 82, 255, 0.25)',
              border: '1px solid #60A5FA',
            }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 }}>
                POWERED BY TIA ESCROW
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, marginTop: '2px' }}>
                5.00% UNIFIED COMMISSION
              </div>
            </div>

            {/* Central Graphic */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
              overflow: 'hidden',
            }}>
              <img
                src="/hero.png"
                alt="TIA Creator Marketing Platform"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />

              {/* Overlaid Floating Feature Badges */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                border: '1px solid #E2E8F0',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#059669' }}>
                  <span>✓</span> <span>95% Creator Allocation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#475569' }}>
                  <span>✓</span> <span>98.4% Audience Authenticity</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#475569' }}>
                  <span>✓</span> <span>Dual Digital Agreement</span>
                </div>
              </div>

              {/* Creator Tagline Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.02em',
              }}>
                Top 1% Creator Verified ⭐
              </div>
            </div>
          </div>
        </div>

        {/* Razorpay-Style Interactive Action Bar */}
        <div style={{
          marginTop: '56px',
          border: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
            <span style={{ color: '#0052FF' }}>✦</span> Quick Navigation:
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              href="/brand/creators"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#0052FF',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              🔍 Discover Creators
            </Link>

            <Link
              href="/brand"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              💳 Escrow Payments
            </Link>

            <Link
              href="/creator"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              📊 Creator Intelligence Score
            </Link>

            <Link
              href="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              ⚖️ Platform Governance
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Brand Logos Bar */}
      <section style={{
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        backgroundColor: '#F8FAFC',
        padding: '32px 24px',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '20px',
          }}>
            Trusted by 5,000+ Fast-Growing Brands & Tier-1 Creators
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
            color: '#475569',
            fontWeight: 800,
            fontSize: '18px',
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

      {/* Core Architectural Pillars (Razorpay-style Feature Cards) */}
      <section style={{ padding: '64px 24px', maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
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
          <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A' }}>
            Built for High-Growth Brands & Top Tier Talent
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {/* Card 1 */}
          <div style={{
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF', marginBottom: '8px' }}>01 / DECISION LAYER</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#0F172A' }}>
                TIA Creator Intelligence Score™
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                Multi-dimensional composite scoring analyzing measured audience authenticity, engagement consistency, reputation history, and brand safety signals.
              </p>
            </div>
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="tia-badge tia-badge-blue font-tabular">SCORE: 0–100 GAUGES</span>
              <Link href="/brand/creators" style={{ fontSize: '12px', fontWeight: 700, color: '#0052FF' }}>Inspect Models →</Link>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF', marginBottom: '8px' }}>02 / TRANSACTION LAYER</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#0F172A' }}>
                Closed-Loop Campaign Execution
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                In-platform counter-offer negotiations, versioned digital agreements, milestone content approvals, and anti-circumvention protected messaging.
              </p>
            </div>
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="tia-badge tia-badge-success">ANTI-CIRCUMVENTION</span>
              <Link href="/brand" style={{ fontSize: '12px', fontWeight: 700, color: '#0052FF' }}>View Workspaces →</Link>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF', marginBottom: '8px' }}>03 / FINANCIAL LAYER</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#0F172A' }}>
                5% Platform Commission & Escrow
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                Integer-precision accounting, immutable transaction ledger, escrow funding protection, automated VAT/GST invoices, and scheduled net payouts.
              </p>
            </div>
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="/logo (2).png" alt="Seal" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF' }}>ESCROW GUARANTEE</span>
              </div>
              <Link href="/admin" style={{ fontSize: '12px', fontWeight: 700, color: '#0052FF' }}>Audit Ledger →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closed Loop Marketplace Workflow Table */}
      <section style={{ borderTop: '1px solid #E2E8F0', padding: '64px 24px', backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', marginBottom: '8px' }}>
              Execution Lifecycle Machine
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A' }}>
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
