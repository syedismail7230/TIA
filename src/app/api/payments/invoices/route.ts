// ===================================================
// TIA BACKEND - GST INVOICES API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { InvoiceService } from '@/lib/services/invoice.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const brandId = user?.id || 'demo-brand-user-id';
    const { searchParams } = new URL(request.url);
    const invoiceId = searchParams.get('id');

    if (invoiceId) {
      const invoice = await InvoiceService.getById(invoiceId);
      if (!invoice) {
        return NextResponse.json({ success: false, error: 'Invoice not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, invoice });
    }

    const invoices = await InvoiceService.listForBrand(brandId);
    return NextResponse.json({ success: true, invoices });
  } catch (error: any) {
    console.error('Fetch Invoices Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve GST invoices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const brandId = user?.id || 'demo-brand-user-id';
    const body = await request.json();
    const {
      brandLegalName,
      brandGstin,
      brandAddress,
      campaignTitle,
      transactionId,
      grossCampaignAmount,
      isInterState = false,
    } = body;

    if (!campaignTitle || !transactionId || !grossCampaignAmount) {
      return NextResponse.json({ success: false, error: 'Missing invoice generation parameters' }, { status: 400 });
    }

    const invoice = await InvoiceService.generate({
      brandId,
      brandLegalName: brandLegalName || 'Nike India Private Limited',
      brandGstin: brandGstin || '29AABCN1234F1Z5',
      brandAddress: brandAddress || 'Bengaluru, Karnataka, India',
      campaignTitle,
      transactionId,
      grossCampaignAmount: Number(grossCampaignAmount),
      isInterState: Boolean(isInterState),
    });

    return NextResponse.json({ success: true, invoice });
  } catch (error: any) {
    console.error('Generate Invoice Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to generate GST invoice' }, { status: 500 });
  }
}
