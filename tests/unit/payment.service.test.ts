import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { PaymentService } from '../../src/lib/services/payment.service';
import { verifyPaymentSignature, verifyWebhookSignature } from '../../src/lib/finance/razorpay';
import crypto from 'crypto';

describe('TIA Backend - Payment Protection & Ledger Engine QA Tests', () => {
  it('correctly calculates 5% TIA Platform Fee, 1% TDS, and 18% GST on fee', async () => {
    const grossAmount = 50000;
    const lockedTx = await PaymentService.lockMilestoneFunds({
      brandId: 'demo-brand-user-id',
      creatorId: 'cr-101',
      campaignId: 'camp-qa-1',
      campaignTitle: 'QA Benchmark Launch',
      creatorName: 'Aarav Sharma',
      creatorHandle: '@aarav.fitness',
      grossAmount,
      milestoneStage: 1,
      milestoneTitle: 'Concept & Script Approval',
    });

    assert.equal(lockedTx.grossAmount, 50000);
    assert.equal(lockedTx.tiaFee, 2500); // 5% of 50,000 = 2,500
    assert.equal(lockedTx.tds, 500); // 1% TDS of 50,000 = 500
    assert.equal(lockedTx.gstOnFee, 450); // 18% GST on 2,500 = 450
    assert.equal(lockedTx.netCreatorPayout, 47000); // 50,000 - 2,500 - 500 = 47,000
    assert.equal(lockedTx.status, 'HELD_IN_PROTECTION');
    assert.equal(lockedTx.utrNumber, 'PROTECTED_TIA_WALLET');
  });

  it('disburses net payout to creator and assigns live bank NEFT reference upon deliverable approval', async () => {
    const grossAmount = 100000;
    const lockedTx = await PaymentService.lockMilestoneFunds({
      brandId: 'demo-brand-user-id',
      creatorId: 'cr-101',
      campaignId: 'camp-qa-2',
      campaignTitle: '4K Long-Distance Review',
      creatorName: 'Aarav Sharma',
      creatorHandle: '@aarav.fitness',
      grossAmount,
      milestoneStage: 2,
      milestoneTitle: 'Draft Video Approval',
    });

    const disbursedTx = await PaymentService.disbursePayout(lockedTx.id);
    assert.equal(disbursedTx.status, 'DISBURSED');
    assert.equal(disbursedTx.netCreatorPayout, 94000); // 100,000 - 5,000 (5%) - 1,000 (1% TDS)
    assert.ok(disbursedTx.utrNumber.startsWith('NEFT'));
  });

  it('verifies live Razorpay payment HMAC signatures correctly', () => {
    const orderId = 'order_DA29104829148';
    const paymentId = 'pay_98219482914';
    const keySecret = 'YvHSA69PHkq4SvDj1Fr8VmuN';

    const text = `${orderId}|${paymentId}`;
    const validSignature = crypto
      .createHmac('sha256', keySecret)
      .update(text)
      .digest('hex');

    const isValid = verifyPaymentSignature({
      orderId,
      paymentId,
      signature: validSignature,
    });
    assert.equal(isValid, true);

    const isInvalid = verifyPaymentSignature({
      orderId,
      paymentId,
      signature: 'fake_tampered_signature_123',
    });
    assert.equal(isInvalid, false);
  });

  it('verifies live Razorpay Webhook HMAC signatures correctly', () => {
    const rawPayload = JSON.stringify({ event: 'payment.captured', amount: 500000 });
    const webhookSecret = '3ef54778bead13e6398b16e4db45389658cd96a6be26f582c0fa0f5b84293f0b';

    const validWebhookSig = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawPayload)
      .digest('hex');

    const isWebhookValid = verifyWebhookSignature(rawPayload, validWebhookSig);
    assert.equal(isWebhookValid, true);

    const isWebhookInvalid = verifyWebhookSignature(rawPayload, 'invalid_sig');
    assert.equal(isWebhookInvalid, false);
  });
});
