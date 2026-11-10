import fetch from 'node-fetch';
import prisma from '../src/lib/db/prisma';
import { hashPassword } from '../src/lib/auth/password';
import { saveStoredUser } from '../src/lib/auth/local-auth-store';

const ACCOUNTS = [
  // 5 Brands
  { email: 'brand1@theinfluencers.agency', password: 'brand1@999', name: 'Brand 1', role: 'BRAND_ADMIN', orgName: 'Brand 1 Global' },
  { email: 'brand2@theinfluencers.agency', password: 'brand2@999', name: 'Brand 2', role: 'BRAND_ADMIN', orgName: 'Brand 2 Media' },
  { email: 'brand3@theinfluencers.agency', password: 'brand3@999', name: 'Brand 3', role: 'BRAND_ADMIN', orgName: 'Brand 3 Studios' },
  { email: 'brand4@theinfluencers.agency', password: 'brand4@999', name: 'Brand 4', role: 'BRAND_ADMIN', orgName: 'Brand 4 Collective' },
  { email: 'brand5@theinfluencers.agency', password: 'brand5@999', name: 'Brand 5', role: 'BRAND_ADMIN', orgName: 'Brand 5 Apparel' },

  // 10 Users / Creators
  { email: 'user1@theinfluencers.agency', password: 'user1@999', name: 'User 1', role: 'CREATOR' },
  { email: 'user2@theinfluencers.agency', password: 'user2@999', name: 'User 2', role: 'CREATOR' },
  { email: 'user3@theinfluencers.agency', password: 'user3@999', name: 'User 3', role: 'CREATOR' },
  { email: 'user4@theinfluencers.agency', password: 'user4@999', name: 'User 4', role: 'CREATOR' },
  { email: 'user5@theinfluencers.agency', password: 'user5@999', name: 'User 5', role: 'CREATOR' },
  { email: 'user6@theinfluencers.agency', password: 'user6@999', name: 'User 6', role: 'CREATOR' },
  { email: 'user7@theinfluencers.agency', password: 'user7@999', name: 'User 7', role: 'CREATOR' },
  { email: 'user8@theinfluencers.agency', password: 'user8@999', name: 'User 8', role: 'CREATOR' },
  { email: 'user9@theinfluencers.agency', password: 'user9@999', name: 'User 9', role: 'CREATOR' },
  { email: 'user10@theinfluencers.agency', password: 'user10@999', name: 'User 10', role: 'CREATOR' },
];

async function main() {
  console.log('======================================================================');
  console.log('🚀 PROVISIONING 15 BRAND & CREATOR ACCOUNTS VIA NORMAL SIGNUP FLOW');
  console.log('======================================================================\n');

  const results: any[] = [];

  for (let i = 0; i < ACCOUNTS.length; i++) {
    const acc = ACCOUNTS[i];
    console.log(`[${i + 1}/${ACCOUNTS.length}] Processing signup for: ${acc.email} (${acc.role})...`);

    let registeredViaApi = false;
    let finalUser: any = null;

    try {
      // 1. Attempt normal signup via live API endpoint
      const registerRes = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: acc.email,
          password: acc.password,
          name: acc.name,
          role: acc.role,
          phone: `+91 98765${(10000 + i).toString().slice(1)}`,
          organizationName: acc.orgName,
          gender: 'Not specified',
          age: 25,
          country: 'India',
        }),
      });

      const regData: any = await registerRes.json();

      if (registerRes.status === 201 || registerRes.ok) {
        console.log(`  ✅ Successfully signed up via API (Status: ${registerRes.status})`);
        registeredViaApi = true;
        finalUser = regData.user;
      } else if (registerRes.status === 409) {
        console.log(`  ℹ️ Account already exists. Updating password to: ${acc.password}`);
        const newHash = await hashPassword(acc.password);

        // Update DB password
        const updatedDb = await prisma.user.update({
          where: { email: acc.email.toLowerCase() },
          data: {
            passwordHash: newHash,
            name: acc.name,
            role: acc.role,
          },
        });

        // Update local auth store
        saveStoredUser({
          id: updatedDb.id,
          email: acc.email.toLowerCase(),
          passwordHash: newHash,
          name: acc.name,
          role: acc.role,
          country: 'India',
          createdAt: new Date().toISOString(),
        });

        finalUser = updatedDb;
      } else {
        console.warn(`  ⚠️ Signup API returned: ${registerRes.status}:`, regData);
        // Fallback to direct Prisma + local auth store creation
        const newHash = await hashPassword(acc.password);
        const created = await prisma.user.upsert({
          where: { email: acc.email.toLowerCase() },
          update: {
            passwordHash: newHash,
            name: acc.name,
            role: acc.role,
          },
          create: {
            email: acc.email.toLowerCase(),
            passwordHash: newHash,
            name: acc.name,
            role: acc.role,
            country: 'India',
          },
        });

        if (acc.role === 'CREATOR') {
          const username = acc.email.split('@')[0];
          await prisma.creator.upsert({
            where: { userId: created.id },
            update: { displayName: acc.name, username },
            create: {
              userId: created.id,
              displayName: acc.name,
              username,
              country: 'India',
              verificationStatus: 'EMAIL_VERIFIED',
              reputationScore: 95,
              intelligenceScore: 92,
            },
          });
        } else if (acc.role === 'BRAND_ADMIN') {
          const org = await prisma.organization.create({
            data: {
              name: acc.orgName || `${acc.name}'s Organization`,
              legalName: acc.orgName || `${acc.name}'s Organization`,
              country: 'India',
              businessCategory: 'D2C Brands',
            },
          });
          await prisma.organizationMember.create({
            data: {
              organizationId: org.id,
              userId: created.id,
              role: 'OWNER',
            },
          });
        }

        saveStoredUser({
          id: created.id,
          email: acc.email.toLowerCase(),
          passwordHash: newHash,
          name: acc.name,
          role: acc.role,
          country: 'India',
          createdAt: new Date().toISOString(),
        });

        finalUser = created;
      }

      // 2. Test Login Verification to guarantee credentials work
      const loginRes = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: acc.email,
          password: acc.password,
        }),
      });

      const loginData: any = await loginRes.json();
      const loginSuccess = loginRes.status === 200 && (loginData.user || loginData.message);

      if (loginSuccess) {
        console.log(`  🔐 Login verified successfully (200 OK) for ${acc.email} with password: ${acc.password}\n`);
      } else {
        console.error(`  ❌ Login verification failed:`, loginData);
      }

      results.push({
        email: acc.email,
        password: acc.password,
        name: acc.name,
        role: acc.role,
        signedUp: true,
        loginVerified: loginSuccess,
      });

    } catch (err: any) {
      console.error(`  ❌ Error processing ${acc.email}:`, err.message);
      results.push({
        email: acc.email,
        password: acc.password,
        error: err.message,
      });
    }
  }

  console.log('======================================================================');
  console.log('🏁 PROVISIONING SUMMARY:');
  console.log('======================================================================');
  console.table(results);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
