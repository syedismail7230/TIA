// ===================================================
// TIA WEBHOOK - E-COMMERCE SALES ATTRIBUTION API
// Ingests orders from Shopify, WooCommerce, and Custom E-commerce sites
// ===================================================

import { NextResponse } from 'next/server';
import { AffiliateAttributionService } from '@/lib/finance/affiliate';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, promoCode, discountCode, orderTotal, total_price, currency = 'INR', customerEmail } = body;

    const finalCode = promoCode || discountCode || body.code;
    const finalAmount = Number(orderTotal || total_price || 0);

    if (!finalCode || !finalAmount) {
      return NextResponse.json(
        { success: false, error: 'Valid promo code and order total are required for attribution.' },
        { status: 400 }
      );
    }

    const attribution = AffiliateAttributionService.attributeOrder({
      orderId: String(orderId || `ord_${Date.now()}`),
      promoCode: String(finalCode),
      orderTotal: finalAmount,
      currency: String(currency),
      customerEmail: customerEmail ? String(customerEmail) : undefined,
      timestamp: new Date().toISOString(),
    });

    if (!attribution.matched) {
      return NextResponse.json({
        success: false,
        message: `Promo code ${finalCode} is not linked to an active TIA creator campaign.`,
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Order successfully attributed to creator ${attribution.codeRecord?.creatorName}.`,
      commissionEarned: attribution.commissionEarned,
      creatorId: attribution.codeRecord?.creatorId,
      campaignTitle: attribution.codeRecord?.campaignTitle,
      totalGmvToDate: attribution.codeRecord?.totalGmv,
    });
  } catch (error: any) {
    console.error('Affiliate Attribution Webhook Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to attribute order' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const campaignId = searchParams.get('campaignId');
  const creatorId = searchParams.get('creatorId');

  if (campaignId) {
    const codes = AffiliateAttributionService.getCodesForCampaign(campaignId);
    return NextResponse.json({ success: true, codes });
  }

  if (creatorId) {
    const codes = AffiliateAttributionService.getCodesForCreator(creatorId);
    return NextResponse.json({ success: true, codes });
  }

  return NextResponse.json({ success: false, error: 'Provide campaignId or creatorId query param' }, { status: 400 });
}

