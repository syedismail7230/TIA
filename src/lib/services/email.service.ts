// ============================================================================
// TIA BACKEND - ENTERPRISE TRANSACTIONAL EMAIL SERVICE
// 100% Platform UI/UX Cohesive Design (Dark Luxury, Custom Badges, Real SMTP)
// ============================================================================

import { sendLiveEmail, DEFAULT_RECIPIENT } from '@/lib/email/resend';
import { renderPlatformEmail } from '@/lib/email/templates';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.theinfluencers.agency';

export class EmailService {
  /**
   * 1. Account Welcome Email
   */
  static async sendWelcomeEmail(toEmail: string, name: string, role: string) {
    const html = renderPlatformEmail({
      badgeText: 'WELCOME ONBOARD',
      badgeColor: 'blue',
      title: `Welcome to TIA, ${name}! 👋`,
      subtitle: `Your ${role === 'CREATOR' ? 'Creator Intelligence' : 'Brand Organization'} portal is now active.`,
      contentHtml: `
        <p>You have joined India's premier creator marketplace powered by 100% milestone payment protection, automated GST invoicing, and real-time audience intelligence.</p>
      `,
      keyValues: [
        { label: 'Registered Role', value: role === 'CREATOR' ? 'Verified Creator' : 'Brand Organization' },
        { label: 'Payment Protection', value: '100% Upfront Milestone Lock', color: '#60a5fa' },
        { label: 'Review SLA', value: '72-Hour Auto Approval Guarantee', color: '#fbbf24' },
        { label: 'Platform Fee', value: 'Fixed 5.00% Canonical', color: '#34d399' },
      ],
      ctaButton: {
        label: 'Launch Your Workspace',
        url: `${BASE_URL}/login`,
        color: '#2563eb',
      },
      footerNote: 'Need help getting started? Reply directly to this email for dedicated partner support.',
    });

    return await sendLiveEmail({
      to: toEmail || DEFAULT_RECIPIENT,
      subject: `Welcome to TIA — Your ${role} Account is Ready`,
      html,
    });
  }

  /**
   * 2. New Campaign Application Received (Sent to Brand Admin)
   */
  static async sendApplicationReceivedEmail(params: {
    brandEmail?: string;
    brandName: string;
    creatorName: string;
    creatorHandle: string;
    campaignTitle: string;
    proposedRate: number;
    pitch: string;
    reviewUrl?: string;
  }) {
    const html = renderPlatformEmail({
      badgeText: 'NEW PROPOSAL',
      badgeColor: 'purple',
      title: 'New Creator Proposal Received 📬',
      subtitle: `Creator ${params.creatorName} (${params.creatorHandle}) applied to "${params.campaignTitle}".`,
      contentHtml: `
        <div style="background: #1e293b; border-left: 3px solid #60a5fa; padding: 12px 16px; border-radius: 4px; margin: 12px 0;">
          <p style="margin: 0; font-style: italic; color: #f1f5f9;">"${params.pitch}"</p>
        </div>
      `,
      keyValues: [
        { label: 'Campaign', value: params.campaignTitle },
        { label: 'Creator', value: `${params.creatorName} (${params.creatorHandle})` },
        { label: 'Proposed Commercials', value: `₹${params.proposedRate.toLocaleString('en-IN')}`, color: '#34d399' },
      ],
      ctaButton: {
        label: 'Review Proposal & Shortlist',
        url: params.reviewUrl || `${BASE_URL}/brand`,
        color: '#2563eb',
      },
      footerNote: 'Reviewing proposals within 24 hours increases creator commitment by 80%.',
    });

    return await sendLiveEmail({
      to: params.brandEmail || DEFAULT_RECIPIENT,
      subject: `[New Proposal] ${params.creatorName} applied to ${params.campaignTitle}`,
      html,
    });
  }

