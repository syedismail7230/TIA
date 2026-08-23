import React from 'react';
import Link from 'next/link';
import { LockIcon, ShieldCheckIcon, DocumentIcon, ScaleIcon } from '@/components/ui/Icons';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#0F172A',
      color: '#FFFFFF',
      borderTop: '1px solid #1E293B',
      padding: '48px 24px 32px 24px',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '36px',
        marginBottom: '40px',
      }}>
        {/* Brand Column */}
        <div>
          <img
            src="/logo-white-cropped.png"
            alt="The Influencer's Agency"
            style={{
              height: '42px',
              width: 'auto',
              maxWidth: '200px',
              objectFit: 'contain',
              marginBottom: '16px',
            }}
          />
          <p style={{
            fontSize: '13px',
            color: '#94A3B8',
            lineHeight: 1.6,
            maxWidth: '300px',
          }}>
            The enterprise creator intelligence and closed-loop campaign infrastructure platform.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
            Platform Modules
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#CBD5E1' }}>
            <li><Link href="/brand/creators" style={{ color: '#CBD5E1' }}>Creator Intelligence & Scoring</Link></li>
            <li><Link href="/brand" style={{ color: '#CBD5E1' }}>Closed-Loop Campaign Marketplace</Link></li>
            <li><Link href="/creator" style={{ color: '#CBD5E1' }}>Creator Rate Card & Rate Lock</Link></li>
            <li><Link href="/admin" style={{ color: '#CBD5E1' }}>5% Commission Ledger & Escrow</Link></li>
          </ul>
        </div>

        {/* Governance & Compliance */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
            Security & Governance
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#CBD5E1' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8' }}>
              <LockIcon size={14} color="#38BDF8" />
              <span>Escrow Payment Guarantee</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8' }}>
              <ShieldCheckIcon size={14} color="#38BDF8" />
              <span>Anti-Circumvention Protection</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8' }}>
              <DocumentIcon size={14} color="#38BDF8" />
              <span>Dual-Signature Digital Agreements</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8' }}>
              <ScaleIcon size={14} color="#38BDF8" />
              <span>TIA Dispute Resolution Desk</span>
            </li>
          </ul>
        </div>

        {/* Operating Model */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
            Commercial Model
          </div>
          <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>
            TIA operates on a deterministic <strong style={{ color: '#FFFFFF' }}>5.00% Platform Commission</strong> model. Escrow funds are held securely until deliverable milestones are verified and approved.
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        borderTop: '1px solid #1E293B',
        paddingTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '12px',
        color: '#64748B',
      }}>
        <div>© {new Date().getFullYear()} The Influencer&apos;s Agency (TIA). Enterprise Grade. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>Deterministic 5% Ledger</span>
          <span>•</span>
          <span>Zero Floating Point Math</span>
          <span>•</span>
          <span>Strict Contract Versioning</span>
        </div>
      </div>
    </footer>
  );
};
