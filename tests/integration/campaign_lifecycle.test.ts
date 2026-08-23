import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import prisma from '../../src/lib/db/prisma';
import { recordEscrowDeposit, recordEscrowRelease } from '../../src/lib/finance/ledger';

describe('TIA End-to-End Campaign Lifecycle & Escrow Settlement', () => {
  let orgId: string;
  let brandUserId: string;
  let creatorUserId: string;
  let creatorId: string;
  let campaignId: string;
  let contractId: string;

  before(async () => {
    // 1. Create Brand User & Org
    const brandUser = await prisma.user.create({
      data: {
        email: `brand_${Date.now()}@enterprise.com`,
        passwordHash: 'hashed_password',
        name: 'Enterprise Brand Admin',
        role: 'BRAND_ADMIN',
      },
    });
    brandUserId = brandUser.id;

    const org = await prisma.organization.create({
      data: {
        name: 'Acme Global Corp',
        businessCategory: 'Technology',
        verificationStatus: 'VERIFIED',
      },
    });
    orgId = org.id;

    await prisma.organizationMember.create({
      data: { organizationId: org.id, userId: brandUser.id, role: 'OWNER' },
    });

    // 2. Create Creator User & Profile
    const creatorUser = await prisma.user.create({
      data: {
        email: `creator_${Date.now()}@talent.com`,
        passwordHash: 'hashed_password',
        name: 'Jordan Tech Creator',
        role: 'CREATOR',
      },
    });
    creatorUserId = creatorUser.id;

    const creator = await prisma.creator.create({
      data: {
        userId: creatorUser.id,
        displayName: 'Jordan Tech',
        username: `jordan_${Date.now()}`,
        verificationStatus: 'VERIFIED_CREATOR',
        intelligenceScore: 92,
        reputationScore: 98,
        brandSafetyScore: 99,
      },
    });
    creatorId = creator.id;
  });

  after(async () => {
    // Clean up
    await prisma.$disconnect();
  });

  it('completes the entire closed-loop campaign lifecycle with verified ledger math', async () => {
    // 1. Brand Creates Campaign
    const campaign = await prisma.campaign.create({
      data: {
        organizationId: orgId,
        title: 'Enterprise Cloud Developer Campaign',
        description: 'Publish 1x technical video breakdown.',
        objective: 'AWARENESS',
        category: 'Technology',
        budget: 5000000, // 50,000 INR in paise
        currency: 'INR',
        status: 'ACCEPTING_APPLICATIONS',
      },
    });
    campaignId = campaign.id;
    assert.ok(campaign.id);
    assert.equal(campaign.status, 'ACCEPTING_APPLICATIONS');

    // 2. Creator Submits Application
    const application = await prisma.campaignApplication.create({
      data: {
        campaignId,
        creatorId,
        proposedPrice: 5000000,
        pitch: 'I have an active audience of software engineers and will deliver a high-quality reel.',
        status: 'SUBMITTED',
      },
    });
    assert.equal(application.status, 'SUBMITTED');

    // 3. Counter-Offer Negotiation & Contract Generation
    const agreedAmountMinor = 5000000;
    const commissionRate = 5.0;
    const commissionAmountMinor = Math.round((agreedAmountMinor * commissionRate) / 100); // 250,000 paise (2,500 INR)
    const creatorAllocationMinor = agreedAmountMinor - commissionAmountMinor; // 4,750,000 paise (47,500 INR)

    const contract = await prisma.campaignContract.create({
      data: {
        campaignId,
        organizationId: orgId,
        creatorId,
        agreedAmount: agreedAmountMinor,
        commissionRate,
        commissionAmount: commissionAmountMinor,
        creatorAllocationAmount: creatorAllocationMinor,
        deliverables: JSON.stringify(['1x Tech Video']),
        status: 'SIGNED',
        brandSignedAt: new Date(),
        creatorSignedAt: new Date(),
      },
    });
    contractId = contract.id;
    assert.equal(contract.commissionAmount, 250000);
    assert.equal(contract.creatorAllocationAmount, 4750000);

    // 4. Fund Campaign into Escrow Ledger
    const depositTx = await recordEscrowDeposit({
      organizationId: orgId,
      creatorId,
      campaignId,
      contractId,
      grossAmountMinor: agreedAmountMinor,
      currency: 'INR',
    });

    assert.equal(depositTx.status, 'HELD_IN_ESCROW');
    assert.equal(depositTx.grossAmount, 5000000);
    assert.equal(depositTx.commissionAmount, 250000);

    // 5. Deliverable Submission & Approval
    const deliverable = await prisma.campaignDeliverable.create({
      data: {
        campaignId,
        contractId,
        creatorId,
        title: 'Final Tech Video',
        type: 'VIDEO',
        platform: 'YOUTUBE',
        status: 'PENDING',
      },
    });

    const submission = await prisma.contentSubmission.create({
      data: {
        deliverableId: deliverable.id,
        version: 1,
        fileUrl: 'https://storage.tia.internal/deliverables/final_cut.mp4',
        fileName: 'final_cut.mp4',
        status: 'APPROVED',
      },
    });

    assert.equal(submission.status, 'APPROVED');

    // 6. Release Escrow & Complete Campaign
    const releaseTx = await recordEscrowRelease({
      organizationId: orgId,
      creatorId,
      campaignId,
      contractId,
      grossAmountMinor: agreedAmountMinor,
    });

    assert.equal(releaseTx.status, 'SETTLED');
    assert.equal(releaseTx.grossAmount, 5000000);
    assert.equal(releaseTx.commissionAmount, 250000); // Exactly 5%
    assert.equal(releaseTx.netAmount, 4750000); // Exactly 95%

    // 7. Verify Payout & Invoice Records
    const payout = await prisma.payoutRecord.findUnique({
      where: { transactionId: releaseTx.id },
    });
    assert.ok(payout);
    assert.equal(payout.amount, 4750000);
    assert.equal(payout.status, 'SCHEDULED');

    const invoice = await prisma.invoice.findUnique({
      where: { transactionId: releaseTx.id },
    });
    assert.ok(invoice);
    assert.equal(invoice.totalAmount, 5000000);
    assert.equal(invoice.commissionAmount, 250000);
    assert.equal(invoice.netAmount, 4750000);
  });
});
