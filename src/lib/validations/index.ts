// ===================================================
// TIA BACKEND - DOMAIN VALIDATION SCHEMAS (ZOD)
// Strict request validation for all mutating operations
// ===================================================

import { z } from 'zod';
import { ValidationError } from '@/lib/errors/api-error';

// ---------------------------------------------------
// 1. AUTHENTICATION SCHEMAS
// ---------------------------------------------------

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long'),
});

export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Full name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  role: z.enum(['CREATOR', 'BRAND_USER', 'BRAND_ADMIN'], {
    required_error: 'Account role is required (CREATOR, BRAND_USER, or BRAND_ADMIN)',
  }),
  phone: z
    .string()
    .optional()
    .transform((val) => (val ? val.replace(/[^0-9+]/g, '') : undefined)),
});

export const otpSendSchema = z.object({
  identifier: z
    .string({ required_error: 'Identifier (email or phone) is required' })
    .min(3, 'Invalid identifier length')
    .trim(),
  channel: z.enum(['EMAIL', 'SMS', 'WHATSAPP']).default('EMAIL'),
});

export const otpVerifySchema = z.object({
  identifier: z
    .string({ required_error: 'Identifier is required' })
    .trim(),
  otp: z
    .string({ required_error: 'OTP code is required' })
    .min(4, 'OTP must be at least 4 digits')
    .max(8, 'OTP cannot exceed 8 digits')
    .trim(),
});

// ---------------------------------------------------
// 2. FINANCIAL & WALLET SCHEMAS
// ---------------------------------------------------

export const createWalletOrderSchema = z.object({
  action: z.literal('CREATE_ORDER'),
  amount: z
    .number({ required_error: 'Deposit amount is required' })
    .positive('Deposit amount must be greater than zero')
    .min(1, 'Minimum deposit is ₹1')
    .max(10000000, 'Deposit exceeds maximum single transaction limit of ₹1,00,00,000'),
  currency: z.enum(['INR', 'USD']).default('INR'),
});

export const verifyWalletDepositSchema = z.object({
  action: z.literal('VERIFY_AND_DEPOSIT'),
  amount: z
    .number({ required_error: 'Deposit amount is required' })
    .positive('Deposit amount must be greater than zero'),
  razorpay_order_id: z
    .string({ required_error: 'Razorpay order ID is required' })
    .min(5, 'Invalid Razorpay order ID'),
  razorpay_payment_id: z
    .string({ required_error: 'Razorpay payment ID is required' })
    .min(5, 'Invalid Razorpay payment ID'),
  razorpay_signature: z
    .string({ required_error: 'Razorpay signature is required' })
    .min(10, 'Invalid Razorpay payment signature'),
  idempotency_key: z.string().optional(),
});

export const walletActionSchema = z.discriminatedUnion('action', [
  createWalletOrderSchema,
  verifyWalletDepositSchema,
]);

// ---------------------------------------------------
// 3. CAMPAIGN SCHEMAS
// ---------------------------------------------------

export const createCampaignSchema = z.object({
  title: z
    .string({ required_error: 'Campaign title is required' })
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title cannot exceed 200 characters')
    .trim(),
  category: z
    .string({ required_error: 'Campaign category is required' })
    .min(2, 'Category is required')
    .trim(),
  budget: z
    .number({ required_error: 'Budget is required' })
    .min(100, 'Budget must be at least ₹100')
    .max(50000000, 'Budget exceeds allowed maximum'),
  deliverables: z
    .string({ required_error: 'Deliverables summary is required' })
    .min(3, 'Deliverables must be specified'),
  objectives: z.string().optional(),
  targetGeographies: z.array(z.string()).optional(),
  requiredPlatforms: z.array(z.string()).optional(),
});

// ---------------------------------------------------
// 4. CONTRACT SCHEMAS
// ---------------------------------------------------

