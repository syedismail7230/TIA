import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createCredentials() {
  console.log('Creating demo credentials in TIA database...');

  const commonPasswordHash = await bcrypt.hash('Password@123', 12);

  // 1. BRAND ADMIN CREDENTIAL
  const brandEmail = 'brand@tia.agency';
  const brandUser = await prisma.user.upsert({
    where: { email: brandEmail },
    update: {
      passwordHash: commonPasswordHash,
      role: 'BRAND_ADMIN',
      name: 'Nexus Brand Manager',
      emailVerified: true,
      country: 'India',
    },
    create: {
      email: brandEmail,
      passwordHash: commonPasswordHash,
      role: 'BRAND_ADMIN',
      name: 'Nexus Brand Manager',
      emailVerified: true,
      country: 'India',
    },
  });

  const org = await prisma.organization.upsert({
    where: { id: 'demo-org-nexus-brands' },
    update: {
      name: 'Nexus Global Brands',
      legalName: 'Nexus Global Brands Pvt Ltd',
      verificationStatus: 'VERIFIED',
      country: 'India',
      reputationScore: 98,
      paymentReliabilityScore: 100,
    },
    create: {
      id: 'demo-org-nexus-brands',
      name: 'Nexus Global Brands',
      legalName: 'Nexus Global Brands Pvt Ltd',
      verificationStatus: 'VERIFIED',
      country: 'India',
      reputationScore: 98,
      paymentReliabilityScore: 100,
    },
  });

  await prisma.organizationMember.upsert({
    where: {
      organizationId_userId: {
        organizationId: org.id,
        userId: brandUser.id,
      },
    },
    update: {
      role: 'OWNER',
    },
    create: {
      organizationId: org.id,
      userId: brandUser.id,
      role: 'OWNER',
    },
  });

  await prisma.brandProfile.upsert({
    where: { organizationId: org.id },
    update: {
      companyName: 'Nexus Global Brands',
      industry: 'Fashion & Tech DTC',
      description: 'Global DTC apparel and lifestyle technology brand.',
    },
    create: {
      organizationId: org.id,
      companyName: 'Nexus Global Brands',
      industry: 'Fashion & Tech DTC',
      description: 'Global DTC apparel and lifestyle technology brand.',
    },
  });

  console.log('✓ Brand Admin created:', brandEmail);

  // 2. CREATOR CREDENTIAL
  const creatorEmail = 'creator@tia.agency';
  const creatorUser = await prisma.user.upsert({
    where: { email: creatorEmail },
    update: {
      passwordHash: commonPasswordHash,
      role: 'CREATOR',
      name: 'Aarav Sharma',
      emailVerified: true,
      country: 'India',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    },
    create: {
      email: creatorEmail,
      passwordHash: commonPasswordHash,
      role: 'CREATOR',
      name: 'Aarav Sharma',
      emailVerified: true,
      country: 'India',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    },
  });

  const creator = await prisma.creator.upsert({
    where: { userId: creatorUser.id },
    update: {
      displayName: 'Aarav Sharma',
      username: 'aarav_sharma',
      country: 'India',
      verificationStatus: 'IDENTITY_VERIFIED',
      bio: 'Tech & Lifestyle Creator • 450K+ combined community • Mumbai, India',
      categories: JSON.stringify(['Tech', 'Lifestyle', 'Gaming']),
      languages: JSON.stringify(['English', 'Hindi']),
    },
    create: {
      userId: creatorUser.id,
      displayName: 'Aarav Sharma',
      username: 'aarav_sharma',
      country: 'India',
      verificationStatus: 'IDENTITY_VERIFIED',
      bio: 'Tech & Lifestyle Creator • 450K+ combined community • Mumbai, India',
      categories: JSON.stringify(['Tech', 'Lifestyle', 'Gaming']),
      languages: JSON.stringify(['English', 'Hindi']),
    },
  });

  await prisma.creatorRateCard.upsert({
    where: { creatorId: creator.id },
    update: {
      startingPrice: 2500000,
      currency: 'INR',
    },
    create: {
      creatorId: creator.id,
      startingPrice: 2500000,
      currency: 'INR',
    },
  });

  await prisma.creatorAvailability.upsert({
    where: { creatorId: creator.id },
    update: {
      status: 'AVAILABLE',
      leadTimeDays: 5,
      maxSimultaneousCampaigns: 4,
    },
    create: {
      creatorId: creator.id,
      status: 'AVAILABLE',
      leadTimeDays: 5,
      maxSimultaneousCampaigns: 4,
    },
  });

  // Add social accounts for Aarav
  await prisma.socialAccount.upsert({
    where: {
      platform_platformAccountId: {
        platform: 'INSTAGRAM',
        platformAccountId: 'ig_aarav_sharma',
      },
    },
    update: {
      username: 'aarav.sharma',
      profileUrl: 'https://instagram.com/aarav.sharma',
      audienceSize: 320000,
      engagementRate: 4.85,
      averageViews: 65000,
      contentCount: 248,
      connectionStatus: 'CONNECTED',
      lastSyncedAt: new Date(),
    },
    create: {
      creatorId: creator.id,
      platform: 'INSTAGRAM',
      platformAccountId: 'ig_aarav_sharma',
      username: 'aarav.sharma',
      profileUrl: 'https://instagram.com/aarav.sharma',
      audienceSize: 320000,
      engagementRate: 4.85,
      averageViews: 65000,
      contentCount: 248,
      connectionStatus: 'CONNECTED',
      lastSyncedAt: new Date(),
    },
  });

  await prisma.socialAccount.upsert({
    where: {
      platform_platformAccountId: {
        platform: 'YOUTUBE',
        platformAccountId: 'yt_aarav_tech',
      },
    },
    update: {
      username: 'aaravsharmatech',
      profileUrl: 'https://youtube.com/@aaravsharmatech',
      audienceSize: 185000,
      engagementRate: 6.2,
      averageViews: 42000,
      contentCount: 96,
      connectionStatus: 'CONNECTED',
      lastSyncedAt: new Date(),
    },
    create: {
      creatorId: creator.id,
      platform: 'YOUTUBE',
      platformAccountId: 'yt_aarav_tech',
      username: 'aaravsharmatech',
      profileUrl: 'https://youtube.com/@aaravsharmatech',
      audienceSize: 185000,
      engagementRate: 6.2,
      averageViews: 42000,
      contentCount: 96,
      connectionStatus: 'CONNECTED',
      lastSyncedAt: new Date(),
    },
  });

  console.log('✓ Creator created:', creatorEmail);
}

createCredentials()
  .catch((err) => {
    console.error('Error creating credentials:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
