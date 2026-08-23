import prisma from '@/lib/db/prisma';

export interface CommissionBreakdown {
  grossAmount: number; // Minor currency units (e.g. paise / cents)
  commissionRate: number; // e.g. 5.00
  commissionAmount: number; // Minor units (gross * rate / 100)
  creatorAllocation: number; // Minor units (gross - commissionAmount)
  paymentProcessingFee: number;
  taxAmount: number;
  netPayout: number;
}

export async function getActiveCommissionRate(): Promise<number> {
  const config = await prisma.commissionConfig.findFirst({
    where: { active: true, isDefault: true },
  });
  return config ? config.defaultRate : 5.0;
}

/**
 * Deterministic integer arithmetic for commission calculation.
 * Prevents floating point inaccuracy by rounding exact minor currency units.
 */
export function calculateFinancialBreakdown(
  grossAmountMinor: number,
  commissionRate: number = 5.0,
  processingFeeMinor: number = 0,
  taxMinor: number = 0
): CommissionBreakdown {
  if (grossAmountMinor < 0) {
    throw new Error('Gross amount must be non-negative');
  }

  // Exact integer math: (gross * rate) / 100
  const commissionAmount = Math.round((grossAmountMinor * commissionRate) / 100);
  const creatorAllocation = grossAmountMinor - commissionAmount;
  const netPayout = Math.max(0, creatorAllocation - processingFeeMinor - taxMinor);

  return {
    grossAmount: grossAmountMinor,
    commissionRate,
    commissionAmount,
    creatorAllocation,
    paymentProcessingFee: processingFeeMinor,
    taxAmount: taxMinor,
    netPayout,
  };
}

/**
 * Records an immutable Escrow Deposit transaction when a campaign is funded.
 */
export async function recordEscrowDeposit(params: {
  organizationId: string;
  creatorId: string;
  campaignId: string;
  contractId: string;
  grossAmountMinor: number;
  currency?: string;
  providerTransactionId?: string;
  paymentProvider?: string;
}) {
  const commissionRate = await getActiveCommissionRate();
  const breakdown = calculateFinancialBreakdown(params.grossAmountMinor, commissionRate);

  return prisma.transaction.create({
    data: {
      organizationId: params.organizationId,
      creatorId: params.creatorId,
      campaignId: params.campaignId,
      contractId: params.contractId,
      transactionType: 'ESCROW_DEPOSIT',
      grossAmount: breakdown.grossAmount,
      commissionRate: breakdown.commissionRate,
      commissionAmount: breakdown.commissionAmount,
      creatorAllocationAmount: breakdown.creatorAllocation,
      paymentProcessingFee: breakdown.paymentProcessingFee,
      taxAmount: breakdown.taxAmount,
      netAmount: breakdown.netPayout,
      currency: params.currency || 'INR',
      paymentProvider: params.paymentProvider || 'INTERNAL_LEDGER',
      providerTransactionId: params.providerTransactionId,
      status: 'HELD_IN_ESCROW',
    },
  });
}

/**
 * Records an immutable Escrow Release and generates creator payout upon campaign completion.
 */
export async function recordEscrowRelease(params: {
  organizationId: string;
  creatorId: string;
  campaignId: string;
  contractId: string;
  grossAmountMinor: number;
  currency?: string;
}) {
  const commissionRate = await getActiveCommissionRate();
  const breakdown = calculateFinancialBreakdown(params.grossAmountMinor, commissionRate);

  return prisma.$transaction(async (tx) => {
    // 1. Record Escrow Settlement
    const transaction = await tx.transaction.create({
      data: {
        organizationId: params.organizationId,
        creatorId: params.creatorId,
        campaignId: params.campaignId,
        contractId: params.contractId,
        transactionType: 'ESCROW_RELEASE',
        grossAmount: breakdown.grossAmount,
        commissionRate: breakdown.commissionRate,
        commissionAmount: breakdown.commissionAmount,
        creatorAllocationAmount: breakdown.creatorAllocation,
        paymentProcessingFee: breakdown.paymentProcessingFee,
        taxAmount: breakdown.taxAmount,
        netAmount: breakdown.netPayout,
        currency: params.currency || 'INR',
        paymentProvider: 'INTERNAL_LEDGER',
        status: 'SETTLED',
      },
    });

    // 2. Schedule Creator Payout Record
    await tx.payoutRecord.create({
      data: {
        creatorId: params.creatorId,
        transactionId: transaction.id,
        amount: breakdown.netPayout,
        currency: params.currency || 'INR',
        payoutMethod: 'BANK_TRANSFER',
        status: 'SCHEDULED',
      },
    });

    // 3. Generate Official VAT/GST Tax Invoice
    const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
    await tx.invoice.create({
      data: {
        transactionId: transaction.id,
        invoiceNumber,
        issuedToOrgId: params.organizationId,
        issuedToCreatorId: params.creatorId,
        totalAmount: breakdown.grossAmount,
        commissionAmount: breakdown.commissionAmount,
        netAmount: breakdown.netPayout,
        currency: params.currency || 'INR',
        status: 'PAID',
      },
    });

    return transaction;
  });
}
