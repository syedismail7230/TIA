// ===================================================
// TIA BACKEND - GST TAX INVOICE SERVICE
// ===================================================

import fs from 'fs';
import path from 'path';

export interface GstInvoiceRecord {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  brandId: string;
  brandLegalName: string;
  brandGstin: string;
  brandAddress: string;
  campaignTitle: string;
  transactionId: string;
  sacCode: string; // 998371 (Advertising, PR & Influencer Facilitation)
  grossCampaignAmount: number;
  taxableServiceValue: number; // 5% TIA Platform Fee
  cgstRate: number; // 9%
  cgstAmount: number;
  sgstRate: number; // 9%
  sgstAmount: number;
  igstRate: number; // 0% or 18%
  igstAmount: number;
  totalInvoiceAmount: number;
  tdsDeducted194J: number; // 1%
  currency: 'INR';
  status: 'ISSUED' | 'PAID' | 'VOID';
}

const DATA_DIR = path.join(process.cwd(), '.data');
const INVOICES_FILE = path.join(DATA_DIR, 'gst_invoices.json');

const INITIAL_INVOICES: GstInvoiceRecord[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-TIA-2026-00842',
    invoiceDate: new Date('2026-08-28').toISOString(),
    brandId: 'demo-brand-user-id',
    brandLegalName: 'Nike India Private Limited',
    brandGstin: '29AABCN1234F1Z5',
    brandAddress: 'Prestige Tech Park, Marathahalli, Bengaluru, KA 560103',
    campaignTitle: 'Pro Wireless ANC Earbuds Creator Benchmark',
    transactionId: 'TX-TIA-98214',
    sacCode: '998371',
    grossCampaignAmount: 45000,
    taxableServiceValue: 2250,
    cgstRate: 9,
    cgstAmount: 202.5,
    sgstRate: 9,
    sgstAmount: 202.5,
    igstRate: 0,
    igstAmount: 0,
    totalInvoiceAmount: 2655,
    tdsDeducted194J: 450,
    currency: 'INR',
    status: 'PAID',
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-TIA-2026-00791',
    invoiceDate: new Date('2026-08-20').toISOString(),
    brandId: 'demo-brand-user-id',
    brandLegalName: 'Nike India Private Limited',
    brandGstin: '29AABCN1234F1Z5',
    brandAddress: 'Prestige Tech Park, Marathahalli, Bengaluru, KA 560103',
    campaignTitle: 'Lifestyle Audio Ambient Launch',
    transactionId: 'TX-TIA-97840',
    sacCode: '998371',
    grossCampaignAmount: 40000,
    taxableServiceValue: 2000,
    cgstRate: 9,
    cgstAmount: 180,
    sgstRate: 9,
    sgstAmount: 180,
    igstRate: 0,
    igstAmount: 0,
    totalInvoiceAmount: 2360,
    tdsDeducted194J: 400,
    currency: 'INR',
    status: 'PAID',
  },
];

let memoryInvoices: GstInvoiceRecord[] = [...INITIAL_INVOICES];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(INVOICES_FILE)) {
      fs.writeFileSync(INVOICES_FILE, JSON.stringify(INITIAL_INVOICES, null, 2), 'utf-8');
    }
  } catch {}
}

function readInvoices(): GstInvoiceRecord[] {
  ensureDataFile();
  try {
    if (fs.existsSync(INVOICES_FILE)) {
      const raw = fs.readFileSync(INVOICES_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return memoryInvoices;
}

function writeInvoices(invoices: GstInvoiceRecord[]) {
  memoryInvoices = [...invoices];
  try {
    ensureDataFile();
    fs.writeFileSync(INVOICES_FILE, JSON.stringify(invoices, null, 2), 'utf-8');
  } catch {}
}

export class InvoiceService {
  static async listForBrand(brandId: string): Promise<GstInvoiceRecord[]> {
    const list = readInvoices();
    return list
      .filter((i) => i.brandId === brandId)
      .sort((a, b) => new Date(b.invoiceDate).getTime() - new Date(a.invoiceDate).getTime());
  }

  static async getById(id: string): Promise<GstInvoiceRecord | null> {
    const list = readInvoices();
    return list.find((i) => i.id === id || i.invoiceNumber === id) || null;
  }

  static async generate(input: {
    brandId: string;
    brandLegalName: string;
    brandGstin: string;
    brandAddress: string;
    campaignTitle: string;
    transactionId: string;
    grossCampaignAmount: number;
    isInterState?: boolean;
  }): Promise<GstInvoiceRecord> {
    const list = readInvoices();
    const invoiceNum = `INV-TIA-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const taxableServiceValue = Math.round(input.grossCampaignAmount * 0.05); // 5% TIA Platform Fee
    const tdsDeducted194J = Math.round(input.grossCampaignAmount * 0.01); // 1% TDS

    let cgstRate = 9;
    let cgstAmount = Math.round(taxableServiceValue * 0.09 * 100) / 100;
    let sgstRate = 9;
    let sgstAmount = Math.round(taxableServiceValue * 0.09 * 100) / 100;
    let igstRate = 0;
    let igstAmount = 0;

    if (input.isInterState) {
      cgstRate = 0;
      cgstAmount = 0;
      sgstRate = 0;
      sgstAmount = 0;
      igstRate = 18;
      igstAmount = Math.round(taxableServiceValue * 0.18 * 100) / 100;
    }

    const totalInvoiceAmount = taxableServiceValue + cgstAmount + sgstAmount + igstAmount;

    const newInvoice: GstInvoiceRecord = {
      id: `inv-${Date.now()}`,
      invoiceNumber: invoiceNum,
      invoiceDate: new Date().toISOString(),
      brandId: input.brandId,
      brandLegalName: input.brandLegalName,
      brandGstin: input.brandGstin || '29AABCN1234F1Z5',
      brandAddress: input.brandAddress || 'Corporate Office, Bengaluru, India',
      campaignTitle: input.campaignTitle,
      transactionId: input.transactionId,
      sacCode: '998371',
      grossCampaignAmount: input.grossCampaignAmount,
      taxableServiceValue,
      cgstRate,
      cgstAmount,
      sgstRate,
      sgstAmount,
      igstRate,
      igstAmount,
      totalInvoiceAmount,
      tdsDeducted194J,
      currency: 'INR',
      status: 'PAID',
    };

    list.unshift(newInvoice);
    writeInvoices(list);
    return newInvoice;
  }
}
