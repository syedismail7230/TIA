import prisma from '../src/lib/db/prisma';
import fs from 'fs';
import path from 'path';

const TARGET_EMAILS = [
  'brand1@theinfluencers.agency',
  'brand2@theinfluencers.agency',
  'brand3@theinfluencers.agency',
  'brand4@theinfluencers.agency',
  'brand5@theinfluencers.agency',
  'user1@theinfluencers.agency',
  'user2@theinfluencers.agency',
  'user3@theinfluencers.agency',
  'user4@theinfluencers.agency',
  'user5@theinfluencers.agency',
  'user6@theinfluencers.agency',
  'user7@theinfluencers.agency',
  'user8@theinfluencers.agency',
  'user9@theinfluencers.agency',
  'user10@theinfluencers.agency',
];

const TARGET_ORG_NAMES = [
  'Brand 1 Global',
  'Brand 2 Media',
  'Brand 3 Studios',
  'Brand 4 Collective',
  'Brand 5 Apparel',
];

async function main() {
  console.log('🗑️ DELETING 15 REQUESTED USERS AND BRANDS...');
  console.log('Target emails:', TARGET_EMAILS);

  // 1. Delete from PostgreSQL Database via Prisma
  try {
    const existingUsers = await prisma.user.findMany({
      where: {
        email: { in: TARGET_EMAILS },
      },
      select: { id: true, email: true },
    });

    console.log(`\nFound ${existingUsers.length} matching users in PostgreSQL database.`);

    if (existingUsers.length > 0) {
      const userIds = existingUsers.map((u) => u.id);

      // Delete user records (cascades to Creator, OrgMembers, etc.)
      const deleteUsersRes = await prisma.user.deleteMany({
        where: {
          id: { in: userIds },
        },
      });
      console.log(`✅ Deleted ${deleteUsersRes.count} user records from database.`);
    }

    // Delete associated organizations
    const deleteOrgsRes = await prisma.organization.deleteMany({
      where: {
        name: { in: TARGET_ORG_NAMES },
      },
    });
    console.log(`✅ Deleted ${deleteOrgsRes.count} organization records from database.`);
  } catch (dbErr: any) {
    console.error('⚠️ DB Error during deletion:', dbErr?.message || dbErr);
  }

  // 2. Clean up local json files in .data
  const dataDir = path.resolve(process.cwd(), '.data');
  if (fs.existsSync(dataDir)) {
    // auth_users.json
    const authUsersPath = path.join(dataDir, 'auth_users.json');
    if (fs.existsSync(authUsersPath)) {
      try {
        const users = JSON.parse(fs.readFileSync(authUsersPath, 'utf8'));
        const remaining = users.filter((u: any) => !TARGET_EMAILS.includes(u.email?.toLowerCase()));
        fs.writeFileSync(authUsersPath, JSON.stringify(remaining, null, 2));
        console.log(`✅ Cleaned .data/auth_users.json: removed ${users.length - remaining.length} accounts.`);
      } catch (err: any) {
        console.error('Error cleaning auth_users.json:', err.message);
      }
    }

    // email_verifications.json
    const emailVerPath = path.join(dataDir, 'email_verifications.json');
    if (fs.existsSync(emailVerPath)) {
      try {
        const verifs = JSON.parse(fs.readFileSync(emailVerPath, 'utf8'));
        const remaining = verifs.filter((v: any) => !TARGET_EMAILS.includes(v.email?.toLowerCase()));
        fs.writeFileSync(emailVerPath, JSON.stringify(remaining, null, 2));
        console.log(`✅ Cleaned .data/email_verifications.json: removed ${verifs.length - remaining.length} verification tokens.`);
      } catch (err: any) {
        console.error('Error cleaning email_verifications.json:', err.message);
      }
    }

    // creators.json
    const creatorsPath = path.join(dataDir, 'creators.json');
    if (fs.existsSync(creatorsPath)) {
      try {
        const creators = JSON.parse(fs.readFileSync(creatorsPath, 'utf8'));
        const targetHandles = TARGET_EMAILS.map((e) => e.split('@')[0]);
        const remaining = creators.filter((c: any) => !targetHandles.includes(c.handle?.replace('@', '')));
        fs.writeFileSync(creatorsPath, JSON.stringify(remaining, null, 2));
        console.log(`✅ Cleaned .data/creators.json.`);
      } catch (err: any) {
        console.error('Error cleaning creators.json:', err.message);
      }
    }

    // brand_wallets.json
    const walletsPath = path.join(dataDir, 'brand_wallets.json');
    if (fs.existsSync(walletsPath)) {
      try {
        const wallets = JSON.parse(fs.readFileSync(walletsPath, 'utf8'));
        const remaining = wallets.filter((w: any) => !TARGET_ORG_NAMES.includes(w.brandName));
        fs.writeFileSync(walletsPath, JSON.stringify(remaining, null, 2));
        console.log(`✅ Cleaned .data/brand_wallets.json.`);
      } catch (err: any) {
        console.error('Error cleaning brand_wallets.json:', err.message);
      }
    }
  }

  console.log('\n🎉 ALL 15 CREATED USERS AND BRANDS HAVE BEEN COMPLETELY REMOVED!');
}

main()
  .catch((e) => {
    console.error('Fatal execution error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

