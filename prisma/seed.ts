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

  // 5. Relational Applications
  const aarav = await prisma.creator.findUnique({ where: { username: 'aarav.fitness' } });
  const priya = await prisma.creator.findUnique({ where: { username: 'priya.lifestyle' } });
  const rohan = await prisma.creator.findUnique({ where: { username: 'rohan.techtalks' } });

  if (aarav) {
    await prisma.campaignApplication.upsert({
      where: {
        campaignId_creatorId: {
          campaignId: 'camp-101',
          creatorId: aarav.id,
        },
      },
      update: {
        status: 'SHORTLISTED',
        proposedPrice: 6500000,
      },
      create: {
        id: 'app-101',
        campaignId: 'camp-101',
        creatorId: aarav.id,
        proposedPrice: 6500000,
        currency: 'INR',
        pitch: 'I will test these carbon-plated shoes over a 15km tempo run and break down the midsole foam recovery on 4K camera.',
        deliveryDays: 14,
        status: 'SHORTLISTED',
      },
    });

    // 6. Contract for camp-101
    const contract = await prisma.campaignContract.upsert({
      where: { id: 'contract-101' },
      update: {
        status: 'SIGNED',
      },
      create: {
        id: 'contract-101',
        campaignId: 'camp-101',
        organizationId: org.id,
        creatorId: aarav.id,
        agreedAmount: 6500000,
        currency: 'INR',
        commissionRate: 5.0,
        commissionAmount: 325000,
        creatorAllocationAmount: 6175000,
        deliverables: JSON.stringify(['1x Dedicated YouTube Review (8-10m)', '2x IG Reels']),
        status: 'SIGNED',
        brandSignedAt: new Date('2026-08-28T12:00:00Z'),
        creatorSignedAt: new Date('2026-08-28T14:30:00Z'),
      },
    });

    // 7. Deliverables & Content Submission
    const deliverable = await prisma.campaignDeliverable.upsert({
      where: { id: 'deliv-101' },
      update: {},
      create: {
        id: 'deliv-101',
        campaignId: 'camp-101',
        contractId: contract.id,
        creatorId: aarav.id,
        title: 'Dedicated YouTube 4K Review & Field Test',
        type: 'VIDEO',
        platform: 'YOUTUBE',
        status: 'DRAFT_SUBMITTED',
      },
    });

    await prisma.contentSubmission.upsert({
      where: { id: 'sub-101' },
      update: {},
      create: {
        id: 'sub-101',
        deliverableId: deliverable.id,
        version: 1,
        fileName: 'review_draft_4k_v1.mp4',
        fileUrl: 'https://cdn.theinfluencers.agency/content/review_draft_4k_v1.mp4',
        caption: 'Unboxing and real-world marathon pace testing of the all-new 2026 racing flat. #NikeRunning #TempoRun',
        status: 'SUBMITTED',
        notes: 'First draft cut with color grading and microphone sound test.',
      },
    });

    // 8. Notifications
    await prisma.notification.upsert({
      where: { id: 'notif-101' },
      update: {},
      create: {
        id: 'notif-101',
        userId: brandUser.id,
        title: 'Deliverable Submitted for Review',
        message: 'Aarav Sharma has uploaded draft v1 for "Summer 2026 Running Series & Shoe Launch".',
        type: 'CONTENT_SUBMITTED',
        actionUrl: '/campaigns/camp-101/submissions',
      },
    });
  }

  if (priya) {
    await prisma.campaignApplication.upsert({
      where: {
        campaignId_creatorId: {
          campaignId: 'camp-102',
          creatorId: priya.id,
        },
      },
      update: {},
      create: {
        id: 'app-102',
        campaignId: 'camp-102',
        creatorId: priya.id,
        proposedPrice: 4200000,
        currency: 'INR',
        pitch: 'Aesthetic everyday carry reel demonstrating the active noise cancellation during daily commute and cafe focus sessions.',
        deliveryDays: 10,
        status: 'SUBMITTED',
      },
    });
  }

  if (rohan) {
    await prisma.campaignApplication.upsert({
      where: {
        campaignId_creatorId: {
          campaignId: 'camp-101',
          creatorId: rohan.id,
        },
      },
      update: {},
      create: {
        id: 'app-103',
        campaignId: 'camp-101',
        creatorId: rohan.id,
        proposedPrice: 7000000,
        currency: 'INR',
        pitch: 'Smart wearable telemetry sync comparison while using the running shoes across treadmill and outdoor tracks.',
        deliveryDays: 12,
        status: 'SUBMITTED',
      },
    });
  }

  console.log('Demo Applications, Contracts, Deliverables & Submissions Seeded!');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
