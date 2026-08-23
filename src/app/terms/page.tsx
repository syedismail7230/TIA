'use client';

import React from 'react';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service & Platform Agreement"
      subtitle="Master Service Agreement governing the use of The Influencer's Agency (TIA) platform, escrow facilitation, and creator-brand commercial engagements."
      lastUpdated="August 23, 2026"
      version="2.4.0"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7 }}>
          The Influencer&apos;s Agency (&quot;TIA&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;Platform&quot;) operates as an intermediary technology and marketplace facilitation infrastructure platform under Section 79 of the Information Technology Act, 2000 (India). TIA is not an advertising agency, employer, talent representative, publisher, or party to individual creator-brand campaign contracts.
        </p>

        {/* Section 1 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            1. Acceptance of Terms & Legal Eligibility
          </h2>
          <p style={{ marginBottom: '12px' }}>
            By registering an account, accessing, or using the TIA platform (including our API, mobile web services, escrow infrastructure, and messaging desks), you (&quot;User&quot;, &quot;Brand&quot;, &quot;Creator&quot;, or &quot;Agency&quot;) agree to be legally bound by this Master Platform Agreement, our Privacy Policy, Escrow Policy, and all incorporated guidelines.
          </p>
          <p>
            Users must be at least 18 years of age and legally competent to enter into binding commercial contracts under the Indian Contract Act, 1872. If registering on behalf of a corporate entity, you represent and warrant that you possess full authorized signatory power.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            2. Platform Intermediary Role & Independent Contractor Status
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>2.1 Intermediary Status:</strong> TIA provides a closed-loop marketplace, discovery scoring algorithms, digital milestone escrow management, and frame-accurate review tools. TIA does not create, curate, script, direct, or endorse any influencer deliverables, social media posts, or brand products.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>2.2 Independent Relationship:</strong> Nothing in this Agreement creates any joint venture, employment, agency, franchise, or partnership between TIA and any User. Creators operate strictly as independent contractors and sole commercial entities responsible for their own tax obligations, equipment, and production costs.
          </p>
          <p>
            <strong>2.3 No Vicarious Liability:</strong> TIA shall not be held liable for any oral or written promises, delivery failures, quality disputes, copyright infringements, or defamatory statements made by Creators or Brands.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            3. Commercial Terms & Deterministic 5% Commission
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>3.1 Platform Commission:</strong> TIA levies a deterministic platform fee of exactly <strong>5.00%</strong> on the total gross campaign contract value. This commission covers escrow vault security, automated GST invoice generation, contract versioning, fraud detection, and dispute mediation infrastructure.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>3.2 Upfront Escrow Lock:</strong> Brands agree to lock 100% of the agreed campaign milestone budget into the TIA Escrow Vault prior to creator commencement. Work initiated outside verified platform escrow lock is void of platform guarantees.
          </p>
          <p>
            <strong>3.3 Taxes & Statutory Withholding:</strong> All platform fee invoices issued by TIA are subject to applicable Goods and Services Tax (GST 18%). TDS (Tax Deducted at Source) under Section 194J/194C of the Indian Income Tax Act shall be remitted as mandated by law.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            4. Milestone Review, 72-Hour Auto-Approval & Payout Rules
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>4.1 72-Hour Review Window:</strong> Upon formal submission of a milestone deliverable by a Creator via the TIA Content Review Studio, the Brand has exactly <strong>72 hours</strong> to review, request revisions within scope, or approve the milestone.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>4.2 Automatic Approval:</strong> If a Brand fails to respond, submit revision notes, or raise a formal dispute within the 72-hour review window, the TIA automated ledger shall automatically execute milestone approval and release the designated escrow payment to the Creator&apos;s verified bank account.
          </p>
          <p>
            <strong>4.3 Standard Revision Cycle:</strong> Standard agreements include up to two (2) rounds of reasonable revisions aligned with the original creative brief. Out-of-scope requests or creative re-shoots require mutual contract amendments and additional escrow funding.
          </p>
        </section>

        {/* Section 5: Watertight Liability Shield */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            5. Comprehensive Limitation of Liability & Warranty Disclaimer
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>5.1 AS-IS BASIS:</strong> THE TIA PLATFORM, SMART MATCHING ALGORITHMS, AND ESCROW ENGINES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, STATUTORY, OR IMPLIED.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>5.2 EXCLUSION OF CONSEQUENTIAL DAMAGES:</strong> TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL TIA, ITS DIRECTORS, FOUNDERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF BRAND REPUTATION, CAMPAIGN PERFORMANCE DEFICITS, ACCOUNT BANS BY THIRD-PARTY PLATFORMS (INSTAGRAM/YOUTUBE/TIKTOK), OR SYSTEM DOWNTIME.
          </p>
          <p>
            <strong>5.3 AGGREGATE LIABILITY CAP:</strong> TIA&apos;S TOTAL AGGREGATE FINANCIAL LIABILITY ARISING OUT OF OR IN CONNECTION WITH ANY DISPUTE, CONTRACT BREACH, OR TORTIOUS CLAIM SHALL BE STRICTLY LIMITED TO THE LESSER OF: (A) THE PLATFORM COMMISSION (5%) ACTUALLY COLLECTED BY TIA FOR THE DISPUTED CAMPAIGN TRANSACTION, OR (B) INR 10,000 (TEN THOUSAND INDIAN RUPEES).
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            6. Mandatory Indemnification by Users
          </h2>
          <p style={{ marginBottom: '12px' }}>
            You agree to defend, indemnify, and hold harmless TIA, its parent company, subsidiaries, directors, officers, employees, and licensors from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising from:
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Your breach of any provision of this Agreement or platform guidelines;</li>
            <li>Any infringement, misappropriation, or violation of third-party intellectual property, privacy, or publicity rights in user-submitted content;</li>
            <li>Failure by Brands or Creators to adhere to statutory ASCI, CCPA, or consumer protection advertising disclosure rules;</li>
            <li>Defective, harmful, or mislabeled brand products provided for creator sampling or endorsement;</li>
            <li>Tax liabilities, penalties, or misdeclarations incurred by your commercial activities.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            7. Anti-Circumvention & Direct Settlement Covenants
          </h2>
          <p style={{ marginBottom: '12px' }}>
            Users acknowledge that TIA invests substantial capital and technological resources into creator discovery, background fraud auditing, and commercial facilitation.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>7.1 24-Month Non-Circumvention:</strong> For a period of twenty-four (24) months following the initial introduction, contact, or engagement on TIA, Brands and Creators agree not to solicit, negotiate, or transact off-platform commercial campaigns directly or through intermediaries without paying TIA&apos;s standard platform fee.
          </p>
          <p>
            <strong>7.2 Liquidated Damages:</strong> Breach of this covenant shall obligate the breaching party to pay liquidated damages equal to 25% of the total off-platform campaign billing, plus full legal recovery costs.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            8. Governing Law & Mandatory Binding Arbitration
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>8.1 Indian Law:</strong> This Agreement shall be construed, interpreted, and governed in accordance with the substantive laws of India, without regard to conflict of law principles.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>8.2 Arbitration:</strong> Any controversy, claim, or dispute arising out of or relating to this Agreement that cannot be resolved amicably through TIA Dispute Desk within thirty (30) days shall be referred to and finally resolved by binding arbitration under the <em>Arbitration and Conciliation Act, 1996</em> by a sole arbitrator mutually appointed by TIA.
          </p>
          <p>
            <strong>8.3 Seat & Jurisdiction:</strong> The seat and venue of arbitration shall be Bengaluru / New Delhi, India. The proceedings shall be conducted in English. Courts in Bengaluru / New Delhi shall possess exclusive supervisory jurisdiction.
          </p>
        </section>

        {/* Contact Info */}
        <section style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
            Legal Notice Contact
          </h3>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            Formal legal notices, takedown requests, or regulatory inquiries must be directed to: <br />
            <strong>Legal Counsel & Compliance Officer</strong><br />
            The Influencer&apos;s Agency (TIA)<br />
            Email: <a href="mailto:legal@theinfluencers.agency" style={{ color: '#0052FF', fontWeight: 600 }}>legal@theinfluencers.agency</a>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
