import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding TIA initial platform configuration...');

  // Initialize canonical platform commission configuration (5.00%)
  const defaultCommission = await prisma.commissionConfig.upsert({
    where: { id: 'default-marketplace-commission' },
    update: {
      defaultRate: 5.00,
      active: true,
    },
    create: {
      id: 'default-marketplace-commission',
      name: 'Standard Marketplace Commission',
      defaultRate: 5.00,
      minTransactionFee: 0,
      isDefault: true,
      active: true,
    },
  });

  console.log('Canonical Commission Config Initialized:', defaultCommission);
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
