// ===================================================
// TIA BACKEND - PAYMENT PROTECTION WALLET API
// Secured with Rate Limiting, Zod Validation, Financial Idempotency & Centralized Error Handling
// ===================================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { PaymentService } from '@/lib/services/payment.service';
import { verifyPaymentSignature } from '@/lib/finance/razorpay';
import { handleApiError, AuthenticationError, ValidationError } from '@/lib/errors/api-error';
import { enforceRateLimit, getClientIp, RATE_LIMIT_TIERS } from '@/lib/security/rate-limiter';
import { IdempotencyEngine } from '@/lib/security/idempotency';
import { validateRequest, createWalletOrderSchema, verifyWalletDepositSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new AuthenticationError('Authentication required to view wallet balances');
    }

    // Rate limiting per user
    await enforceRateLimit(user.id || getClientIp(request), RATE_LIMIT_TIERS.PAYMENT);

    const brandId = user.id;
    const wallet = await PaymentService.getWallet(brandId);
    const ledger = await PaymentService.getLedger({ brandId });

    return NextResponse.json({ success: true, wallet, ledger });
  } catch (error) {
    return handleApiError(error, 'GET /api/payments/wallet');
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new AuthenticationError('Authentication required to perform wallet transactions');
    }

    // 1. Rate Limiting (20 payment operations/min per user)
    await enforceRateLimit(user.id || getClientIp(request), RATE_LIMIT_TIERS.PAYMENT);

    const brandId = user.id;
    const rawBody = await request.json();

    // 2. Financial Idempotency Check
    const idempotencyKey = IdempotencyEngine.extractKey(request, rawBody);
    if (idempotencyKey) {
      const cached = await IdempotencyEngine.getCompletedOperation(idempotencyKey);
      if (cached) {
        return NextResponse.json(cached);
      }
    }

    const { action } = rawBody;

    // 3. Action 1: Create Live Razorpay Order
    if (action === 'CREATE_ORDER') {
      const validated = validateRequest(createWalletOrderSchema, rawBody);
      const order = await PaymentService.createDepositOrder(brandId, validated.amount);

      return NextResponse.json({
        success: true,
        order,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_live_RQuwNOxotGRMaW',
      });
    }

    // 4. Action 2: Verify Razorpay Payment Signature & Credit Wallet
    if (action === 'VERIFY_AND_DEPOSIT') {
      const validated = validateRequest(verifyWalletDepositSchema, rawBody);

      const isValid = verifyPaymentSignature({
        orderId: validated.razorpay_order_id,
        paymentId: validated.razorpay_payment_id,
        signature: validated.razorpay_signature,
      });

      if (!isValid) {
        throw new ValidationError('Invalid Razorpay payment cryptographic signature');
      }

      const updatedWallet = await PaymentService.addFunds(brandId, validated.amount);
      const responseData = {
        success: true,
        wallet: updatedWallet,
        message: `₹${Number(validated.amount).toLocaleString('en-IN')} successfully verified and deposited to TIA Protected Wallet.`,
        transactionRef: validated.razorpay_payment_id,
      };

      // Record in Idempotency Engine so replays are protected
      const effectiveKey = idempotencyKey || `rzp_${validated.razorpay_payment_id}`;
      IdempotencyEngine.recordOperation(effectiveKey, responseData);

      return NextResponse.json(responseData);
    }

    throw new ValidationError('Invalid action. Only CREATE_ORDER and VERIFY_AND_DEPOSIT are allowed.');
  } catch (error) {
    return handleApiError(error, 'POST /api/payments/wallet');
  }
}
