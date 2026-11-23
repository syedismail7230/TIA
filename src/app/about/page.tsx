'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Scale,
  Users,
  Award,
  Globe2,
  Mail,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', color: '#0F172A' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '80px clamp(20px, 4vw, 80px) 60px clamp(20px, 4vw, 80px)',
          background:
            'radial-gradient(circle at 80% 20%, rgba(0, 82, 255, 0.08) 0%, rgba(255, 255, 255, 0) 60%), radial-gradient(circle at 10% 80%, rgba(59, 130, 246, 0.06) 0%, rgba(255, 255, 255, 0) 50%)',
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#EFF6FF',
              color: '#0052FF',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '20px',
            }}
          >
            <ShieldCheck size={16} />
            Our Mission & Core Values
          </div>
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '22px',
              color: '#0F172A',
            }}
          >
            Eliminating the <span style={{ color: '#0052FF' }}>30% Middleman Cut</span> in Creator Marketing
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: '#475569',
              maxWidth: '820px',
              margin: '0 auto 36px auto',
              lineHeight: 1.65,
            }}
          >
            The Influencer’s Agency (TIA) is a technology-first creator intelligence platform and milestone campaign escrow marketplace. We replace opaque agency markups, Net-90 payment defaults, and follower fraud with deterministic 5% facilitation fees, algorithmic authenticity verification, and guaranteed upfront escrow protection.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              href="/register?role=BRAND_ADMIN"
              style={{
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Partner as a Brand <ArrowRight size={16} />
            </Link>
            <Link
              href="/pricing"
              style={{
                backgroundColor: '#F8FAFC',
                color: '#0F172A',
                border: '1px solid #E2E8F0',
                padding: '14px 26px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Explore 5% Fee Model
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '48px clamp(20px, 4vw, 80px)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '38px', fontWeight: 800, color: '#38BDF8' }}>5.00%</div>
            <div style={{ fontSize: '14px', color: '#94A3B8', marginTop: '6px' }}>Flat Platform Fee (Zero Hidden Retainers)</div>
          </div>
          <div>
            <div style={{ fontSize: '38px', fontWeight: 800, color: '#38BDF8' }}>100%</div>
            <div style={{ fontSize: '14px', color: '#94A3B8', marginTop: '6px' }}>Upfront Milestone Escrow Guarantee</div>
          </div>
          <div>
            <div style={{ fontSize: '38px', fontWeight: 800, color: '#38BDF8' }}>72 Hours</div>
            <div style={{ fontSize: '14px', color: '#94A3B8', marginTop: '6px' }}>Strict Deliverable Inspection Window</div>
          </div>
          <div>
            <div style={{ fontSize: '38px', fontWeight: 800, color: '#38BDF8' }}>0%</div>
            <div style={{ fontSize: '14px', color: '#94A3B8', marginTop: '6px' }}>Payment Default Risk for Creators</div>
          </div>
        </div>
      </section>

      {/* The 4 Architectural Pillars */}
      <section style={{ padding: '80px clamp(20px, 4vw, 80px)', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '14px' }}>
              Built for Complete Transparency & Trust
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '640px', margin: '0 auto' }}>
              Why the world’s leading digital creators and growth-oriented brands migrate to TIA.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  color: '#0052FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Lock size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                Milestone Escrow Vault
              </h3>
              <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.65 }}>
                Brands deposit 100% of campaign milestone funds into a secure vault before production begins. Creators produce with guaranteed financial backing, and brands have a 72-hour review window before funds disburse.
              </p>
            </div>

            {/* Card 2 */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  color: '#0052FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                BotShield™ Intelligence
              </h3>
              <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.65 }}>
                Our proprietary AI engine continuously audits YouTube, Instagram, and LinkedIn channels. It detects synthetic engagement, comment spam pods, and follower velocity spikes to produce an objective 0–100 Trust Score.
              </p>
            </div>

            {/* Card 3 */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  color: '#0052FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <TrendingUp size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                Deterministic 5% Ledger
              </h3>
              <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.65 }}>
                Traditional agencies hide 20% to 40% margins between brand invoices and creator payouts. TIA operates with complete ledger transparency on a flat 5.00% facilitation fee, saving brands 25%+ on every campaign.
              </p>
            </div>

            {/* Card 4 */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  color: '#0052FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Scale size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                Automated Legal MSAs
              </h3>
              <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.65 }}>
                Every collaboration generates a legally binding Master Services Agreement detailing IP copyright ownership, 30/60/90-day advertising whitelisting permissions, and mandatory ASCI/FTC disclosure standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Entity & Contact Information */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '72px clamp(20px, 4vw, 80px)', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Globe2 size={24} color="#0052FF" />
                <h3 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Corporate Headquarters & Global Reach</h3>
              </div>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
                The Influencer’s Agency is engineered and headquartered in India, powering brand campaigns across Mumbai, Bengaluru, Delhi NCR, and servicing global direct-to-consumer (D2C) brands across North America, the United Kingdom, and the United Arab Emirates.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14.5px', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={18} color="#0052FF" />
                  <span>Headquarters: Mumbai & Bengaluru, India</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={18} color="#0052FF" />
                  <span>Support: support@theinfluencers.agency</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={18} color="#0052FF" />
                  <span>Business Partnerships: brands@theinfluencers.agency</span>
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Award size={24} color="#0052FF" />
                <h3 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Regulatory & Legal Compliance</h3>
              </div>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
                TIA is built in full compliance with international advertising standards and Indian corporate regulations:
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '14.5px', color: '#334155', lineHeight: 1.8 }}>
                <li><strong>ASCI & FTC Guidelines</strong>: Mandatory `#Ad` and `#Sponsored` disclosure tracking.</li>
                <li><strong>Indian Income Tax Act</strong>: Automated 1% TDS deduction under Section 194J.</li>
                <li><strong>GST Invoicing</strong>: 18% GST tax invoices with full B2B Input Tax Credit (ITC).</li>
                <li><strong>DPDP Act 2023</strong>: Rigorous creator personal data protection and telemetry encryption.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
