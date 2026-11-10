import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding TIA initial platform configuration and database records...');

  // 1. Initialize canonical platform commission configuration (5.00%)
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
  console.log('Canonical Commission Config Initialized:', defaultCommission.id);

  // 2. Demo Brand Org & User
  const passwordHash = await bcrypt.hash('Password@2026Secure!', 10);
  const brandUser = await prisma.user.upsert({
    where: { email: 'brand@nike.com' },
    update: {},
    create: {
      name: 'Nike Brand Admin',
      email: 'brand@nike.com',
      passwordHash,
      role: 'BRAND_ADMIN',
      emailVerified: true,
    },
  });

  let org = await prisma.organization.findFirst({
    where: { name: 'Nike India Private Limited' },
  });

  if (!org) {
    org = await prisma.organization.create({
      data: {
        name: 'Nike India Private Limited',
        legalName: 'Nike India Private Limited',
        country: 'India',
        businessCategory: 'Apparel & Footwear',
        verificationStatus: 'VERIFIED',
        reputationScore: 98,
      },
    });
  }

  const existingMember = await prisma.organizationMember.findFirst({
    where: {
      organizationId: org.id,
      userId: brandUser.id,
    },
  });

  if (!existingMember) {
    await prisma.organizationMember.create({
      data: {
        organizationId: org.id,
        userId: brandUser.id,
        role: 'OWNER',
      },
    });
  }
  console.log('Demo Brand Org & User Initialized:', org.name);

  // 3. Creators
  const creatorsData = [
    {
      email: 'aarav.fitness@tia.agency',
      name: 'Aarav Sharma',
      username: 'aarav.fitness',
      category: 'Fitness & Athletics',
      bio: 'Marathon runner, endurance coach, and biomechanics reviewer with 500k+ active fitness enthusiasts.',
      followers: 520000,
      baseRate: 45000,
    },
    {
      email: 'priya.lifestyle@tia.agency',
      name: 'Priya Kapoor',
      username: 'priya.lifestyle',
      category: 'Lifestyle & Audio',
      bio: 'Tech aesthetics, everyday carry (EDC), and smart lifestyle creator.',
      followers: 340000,
      baseRate: 40000,
    },
    {
      email: 'rohan.tech@tia.agency',
      name: 'Rohan Mehta',
      username: 'rohan.techtalks',
      category: 'Consumer Tech',
      bio: 'In-depth silicon benchmarks, smartphone camera shootouts, and wireless audio teardowns.',
      followers: 780000,
      baseRate: 75000,
    },
  ];

  for (const c of creatorsData) {
    const u = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: {
        name: c.name,
        email: c.email,
        passwordHash,
        role: 'CREATOR',
        emailVerified: true,
      },
    });

    const creator = await prisma.creator.upsert({
      where: { username: c.username },
      update: {
        displayName: c.name,
        bio: c.bio,
        categories: JSON.stringify([c.category]),
      },
      create: {
        userId: u.id,
        displayName: c.name,
        username: c.username,
        bio: c.bio,
        country: 'India',
        categories: JSON.stringify([c.category]),
        verificationStatus: 'VERIFIED_CREATOR',
        intelligenceScore: 95,
        reputationScore: 98,
        brandSafetyScore: 99,
        availabilityStatus: 'AVAILABLE',
      },
    });

    await prisma.creatorRateCard.upsert({
      where: { creatorId: creator.id },
      update: {
        startingPrice: c.baseRate * 100,
      },
      create: {
        creatorId: creator.id,
        currency: 'INR',
        startingPrice: c.baseRate * 100,
        platformRates: JSON.stringify({
          INSTAGRAM_REEL: c.baseRate * 100,
          YOUTUBE_VIDEO: c.baseRate * 2 * 100,
        }),
      },
    });
  }
  console.log('Demo Creators Initialized: Aarav, Priya, Rohan');

  // 4. Campaigns
  const campaignsData = [
    {
      id: 'camp-101',
      title: 'Summer 2026 Running Series & Shoe Launch',
      category: 'Fitness & Athletics',
      objective: 'PRODUCT_LAUNCH',
      budget: 35000000,
      status: 'ACCEPTING_APPLICATIONS',
      deliverables: JSON.stringify(['1x Dedicated YouTube Review', '2x IG Reels']),
      requiredPlatforms: JSON.stringify(['YOUTUBE', 'INSTAGRAM']),
    },
    {
      id: 'camp-102',
      title: 'Pro Wireless ANC Earbuds Creator Benchmark',
      category: 'Consumer Tech',
      objective: 'AWARENESS',
      budget: 25000000,
      status: 'PUBLISHED',
      deliverables: JSON.stringify(['3x Instagram Reels', 'Bio Link Placement']),
      requiredPlatforms: JSON.stringify(['INSTAGRAM']),
    },
    {
      id: 'camp-103',
      title: 'Monsoon Fitness & Hydration Routine Series',
      category: 'Health & Wellness',
      objective: 'ENGAGEMENT',
      budget: 18000000,
      status: 'PUBLISHED',
      deliverables: JSON.stringify(['Story Trio', 'Link Sticker', 'Community Post']),
      requiredPlatforms: JSON.stringify(['INSTAGRAM']),
    },
  ];

  for (const camp of campaignsData) {
    await prisma.campaign.upsert({
      where: { id: camp.id },
      update: {
        title: camp.title,
        status: camp.status,
        budget: camp.budget,
      },
      create: {
        id: camp.id,
        organizationId: org.id,
        title: camp.title,
        description: `Official campaign: ${camp.title}`,
        objective: camp.objective,
        budget: camp.budget,
        currency: 'INR',
        category: camp.category,
        deliverables: camp.deliverables,
        requiredPlatforms: camp.requiredPlatforms,
        status: camp.status,
      },
    });
  }
  console.log('Demo Campaigns Initialized: camp-101, camp-102, camp-103');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