  /**
   * 3. Proposal Status Update (Sent to Creator)
   */
  static async sendProposalStatusEmail(params: {
    creatorEmail?: string;
    creatorName: string;
    campaignTitle: string;
    status: 'SHORTLISTED' | 'ACCEPTED' | 'REJECTED';
    rate?: number;
    actionUrl?: string;
  }) {
    const isAccepted = params.status === 'ACCEPTED';
    const isShortlisted = params.status === 'SHORTLISTED';

    const title = isAccepted
      ? 'Proposal Accepted! Contract Pending 🎉'
      : isShortlisted
      ? 'You Have Been Shortlisted! 🌟'
      : 'Campaign Application Update';

    const badgeColor = isAccepted ? 'emerald' : isShortlisted ? 'blue' : 'rose';

    const html = renderPlatformEmail({
      badgeText: `PROPOSAL ${params.status}`,
      badgeColor,
      title,
      subtitle: `Update for your application on "${params.campaignTitle}".`,
      contentHtml: isAccepted
        ? `<p>Congratulations! The brand has approved your commercial proposal. The digital agreement has been drafted under TIA payment protection.</p>`
        : isShortlisted
        ? `<p>Great news! The brand team has shortlisted your application for their campaign. Keep an eye on your workspace for contract terms.</p>`
        : `<p>Thank you for submitting your pitch. On this occasion the campaign quota has been filled, but your profile remains in the active talent pool.</p>`,
      keyValues: [
        { label: 'Campaign', value: params.campaignTitle },
        { label: 'Application Status', value: params.status, color: isAccepted ? '#34d399' : '#60a5fa' },
        ...(params.rate ? [{ label: 'Approved Fee', value: `₹${params.rate.toLocaleString('en-IN')}`, color: '#34d399' }] : []),
      ],
      ctaButton: {
        label: 'Open Workspace',
        url: params.actionUrl || `${BASE_URL}/creator`,
        color: '#2563eb',
      },
    });

    return await sendLiveEmail({
      to: params.creatorEmail || DEFAULT_RECIPIENT,
      subject: `[TIA Update] Your proposal for "${params.campaignTitle}" is ${params.status}`,
      html,
    });
  }

  /**
   * 4. Contract Ready for Signature
   */
  static async sendContractReadyEmail(params: {
    recipientEmail?: string;
    recipientName: string;
    partyRole: 'CREATOR' | 'BRAND';
    campaignTitle: string;
    agreedAmount: number;
    contractUrl?: string;
  }) {
    const html = renderPlatformEmail({
      badgeText: 'CONTRACT READY',
      badgeColor: 'amber',
      title: 'Digital Agreement Ready for Signature ✍️',
      subtitle: `Legally-binding agreement prepared for "${params.campaignTitle}".`,
      contentHtml: `
        <p>A digital contract has been prepared under standard TIA marketplace terms. Both parties are required to digitally sign before milestone funds are locked in escrow.</p>
      `,
      keyValues: [
        { label: 'Campaign', value: params.campaignTitle },
        { label: 'Total Deal Value', value: `₹${params.agreedAmount.toLocaleString('en-IN')}`, color: '#34d399' },
        { label: 'Platform Fee (5%)', value: `₹${Math.round(params.agreedAmount * 0.05).toLocaleString('en-IN')}` },
        { label: 'Net Payout Allocation', value: `₹${Math.round(params.agreedAmount * 0.95).toLocaleString('en-IN')}`, color: '#60a5fa' },
      ],
      ctaButton: {
        label: 'Review & Sign Contract',
        url: params.contractUrl || `${BASE_URL}/workspace`,
        color: '#2563eb',
      },
      footerNote: 'All TIA contracts feature built-in dispute arbitration and 72-hour deliverable SLAs.',
    });

    return await sendLiveEmail({
      to: params.recipientEmail || DEFAULT_RECIPIENT,
      subject: `[Action Required] Sign Agreement for "${params.campaignTitle}"`,
      html,
    });
  }

  /**
   * 5. Bilateral Contract Fully Executed
   */
  static async sendContractExecutedEmail(params: {
    creatorEmail?: string;
    brandEmail?: string;
    creatorName: string;
    brandName: string;
    campaignTitle: string;
    contractNumber: string;
    agreedAmount: number;
  }) {
    const html = renderPlatformEmail({
      badgeText: 'CONTRACT SIGNED',
      badgeColor: 'emerald',
      title: 'Agreement Bilaterally Signed & Active 📜',
      subtitle: `Contract #${params.contractNumber} is now legally binding.`,
      contentHtml: `
        <p>Both <strong>${params.brandName}</strong> and <strong>${params.creatorName}</strong> have executed their digital signatures. Work may now commence under TIA payment protection.</p>
      `,
      keyValues: [
        { label: 'Contract Number', value: params.contractNumber },
        { label: 'Campaign', value: params.campaignTitle },
        { label: 'Brand Signer', value: params.brandName },
        { label: 'Creator Signer', value: params.creatorName },
        { label: 'Agreed Fee', value: `₹${params.agreedAmount.toLocaleString('en-IN')}`, color: '#34d399' },
      ],
      ctaButton: {
        label: 'Open Active Collaboration Desk',
        url: `${BASE_URL}/workspace`,
        color: '#2563eb',
      },
    });

    // Send to both parties
    const recipients = [params.creatorEmail, params.brandEmail].filter(Boolean) as string[];
    return await sendLiveEmail({
      to: recipients.length > 0 ? recipients : DEFAULT_RECIPIENT,
      subject: `[TIA Executed] Agreement Signed for "${params.campaignTitle}" (#${params.contractNumber})`,
      html,
    });
  }

