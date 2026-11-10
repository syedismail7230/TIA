import { OtpService } from '../src/lib/services/otp.service';
import { EmailService } from '../src/lib/services/email.service';

async function main() {
  console.log('Sending test OTP email...');
  const resOtp = await OtpService.sendOtp('creatorsalliance.media@gmail.com', 'SIGNUP');
  console.log('OTP result:', resOtp);

  console.log('Sending test Payout email...');
  const resPayout = await EmailService.sendPayoutDisbursedEmail({
    creatorEmail: 'creatorsalliance.media@gmail.com',
    creatorName: 'Aarav Sharma',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    milestoneTitle: 'Dedicated YouTube 4K Review & Field Test',
    grossAmount: 65000,
    tiaFee: 3250,
    tds: 650,
    netPayout: 61100,
    utrNumber: 'NEFT2026090871239IN',
  });
  console.log('Payout result:', resPayout);
}

main().catch(console.error);

