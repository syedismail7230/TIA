'use client';

import React from 'react';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function EscrowPolicyPage() {
  return (
    <LegalLayout
      title="Escrow Guarantee & Milestone Settlement Policy"
      subtitle="Definitive commercial rules governing upfront fund lock, the deterministic 5% platform ledger, 72-hour review windows, and milestone release protocols."
      lastUpdated="August 23, 2026"
      version="2.4.0"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7 }}>
          TIA Escrow guarantees that Creators never produce content without verified upfront budget lock, and Brands never lose capital on unfulfilled campaign milestones. All funds are governed by deterministic immutable ledger logic.
        </p>

        {/* Section 1 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            1. Escrow Funding & Account Structuring
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>1.1 Upfront Deposit:</strong> Prior to any campaign execution or creator production, the Brand must deposit 100% of the agreed campaign milestone budget into the dedicated campaign escrow account.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>1.2 Status of Funds:</strong> Escrowed funds remain the property of the depositing Brand subject to the conditional milestone release covenants of the campaign agreement. TIA acts solely as an escrow technology facilitator and custodian.
          </p>
          <p>
            <strong>1.3 Zero Interest:</strong> Escrow balances do not accrue interest for either party.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            2. The Deterministic 5.00% Platform Commission
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>2.1 Commission Fee:</strong> TIA deducts an exact platform commission of <strong>5.00%</strong> from the gross campaign contract value. This commission is automatically deducted upon successful milestone payout release.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>2.2 No Hidden Markups:</strong> Unlike traditional influencer talent agencies that inflate creator rates by 20%–40%, TIA enforces transparent, open-ledger pricing with zero undisclosed markups.
          </p>
          <p>
            <strong>2.3 GST Tax Compliance:</strong> A separate GST tax invoice (18% GST on the 5% platform service fee) is automatically generated and downloadable by the Brand for Input Tax Credit (ITC) claiming.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            3. The 72-Hour Review Protocol & Auto-Approval Engine
          </h2>
          <p style={{ marginBottom: '12px' }}>
            To prevent indefinite payment delays and protect creator cash flow, TIA enforces an automated 72-hour review timeline:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            margin: '20px 0',
          }}>
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '6px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0052FF', marginBottom: '6px' }}>STEP 1: SUBMISSION</div>
              <div style={{ fontSize: '12.5px', color: '#64748B' }}>Creator submits deliverable (video draft, script, or proof of post) into Content Review Studio.</div>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '6px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0052FF', marginBottom: '6px' }}>STEP 2: 72H WINDOW</div>
              <div style={{ fontSize: '12.5px', color: '#64748B' }}>Brand has exactly 72 hours to approve, request revisions (within brief), or raise a dispute.</div>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '6px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0052FF', marginBottom: '6px' }}>STEP 3: AUTO-SETTLE</div>
              <div style={{ fontSize: '12.5px', color: '#64748B' }}>If no response is logged within 72 hours, the escrow engine automatically releases payment.</div>
            </div>
          </div>
          <p>
            <strong>Revision Limits:</strong> Standard campaigns include up to two (2) revision cycles. Revisions must strictly adhere to the original creative brief.
          </p>
        </section>

        {/* Section 4: Non-Liability for Banking Rails */}
        <section style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          padding: '24px',
          borderRadius: '8px',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#92400E', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            4. Payment Gateway & Banking Rail Disclaimer
          </h2>
          <p style={{ marginBottom: '12px', fontSize: '14.5px', color: '#78350F' }}>
            TIA utilizes authorized payment aggregators (Razorpay / Stripe) and RBI-regulated scheduled commercial banks for payment processing.
          </p>
          <p style={{ fontSize: '14.5px', color: '#78350F' }}>
            TIA shall not be held liable for payout delays caused by banking holidays, NEFT/RTGS/IMPS network downtime, incorrect bank IFSC/account details provided by creators, or regulatory compliance holds imposed by intermediary banking institutions.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            5. Escrow Release Irrevocability
          </h2>
          <p style={{ marginBottom: '12px' }}>
            Once a milestone payment has been authorized by a Brand (manually or via 72-hour auto-approval) and disbursed to the Creator, the transaction is <strong>final, non-reversible, and non-refundable</strong>.
          </p>
          <p>
            Any post-payout disputes regarding organic engagement performance, algorithm shifts, or audience reactions are strictly commercial risks assumed by the Brand and do not warrant an escrow clawback.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