  /**
   * 6. Milestone Funds Secured in TIA Protection
   */
  static async sendFundsLockedEmail(params: {
    brandName: string;
    creatorName: string;
    creatorEmail?: string;
    campaignTitle: string;
    milestoneTitle: string;
    grossAmount: number;
    transactionId: string;
  }) {
    const html = renderPlatformEmail({
      badgeText: 'FUNDS SECURED',
      badgeColor: 'blue',
      title: `₹${params.grossAmount.toLocaleString('en-IN')} Secured in TIA Protection 🛡️`,
      subtitle: `Upfront escrow deposit confirmed for "${params.campaignTitle}".`,
      contentHtml: `
        <p><strong>${params.brandName}</strong> has deposited 100% of the milestone funds into TIA Payment Protection. Creator <strong>${params.creatorName}</strong> can now begin work with complete financial safety.</p>
      `,
      keyValues: [
        { label: 'Transaction ID', value: params.transactionId },
        { label: 'Milestone', value: params.milestoneTitle },
        { label: 'Secured Balance', value: `₹${params.grossAmount.toLocaleString('en-IN')}`, color: '#34d399' },
        { label: 'Escrow Status', value: 'HELD_IN_PROTECTION', color: '#60a5fa' },
      ],
      ctaButton: {
        label: 'Open Workspace Desk',
        url: `${BASE_URL}/workspace`,
        color: '#2563eb',
      },
      footerNote: 'Funds are securely locked and will only be disbursed upon deliverable approval or after the 72-hour SLA expires.',
    });

    return await sendLiveEmail({
      to: params.creatorEmail || DEFAULT_RECIPIENT,
      subject: `[TIA Protection] ₹${params.grossAmount.toLocaleString('en-IN')} Secured for ${params.milestoneTitle}`,
      html,
    });
  }

  /**
   * 7. Deliverable Submitted (72h SLA Alert to Brand)
   */
  static async sendDeliverableSubmittedEmail(params: {
    brandEmail?: string;
    brandName: string;
    creatorName: string;
    campaignTitle: string;
    deliverableTitle: string;
    assetUrl: string;
    deadlineHours?: number;
  }) {
    const html = renderPlatformEmail({
      badgeText: 'REVIEW SLA 72H',
      badgeColor: 'amber',
      title: 'Deliverable Uploaded for Review 🎬',
      subtitle: `${params.creatorName} submitted "${params.deliverableTitle}".`,
      contentHtml: `
        <p>Creator <strong>${params.creatorName}</strong> has uploaded the draft deliverable. Please inspect the asset and provide review approval or revision requests within the 72-hour review window.</p>
        <p style="color: #fca5a5; font-size: 13px;"><strong>Notice:</strong> Under TIA platform rules, if no revisions or disputes are lodged within 72 hours, the submission will be automatically approved and escrow funds released.</p>
      `,
      keyValues: [
        { label: 'Campaign', value: params.campaignTitle },
        { label: 'Deliverable', value: params.deliverableTitle },
        { label: 'Review SLA', value: `${params.deadlineHours || 72} Hours Active`, color: '#fbbf24' },
      ],
      ctaButton: {
        label: 'Inspect Deliverable & Review',
        url: `${BASE_URL}/workspace`,
        color: '#2563eb',
      },
    });

    return await sendLiveEmail({
      to: params.brandEmail || DEFAULT_RECIPIENT,
      subject: `[Review SLA] ${params.creatorName} submitted ${params.deliverableTitle} (72h Timer Active)`,
      html,
    });
  }

