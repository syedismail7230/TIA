'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheckIcon, DocumentIcon, LockIcon, ScaleIcon } from '@/components/ui/Icons';

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  version: string;
  children: React.ReactNode;
}

const LEGAL_DOCUMENTS = [
  { href: '/terms', title: 'Terms of Service', icon: DocumentIcon },
  { href: '/privacy', title: 'Privacy Policy', icon: ShieldCheckIcon },
  { href: '/escrow-policy', title: 'Escrow & Settlement Policy', icon: LockIcon },
  { href: '/influencer-compliance', title: 'Influencer & Advertising Guidelines', icon: ScaleIcon },
  { href: '/ip-licensing', title: 'Content Licensing & IP Rights', icon: DocumentIcon },
  { href: '/dispute-policy', title: 'Dispute & Cancellation Policy', icon: ScaleIcon },
];

export const LegalLayout: React.FC<LegalLayoutProps> = ({
  title,
  subtitle,
  lastUpdated,
  version,
  children,
}) => {
  const pathname = usePathname();

  return (
    <div style={{ width: '100%', backgroundColor: '#FFFFFF' }}>
      {/* Clean Minimalist Header */}
      <div style={{
        backgroundColor: '#FAFAFA',
        borderBottom: '1px solid #E2E8F0',
        padding: '56px clamp(20px, 4vw, 72px) 44px clamp(20px, 4vw, 72px)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12.5px',
            color: '#64748B',
            marginBottom: '16px',
          }}>
            <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/legal" style={{ color: '#64748B', textDecoration: 'none' }}>Legal Center</Link>
            <span>/</span>
            <span style={{ color: '#0052FF', fontWeight: 600 }}>{title}</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#0F172A',
            lineHeight: 1.2,
            marginBottom: '10px',
          }}>
            {title}
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#64748B',
            maxWidth: '720px',
            lineHeight: 1.6,
            marginBottom: '16px',
          }}>
            {subtitle}
          </p>

          <div style={{
            fontSize: '12px',
            color: '#94A3B8',
          }}>
            Last updated: {lastUpdated} • Version {version}
          </div>
        </div>
      </div>

      {/* Main Content Area: Left Sidebar Navigation + Right Document Body */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        padding: '48px clamp(20px, 4vw, 72px) 96px clamp(20px, 4vw, 72px)',
        display: 'flex',
        gap: '56px',
        flexWrap: 'wrap',
      }}>
        {/* Left Sticky Navigation Column */}
        <aside style={{
          flex: '0 0 260px',
          minWidth: '240px',
        }}>
          <div style={{
            position: 'sticky',
            top: '90px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '10px',
              paddingLeft: '12px',
            }}>
              Policies & Agreements
            </div>

            {LEGAL_DOCUMENTS.map((doc) => {
              const isActive = pathname === doc.href;
              return (
                <Link
                  key={doc.href}
                  href={doc.href}
                  style={{
                    display: 'block',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    backgroundColor: isActive ? '#F1F5F9' : 'transparent',
                    color: isActive ? '#0052FF' : '#475569',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '13.5px',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {doc.title}
                </Link>
              );
            })}

            <div style={{
              marginTop: '32px',
              paddingTop: '20px',
              borderTop: '1px solid #E2E8F0',
              paddingLeft: '12px',
              fontSize: '12px',
              color: '#64748B',
              lineHeight: 1.5,
            }}>
              Have legal or compliance questions? Contact{' '}
              <a href="mailto:legal@theinfluencers.agency" style={{ color: '#0052FF', fontWeight: 600, textDecoration: 'none' }}>
                legal@theinfluencers.agency
              </a>
            </div>
          </div>
        </aside>

        {/* Right Document Body */}
        <main style={{
          flex: '1 1 580px',
          minWidth: 0,
          color: '#334155',
          fontSize: '15px',
          lineHeight: 1.75,
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};
