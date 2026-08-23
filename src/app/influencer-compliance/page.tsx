'use client';

import React from 'react';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function InfluencerCompliancePage() {
  return (
    <LegalLayout
      title="Influencer Advertising & ASCI Compliance Policy"
      subtitle="Mandatory regulatory disclosure standards, Consumer Protection Act (CCPA) rules, and advertising guidelines governing all creator deliverables on TIA."
      lastUpdated="August 23, 2026"
      version="2.4.0"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7 }}>
          All sponsored content, branded collaborations, gifting endorsements, and paid affiliate placements coordinated through TIA must strictly comply with the <em>Guidelines for Influencer Advertising in Digital Media</em> issued by the Advertising Standards Council of India (ASCI) and the <em>Consumer Protection Act, 2019</em>.
        </p>

        {/* Section 1 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            1. Mandatory Disclosure Labels
          </h2>
          <p style={{ marginBottom: '12px' }}>
            Creators must prominently display approved disclosure labels on all branded deliverables across all social networks (Instagram, YouTube, LinkedIn, X, etc.):
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <li><strong>Permissible Labels:</strong> Only `#Ad`, `#Sponsored`, `#Collaboration`, `#PaidPartnership`, or `#Promotion` are legally recognized. Generic tags such as `#collab` or `#sp` are insufficient.</li>
            <li><strong>Placement in Videos:</strong> Disclosures in video content must be superimposed over the video for at least the first 5 seconds or throughout the product demonstration, clearly legible on standard mobile screens.</li>
            <li><strong>Placement in Captions:</strong> Disclosures must appear in the first two lines of the caption before the &quot;...more&quot; or &quot;see more&quot; fold.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            2. Truth in Advertising & Substantiation of Claims
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>2.1 Honest Experience:</strong> Creators warrant that any representation regarding personal experience with a brand product reflects their genuine, honest evaluation.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>2.2 Scientific & Health Claims:</strong> Brands are solely responsible for possessing verifiable laboratory or clinical substantiation for performance claims (e.g. &quot;cures acne in 7 days&quot;, &quot;boosts battery life by 50%&quot;). Creators shall not make unsubstantiated therapeutic, financial, or performance claims.
          </p>
          <p>
            <strong>2.3 Regulated Sectors (BFSI / Health / Gaming):</strong> Campaigns in regulated sectors must carry mandatory statutory warnings (e.g. SEBI warnings for financial investments, FSSAI disclaimers for dietary supplements).
          </p>
        </section>

        {/* Section 3: Absolute Liability Shift to Brand & Creator */}
        <section style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          padding: '24px',
          borderRadius: '8px',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#92400E', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            3. Complete Platform Exemption & Indemnity for Regulatory Penalties
          </h2>
          <p style={{ marginBottom: '12px', fontSize: '14.5px', color: '#78350F' }}>
            TIA does not author, publish, or modify user-generated creator posts and is strictly an intermediary technology infrastructure under Section 79 of the IT Act, 2000.
          </p>
          <p style={{ marginBottom: '12px', fontSize: '14.5px', color: '#78350F' }}>
            <strong>3.1 User Sole Liability:</strong> If ASCI, the Central Consumer Protection Authority (CCPA), the Ministry of Consumer Affairs, or any court of law issues a notice, penalty, or injunction regarding misleading advertising, undisclosed endorsements, or copyright infringement, the Brand and Creator involved shall bear 100% of all fines, legal liabilities, and rectifications.
          </p>
          <p style={{ fontSize: '14.5px', color: '#78350F' }}>
            <strong>3.2 Defense & Indemnity:</strong> Brands and Creators jointly and severally agree to defend, indemnify, and hold harmless TIA and its directors against all regulatory fines, damages, and legal expenses resulting from advertising non-compliance.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            4. Prohibited Content Categories
          </h2>
          <p style={{ marginBottom: '12px' }}>
            TIA strictly prohibits the booking, promotion, or escrow funding of campaigns related to:
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Illegal gambling, betting apps, or unregulated speculative schemes;</li>
            <li>Tobacco products, e-cigarettes, or prescription narcotics;</li>
            <li>Hate speech, defamation, harassment, or adult explicit materials;</li>
            <li>Counterfeit products or unauthorized brand knockoffs.</li>
          </ul>
        </section>
      </div>
    </LegalLayout>
  );
}
