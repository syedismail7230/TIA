import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateFinancialBreakdown } from '../../src/lib/finance/ledger';

describe('TIA Financial Ledger & 5% Commission Engine', () => {
  it('correctly calculates 5% platform commission and 95% creator allocation in minor units', () => {
    // 100,000 INR = 10,000,000 paise
    const grossMinor = 10000000;
    const result = calculateFinancialBreakdown(grossMinor, 5.0);

    assert.equal(result.grossAmount, 10000000);
    assert.equal(result.commissionRate, 5.0);
    assert.equal(result.commissionAmount, 500000); // 5,000 INR
    assert.equal(result.creatorAllocation, 9500000); // 95,000 INR
    assert.equal(result.netPayout, 9500000);
  });

  it('prevents floating point inaccuracies on fractional amounts using integer rounding', () => {
    // 33,333.33 INR = 3,333,333 paise
    const grossMinor = 3333333;
    const result = calculateFinancialBreakdown(grossMinor, 5.0);

    assert.equal(result.commissionAmount, 166667); // Math.round(3333333 * 0.05)
    assert.equal(result.creatorAllocation, 3166666);
    assert.equal(result.commissionAmount + result.creatorAllocation, grossMinor);
  });

  it('deducts processing fees and taxes accurately from creator allocation', () => {
    const grossMinor = 10000000;
    const processingFeeMinor = 20000; // 200 INR
    const taxMinor = 50000; // 500 INR
    const result = calculateFinancialBreakdown(grossMinor, 5.0, processingFeeMinor, taxMinor);

    assert.equal(result.grossAmount, 10000000);
    assert.equal(result.commissionAmount, 500000);
    assert.equal(result.creatorAllocation, 9500000);
    assert.equal(result.netPayout, 9430000); // 9500000 - 20000 - 50000
  });

  it('throws an error if gross amount is negative', () => {
    assert.throws(() => calculateFinancialBreakdown(-1000, 5.0), {
      message: 'Gross amount must be non-negative',
    });
  });
});
