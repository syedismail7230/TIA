// ===================================================
// SEED 4 DEMO ACCOUNTS VIA FULL ONBOARDING FLOW
// ===================================================

import bcrypt from 'bcryptjs';
import { saveStoredUser, getStoredUserByEmail } from '../src/lib/auth/local-auth-store';
import { EmailVerificationService } from '../src/lib/services/email-verification.service';

interface DemoAccountConfig {
  email: string;
  password: string;
  name: string;
  role: 'CREATOR' | 'BRAND_ADMIN';
  phone: string;
  gender: string;
  age: number;
  country: string;
  organizationName?: string;
  businessCategory?: string;
  socials?: {
    instagram?: { handle: string; audience: string; verified: boolean };
    youtube?: { handle: string; audience: string; verified: boolean };
    tiktok?: { handle: string; audience: string; verified: boolean };
    twitter?: { handle: string; audience: string; verified: boolean };
  };
}

const DEMO_ACCOUNTS: DemoAccountConfig[] = [
  {
    email: 'kabir.tech@tia.agency',
    password: 'Password@123',
    name: 'Kabir Sharma',
    role: 'CREATOR',
    phone: '+91 9876543211',
    gender: 'Male',
    age: 26,
    country: 'India',
    socials: {
      youtube: { handle: '@KabirTechReviews', audience: '650,000 Subscribers', verified: true },
      instagram: { handle: '@kabir.sharma', audience: '420,000 Followers', verified: true },
      twitter: { handle: '@kabir_tech', audience: '95,000 Followers', verified: true },
    },
  },
  {
    email: 'ananya.vogue@tia.agency',
    password: 'Password@123',
    name: 'Ananya Roy',
    role: 'CREATOR',
    phone: '+91 9876543212',
    gender: 'Female',
    age: 24,
    country: 'India',
    socials: {
      instagram: { handle: '@ananya.vogue', audience: '890,000 Followers', verified: true },
      tiktok: { handle: '@ananyaroy', audience: '1,200,000 Followers', verified: true },
    },
  },
  {
    email: 'rohan.pulse@tia.agency',
    password: 'Password@123',
    name: 'Rohan Mehta',
    role: 'BRAND_ADMIN',
    phone: '+91 9876543213',
    gender: 'Male',
    age: 32,
    country: 'India',
    organizationName: 'Pulse Audio Global',
    businessCategory: 'Consumer Electronics & Audio',
  },
  {
    email: 'priya.zest@tia.agency',
    password: 'Password@123',
    name: 'Priya Patel',
    role: 'BRAND_ADMIN',
    phone: '+91 9876543214',
    gender: 'Female',
    age: 29,
    country: 'India',
    organizationName: 'Zest Nutrition Labs',
    businessCategory: 'Health, Wellness & D2C FMCG',
  },
];

async function seedDemoAccounts() {
  console.log('🚀 Seeding 4 Demo Accounts for TIA Platform...\n');

  for (const acc of DEMO_ACCOUNTS) {
    const passwordHash = bcrypt.hashSync(acc.password, 10);
    const userId = `demo_${acc.role.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    // 1. Save user in local auth store for instant authentication
    saveStoredUser({
      id: userId,
      email: acc.email,
      passwordHash,
      name: acc.name,
      role: acc.role,
      phone: acc.phone,
      gender: acc.gender,
      age: acc.age,
      country: acc.country,
      createdAt: new Date().toISOString(),
    });

    // 2. Generate email verification token & dispatch email
    let token = '';
    try {
      const emailResult = await EmailVerificationService.sendVerificationEmail({
        email: acc.email,
        name: acc.name,
        userId,
        role: acc.role,
      });
      token = emailResult.token;
    } catch (e: any) {
      console.warn(`Email verification note for ${acc.email}:`, e.message);
    }

    console.log(`✅ [${acc.role}] Account Created:`);
    console.log(`   • Name:     ${acc.name}`);
    console.log(`   • Email:    ${acc.email}`);
    console.log(`   • Password: ${acc.password}`);
    console.log(`   • Phone:    ${acc.phone}`);
    if (acc.organizationName) {
      console.log(`   • Brand Org: ${acc.organizationName} (${acc.businessCategory})`);
    }
    if (acc.socials) {
      console.log(`   • Socials:  ${Object.keys(acc.socials).join(', ')}`);
    }
    if (token) {
      console.log(`   • Verify Link: http://localhost:3000/verify-email?token=${token}&email=${encodeURIComponent(acc.email)}`);
    }
    console.log('');
  }

  console.log('🎉 All 4 demo accounts successfully created and ready to sign in!');
  process.exit(0);
}

seedDemoAccounts().catch((err) => {
  console.error('Seed Error:', err);
  process.exit(1);
});
