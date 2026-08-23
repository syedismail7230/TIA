import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#0F172A',
      color: '#F8FAFC',
      borderTop: '1px solid #334155',
      padding: '48px 24px 32px 24px',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '36px',
        marginBottom: '40px',
      }}>
        {/* Brand Column with White Logo */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <img
              src="/logo-white-cropped.png"
              alt="The Influencer's Agency"
              style={{
                height: '42px',
                width: 'auto',
                maxWidth: '220px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
          <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, maxWidth: '320px' }}>
            The global technology platform eliminating information asymmetry between enterprise brands and authentic creators.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
            Platform Capabilities
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
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#CBD5E1' }}>
            <li><span style={{ color: '#94A3B8' }}>🔒 Escrow Payment Guarantee</span></li>
            <li><span style={{ color: '#94A3B8' }}>🛡️ Anti-Circumvention Protection</span></li>
            <li><span style={{ color: '#94A3B8' }}>📜 Dual-Signature Digital Agreements</span></li>
            <li><span style={{ color: '#94A3B8' }}>⚖️ TIA Dispute Resolution Desk</span></li>
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
        borderTop: '1px solid #334155',
        paddingTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '12px',
        color: '#64748B',
      }}>
        <div>© {new Date().getFullYear()} The Influencer&apos;s Agency (TIA). All rights reserved.</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>Privacy & Security</span>
          <span>Terms of Service</span>
          <span>Ledger Transparency</span>
        </div>
      </div>
    </footer>
  );
};
