// ===================================================
// TIA COMMERCE - AFFILIATE & SALES ATTRIBUTION ENGINE
// Upfluence-Grade Promo Code Generation, Tracking & Commission Payouts
// ===================================================

import fs from 'fs';
import path from 'path';

export interface AffiliatePromoCode {
  id: string;
  code: string; // e.g. SARAH20
  creatorId: string;
  creatorName: string;
  campaignId: string;
  campaignTitle: string;
  brandId: string;
  discountPercentage: number; // e.g. 20%
  commissionRate: number; // e.g. 10% on sales
  totalOrders: number;
  totalGmv: number; // Gross Merchandise Value
  accumulatedCommission: number; // Disbursable to Creator
  status: 'ACTIVE' | 'PAUSED' | 'EXPIRED';
  createdAt: string;
}

export interface OrderAttributionEvent {
  orderId: string;
  promoCode: string;
  orderTotal: number;
  currency: string;
  customerEmail?: string;
  timestamp: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const AFFILIATE_FILE = path.join(DATA_DIR, 'affiliate_codes.json');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(AFFILIATE_FILE)) {
    const initialCodes: AffiliatePromoCode[] = [
      {
        id: 'aff-code-1',
        code: 'AARAV20',
        creatorId: 'cr-101',
        creatorName: 'Aarav Sharma',
        campaignId: 'camp-101',
        campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
        brandId: 'demo-brand-user-id',
        discountPercentage: 20,
        commissionRate: 8,
        totalOrders: 34,
        totalGmv: 182400,
        accumulatedCommission: 14592,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(AFFILIATE_FILE, JSON.stringify(initialCodes, null, 2), 'utf-8');
  }
}

function readCodes(): AffiliatePromoCode[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(AFFILIATE_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeCodes(codes: AffiliatePromoCode[]) {
  ensureFile();
  fs.writeFileSync(AFFILIATE_FILE, JSON.stringify(codes, null, 2), 'utf-8');
}

export class AffiliateAttributionService {
  /**
   * Generates a new unique promo code for a creator on a campaign
   */
  static createCode(input: {
    creatorId: string;
    creatorName: string;
    campaignId: string;
    campaignTitle: string;
    brandId: string;
    customCode?: string;
    discountPercentage?: number;
    commissionRate?: number;
  }): AffiliatePromoCode {
    const codes = readCodes();
    const cleanCode = (input.customCode || `${input.creatorName.split(' ')[0]}${input.discountPercentage || 15}`).toUpperCase().replace(/[^A-Z0-9]/g, '');

    const existing = codes.find((c) => c.code === cleanCode);
    if (existing) {
      throw new Error(`Promo code ${cleanCode} is already assigned. Please choose another.`);
    }

    const newCode: AffiliatePromoCode = {
      id: `aff-${Date.now()}`,
      code: cleanCode,
      creatorId: input.creatorId,
      creatorName: input.creatorName,
      campaignId: input.campaignId,
      campaignTitle: input.campaignTitle,
      brandId: input.brandId,
      discountPercentage: input.discountPercentage || 15,
      commissionRate: input.commissionRate || 10,
      totalOrders: 0,
      totalGmv: 0,
      accumulatedCommission: 0,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    codes.push(newCode);
    writeCodes(codes);
    return newCode;
  }

  /**
   * Ingests e-commerce order conversion (Shopify/WooCommerce webhook)
   */
  static attributeOrder(event: OrderAttributionEvent): {
    matched: boolean;
    commissionEarned: number;
    codeRecord?: AffiliatePromoCode;
  } {
    const codes = readCodes();
    const targetCode = event.promoCode.trim().toUpperCase();
    const idx = codes.findIndex((c) => c.code === targetCode && c.status === 'ACTIVE');

    if (idx === -1) {
      return { matched: false, commissionEarned: 0 };
    }

    const matchedRecord = codes[idx];
    const commissionEarned = Math.round((event.orderTotal * (matchedRecord.commissionRate / 100)) * 100) / 100;

    matchedRecord.totalOrders += 1;
    matchedRecord.totalGmv += event.orderTotal;
    matchedRecord.accumulatedCommission += commissionEarned;

    codes[idx] = matchedRecord;
    writeCodes(codes);

    return {
      matched: true,
      commissionEarned,
      codeRecord: matchedRecord,
    };
  }

  /**
   * Retrieves active promo codes by campaign or creator
   */
  static getCodesForCampaign(campaignId: string): AffiliatePromoCode[] {
    const codes = readCodes();
    return codes.filter((c) => c.campaignId === campaignId);
  }

  static getCodesForCreator(creatorId: string): AffiliatePromoCode[] {
    const codes = readCodes();
    return codes.filter((c) => c.creatorId === creatorId);
  }
}
