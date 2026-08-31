// ===================================================
// TIA BACKEND - TRANSACTIONAL EMAIL SERVICE
// ===================================================

import { sendLiveEmail, DEFAULT_RECIPIENT } from '@/lib/email/resend';

function baseTemplate(title: string, content: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f9fafb; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; }
    .header { padding: 24px 32px; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border-bottom: 1px solid #374151; }
    .logo { font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
    .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 9999px; margin-left: 8px; }
    .body { padding: 32px; color: #d1d5db; line-height: 1.6; font-size: 14px; }
    .highlight-card { background: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 16px 20px; margin: 20px 0; }
    .stat-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .stat-label { color: #9ca3af; }
    .stat-val { font-weight: 700; color: #f3f4f6; }
    .btn { display: inline-block; padding: 12px 24px; background: #2563eb; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; margin-top: 16px; }
    .footer { padding: 20px 32px; background-color: #0b0f19; border-top: 1px solid #1f2937; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="logo">THE INFLUENCER'S AGENCY</span>
      <span class="badge">TIA CORE</span>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      &copy; 2026 The Influencer's Agency (TIA). All payments held under TIA Payment Protection.<br/>
      Bengaluru • Mumbai • Singapore • London
    </div>
  </div>
</body>
</html>
  `;
}

export class EmailService {
  /**
   * 1. Send Welcome Email upon registration
   */
  static async sendWelcomeEmail(toEmail: string, name: string, role: string) {
    const html = baseTemplate(
      'Welcome to The Influencer’s Agency (TIA)',
      `
      <h2 style="color: #ffffff; margin-top: 0;">Welcome, ${name}! 👋</h2>
      <p>Your <strong>${role === 'CREATOR' ? 'Creator Intelligence' : 'Brand Organization'}</strong> account is now live on TIA.</p>
      <div class="highlight-card">
        <div class="stat-row"><span class="stat-label">Registered Role:</span><span class="stat-val">${role}</span></div>
        <div class="stat-row"><span class="stat-label">Security & Protection:</span><span class="stat-val">100% Upfront Fund Lock</span></div>
        <div class="stat-row"><span class="stat-label">Deliverable SLA:</span><span class="stat-val">72-Hour Auto Approval</span></div>
      </div>
      <p>Access your dashboard to explore verified creators, launch milestone-protected campaigns, and audit authentic audience reach.</p>
      <a href="http://localhost:3000/login" class="btn">Launch Dashboard</a>
      `
    );

    return await sendLiveEmail({
      to: toEmail || DEFAULT_RECIPIENT,
      subject: `Welcome to TIA — Your ${role} Account is Ready`,
      html,
    });
  }

  /**
   * 2. Send Milestone Fund Locked Notification
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
    const html = baseTemplate(
      'Milestone Funds Secured in TIA Payment Protection',
      `
      <h2 style="color: #ffffff; margin-top: 0;">₹${params.grossAmount.toLocaleString('en-IN')} Secured in TIA Payment Protection 🛡️</h2>
      <p><strong>${params.brandName}</strong> has deposited 100% of the funds for milestone <strong>"${params.milestoneTitle}"</strong> in campaign <em>"${params.campaignTitle}"</em>.</p>
      <div class="highlight-card">
        <div class="stat-row"><span class="stat-label">Transaction ID:</span><span class="stat-val">${params.transactionId}</span></div>
        <div class="stat-row"><span class="stat-label">Milestone:</span><span class="stat-val">${params.milestoneTitle}</span></div>
        <div class="stat-row"><span class="stat-label">Secured Amount:</span><span class="stat-val">₹${params.grossAmount.toLocaleString('en-IN')}</span></div>
        <div class="stat-row"><span class="stat-label">Status:</span><span class="stat-val" style="color: #60a5fa;">HELD_IN_PROTECTION</span></div>
      </div>
      <p>Creator <strong>${params.creatorName}</strong> can now begin work on this milestone with complete payment safety.</p>
      <a href="http://localhost:3000/workspace" class="btn">Open Workspace Desk</a>
      `
    );

    return await sendLiveEmail({
      to: params.creatorEmail || DEFAULT_RECIPIENT,
      subject: `[TIA Protection] ₹${params.grossAmount.toLocaleString('en-IN')} Secured for ${params.milestoneTitle}`,
      html,
    });
  }

  /**
   * 3. Send Deliverable Submission & 72-Hour SLA Alert to Brand
   */
  static async sendDeliverableSubmittedEmail(params: {
    brandEmail?: string;
    brandName: string;
    creatorName: string;
    campaignTitle: string;
    deliverableTitle: string;
    assetUrl: string;
    deadlineHours: number;
  }) {
    const html = baseTemplate(
      'Deliverable Ready for Review (72h SLA Active)',
      `
      <h2 style="color: #ffffff; margin-top: 0;">Deliverable Cut Uploaded for Review 🎬</h2>
      <p>Creator <strong>${params.creatorName}</strong> has submitted <strong>"${params.deliverableTitle}"</strong> for campaign <em>"${params.campaignTitle}"</em>.</p>
      <div class="highlight-card">
        <div class="stat-row"><span class="stat-label">Deliverable:</span><span class="stat-val">${params.deliverableTitle}</span></div>
        <div class="stat-row"><span class="stat-label">Review Window:</span><span class="stat-val" style="color: #f59e0b;">72-Hour SLA Timer Active</span></div>
        <div class="stat-row"><span class="stat-label">Asset Link:</span><span class="stat-val"><a href="${params.assetUrl}" style="color: #60a5fa;">Preview Cut</a></span></div>
      </div>
      <p style="color: #fca5a5;"><strong>Note:</strong> Under TIA guidelines, if no revisions or disputes are requested within 72 hours, the system will automatically approve the draft and disburse milestone funds.</p>
      <a href="http://localhost:3000/workspace" class="btn">Review & Add Notes</a>
      `
    );

    return await sendLiveEmail({
      to: params.brandEmail || DEFAULT_RECIPIENT,
      subject: `[Review SLA] ${params.creatorName} submitted ${params.deliverableTitle} (72h Timer Active)`,
      html,
    });
  }

  /**
   * 4. Send Payout Disbursement Email to Creator
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
    const html = baseTemplate(
      'Milestone Payout Disbursed',
      `
      <h2 style="color: #34d399; margin-top: 0;">₹${params.netPayout.toLocaleString('en-IN')} Bank Payout Disbursed 💰</h2>
      <p>Congratulations <strong>${params.creatorName}</strong>! Your deliverable for milestone <strong>"${params.milestoneTitle}"</strong> has been approved.</p>
      <div class="highlight-card">
        <div class="stat-row"><span class="stat-label">Gross Milestone:</span><span class="stat-val">₹${params.grossAmount.toLocaleString('en-IN')}</span></div>
        <div class="stat-row"><span class="stat-label">TIA 5% Platform Fee:</span><span class="stat-val">- ₹${params.tiaFee.toLocaleString('en-IN')}</span></div>
        <div class="stat-row"><span class="stat-label">1% TDS (Sec 194J):</span><span class="stat-val">- ₹${params.tds.toLocaleString('en-IN')}</span></div>
        <hr style="border: 0; border-top: 1px solid #374151; margin: 8px 0;"/>
        <div class="stat-row"><span class="stat-label" style="color: #34d399; font-weight: 700;">Net Bank Payout:</span><span class="stat-val" style="color: #34d399; font-size: 16px;">₹${params.netPayout.toLocaleString('en-IN')}</span></div>
        <div class="stat-row"><span class="stat-label">NEFT Reference (UTR):</span><span class="stat-val">${params.utrNumber}</span></div>
      </div>
      <p>Funds have been dispatched directly to your registered bank account via NEFT settlement.</p>
      `
    );

    return await sendLiveEmail({
      to: params.creatorEmail || DEFAULT_RECIPIENT,
      subject: `[TIA Payout] ₹${params.netPayout.toLocaleString('en-IN')} Disbursed (UTR: ${params.utrNumber})`,
      html,
    });
  }
}
