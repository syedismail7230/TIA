import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { InvoiceService } from '../../src/lib/services/invoice.service';

describe('TIA Backend - GST Tax Invoice Engine QA Tests', () => {
  it('generates an intra-state GST invoice with 9% CGST + 9% SGST on 5% platform fee', async () => {
    const grossAmount = 50000;
    const invoice = await InvoiceService.generate({
      brandId: 'demo-brand-user-id',
      brandLegalName: 'Nike India Private Limited',
      brandGstin: '29AABCN1234F1Z5',
      brandAddress: 'Prestige Tech Park, Bengaluru, KA',
      campaignTitle: 'Running Series Launch',
      transactionId: 'TX-TIA-98102',
      grossCampaignAmount: grossAmount,
      isInterState: false,
    });

    assert.equal(invoice.sacCode, '998371'); // Advertising & Influencer Facilitation
    assert.equal(invoice.taxableServiceValue, 2500); // 5% of 50,000 = 2,500
    assert.equal(invoice.cgstRate, 9);
    assert.equal(invoice.cgstAmount, 225); // 9% of 2,500 = 225
    assert.equal(invoice.sgstRate, 9);
    assert.equal(invoice.sgstAmount, 225); // 9% of 2,500 = 225
    assert.equal(invoice.igstAmount, 0);
    assert.equal(invoice.totalInvoiceAmount, 2950); // 2500 + 225 + 225 = 2950
    assert.equal(invoice.tdsDeducted194J, 500); // 1% of 50,000 = 500
  });

  it('generates an inter-state GST invoice with 18% IGST on 5% platform fee', async () => {
    const grossAmount = 100000;
    const invoice = await InvoiceService.generate({
      brandId: 'demo-brand-user-id',
      brandLegalName: 'Nike India Private Limited',
      brandGstin: '27AABCN1234F1Z5', // Maharashtra
      brandAddress: 'Bandra Kurla Complex, Mumbai, MH',
      campaignTitle: 'Inter-State Audio Campaign',
      transactionId: 'TX-TIA-98214',
      grossCampaignAmount: grossAmount,
      isInterState: true,
    });

    assert.equal(invoice.taxableServiceValue, 5000); // 5% of 100,000 = 5,000
    assert.equal(invoice.cgstAmount, 0);
    assert.equal(invoice.sgstAmount, 0);
    assert.equal(invoice.igstRate, 18);
    assert.equal(invoice.igstAmount, 900); // 18% of 5,000 = 900
    assert.equal(invoice.totalInvoiceAmount, 5900); // 5000 + 900 = 5900
  });
});
