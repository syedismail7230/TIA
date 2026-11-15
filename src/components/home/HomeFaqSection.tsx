'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const FAQS = [
  {
    question: 'What is The Influencer’s Agency (TIA)?',
    answer:
      'The Influencer’s Agency (TIA) is a global creator intelligence and campaign marketplace designed to eliminate middleman markups. Traditional talent agencies charge undisclosed 20% to 40% agency margins. TIA provides a transparent 5% platform fee, automated contract execution, verified audience metrics, and milestone escrow protection.',
  },
  {
    question: 'How does TIA Milestone Escrow Protection guarantee secure payments?',
    answer:
      'Before campaign production begins, the brand locks 100% of the agreed milestone funds in a dedicated vault. Creators produce content with the certainty of guaranteed payment, while brands enjoy a 72-hour review window to ensure all agreed deliverables match contract specifications before payout release.',
  },
  {
    question: 'What are the platform fees for brands and creators?',
    answer:
      'TIA operates on an exact, transparent 5.00% platform facilitation fee upon successful deliverable approval. There are zero upfront listing fees, zero monthly retainers, and zero undisclosed markups. GST tax invoices are automatically generated for enterprise accounting.',
  },
  {
    question: 'How does TIA BotShield™ verify creator authenticity and follower reach?',
    answer:
      'TIA BotShield™ continuously analyzes multi-platform channel telemetry across YouTube, Instagram, LinkedIn, and X. It audits audience authenticity, historical engagement velocity, comment quality, and demographic integrity to produce an immutable Creator Intelligence and Trust Score.',
  },
  {
    question: 'Who owns the content intellectual property (IP) and ad whitelisting rights?',
    answer:
      'Standard TIA agreements explicitly specify commercial usage rights, digital reproduction grants, and paid advertising whitelisting windows (e.g., 30, 60, or 90 days). Both parties enter partnerships with legally binding, transparent terms.',
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
