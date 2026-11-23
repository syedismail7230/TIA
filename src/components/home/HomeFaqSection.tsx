'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';

const FAQS = [
  {
    question: 'What is The Influencer’s Agency (TIA)?',
    answer:
      'The Influencer’s Agency (TIA) is a global creator intelligence platform and campaign marketplace connecting brands with verified creators across YouTube, Instagram, and LinkedIn. TIA replaces the opaque 20%–40% talent agency markups with a deterministic 5.00% platform fee, automated contract execution, and 100% upfront milestone escrow protection.',
  },
  {
    question: 'How does TIA Milestone Escrow Protection work for brands and creators?',
    answer:
      'Prior to campaign production, brands deposit 100% of the agreed milestone funds into a secure escrow vault. Creators produce content knowing their compensation is guaranteed. Upon deliverable submission, brands have a 72-hour review window to approve or request contract-compliant revisions. Once approved, funds disburse instantly to the creator’s bank account.',
  },
  {
    question: 'What are the fees on The Influencer’s Agency (TIA)?',
    answer:
      'TIA operates on a transparent, flat 5.00% facilitation fee charged on completed milestone payouts. There are zero subscription charges, zero sign-up fees, zero profile listing fees, and zero hidden talent agency markups.',
  },
  {
    question: 'How does TIA detect bot followers and fake engagement?',
    answer:
      'TIA employs BotShield™, an algorithmic auditing engine that analyzes follower velocity spikes, account age distributions, comment semantic depth, and engagement pods across YouTube, Instagram, and LinkedIn. It calculates an objective Creator Intelligence Score (0–100) and Authenticity Percentage so brands only partner with authentic influencers.',
  },
  {
    question: 'Who owns the intellectual property (IP) and digital ad whitelisting rights?',
    answer:
      'Creators retain authorship copyright while granting brands an exclusive commercial license to broadcast and repost deliverables during the campaign window. Brands can also acquire standardized 30, 60, or 90-day advertising whitelisting (dark posting) rights directly through TIA’s automated digital contracts.',
  },
  {
    question: 'How does TIA handle disputes between brands and creators?',
    answer:
      'If a party initiates a dispute, milestone funds remain safely frozen in escrow. Both parties provide evidence (deliverables, brief requirements, timestamped chat logs) inside the platform. The TIA Dispute Resolution team reviews the evidence against the signed agreement within 3 business days and renders a binding resolution or refund.',
  },
  {
    question: 'Does TIA comply with Indian tax laws (TDS & GST)?',
    answer:
      'Yes. TIA automatically calculates 1% Tax Deducted at Source (TDS) under Section 194J of the Indian Income Tax Act for domestic creators and provides compliant 18% GST tax invoices with full input tax credit (ITC) eligibility for registered corporate entities.',
  },
  {
    question: 'Why is TIA better than traditional influencer talent agencies?',
    answer:
      'Traditional talent agencies take 20% to 40% hidden margins, take 60–90 days to pay creators, and rely on manual negotiation. TIA provides an open 5% fee structure, instant bank payouts via UPI/IMPS, algorithmic BotShield™ auditing, and automated legal contract generation in under 2 minutes.',
  },
];

export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        padding: '80px clamp(20px, 4vw, 80px)',
        borderTop: '1px solid #F1F5F9',
      }}
      aria-label="Frequently Asked Questions & Platform Authority"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
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
              marginBottom: '16px',
            }}
          >
            <ShieldCheck size={16} />
            Transparency & Security
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              marginBottom: '14px',
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#64748B',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Everything you need to know about TIA creator intelligence, milestone escrow safeguards, and transparent 5% platform fees.
          </p>
        </div>

        {/* FAQ Accordion Grid */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  border: isOpen ? '1px solid #0052FF' : '1px solid #E2E8F0',
                  borderRadius: '14px',
                  backgroundColor: isOpen ? '#FAFCFF' : '#FFFFFF',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden',
                  boxShadow: isOpen ? '0 4px 16px rgba(0, 82, 255, 0.08)' : 'none',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '16px',
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: isOpen ? '#0052FF' : '#0F172A',
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.question}
                  </span>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: isOpen ? '#0052FF' : '#64748B',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 22px 24px',
                      fontSize: '14.5px',
                      color: '#475569',
                      lineHeight: 1.7,
                      borderTop: '1px solid #F1F5F9',
                      paddingTop: '16px',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div
          style={{
            marginTop: '56px',
            padding: '32px clamp(20px, 4vw, 40px)',
            borderRadius: '20px',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px 0', color: '#FFFFFF' }}>
              Ready to launch high-ROI creator campaigns?
            </h3>
            <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
              Join verified brands and creators discovering mutual growth on The Influencer’s Agency.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href="/register?role=BRAND_ADMIN"
              style={{
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                padding: '12px 22px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Hire Creators <ArrowRight size={15} />
            </Link>
            <Link
              href="/pricing"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                padding: '12px 20px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Fee Calculator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