  /**
   * 8. Revision Requested (Sent to Creator)
   */
  static async sendRevisionRequestedEmail(params: {
    creatorEmail?: string;
    creatorName: string;
    campaignTitle: string;
    deliverableTitle: string;
    revisionNotes: string;
  }) {
    const html = renderPlatformEmail({
      badgeText: 'REVISION REQUEST',
      badgeColor: 'rose',
      title: 'Creative Revision Requested ✍️',
      subtitle: `Feedback provided for "${params.deliverableTitle}".`,
      contentHtml: `
        <p>The brand team has reviewed your submission and requested the following adjustments:</p>
        <div style="background: #1e293b; border-left: 3px solid #f43f5e; padding: 12px 16px; border-radius: 4px; margin: 12px 0;">
          <p style="margin: 0; font-style: italic; color: #f1f5f9;">"${params.revisionNotes}"</p>
        </div>
        <p>Please revise and upload the updated asset cut to continue the milestone process.</p>
      `,
      keyValues: [
        { label: 'Campaign', value: params.campaignTitle },
        { label: 'Deliverable', value: params.deliverableTitle },
        { label: 'Status', value: 'REVISION_REQUESTED', color: '#fb7185' },
      ],
      ctaButton: {
        label: 'Upload Revised Cut',
        url: `${BASE_URL}/creator`,
        color: '#2563eb',
      },
    });

    return await sendLiveEmail({
      to: params.creatorEmail || DEFAULT_RECIPIENT,
      subject: `[Revision Request] Updates needed for "${params.deliverableTitle}"`,
      html,
    });
  }

  /**
   * 9. Payout Disbursed to Creator
   */
  static async sendPayoutDisbursedEmail(params: {
    creatorEmail?: string;
    creatorName: string;
    campaignTitle: string;
    milestoneTitle: string;
    grossAmount: number;
    tiaFee: number;
    tds: number;
    netPayout: number;
    utrNumber: string;
  }) {
    const html = renderPlatformEmail({
      badgeText: 'PAYOUT DISBURSED',
      badgeColor: 'emerald',
      title: `₹${params.netPayout.toLocaleString('en-IN')} Bank Payout Disbursed 💰`,
      subtitle: `Milestone "${params.milestoneTitle}" approved & settled.`,
      contentHtml: `
        <p>Congratulations <strong>${params.creatorName}</strong>! Your deliverable has been approved and your net earnings have been dispatched to your bank account via NEFT settlement.</p>
      `,
      keyValues: [
        { label: 'Gross Milestone Fee', value: `₹${params.grossAmount.toLocaleString('en-IN')}` },
        { label: 'TIA Platform Fee (5%)', value: `- ₹${params.tiaFee.toLocaleString('en-IN')}`, color: '#94a3b8' },
        { label: 'TDS Withholding (1%)', value: `- ₹${params.tds.toLocaleString('en-IN')}`, color: '#94a3b8' },
        { label: 'Net Bank Payout', value: `₹${params.netPayout.toLocaleString('en-IN')}`, color: '#34d399' },
        { label: 'NEFT Reference (UTR)', value: params.utrNumber, color: '#60a5fa' },
      ],
      ctaButton: {
        label: 'View Wallet Statement',
        url: `${BASE_URL}/creator`,
        color: '#2563eb',
      },
    });

    return await sendLiveEmail({
      to: params.creatorEmail || DEFAULT_RECIPIENT,
      subject: `[TIA Payout] ₹${params.netPayout.toLocaleString('en-IN')} Disbursed (UTR: ${params.utrNumber})`,
      html,
    });
  }

