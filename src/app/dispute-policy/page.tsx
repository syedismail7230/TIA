'use client';

import React from 'react';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function DisputePolicyPage() {
  return (
    <LegalLayout
      title="Dispute Resolution, Arbitration & Cancellation Policy"
      subtitle="Definitive protocols for handling creative non-delivery, milestone rejection, TIA Mediation Desk procedures, cancellation refunds, and binding arbitration."
      lastUpdated="August 23, 2026"
      version="2.4.0"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7 }}>
          TIA provides a multi-stage dispute desk designed to resolve commercial disagreements fairly, objectively, and rapidly without costly legal proceedings. All disputes follow a 3-step escalation protocol.
        </p>

        {/* Section 1 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            1. The 3-Stage Dispute Resolution Process
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            margin: '20px 0',
          }}>
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '18px 20px', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0052FF', marginBottom: '6px' }}>
                STAGE 1: Direct Workspace Negotiation (48 Hours)
              </div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.55 }}>
                When a deliverable is rejected or delayed, the Brand and Creator have 48 hours to communicate in the campaign workspace chat, specify timestamps, and resolve minor revision notes.
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '18px 20px', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0052FF', marginBottom: '6px' }}>
                STAGE 2: TIA Mediation Desk Review (72 Hours)
              </div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.55 }}>
                If unresolved after 48 hours, either party may escalate to the TIA Mediation Desk. A neutral TIA compliance officer reviews the original brief, uploaded revision logs, and video cuts against objective specifications.
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '18px 20px', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0052FF', marginBottom: '6px' }}>
                STAGE 3: Deterministic Escrow Allocation Decision
              </div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.55 }}>
                The TIA Mediation Desk issues a final administrative determination: full creator payout, partial pro-rata split (for completed script/concept work), or full refund back to the Brand escrow balance.
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            2. Cancellation Rules & Refund Conditions
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>2.1 Cancellation Prior to Production:</strong> If a Brand cancels a campaign before the Creator has commenced work or submitted initial concept drafts, 100% of the locked escrow budget is refunded to the Brand (minus third-party payment gateway processing fees).
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>2.2 Cancellation After Draft Approval:</strong> If a Brand cancels after formal approval of script/storyboard milestones, the Creator is entitled to retain the approved milestone fee (typically 20%–30%), and the remaining unexecuted post milestone funds are refunded to the Brand.
          </p>
          <p>
            <strong>2.3 Creator Non-Delivery (Ghosting):</strong> If a Creator fails to submit deliverables within five (5) business days past the contract deadline without approved extension, the campaign is cancelled for material breach, and 100% of escrow funds are refunded to the Brand.
          </p>
        </section>

        {/* Section 3: Arbitrator Non-Liability Shield */}
        <section style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          padding: '24px',
          borderRadius: '8px',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#92400E', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            3. Platform Mediation Non-Liability Shield
          </h2>
          <p style={{ marginBottom: '12px', fontSize: '14.5px', color: '#78350F' }}>
            <strong>3.1 Administrative Facilitation:</strong> TIA Mediation Desk acts purely as an administrative facilitator to resolve marketplace escrow allocations based on objective submission evidence.
          </p>
          <p style={{ fontSize: '14.5px', color: '#78350F' }}>
            <strong>3.2 Exemption from Damages:</strong> BOTH USERS AGREE THAT TIA AND ITS MEDIATORS SHALL INCUR ZERO LEGAL LIABILITY FOR ADMINISTRATIVE ESCROW DETERMINATIONS. USERS WAIVE ANY RIGHT TO SUE TIA FOR DECISIONS RENDERED IN GOOD FAITH ACCORDING TO THIS POLICY.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            4. Binding Statutory Arbitration
          </h2>
          <p style={{ marginBottom: '12px' }}>
            In the rare event that a formal legal dispute cannot be resolved through TIA Mediation:
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>The dispute shall be submitted to binding individual arbitration under the <em>Arbitration and Conciliation Act, 1996</em> (India).</li>
            <li>The venue and seat of arbitration shall be Bengaluru / New Delhi, India.</li>
            <li>All proceedings shall be confidential and conducted in the English language.</li>
            <li><strong>Class Action Waiver:</strong> Users explicitly agree to resolve disputes on an individual basis and waive any right to participate in class actions or representative proceedings against TIA.</li>
          </ul>
        </section>
      </div>
    </LegalLayout>
  );
}
