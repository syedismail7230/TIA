import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 16px' }}>
      {/* Hero Section */}
      <section style={{ maxWidth: '960px', marginBottom: '60px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 12px',
          backgroundColor: 'var(--brand-primary-subtle)',
          border: '1px solid var(--brand-primary-border)',
          color: 'var(--brand-primary)',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '20px',
        }}>
          <img
            src="/main-logo-cropped.png"
            alt="TIA Icon"
            style={{ width: '16px', height: '16px', objectFit: 'contain' }}
          />
          Global Creator Intelligence & Campaign Marketplace
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 6vw, 48px)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '20px',
        }}>
          ELIMINATE INFORMATION ASYMMETRY IN INFLUENCER MARKETING.
        </h1>

        <p style={{
          fontSize: 'clamp(14px, 3vw, 18px)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '780px',
          marginBottom: '32px',
        }}>
          TIA is the end-to-end technology platform enabling enterprise brands to discover authentic creators, analyze real audience demographics, negotiate in-platform, secure escrow payments, and track verified campaign outcomes.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/register?role=BRAND_ADMIN" className="tia-btn-primary" style={{ padding: '12px 20px', fontSize: '13px', fontWeight: 600 }}>
            Launch Campaign as Brand
          </Link>
          <Link href="/register?role=CREATOR" className="tia-btn-secondary" style={{ padding: '12px 20px', fontSize: '13px', fontWeight: 600 }}>
            Join as Creator
          </Link>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '48px', marginBottom: '60px' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          marginBottom: '24px',
        }}>
          Enterprise Product Capabilities
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          <div style={{ border: '1px solid var(--border-subtle)', padding: '24px', backgroundColor: 'var(--bg-primary)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '6px' }}>01 / DECISION LAYER</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>TIA Creator Intelligence Score™</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Multi-dimensional composite scoring analyzing measured audience authenticity, engagement consistency, reputation history, and brand safety signals.
            </p>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', padding: '24px', backgroundColor: 'var(--bg-primary)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '6px' }}>02 / TRANSACTION LAYER</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>Closed-Loop Campaign Execution</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              In-platform counter-offer negotiations, versioned digital agreements, milestone content approvals, and anti-circumvention protected messaging.
            </p>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', padding: '24px', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '6px' }}>03 / FINANCIAL LAYER</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>5% Platform Commission & Escrow</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                Integer-precision accounting, immutable transaction ledger, escrow funding protection, automated VAT/GST invoices, and scheduled net payouts.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="/logo (2).png"
                alt="TIA Guaranteed Seal"
                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              />
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand-primary)' }}>
                TIA ESCROW GUARANTEED
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Closed Loop Marketplace Flow */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '48px' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          marginBottom: '12px',
        }}>
          System Workflow
        </div>
        <h2 style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '24px' }}>
          Discover → Verify → Match → Negotiate → Contract → Transact → Execute → Measure
        </h2>

        <div className="tia-table-container">
          <table className="tia-table">
            <thead>
              <tr>
                <th>Step</th>
                <th>Phase</th>
                <th>Brand Action</th>
                <th>Creator Action</th>
                <th>TIA Engine Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-tabular" style={{ fontWeight: 700 }}>01</td>
                <td>Discovery & Match</td>
                <td>Filters creators by intelligence metrics</td>
                <td>Maintains verified rate card & availability</td>
                <td>Calculates TIA Match Score™ & rationale</td>
              </tr>
              <tr>
                <td className="font-tabular" style={{ fontWeight: 700 }}>02</td>
                <td>Negotiation</td>
                <td>Reviews applications & counter-offers</td>
                <td>Submits custom concept & pricing proposal</td>
                <td>Maintains immutable negotiation history</td>
              </tr>
              <tr>
                <td className="font-tabular" style={{ fontWeight: 700 }}>03</td>
                <td>Agreement & Escrow</td>
                <td>Signs digital contract & deposits funds</td>
                <td>Signs digital contract terms</td>
                <td>Locks 95% creator allocation in escrow & logs 5% TIA fee</td>
              </tr>
              <tr>
                <td className="font-tabular" style={{ fontWeight: 700 }}>04</td>
                <td>Execution & Completion</td>
                <td>Reviews deliverable draft & approves</td>
                <td>Submits content & proof of publication</td>
                <td>Disburses net payout, issues tax invoice, updates trust score</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
