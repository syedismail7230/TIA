import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ContractService } from '../../src/lib/services/contract.service';

describe('TIA Backend - Contract & Digital Signature Engine QA Tests', () => {
  it('generates a standard Master Services Agreement with deterministic terms', async () => {
    const contract = await ContractService.create({
      campaignId: 'camp-101',
      campaignTitle: 'Summer 2026 Running Series',
      brandId: 'demo-brand-user-id',
      brandName: 'Nike India Private Limited',
      creatorId: 'cr-101',
      creatorName: 'Aarav Sharma',
      agreedAmount: 75000,
      deliverableScope: '1x Dedicated 4K Review (8-10m) + 2x IG Reels',
    });

    assert.ok(contract.id.startsWith('CTR-TIA'));
    assert.equal(contract.agreedAmount, 75000);
    assert.equal(contract.platformCommissionRate, 5.0); // 5%
    assert.equal(contract.tdsRate, 1.0); // 1%
    assert.equal(contract.revisionRoundsAllowed, 2); // 2-round cap
    assert.equal(contract.slaAutoApprovalHours, 72); // 72h SLA
    assert.equal(contract.status, 'PENDING_SIGNATURES');
  });

  it('handles dual-party digital signing and transitions status to ACTIVE when both sign', async () => {
    const contract = await ContractService.create({
      campaignId: 'camp-102',
      campaignTitle: 'ANC Earbuds Launch',
      brandId: 'demo-brand-user-id',
      brandName: 'Nike India Private Limited',
      creatorId: 'cr-101',
      creatorName: 'Aarav Sharma',
      agreedAmount: 45000,
      deliverableScope: '3x Instagram Reels',
    });

    // 1. Brand Signs
    const brandSigned = await ContractService.sign(contract.id, 'BRAND', 'demo-brand-user-id');
    assert.ok(brandSigned?.brandSignedAt);
    assert.equal(brandSigned?.status, 'PENDING_SIGNATURES');

    // 2. Creator Signs -> Status activates
    const creatorSigned = await ContractService.sign(contract.id, 'CREATOR', 'cr-101');
    assert.ok(creatorSigned?.creatorSignedAt);
    assert.equal(creatorSigned?.status, 'ACTIVE');
  });
});