  /**
   * 10. GST Tax Invoice Issued (Sent to Brand)
   */
  static async sendInvoiceIssuedEmail(params: {
    brandEmail?: string;
    brandLegalName: string;
    invoiceNumber: string;
    campaignTitle: string;
    grossAmount: number;
    platformFee: number;
    totalGst: number;
    totalInvoiceAmount: number;
    pdfUrl?: string;
  }) {
    const html = renderPlatformEmail({
      badgeText: 'GST TAX INVOICE',
      badgeColor: 'blue',
      title: `Tax Invoice ${params.invoiceNumber} Issued 🧾`,
      subtitle: `Official GST invoice for campaign "${params.campaignTitle}".`,
      contentHtml: `
        <p>Your official GST Tax Invoice has been generated in compliance with Central Goods and Services Tax rules.</p>
      `,
      keyValues: [
        { label: 'Invoice Number', value: params.invoiceNumber },
        { label: 'Issued To', value: params.brandLegalName },
        { label: 'Taxable Platform Service', value: `₹${params.platformFee.toLocaleString('en-IN')}` },
        { label: '18% GST (CGST + SGST)', value: `₹${params.totalGst.toLocaleString('en-IN')}` },
        { label: 'Total Platform Invoice', value: `₹${params.totalInvoiceAmount.toLocaleString('en-IN')}`, color: '#34d399' },
      ],
      ctaButton: {
        label: 'Download Invoice PDF',
        url: params.pdfUrl || `${BASE_URL}/brand`,
        color: '#2563eb',
      },
    });

    return await sendLiveEmail({
      to: params.brandEmail || DEFAULT_RECIPIENT,
      subject: `[TIA Tax Invoice] ${params.invoiceNumber} for "${params.campaignTitle}"`,
      html,
    });
  }

  /**
   * 11. Dispute Filed Alert (Sent to Parties & Legal)
   */
  static async sendDisputeAlertEmail(params: {
    recipientEmail?: string;
    recipientName: string;
    role: string;
    campaignTitle: string;
    disputeReason: string;
    disputedAmount: number;
    disputeId: string;
  }) {
    const html = renderPlatformEmail({
      badgeText: 'ARBITRATION NOTICE',
      badgeColor: 'rose',
      title: 'Formal Dispute Case Opened ⚖️',
      subtitle: `Dispute filed regarding "${params.campaignTitle}".`,
      contentHtml: `
        <p>A formal arbitration dispute has been submitted under reason: <strong>${params.disputeReason}</strong>. Associated milestone funds have been placed on freeze pending arbitration review.</p>
        <p>Both parties have 48 hours to upload supporting evidence, communications, or raw deliverable files.</p>
      `,
      keyValues: [
        { label: 'Dispute Reference', value: params.disputeId },
        { label: 'Campaign', value: params.campaignTitle },
        { label: 'Frozen Disputed Amount', value: `₹${params.disputedAmount.toLocaleString('en-IN')}`, color: '#fb7185' },
        { label: 'Arbitration Status', value: 'UNDER_REVIEW', color: '#fbbf24' },
      ],
      ctaButton: {
        label: 'Submit Evidence to Desk',
        url: `${BASE_URL}/workspace`,
        color: '#2563eb',
      },
    });

    return await sendLiveEmail({
      to: params.recipientEmail || DEFAULT_RECIPIENT,
      subject: `[TIA Dispute Alert] Arbitration Case Opened for "${params.campaignTitle}"`,
      html,
    });
  }

  /**
   * 12. Anti-Circumvention Warning Notice
   */
  static async sendCircumventionWarningEmail(params: {
    recipientEmail?: string;
    recipientName: string;
    flaggedContent: string;
  }) {
    const html = renderPlatformEmail({
      badgeText: 'SECURITY WARNING',
      badgeColor: 'rose',
      title: 'Platform Policy Warning: Direct Payment Leakage ⚠️',
      subtitle: 'Circumvention attempt detected by TIA Trust & Safety engine.',
      contentHtml: `
        <p>Our automated integrity scanner flagged an attempt to share direct contact or external payment details:</p>
        <div style="background: #1e293b; border-left: 3px solid #f43f5e; padding: 12px 16px; border-radius: 4px; margin: 12px 0;">
          <p style="margin: 0; font-family: monospace; color: #fca5a5;">${params.flaggedContent}</p>
        </div>
        <p style="color: #cbd5e1; font-size: 13px;">Taking conversations or payments off TIA removes payment protection, eliminates automatic dispute arbitration, and constitutes a breach of Section 7 of the Platform Terms of Service.</p>
      `,
      ctaButton: {
        label: 'Review Terms of Service',
        url: `${BASE_URL}/terms`,
        color: '#2563eb',
      },
      footerNote: 'Repeated policy violations may result in account suspension and escrow forfeiture.',
    });

    return await sendLiveEmail({
      to: params.recipientEmail || DEFAULT_RECIPIENT,
      subject: `[TIA Security Warning] Off-Platform Contact Attempt Flagged`,
      html,
    });
  }
}
