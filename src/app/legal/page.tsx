'use client';

import React from 'react';
import Link from 'next/link';
import { LegalLayout } from '@/components/legal/LegalLayout';
import {
  DocumentIcon,
  ShieldCheckIcon,
  LockIcon,
  ScaleIcon,
  ArrowRightIcon,
} from '@/components/ui/Icons';

const LEGAL_MODULES = [
  {
    title: 'Terms of Service (MSA)',
    href: '/terms',
    icon: DocumentIcon,
    badge: 'Core Agreement',
    desc: 'Master platform service terms, independent contractor status, user responsibilities, and comprehensive limitation of liability.',
  },
  {
    title: 'Privacy & Data Protection Policy',
    href: '/privacy',
    icon: ShieldCheckIcon,
    badge: 'DPDP Act 2023',
    desc: 'Data collection practices, creator social analytics processing, cookie disclosures, and cybersecurity disclaimers.',
  },
  {
    title: 'Milestone & Settlement Policy',
    href: '/escrow-policy',
    icon: LockIcon,
    badge: 'Financial Ledger',
    desc: 'Upfront milestone budget lock, the deterministic 5.00% platform fee, 72-hour review window, and payout release irrevocability.',
  },
  {
    title: 'Influencer & ASCI Advertising Compliance',
    href: '/influencer-compliance',
    icon: ScaleIcon,
    badge: 'ASCI Guidelines',
    desc: 'Mandatory ad disclosure labels (#Ad/#Sponsored), consumer protection rules, and brand/creator indemnities.',
  },
  {
    title: 'IP Copyright, Licensing & Whitelisting',
    href: '/ip-licensing',
    icon: DocumentIcon,
    badge: 'Usage Rights',
    desc: 'Commercial usage grants, 90-day whitelisting and dark-posting rules, music copyright clearances, and trademark protection.',
  },
  {
    title: 'Dispute Resolution, Mediation & Cancellation',
    href: '/dispute-policy',
    icon: ScaleIcon,
    badge: 'Arbitration',
    desc: '3-stage dispute protocol, cancellation refunds, ghosting penalties, and binding individual arbitration in India.',
  },
];

export default function LegalIndexPage() {
  return (
    <LegalLayout
      title="TIA Legal & Compliance Center"
      subtitle="Complete repository of commercial agreements, statutory regulatory disclosures, escrow governance, and intellectual property policies governing The Influencer's Agency."
      lastUpdated="August 23, 2026"
      version="2.4.0"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6 }}>
          Welcome to the official legal and regulatory center for <strong>The Influencer&apos;s Agency (TIA)</strong>. Our policies are crafted to provide maximum legal transparency, eliminate information asymmetry, protect creator compensation, and shield enterprise brands and the platform from legal ambiguities.
        </p>

        {/* 6 Legal Document Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {LEGAL_MODULES.map((doc) => {
            const Icon = doc.icon;
            return (
              <Link
                key={doc.href}
                href={doc.href}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  padding: '24px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}
                className="legal-card-hover"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: '#EFF6FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Icon size={18} color="#0052FF" />
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#0052FF',
                      backgroundColor: '#EFF6FF',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}>
                      {doc.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                    {doc.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.55, marginBottom: '20px' }}>
                    {doc.desc}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#0052FF',
                }}>
                  <span>Read Full Policy</span>
                  <ArrowRightIcon size={13} color="#0052FF" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </LegalLayout>
  );
}
