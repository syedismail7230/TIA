'use client';

import React from 'react';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service & Platform Agreement"
      subtitle="Master Service Agreement governing user registration, age verification, demographic disclosures, 5% platform fees, and creator-brand commercial contracts."
      lastUpdated="August 25, 2026"
      version="2.5.0"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7 }}>
          The Influencer&apos;s Agency (&quot;TIA&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;Platform&quot;) operates as a technology intermediary and marketplace infrastructure platform under Section 79 of the Information Technology Act, 2000 (India). TIA provides campaign workflows, discovery tools, milestone tracking, and automated contract facilitation. TIA is not an advertising agency, employer, banking institution, or talent agent.
        </p>

        {/* Section 1 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            1. Legal Eligibility & Mandatory Age Requirement (18+)
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>1.1 Minimum Age Requirement:</strong> All users of the TIA platform—whether registering as a Brand, Agency, or Creator—must be at least <strong>18 years of age</strong> and legally competent to enter into binding commercial agreements under the Indian Contract Act, 1872. Registration by individuals under 18 without verified parental/guardian legal power of attorney is strictly prohibited.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>1.2 Accurate Demographic Disclosure:</strong> Users agree to provide truthful, accurate, and current information during the 3-step registration process, including Full Legal Name, Gender, Age/Date of Birth, Contact Details, and Organization identifiers. This demographic data is utilized exclusively for:
          </p>
          <ul style={{ paddingLeft: '24px', lineHeight: 1.7, marginBottom: '12px', color: '#475569' }}>
            <li>Verifying legal eligibility to enter commercial advertising agreements.</li>
            <li>Campaign matchmaking and audience demographic alignment with brand briefs.</li>
            <li>Regulatory compliance with Advertising Standards Council of India (ASCI) guidelines and tax regulations.</li>
          </ul>
          <p>
            <strong>1.3 Corporate Signatory Authority:</strong> If registering on behalf of a brand, corporation, or agency, you represent and warrant that you possess full authorized corporate power to execute binding commercial contracts.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            2. Platform Intermediary Role & Independent Contractor Status
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>2.1 Intermediary Status:</strong> TIA provides a closed-loop marketplace, discovery scoring algorithms, digital milestone management, and frame-accurate review tools. TIA does not create, curate, script, direct, or endorse any influencer deliverables, social media posts, or brand products.
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
            3. Social Media Account Linking & API Connectors
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>3.1 Voluntary Social Connector Sync:</strong> Users may voluntarily link third-party social media accounts (including Instagram, YouTube, TikTok, X/Twitter, and LinkedIn) during registration or from their dashboard profile. Linking social accounts enables TIA algorithms to calculate verified reach, engagement rates, and authentic audience statistics.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>3.2 Read-Only Permissions:</strong> TIA accesses third-party social platforms strictly via authorized public APIs with read-only analytics permissions. TIA never posts content, modifies passwords, or accesses private direct messages without explicit user authorization.
          </p>
          <p>
            <strong>3.3 Disconnection Rights:</strong> Users maintain the right to disconnect or revoke social account access at any time via their profile settings or third-party platform security dashboards.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            4. Commercial Terms & Transparent 5% Platform Fee
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>4.1 Transparent 5% Fee:</strong> TIA levies a flat, transparent platform fee of exactly <strong>5.00%</strong> on total facilitated campaign contracts. This platform fee funds discovery tooling, fraud prevention algorithms, automated milestone contract generation, and dispute mediation infrastructure.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>4.2 Milestone Deliverable Tracking:</strong> Campaign funds are tracked and released against agreed digital milestone deliverables (e.g. Draft Submission, Revision Approval, Final Social Publication).
          </p>
          <p>
            <strong>4.3 Taxes & Statutory Withholding:</strong> All platform fee invoices issued by TIA are subject to applicable Goods and Services Tax (GST 18%). TDS (Tax Deducted at Source) under Section 194J/194C of the Indian Income Tax Act shall be remitted as mandated by law.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            5. Milestone Review, 72-Hour Auto-Approval & Deliverables
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>5.1 72-Hour Review Window:</strong> Upon formal submission of a milestone deliverable by a Creator via the TIA Content Review Studio, the Brand has exactly <strong>72 hours</strong> to review, request revisions within scope, or approve the milestone.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>5.2 Automatic Approval:</strong> If a Brand fails to respond, submit revision notes, or raise a formal dispute within the 72-hour review window, the TIA automated workflow shall automatically execute milestone approval and process the payout to the Creator&apos;s verified bank account.
          </p>
          <p>
            <strong>5.3 Standard Revision Cycle:</strong> Standard agreements include up to two (2) rounds of reasonable revisions aligned with the original creative brief. Out-of-scope requests or creative re-shoots require mutual contract amendments and additional funding.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            6. Limitation of Liability & Warranty Disclaimer
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>6.1 AS-IS BASIS:</strong> THE TIA PLATFORM, MATCHING ALGORITHMS, AND WORKFLOW ENGINES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>6.2 EXCLUSION OF CONSEQUENTIAL DAMAGES:</strong> TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL TIA, ITS DIRECTORS, FOUNDERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES.
          </p>
          <p>
            <strong>6.3 AGGREGATE LIABILITY CAP:</strong> TIA&apos;S TOTAL AGGREGATE FINANCIAL LIABILITY ARISING OUT OF OR IN CONNECTION WITH ANY DISPUTE OR CONTRACT BREACH SHALL BE STRICTLY LIMITED TO THE LESSER OF: (A) THE 5% PLATFORM FEE ACTUALLY COLLECTED BY TIA FOR THE DISPUTED CAMPAIGN TRANSACTION, OR (B) INR 10,000 (TEN THOUSAND INDIAN RUPEES).
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            7. Governing Law & Dispute Resolution
          </h2>
          <p style={{ marginBottom: '12px' }}>
            This Agreement shall be governed by and construed in accordance with the substantive laws of the Republic of India.
          </p>
          <p>
            Any dispute arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the competent courts in Hyderabad, Telangana, India.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