export const createContractSchema = z.object({
  campaignId: z.string({ required_error: 'Campaign ID is required' }).uuid('Invalid Campaign ID format'),
  creatorId: z.string({ required_error: 'Creator ID is required' }),
  agreedAmount: z
    .number({ required_error: 'Agreed contract amount is required' })
    .positive('Agreed amount must be greater than zero'),
  deliverableScope: z.string().min(5, 'Deliverable scope must be at least 5 characters'),
  milestoneStagesCount: z.number().int().min(1).max(10).default(3),
  revisionRoundsAllowed: z.number().int().min(1).max(5).default(2),
  slaAutoApprovalHours: z.number().int().min(24).max(168).default(72),
});

export const signContractSchema = z.object({
  contractId: z.string({ required_error: 'Contract ID is required' }),
  role: z.enum(['BRAND', 'CREATOR'], {
    required_error: 'Signing party role must be BRAND or CREATOR',
  }),
});

// ---------------------------------------------------
// 5. DELIVERABLE SUBMISSION SCHEMAS
// ---------------------------------------------------

export const createSubmissionSchema = z.object({
  campaignId: z.string({ required_error: 'Campaign ID is required' }),
  campaignTitle: z.string().default('Campaign Deliverable'),
  collabId: z.string().default('collab-active'),
  creatorId: z.string({ required_error: 'Creator ID is required' }),
  creatorName: z.string().default('Creator'),
  brandId: z.string({ required_error: 'Brand ID is required' }),
  deliverableType: z.enum(['DRAFT_VIDEO', 'SCRIPT', 'LIVE_POST']).default('DRAFT_VIDEO'),
  title: z
    .string({ required_error: 'Submission title is required' })
    .min(3, 'Title must be at least 3 characters')
    .max(250),
  assetUrl: z
    .string({ required_error: 'Asset URL is required' })
    .url('Please provide a valid URL for the deliverable asset'),
  previewThumbnailUrl: z.string().url().optional(),
  notes: z.string().max(2000).optional(),
  milestoneStage: z.number().int().min(1).default(1),
  payoutTransactionId: z.string().optional(),
});

export const reviewSubmissionSchema = z.object({
  submissionId: z.string({ required_error: 'Submission ID is required' }),
  text: z
    .string({ required_error: 'Review feedback is required' })
    .min(2, 'Review feedback must be at least 2 characters')
    .max(2000),
  timestampLabel: z.string().optional(),
  requestRevision: z.boolean().default(false),
});

// ---------------------------------------------------
// 6. DISPUTE SCHEMAS
// ---------------------------------------------------

export const createDisputeSchema = z.object({
  campaignId: z.string({ required_error: 'Campaign ID is required' }),
  campaignTitle: z.string().default('Campaign Dispute'),
  collabId: z.string().default(''),
  initiatorRole: z.enum(['BRAND', 'CREATOR'], {
    required_error: 'Initiator role must be BRAND or CREATOR',
  }),
  reason: z
    .string({ required_error: 'Dispute reason is required' })
    .min(5, 'Reason must be at least 5 characters'),
  disputedAmount: z
    .number({ required_error: 'Disputed amount is required' })
    .min(0, 'Disputed amount cannot be negative'),
  evidenceNotes: z
    .string({ required_error: 'Evidence notes are required' })
    .min(10, 'Please provide detailed evidence notes (minimum 10 characters)'),
  evidenceAttachments: z.array(z.string().url()).optional(),
});

// ---------------------------------------------------
// 7. MESSAGING SCHEMAS
// ---------------------------------------------------

export const sendMessageSchema = z.object({
  threadId: z.string({ required_error: 'Thread ID is required' }),
  text: z
    .string({ required_error: 'Message content is required' })
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message cannot exceed 5000 characters')
    .trim(),
  attachmentUrl: z.string().url().optional(),
});

// ---------------------------------------------------
// VALIDATION HELPER FUNCTION
// ---------------------------------------------------

/**
 * Validates arbitrary input against a Zod schema.
 * Throws a formatted ValidationError if parsing fails.
 */
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
}
