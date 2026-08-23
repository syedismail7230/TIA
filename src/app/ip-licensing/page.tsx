'use client';

import React from 'react';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function IPLicensingPage() {
  return (
    <LegalLayout
      title="IP Copyright, Content Licensing & Whitelisting Agreement"
      subtitle="Comprehensive intellectual property framework governing ownership of creator deliverables, brand trademarks, ad whitelisting rights, and digital usage terms."
      lastUpdated="August 23, 2026"
      version="2.4.0"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7 }}>
          Creators retain underlying copyright in their likeness and personal voice, while granting the contracting Brand defined, irrevocable, non-exclusive commercial usage rights as specified in the agreed campaign milestone tier.
        </p>

        {/* Section 1 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            1. Standard Commercial Licensing Grant
          </h2>
          <p style={{ marginBottom: '12px' }}>
            Upon successful milestone approval and full escrow payout disbursement:
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <li><strong>Organic Posting Rights:</strong> The Creator grants the Brand the right to keep the sponsored content published permanently on the designated creator channels unless a specific archiving timeline was mutually stipulated in the campaign agreement.</li>
            <li><strong>Brand Channel Re-Posting (Organic):</strong> The Brand receives a worldwide, royalty-free license to repost, embed, or share the deliverable on the Brand&apos;s owned social channels and website for a standard term of 12 months.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            2. Paid Ad Whitelisting & Dark Posting Terms
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>2.1 Whitelisting Scope:</strong> Paid advertising usage (&quot;whitelisting&quot;, Meta Partnership Ads, TikTok Spark Ads, or Google Brand Partnership Ads) requires an explicit whitelisting clause in the TIA digital agreement.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>2.2 Standard Term:</strong> Unless extended via contract amendment, standard whitelisting rights are granted for a duration of ninety (90) days from deliverable live date.
          </p>
          <p>
            <strong>2.3 Access Revocation:</strong> Upon expiry of the agreed whitelisting duration, the Brand must promptly deactivate active ad sets running through creator handles.
          </p>
        </section>

        {/* Section 3: Music & Third-Party Copyright Warranties */}
        <section style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          padding: '24px',
          borderRadius: '8px',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#92400E', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            3. Music Licensing & Copyright Non-Liability Shield
          </h2>
          <p style={{ marginBottom: '12px', fontSize: '14.5px', color: '#78350F' }}>
            <strong>3.1 Creator Originality Warranty:</strong> The Creator represents and warrants that all voiceovers, scripts, visual edits, and footage submitted are 100% original and do not infringe any third-party copyright or trademark.
          </p>
          <p style={{ marginBottom: '12px', fontSize: '14.5px', color: '#78350F' }}>
            <strong>3.2 Commercial Music Clearance:</strong> For deliverables intended for commercial paid boosting, the Creator must use only royalty-free commercial audio or brand-provided licensed tracks. Creators are solely responsible for ensuring music clearing.
          </p>
          <p style={{ fontSize: '14.5px', color: '#78350F' }}>
            <strong>3.3 Platform Exemption:</strong> TIA DOES NOT LICENSE MUSIC OR AUDIO ON BEHALF OF USERS. TIA SHALL HAVE ZERO LIABILITY FOR COPYRIGHT STRIKES, AUDIO MUTING, OR INFRINGEMENT CLAIMS INITIATED BY RECORD LABELS OR PERFORMANCE RIGHTS ORGANIZATIONS (PROs).
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            4. Brand Trademarks & Brand Assets
          </h2>
          <p style={{ marginBottom: '12px' }}>
            The Brand grants the Creator a limited, revocable, non-transferable license to use the Brand&apos;s name, logo, and product imagery solely for the purpose of creating the agreed campaign deliverables.
          </p>
          <p>
            Creators shall not alter brand logos, use brand marks for unauthorized merchandise, or disparage the Brand in violation of campaign briefs.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            5. TIA Promotional Usage
          </h2>
          <p>
            Users grant TIA a non-exclusive, royalty-free license to feature approved, publicly published campaign creative clips, case studies, and brand logos in TIA marketing materials, investor presentations, and product demonstration galleries.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
