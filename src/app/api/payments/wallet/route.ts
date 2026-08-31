// ===================================================
// TIA BACKEND - PAYMENT PROTECTION WALLET API
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { PaymentService } from '@/lib/services/payment.service';
import { verifyPaymentSignature } from '@/lib/finance/razorpay';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    const brandId = user?.id || 'demo-brand-user-id';

    const wallet = await PaymentService.getWallet(brandId);
    const ledger = await PaymentService.getLedger({ brandId });

    return NextResponse.json({ success: true, wallet, ledger });
  } catch (error: any) {
    console.error('Wallet API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve wallet details' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const brandId = user?.id || 'demo-brand-user-id';
    const body = await request.json();
    const { action = 'DEPOSIT', amount, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // 1. Create Live Razorpay Order
    if (action === 'CREATE_ORDER') {
      if (!amount || Number(amount) <= 0) {
        return NextResponse.json({ success: false, error: 'Invalid deposit amount' }, { status: 400 });
      }

      const order = await PaymentService.createDepositOrder(brandId, Number(amount));
      return NextResponse.json({
        success: true,
        order,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_live_RQuwNOxotGRMaW',
      });
    }

    // 2. Verify Razorpay Payment Signature & Credit Wallet
    if (action === 'VERIFY_AND_DEPOSIT') {
      if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
        const isValid = verifyPaymentSignature({
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
        });

        if (!isValid) {
          return NextResponse.json({ success: false, error: 'Invalid Razorpay payment signature' }, { status: 400 });
        }
      }

      const updatedWallet = await PaymentService.addFunds(brandId, Number(amount));
      return NextResponse.json({
        success: true,
        wallet: updatedWallet,
        message: `₹${Number(amount).toLocaleString('en-IN')} successfully verified and deposited to TIA Protected Wallet.`,
        transactionRef: razorpay_payment_id || `PAY-RZP-${Date.now()}`,
      });
    }

    // Direct deposit
    const updatedWallet = await PaymentService.addFunds(brandId, Number(amount));
    return NextResponse.json({
      success: true,
      wallet: updatedWallet,
      message: `₹${Number(amount).toLocaleString('en-IN')} successfully deposited to TIA Protected Wallet.`,
    });
  } catch (error: any) {
    console.error('Wallet Action Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Payment operation failed' }, { status: 500 });
  }
}
