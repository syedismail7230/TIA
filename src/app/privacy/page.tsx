'use client';

import React from 'react';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy & Data Protection"
      subtitle="Comprehensive data processing, user privacy disclosure, and cookie compliance in accordance with India's Digital Personal Data Protection (DPDP) Act 2023 and global standards."
      lastUpdated="August 23, 2026"
      version="2.4.0"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7 }}>
          The Influencer&apos;s Agency (&quot;TIA&quot;) treats your commercial data with enterprise security standards. We do not sell creator contact information or brand campaign budgets to third parties. Data is processed strictly for campaign execution, fraud scoring, and tax compliance.
        </p>

        {/* Section 1 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            1. Information We Collect
          </h2>
          <p style={{ marginBottom: '12px' }}>
            We collect personal and commercial data to provide high-velocity creator intelligence and verified marketplace escrow services:
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <li><strong>Account Identity:</strong> Legal name, business entity name, email address, phone number, and physical billing address.</li>
            <li><strong>Creator Social Analytics:</strong> Public handle metadata, audience demographic distributions, authentic follower growth graphs, and engagement metrics fetched via authorized third-party APIs.</li>
            <li><strong>Financial & Statutory Identifiers:</strong> GSTIN, Permanent Account Number (PAN), banking IFSC code, and tax residency certificates for deterministic invoicing.</li>
            <li><strong>Campaign Workspaces:</strong> Video review drafts, contract revisions, chat communications, and frame timestamps.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            2. Purpose of Data Processing (DPDP Act 2023)
          </h2>
          <p style={{ marginBottom: '12px' }}>
            Under India&apos;s <em>Digital Personal Data Protection Act, 2023</em> and international data frameworks, processing occurs solely for legitimate specified purposes:
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Enabling smart discovery algorithms to match brands with verified relevant creators;</li>
            <li>Securing escrow transactions and issuing audit-ready GST tax invoices;</li>
            <li>Detecting fraudulent follower spikes, bot engagement, or suspicious billing attempts;</li>
            <li>Facilitating frame-accurate video sign-offs and legal usage whitelisting.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            3. Data Sharing & Third-Party Intermediaries
          </h2>
          <p style={{ marginBottom: '12px' }}>
            TIA shares data strictly with vetted enterprise sub-processors required for core platform functionality:
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Payment Gateways & Banking Partners:</strong> (e.g. Razorpay, Stripe, partner scheduled commercial banks) for escrow custody and payout execution;</li>
            <li><strong>Cloud Infrastructure Providers:</strong> Encrypted databases and CDN storage with SOC2 Tier-3 compliance;</li>
            <li><strong>Statutory Authorities:</strong> When strictly mandated by valid legal court orders, tax summons, or regulatory directives.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            4. Cookie & Local Storage Disclosure
          </h2>
          <p style={{ marginBottom: '12px' }}>
            TIA utilizes essential session cookies and performance telemetry to maintain secure logins, remember currency preferences (INR/USD), and detect anomalous unauthorized access.
          </p>
          <p>
            Users may control cookie preferences through browser settings; however, disabling essential session tokens may degrade authentication functionality in campaign workspaces.
          </p>
        </section>

        {/* Section 5: Data Security & Non-Liability */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            5. Security Measures & Cyber Security Disclaimer
          </h2>
          <p style={{ marginBottom: '12px' }}>
            TIA implements industry-standard AES-256 encryption at rest and TLS 1.3 in transit. However, no digital transmission over the internet is completely impenetrable.
          </p>
          <p>
            TIA shall not be liable for unauthorized access or security breaches resulting from user credential compromise, phishing attacks directed at users, malware on client devices, or zero-day vulnerabilities in third-party internet backbone infrastructure.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            6. User Rights (Access, Rectification & Erasure)
          </h2>
          <p style={{ marginBottom: '12px' }}>
            In accordance with applicable law, you have the right to request access to your personal data, rectify inaccuracies, or request account closure and data anonymization, subject to mandatory statutory tax and accounting retention requirements (minimum 7 years for GST financial records).
          </p>
          <p>
            To exercise your data privacy rights, email our Data Protection Officer at: <a href="mailto:privacy@theinfluencers.agency" style={{ color: '#0052FF', fontWeight: 600 }}>privacy@theinfluencers.agency</a>.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
