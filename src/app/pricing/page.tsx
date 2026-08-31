'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckIcon,
  CloseIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  LockIcon,
  ScaleIcon,
  SparklesIcon,
  DocumentIcon,
  TagIcon,
  ShoppingBagIcon,
  MegaphoneIcon,
} from '@/components/ui/Icons';

type Persona = 'brand' | 'creator';

export default function PricingPage() {
  const [persona, setPersona] = useState<Persona>('brand');

  // Brand Simulator State
  const [brandBudget, setBrandBudget] = useState<number>(500000); // 5 Lakhs default
  const [creatorCount, setCreatorCount] = useState<number>(3);

  // Creator Simulator State
  const [creatorQuote, setCreatorQuote] = useState<number>(100000); // 1 Lakh default
  const [deliverableType, setDeliverableType] = useState<string>('Reel / Short');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Brand Financial calculations
  const platformFeeRate = 0.05;
  const brandPlatformFee = Math.round(brandBudget * platformFeeRate);
  const brandCreatorDirectPayout = brandBudget;
  const gstOnPlatformFee = Math.round(brandPlatformFee * 0.18);
  const totalBrandInvestment = brandBudget + brandPlatformFee + gstOnPlatformFee;

  // Brand comparison vs traditional agency (30% markup + 50k retainer)
  const traditionalAgencyMarkup = Math.round(brandBudget * 0.30);
  const traditionalAgencyRetainer = 50000;
  const traditionalAgencyTotal = brandBudget + traditionalAgencyMarkup + traditionalAgencyRetainer;
  const brandNetSavings = traditionalAgencyTotal - totalBrandInvestment;
  const brandSavingsPercent = Math.round((brandNetSavings / traditionalAgencyTotal) * 100);

  // Creator Financial calculations (5% platform fee, 95% net payout vs 25% traditional agency cut)
  const creatorTIAFee = Math.round(creatorQuote * 0.05); // 5% TIA Platform Fee
  const creatorNetTakeHome = creatorQuote - creatorTIAFee; // 95% Guaranteed Net Payout
  const traditionalMcnCut = Math.round(creatorQuote * 0.25); // 25% Agency/MCN Cut
  const traditionalNetTakeHome = creatorQuote - traditionalMcnCut; // 75% take home
  const creatorExtraEarned = traditionalMcnCut - creatorTIAFee; // Extra money creator keeps on TIA

  const brandPresets = [
    { label: '₹1 Lakh', value: 100000 },
    { label: '₹5 Lakhs', value: 500000 },
    { label: '₹15 Lakhs', value: 1500000 },
    { label: '₹30 Lakhs', value: 3000000 },
    { label: '₹50 Lakhs', value: 5000000 },
  ];

  const creatorPresets = [
    { label: '₹25,000 (Reel)', value: 25000 },
    { label: '₹75,000 (Integration)', value: 75000 },
    { label: '₹1.5 Lakhs (Dedicated)', value: 150000 },
    { label: '₹5 Lakhs (Bundle)', value: 500000 },
  ];

  const brandFaqs = [
    {
      q: 'How does the 5% platform fee work for brands?',
      a: 'TIA charges a flat, transparent 5.00% facilitation fee on the gross campaign contract value. If a creator quotes ₹1,00,000, the creator receives their payout, TIA charges ₹5,000 as a platform fee, and 18% GST (₹900) is levied strictly on our ₹5,000 service fee.',
    },
    {
      q: 'Are there any hidden monthly subscription retainers?',
      a: 'No. Unlike legacy enterprise software platforms that lock brands into $1,000+/month annual software contracts before sending a single brief, TIA is pure pay-as-you-collaborate. You only pay the 5% platform fee when you actively fund a campaign milestone.',
    },
    {
      q: 'How is our money protected in the Milestone Vault?',
      a: 'When you fund a campaign, 100% of the milestone budget is securely locked in a dedicated milestone vault powered by RBI-regulated banking partners. Funds are only disbursed to the creator after you inspect and approve the deliverable, or upon the expiration of the 72-hour auto-approval SLA without dispute.',
    },
    {
      q: 'What happens if a creator fails to deliver or produces off-brief content?',
      a: 'If a deliverable does not match the approved campaign brief, you can request up to two formal revision rounds in the Content Review Studio. If the creator fails to deliver within the contracted deadline, you can initiate a dispute and receive an immediate refund from the milestone vault.',
    },
    {
      q: 'Can we get custom master service agreements (MSA) and consolidated billing?',
      a: 'Yes. For Enterprise & Growth Desk accounts running over ₹20 Lakhs in monthly creator volume, we provide tailored enterprise MSAs, customized payment terms, consolidated monthly GST billing, and dedicated account management.',
    },
  ];

  const creatorFaqs = [
    {
      q: 'How does the 5% platform fee work for creators?',
      a: 'TIA charges a flat 5.00% platform commission on settled campaign milestones. When a deal closes for ₹1,00,000, TIA deducts ₹5,000 (5%) and deposits ₹95,000 (95%) directly into your bank account. You keep 95% of every deal—compared to traditional talent agencies that take 20% to 35% of your earnings.',
    },
    {
      q: 'How does the Upfront Milestone Vault guarantee I get paid?',
      a: 'Before you begin shooting or drafting content, the brand must deposit 100% of your agreed milestone fee into the TIA Milestone Vault. Once funded, the brand cannot cancel without cause, guaranteeing you will never be ghosted on payment.',
    },
    {
      q: 'What if a brand delays review or ignores my submission?',
      a: 'TIA enforces an automated 72-Hour Auto-Approval SLA. Once you submit your deliverable in the Content Review Studio, the brand has exactly 72 hours to review or request brief-compliant revisions. If they do not respond within 72 hours, the platform automatically approves the milestone and triggers your direct bank settlement.',
    },
    {
      q: 'How many revisions can a brand request?',
      a: 'Standard platform contracts cap revisions at two (2) reasonable cycles that strictly follow the original agreed brief. Out-of-scope requests or complete re-shoots require the brand to create a new paid milestone.',
    },
    {
      q: 'How fast do payouts reach my bank account?',
      a: 'Once a milestone is approved (manually or via the 72-hour auto-approval engine), your 95% net payout is dispatched within 24 hours directly to your verified Indian bank account via NEFT/IMPS.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', color: '#0F172A' }}>
      {/* 1. HERO HEADER */}
      <section style={{
        backgroundColor: '#FAFAFA',
        borderBottom: '1px solid #E2E8F0',
        padding: '32px clamp(20px, 4vw, 72px) 28px clamp(20px, 4vw, 72px)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          {/* Persona Switcher Pill */}
          <div style={{
            display: 'inline-flex',
            backgroundColor: '#E2E8F0',
            padding: '4px',
            borderRadius: '30px',
            marginBottom: '0px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
          }}>
            <button
              type="button"
              onClick={() => setPersona('brand')}
              style={{
                padding: '10px 24px',
                fontSize: '13.5px',
                fontWeight: 800,
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: persona === 'brand' ? '#0052FF' : 'transparent',
                color: persona === 'brand' ? '#FFFFFF' : '#475569',
                boxShadow: persona === 'brand' ? '0 2px 8px rgba(0, 82, 255, 0.3)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <MegaphoneIcon size={14} color={persona === 'brand' ? '#FFFFFF' : '#64748B'} />
              <span>For Brands & Agencies</span>
            </button>

            <button
              type="button"
              onClick={() => setPersona('creator')}
              style={{
                padding: '10px 24px',
                fontSize: '13.5px',
                fontWeight: 800,
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: persona === 'creator' ? '#0052FF' : 'transparent',
                color: persona === 'creator' ? '#FFFFFF' : '#475569',
                boxShadow: persona === 'creator' ? '0 2px 8px rgba(0, 82, 255, 0.3)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <SparklesIcon size={14} color={persona === 'creator' ? '#FFFFFF' : '#64748B'} />
              <span>For Creators & Talent</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC INTERACTIVE SIMULATOR */}
      <section style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '56px clamp(20px, 4vw, 72px)',
      }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: '#0F172A', margin: '0', letterSpacing: '-0.02em' }}>
            {persona === 'brand'
              ? 'Calculate Campaign Budget & Agency Markup Savings'
              : 'Calculate Your 95% Net Payout & Earnings Boost'}
          </h2>
          <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '600px', margin: '8px auto 0 auto' }}>
            {persona === 'brand'
              ? 'Adjust your monthly creator budget below to see how much capital your brand preserves with our deterministic 5% ledger.'
              : 'Enter your standard rate card quote to see how TIA delivers a guaranteed 95% net bank settlement.'}
          </p>
        </div>

        {/* The Simulator Card Container */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          boxShadow: '0 20px 48px rgba(0, 82, 255, 0.06)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        }}>
          {/* BRAND SIMULATOR VIEW */}
          {persona === 'brand' ? (
            <>
              {/* Left Column: Brand Controls */}
              <div style={{ padding: '36px', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Preset Chips */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '10px' }}>
                      Quick Budget Presets:
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {brandPresets.map((preset) => (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => setBrandBudget(preset.value)}
                          style={{
                            padding: '6px 14px',
                            fontSize: '12.5px',
                            fontWeight: 700,
                            backgroundColor: brandBudget === preset.value ? '#0052FF' : '#F1F5F9',
                            color: brandBudget === preset.value ? '#FFFFFF' : '#334155',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slider Control */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>Monthly Campaign Budget:</span>
                      <span style={{ fontSize: '26px', fontWeight: 900, color: '#0052FF', letterSpacing: '-0.02em' }}>
                        ₹{brandBudget.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="25000"
                      max="5000000"
                      step="25000"
                      value={brandBudget}
                      onChange={(e) => setBrandBudget(Number(e.target.value))}
                      style={{
                        width: '100%',
                        height: '8px',
                        accentColor: '#0052FF',
                        cursor: 'pointer',
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginTop: '6px', fontWeight: 600 }}>
                      <span>₹25,000</span>
                      <span>₹25,00,000</span>
                      <span>₹50,00,000</span>
                    </div>
                  </div>

                  {/* Number of Creators */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '10px' }}>
                      Estimated Creators in Campaign:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      {[
                        { label: '1 - 3 Creators', count: 2 },
                        { label: '4 - 10 Creators', count: 6 },
                        { label: '10+ Creators', count: 15 },
                      ].map((tier) => (
                        <button
                          key={tier.label}
                          type="button"
                          onClick={() => setCreatorCount(tier.count)}
                          style={{
                            padding: '10px 8px',
                            fontSize: '12px',
                            fontWeight: 700,
                            textAlign: 'center',
                            backgroundColor: creatorCount === tier.count ? '#EFF6FF' : '#FFFFFF',
                            border: creatorCount === tier.count ? '2px solid #0052FF' : '1px solid #E2E8F0',
                            color: creatorCount === tier.count ? '#0052FF' : '#475569',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {tier.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Savings Highlight Box */}
                <div style={{
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Estimated Brand Savings vs Agency
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#0052FF', letterSpacing: '-0.02em' }}>
                      ₹{brandNetSavings.toLocaleString('en-IN')} <span style={{ fontSize: '13px', fontWeight: 700 }}>({brandSavingsPercent}% saved)</span>
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 800,
                  }}>
                    Zero Markup
                  </div>
                </div>
              </div>

              {/* Right Column: Brand Ledger Terminal */}
              <div style={{ padding: '36px', backgroundColor: '#FAFAFA', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                    Deterministic Ledger Breakdown
                  </div>

                  <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '18px 20px',
                    marginBottom: '16px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '10px', color: '#334155' }}>
                      <span>Creator Direct Quoted Payout:</span>
                      <span style={{ fontWeight: 800, color: '#0F172A' }}>₹{brandCreatorDirectPayout.toLocaleString('en-IN')}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '10px', color: '#334155' }}>
                      <span>TIA Platform Fee (5.00%):</span>
                      <span style={{ fontWeight: 800, color: '#0052FF' }}>₹{brandPlatformFee.toLocaleString('en-IN')}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '12px', color: '#64748B' }}>
                      <span>18% GST on Platform Fee:</span>
                      <span style={{ fontWeight: 700 }}>₹{gstOnPlatformFee.toLocaleString('en-IN')}</span>
                    </div>

                    <div style={{
                      borderTop: '1px solid #E2E8F0',
                      paddingTop: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}>
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>Total Brand Outlay:</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>All-inclusive milestone vault lock</div>
                      </div>
                      <span style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A' }}>
                        ₹{totalBrandInvestment.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    border: '1px dashed #CBD5E1',
                    borderRadius: '8px',
                    padding: '14px 18px',
                    backgroundColor: '#F8FAFC',
                    marginBottom: '24px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#64748B', marginBottom: '6px' }}>
                      <span>Traditional Agency Outlay (30% markup + retainer):</span>
                      <span style={{ fontWeight: 700, textDecoration: 'line-through', color: '#94A3B8' }}>
                        ₹{traditionalAgencyTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#0052FF', fontWeight: 700 }}>
                      You keep ₹{brandNetSavings.toLocaleString('en-IN')} directly in your marketing budget.
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    href="/register?role=BRAND_ADMIN"
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      fontSize: '14.5px',
                      fontWeight: 800,
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      borderRadius: '6px',
                      boxShadow: '0 4px 14px rgba(0, 82, 255, 0.3)',
                    }}
                  >
                    <span>Lock Campaign Budget with 5% Fee</span>
                    <ArrowRightIcon size={14} color="#FFFFFF" />
                  </Link>
                  <div style={{ textAlign: 'center', fontSize: '11.5px', color: '#94A3B8', marginTop: '10px' }}>
                    No credit card required to explore creator rate cards
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* CREATOR SIMULATOR VIEW */}
              {/* Left Column: Creator Controls */}
              <div style={{ padding: '36px', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Preset Chips for Creator */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '10px' }}>
                      Standard Deliverable Quotes:
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {creatorPresets.map((preset) => (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => setCreatorQuote(preset.value)}
                          style={{
                            padding: '6px 14px',
                            fontSize: '12.5px',
                            fontWeight: 700,
                            backgroundColor: creatorQuote === preset.value ? '#0052FF' : '#F1F5F9',
                            color: creatorQuote === preset.value ? '#FFFFFF' : '#334155',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quoted Rate Slider */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>Gross Campaign Deal Quote:</span>
                      <span style={{ fontSize: '26px', fontWeight: 900, color: '#0052FF', letterSpacing: '-0.02em' }}>
                        ₹{creatorQuote.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="5000"
                      value={creatorQuote}
                      onChange={(e) => setCreatorQuote(Number(e.target.value))}
                      style={{
                        width: '100%',
                        height: '8px',
                        accentColor: '#0052FF',
                        cursor: 'pointer',
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginTop: '6px', fontWeight: 600 }}>
                      <span>₹10,000</span>
                      <span>₹5,00,000</span>
                      <span>₹10,00,000</span>
                    </div>
                  </div>

                  {/* Deliverable Type Selector */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '10px' }}>
                      Deliverable Format:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      {['Reel / Short', 'Dedicated Video', 'Campaign Package'].map((format) => (
                        <button
                          key={format}
                          type="button"
                          onClick={() => setDeliverableType(format)}
                          style={{
                            padding: '10px 8px',
                            fontSize: '12px',
                            fontWeight: 700,
                            textAlign: 'center',
                            backgroundColor: deliverableType === format ? '#EFF6FF' : '#FFFFFF',
                            border: deliverableType === format ? '2px solid #0052FF' : '1px solid #E2E8F0',
                            color: deliverableType === format ? '#0052FF' : '#475569',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Creator Net Earnings Box */}
                <div style={{
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Extra Earnings vs 25% Agency/MCN Cut
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#0052FF', letterSpacing: '-0.02em' }}>
                      +₹{creatorExtraEarned.toLocaleString('en-IN')} <span style={{ fontSize: '13px', fontWeight: 700 }}>(Keep 95% on TIA)</span>
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 800,
                  }}>
                    Flat 5% Fee
                  </div>
                </div>
              </div>

              {/* Right Column: Creator Payout Terminal */}
              <div style={{ padding: '36px', backgroundColor: '#FAFAFA', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                    Guaranteed Creator Payout Receipt
                  </div>

                  <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '18px 20px',
                    marginBottom: '16px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '10px', color: '#334155' }}>
                      <span>Gross Deal Contract Value:</span>
                      <span style={{ fontWeight: 800, color: '#0F172A' }}>₹{creatorQuote.toLocaleString('en-IN')}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '10px', color: '#334155' }}>
                      <span>TIA Platform Commission (5.00%):</span>
                      <span style={{ fontWeight: 800, color: '#0052FF' }}>-₹{creatorTIAFee.toLocaleString('en-IN')}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '12px', color: '#64748B' }}>
                      <span>Upfront Milestone Vault Funding:</span>
                      <span style={{ fontWeight: 700, color: '#0052FF' }}>100% Secured Upfront</span>
                    </div>

                    <div style={{
                      borderTop: '1px solid #E2E8F0',
                      paddingTop: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}>
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0052FF' }}>Net Payout to Your Bank (95%):</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>Direct NEFT / IMPS within 24h</div>
                      </div>
                      <span style={{ fontSize: '22px', fontWeight: 900, color: '#0052FF' }}>
                        ₹{creatorNetTakeHome.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    border: '1px dashed #CBD5E1',
                    borderRadius: '8px',
                    padding: '14px 18px',
                    backgroundColor: '#F8FAFC',
                    marginBottom: '24px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#64748B', marginBottom: '6px' }}>
                      <span>Legacy Talent Agency / MCN Take-Home (25% cut):</span>
                      <span style={{ fontWeight: 700, textDecoration: 'line-through', color: '#94A3B8' }}>
                        ₹{traditionalNetTakeHome.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#0052FF', fontWeight: 700 }}>
                      You keep ₹{creatorExtraEarned.toLocaleString('en-IN')} more per deal with deterministic 72h auto-approval.
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    href="/register?role=CREATOR"
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      fontSize: '14.5px',
                      fontWeight: 800,
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      borderRadius: '6px',
                      boxShadow: '0 4px 14px rgba(0, 82, 255, 0.3)',
                    }}
                  >
                    <span>Claim Your Creator Profile & Lock Rate Card</span>
                    <ArrowRightIcon size={14} color="#FFFFFF" />
                  </Link>
                  <div style={{ textAlign: 'center', fontSize: '11.5px', color: '#94A3B8', marginTop: '10px' }}>
                    100% Free registration • No exclusive talent contracts
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 3. MODULAR ENGAGEMENT PLANS */}
      <section style={{
        backgroundColor: '#FAFAFA',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        padding: '72px clamp(20px, 4vw, 72px)',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {persona === 'brand' ? 'Brand Engagement Tiers' : 'Creator Partnership Tiers'}
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: '#0F172A', marginTop: '6px', letterSpacing: '-0.02em' }}>
              {persona === 'brand'
                ? 'Built for Fast-Moving Brands of Every Scale'
                : 'Built for High-Growth Creators & Talent Collectives'}
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '600px', margin: '8px auto 0 auto' }}>
              {persona === 'brand'
                ? 'Whether you are testing your first 3 creator collaborations or running 100+ monthly deliverables, TIA scales with you.'
                : 'From independent creators setting their first rate cards to professional talent managers scaling multi-creator rosters.'}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'stretch',
          }}>
            {persona === 'brand' ? (
              <>
                {/* Brand Plan 1: Self-Serve Direct */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                      Self-Serve Direct
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginBottom: '6px' }}>
                      Flat 5%
                    </h3>
                    <div style={{ fontSize: '13px', color: '#0052FF', fontWeight: 700, marginBottom: '16px' }}>
                      Per milestone payout • ₹0 monthly fee
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
                      For D2C founders, performance marketers, and growth teams running direct creator collaborations.
                    </p>

                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '20px', marginBottom: '28px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        What&apos;s Included:
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#334155' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Full access to Verified Creator Directory</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>AI Audience Authenticity & Bot Audits</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>100% Upfront Milestone Vault Protection</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>72-Hour Auto-Approval Engine</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Automated GST Tax Invoicing</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/register?role=BRAND_ADMIN"
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      backgroundColor: '#EFF6FF',
                      color: '#0052FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '6px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    Get Started Free
                  </Link>
                </div>

                {/* Brand Plan 2: Growth Desk (Most Popular) */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #0052FF',
                  borderRadius: '10px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: '0 16px 36px rgba(0, 82, 255, 0.12)',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-13px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 14px',
                    borderRadius: '20px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>
                    Most Popular
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                      Growth & Agency Desk
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginBottom: '6px' }}>
                      Flat 5%
                    </h3>
                    <div style={{ fontSize: '13px', color: '#0052FF', fontWeight: 700, marginBottom: '16px' }}>
                      Multi-Seat Hub • High Volume Scaling
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
                      For marketing teams, media agencies, and fast-scaling brands running 10+ creator campaigns monthly.
                    </p>

                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '20px', marginBottom: '28px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Everything in Self-Serve, Plus:
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#334155' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span><strong>Unlimited Team Seats</strong> & Approval Roles</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Frame-Accurate Video Review Studio</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Bulk Campaign Milestone Funding</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>90-Day Meta/YouTube Ad Whitelisting</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Dedicated Slack / WhatsApp Campaign Desk</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/register?role=BRAND_ADMIN"
                    style={{
                      width: '100%',
                      padding: '13px',
                      fontSize: '14px',
                      fontWeight: 800,
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      borderRadius: '6px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'block',
                      boxShadow: '0 4px 12px rgba(0, 82, 255, 0.25)',
                    }}
                  >
                    Launch Growth Desk
                  </Link>
                </div>

                {/* Brand Plan 3: Enterprise Scale */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                      Enterprise & Managed
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginBottom: '6px' }}>
                      Custom Scope
                    </h3>
                    <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 700, marginBottom: '16px' }}>
                      Full White-Glove Execution
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
                      For enterprise brands and media groups requiring dedicated campaign directors and custom ERP integration.
                    </p>

                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '20px', marginBottom: '28px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Enterprise Capabilities:
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#334155' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Dedicated Senior Campaign Director</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Custom Corporate MSA & Legal Addendums</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>ERP / NetSuite / SAP Billing Integration</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Creator Sourcing & Outreach on Demand</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/brand"
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      backgroundColor: '#0F172A',
                      color: '#FFFFFF',
                      borderRadius: '6px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    Talk to Enterprise Sales
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Creator Plan 1: Independent Creator */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                      Independent Creator
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginBottom: '6px' }}>
                      95% Payout
                    </h3>
                    <div style={{ fontSize: '13px', color: '#0052FF', fontWeight: 700, marginBottom: '16px' }}>
                      Flat 5% Fee • ₹0 Monthly Subscription
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
                      For individual creators looking for direct brand inbound, protected rate cards, and guaranteed milestone payouts.
                    </p>

                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '20px', marginBottom: '28px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Creator Benefits:
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#334155' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Direct Inbound from Verified Brands</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>100% Upfront Milestone Budget Lock</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Automated 72-Hour Auto-Approval SLA</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>24-Hour Direct Bank Settlement (95% Net)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/register?role=CREATOR"
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      backgroundColor: '#EFF6FF',
                      color: '#0052FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '6px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    Claim Creator Profile
                  </Link>
                </div>

                {/* Creator Plan 2: Pro Creator Studio (Featured) */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #0052FF',
                  borderRadius: '10px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: '0 16px 36px rgba(0, 82, 255, 0.12)',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-13px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 14px',
                    borderRadius: '20px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>
                    Featured for Pros
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                      Pro Creator & Studio
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginBottom: '6px' }}>
                      95% Payout
                    </h3>
                    <div style={{ fontSize: '13px', color: '#0052FF', fontWeight: 700, marginBottom: '16px' }}>
                      Full Rate Card Lock • Frame Review
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
                      For full-time professional creators running monthly brand deals and multi-deliverable packages.
                    </p>

                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '20px', marginBottom: '28px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Everything in Independent, Plus:
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#334155' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Custom Multi-Deliverable Rate Cards</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Frame-Accurate Video Review Studio</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Revision Cap Protection (Max 2 brief rounds)</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Priority Discovery in Brand Creator Search</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/register?role=CREATOR"
                    style={{
                      width: '100%',
                      padding: '13px',
                      fontSize: '14px',
                      fontWeight: 800,
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      borderRadius: '6px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'block',
                      boxShadow: '0 4px 12px rgba(0, 82, 255, 0.25)',
                    }}
                  >
                    Upgrade to Pro Creator
                  </Link>
                </div>

                {/* Creator Plan 3: Talent Collective */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                      Talent Collective & Manager
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginBottom: '6px' }}>
                      Roster Hub
                    </h3>
                    <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 700, marginBottom: '16px' }}>
                      Multi-Talent Management Desk
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
                      For talent managers, creator collectives, and boutique agencies representing 5+ creators.
                    </p>

                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '20px', marginBottom: '28px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Manager Desk Features:
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#334155' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Manage Multi-Creator Inbound in 1 Dashboard</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Unified Bank Payout Splitting</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Enterprise Brand Direct Deals</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckIcon size={16} color="#0052FF" />
                          <span>Dedicated Account Lead</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/creator"
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      backgroundColor: '#0F172A',
                      color: '#FFFFFF',
                      borderRadius: '6px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    Contact Talent Desk
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4. COMPREHENSIVE FEATURE COMPARISON MATRIX */}
      <section style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '72px clamp(20px, 4vw, 72px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            {persona === 'brand' ? 'Brand Capability Matrix' : 'Creator Protection Matrix'}
          </h2>
          <p style={{ fontSize: '15px', color: '#64748B', marginTop: '6px' }}>
            {persona === 'brand'
              ? 'Compare full capabilities across self-serve, growth, and enterprise tiers.'
              : 'Compare protection and workflow benefits across creator tiers.'}
          </p>
        </div>

        <div style={{
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            padding: '16px 24px',
            fontSize: '13px',
            fontWeight: 800,
            color: '#0F172A',
          }}>
            <div>Capability</div>
            <div style={{ textAlign: 'center' }}>{persona === 'brand' ? 'Self-Serve' : 'Independent'}</div>
            <div style={{ textAlign: 'center', color: '#0052FF' }}>
              {persona === 'brand' ? 'Growth Desk' : 'Pro Studio'}
            </div>
            <div style={{ textAlign: 'center' }}>{persona === 'brand' ? 'Enterprise' : 'Collective'}</div>
          </div>

          {/* Rows */}
          {(persona === 'brand' ? [
            { name: 'Platform Commission', t1: 'Flat 5%', t2: 'Flat 5%', t3: 'Custom Vol. Tier' },
            { name: 'Creator Intelligence & Bot Audit', t1: 'Standard', t2: 'Advanced AI', t3: 'Full Predictive' },
            { name: 'Milestone Vault Security', t1: 'Yes', t2: 'Yes', t3: 'Yes + Custom SLA' },
            { name: '72-Hour Auto-Approval Engine', t1: 'Yes', t2: 'Yes', t3: 'Customizable' },
            { name: 'Team Seats & Permissions', t1: '1 Seat', t2: 'Unlimited', t3: 'Unlimited + SSO' },
            { name: 'Frame-Accurate Video Review Studio', t1: 'Yes', t2: 'Yes', t3: 'Yes' },
            { name: '90-Day Digital Ad Whitelisting', t1: 'Yes', t2: 'Yes', t3: 'Extended Rights' },
            { name: 'Automated GST Tax Invoicing', t1: 'Yes', t2: 'Yes', t3: 'Consolidated ERP' },
          ] : [
            { name: 'Platform Commission from Creator', t1: '5.00%', t2: '5.00%', t3: '5.00%' },
            { name: 'Net Guaranteed Take-Home', t1: '95.00%', t2: '95.00%', t3: '95.00%' },
            { name: '100% Upfront Budget Lock', t1: 'Guaranteed', t2: 'Guaranteed', t3: 'Guaranteed' },
            { name: '72-Hour Auto-Approval SLA', t1: 'Standard', t2: 'Priority', t3: 'Customizable' },
            { name: 'Deliverable Rate Card Lock', t1: '1 Tier', t2: 'Multi-Package', t3: 'Roster Wide' },
            { name: 'Frame-Accurate Review Studio', t1: 'Yes', t2: 'Yes', t3: 'Yes' },
            { name: 'Revision Protection Capping', t1: 'Max 2 rounds', t2: 'Max 2 rounds', t3: 'Managed SLA' },
            { name: 'Direct Bank Settlement (NEFT/IMPS)', t1: 'Within 24h', t2: 'Within 24h', t3: 'Split Routing' },
          ]).map((row, idx) => (
            <div
              key={row.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                padding: '14px 24px',
                borderBottom: idx === 7 ? 'none' : '1px solid #F1F5F9',
                fontSize: '13.5px',
                backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                alignItems: 'center',
              }}
            >
              <div style={{ fontWeight: 600, color: '#334155' }}>{row.name}</div>
              <div style={{ textAlign: 'center', color: '#475569' }}>{row.t1}</div>
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#0052FF' }}>{row.t2}</div>
              <div style={{ textAlign: 'center', fontWeight: 600, color: '#0F172A' }}>{row.t3}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE FAQ ACCORDION */}
      <section style={{
        backgroundColor: '#FAFAFA',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        padding: '72px clamp(20px, 4vw, 72px)',
      }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Frequently Asked Questions
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: '#0F172A', marginTop: '6px', letterSpacing: '-0.02em' }}>
              {persona === 'brand' ? 'Questions from Brands & Agencies' : 'Questions from Creators & Talent'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(persona === 'brand' ? brandFaqs : creatorFaqs).map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: isOpen ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: isOpen ? '#0052FF' : '#0F172A',
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: '18px', fontWeight: 400, color: '#64748B', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.15s ease' }}>
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 24px 20px 24px', fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HIGH-IMPACT FINAL CTA */}
      <section style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '80px clamp(20px, 4vw, 72px)',
      }}>
        <div style={{
          backgroundColor: '#0F172A',
          borderRadius: '12px',
          padding: '48px clamp(24px, 5vw, 64px)',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '32px',
          boxShadow: '0 24px 48px rgba(15, 23, 42, 0.2)',
        }}>
          <div style={{ maxWidth: '580px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {persona === 'brand' ? 'Start Collaborating Today' : 'Join as a Verified Creator'}
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 900, color: '#FFFFFF', marginTop: '8px', letterSpacing: '-0.02em' }}>
              {persona === 'brand'
                ? 'Ready to eliminate agency markups and launch your next creator campaign?'
                : 'Ready to stop chasing payments and keep 95% of every brand deal?'}
            </h2>
            <p style={{ fontSize: '15px', color: '#94A3B8', marginTop: '10px', lineHeight: 1.6 }}>
              {persona === 'brand'
                ? 'Join forward-thinking brands who manage influencer partnerships transparently with deterministic milestone protection.'
                : 'Create your free creator profile, lock your deliverable pricing, and receive guaranteed inbound from top brands.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              href={persona === 'brand' ? '/register?role=BRAND_ADMIN' : '/register?role=CREATOR'}
              style={{
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                padding: '14px 32px',
                fontSize: '14.5px',
                fontWeight: 800,
                borderRadius: '6px',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(0, 82, 255, 0.4)',
              }}
            >
              <span>{persona === 'brand' ? 'Get Started as a Brand' : 'Join as a Creator (Free)'}</span>
              <ArrowRightIcon size={14} color="#FFFFFF" />
            </Link>

            <Link
              href={persona === 'brand' ? '/brand' : '/creator'}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                padding: '12px 28px',
                fontSize: '13.5px',
                fontWeight: 700,
                borderRadius: '6px',
                textDecoration: 'none',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              {persona === 'brand' ? 'Explore Agency Solutions' : 'Explore Creator Suite'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
