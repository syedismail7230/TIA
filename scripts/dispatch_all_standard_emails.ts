// ============================================================================
// TIA STANDARD EMAIL DISPATCH SUITE
// Sends a live production copy of all 14 standard platform emails to the admin
// Target: creatorsalliance.media@gmail.com
// From: "The Influencer's Agency" <noreply@theinfluencers.agency>
// ============================================================================

import { EmailService } from '../src/lib/services/email.service';
import { OtpService } from '../src/lib/services/otp.service';
import { EmailVerificationService } from '../src/lib/services/email-verification.service';

const TARGET_EMAIL = 'creatorsalliance.media@gmail.com';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dispatchAll() {
  console.log('======================================================================');
  console.log(`🚀 DISPATCHING COPIES OF ALL STANDARD TIA EMAILS TO: ${TARGET_EMAIL}`);
  console.log('======================================================================\n');

  // 1. Account Security OTP Verification (Exact match to uploaded UI/UX screenshot)
  console.log('1/14. Dispatching: 6-Digit Security OTP (SECURE AUTH)...');
  await OtpService.sendOtp(TARGET_EMAIL, 'SIGNUP');
  await sleep(1500);

  // 2. Welcome Email
  console.log('2/14. Dispatching: Welcome Onboard...');
  await EmailService.sendWelcomeEmail(TARGET_EMAIL, 'Aditya Singhania', 'BRAND');
  await sleep(1500);

  // 3. Email Address Activation Link
  console.log('3/14. Dispatching: Account Email Activation...');
  await EmailVerificationService.sendVerificationEmail({
    email: TARGET_EMAIL,
    name: 'Aarav Sharma',
    role: 'CREATOR',
  });
  await sleep(1500);

  // 4. New Campaign Proposal Received
  console.log('4/14. Dispatching: New Campaign Proposal Received...');
  await EmailService.sendApplicationReceivedEmail({
    brandEmail: TARGET_EMAIL,
    brandName: 'Nike India Private Limited',
    creatorName: 'Aarav Sharma',
    creatorHandle: '@aarav.fitness',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    proposedRate: 65000,
    pitch: 'I will test these carbon-plated racing shoes over a 15km marathon-pace tempo run and break down the midsole foam recovery on 4K camera.',
  });
  await sleep(1500);

  // 5. Proposal Accepted
  console.log('5/14. Dispatching: Proposal Accepted...');
  await EmailService.sendProposalStatusEmail({
    creatorEmail: TARGET_EMAIL,
    creatorName: 'Aarav Sharma',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    status: 'ACCEPTED',
    rate: 65000,
  });
  await sleep(1500);

  // 6. Contract Ready for Signature
  console.log('6/14. Dispatching: Digital Agreement Ready for Signature...');
  await EmailService.sendContractReadyEmail({
    recipientEmail: TARGET_EMAIL,
    recipientName: 'Aarav Sharma',
    partyRole: 'CREATOR',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    agreedAmount: 65000,
  });
  await sleep(1500);

  // 7. Contract Executed
  console.log('7/14. Dispatching: Bilateral Agreement Fully Executed...');
  await EmailService.sendContractExecutedEmail({
    creatorEmail: TARGET_EMAIL,
    brandEmail: TARGET_EMAIL,
    creatorName: 'Aarav Sharma',
    brandName: 'Nike India Private Limited',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    contractNumber: 'TIA-AGR-2026-RUN01',
    agreedAmount: 65000,
  });
  await sleep(1500);

  // 8. Milestone Funds Locked in Protection
  console.log('8/14. Dispatching: Milestone Funds Secured in Escrow...');
  await EmailService.sendFundsLockedEmail({
    creatorEmail: TARGET_EMAIL,
    brandName: 'Nike India Private Limited',
    creatorName: 'Aarav Sharma',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    milestoneTitle: 'Dedicated YouTube 4K Review & Field Test',
    grossAmount: 65000,
    transactionId: 'TX-SEC-2026-98402',
  });
  await sleep(1500);

  // 9. Deliverable Submitted (72h SLA Active)
  console.log('9/14. Dispatching: Deliverable Uploaded (72h SLA Alert)...');
  await EmailService.sendDeliverableSubmittedEmail({
    brandEmail: TARGET_EMAIL,
    brandName: 'Nike India Private Limited',
    creatorName: 'Aarav Sharma',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    deliverableTitle: 'Dedicated YouTube 4K Review & Field Test',
    assetUrl: 'https://cdn.theinfluencers.agency/content/review_draft_4k_v1.mp4',
    deadlineHours: 72,
  });
  await sleep(1500);

  // 10. Creative Revision Feedback
  console.log('10/14. Dispatching: Creative Revision Feedback...');
  await EmailService.sendRevisionRequestedEmail({
    creatorEmail: TARGET_EMAIL,
    creatorName: 'Aarav Sharma',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    deliverableTitle: 'Dedicated YouTube 4K Review & Field Test',
    revisionNotes: 'Please ensure the brand logo bug is overlaid on the top-right between 01:15 and 03:00 during the outdoor sprint footage, and mention the July 15th availability date.',
  });
  await sleep(1500);

  // 11. Net Payout Disbursed
  console.log('11/14. Dispatching: Net Payout Disbursed with UTR...');
  await EmailService.sendPayoutDisbursedEmail({
    creatorEmail: TARGET_EMAIL,
    creatorName: 'Aarav Sharma',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    milestoneTitle: 'Dedicated YouTube 4K Review & Field Test',
    grossAmount: 65000,
    tiaFee: 3250,
    tds: 650,
    netPayout: 61100,
    utrNumber: 'NEFT2026090871239IN',
  });
  await sleep(1500);

  // 12. GST Tax Invoice Issued
  console.log('12/14. Dispatching: Official GST Tax Invoice...');
  await EmailService.sendInvoiceIssuedEmail({
    brandEmail: TARGET_EMAIL,
    brandLegalName: 'Nike India Private Limited',
    invoiceNumber: 'INV-2026-0001',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    grossAmount: 65000,
    platformFee: 3250,
    totalGst: 585,
    totalInvoiceAmount: 3835,
    pdfUrl: 'https://cdn.theinfluencers.agency/invoices/INV-2026-0001.pdf',
  });
  await sleep(1500);

  // 13. Dispute Arbitration Notice
  console.log('13/14. Dispatching: Formal Dispute Arbitration Notice...');
  await EmailService.sendDisputeAlertEmail({
    recipientEmail: TARGET_EMAIL,
    recipientName: 'Nike Brand Admin',
    role: 'BRAND',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    disputeReason: 'DELIVERABLE_DELAY_OUTSIDE_SLA',
    disputedAmount: 65000,
    disputeId: 'DISP-2026-7781',
  });
  await sleep(1500);

  // 14. Anti-Circumvention Warning
  console.log('14/14. Dispatching: Anti-Circumvention Security Warning...');
  await EmailService.sendCircumventionWarningEmail({
    recipientEmail: TARGET_EMAIL,
    recipientName: 'Community User',
    flaggedContent: 'Hey, contact me directly on WhatsApp +91-98765-43210 or send UPI to aarav@okhdfcbank to bypass commission',
  });

  console.log('\n======================================================================');
  console.log('🏁 ALL 14 STANDARD EMAILS SUCCESSFULLY DISPATCHED TO YOUR INBOX!');
  console.log('======================================================================');
}

dispatchAll().catch((err) => {
  console.error('Fatal dispatch error:', err);
  process.exit(1);
});

