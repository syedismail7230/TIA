import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { hashPassword } from '@/lib/auth/password';
import { setSessionCookie } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, role, country, organizationName, businessCategory } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Email, password, name, and role are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Transactional registration for atomic data creation
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          name,
          role,
          country: country || 'India',
        },
      });

      if (role === 'CREATOR') {
        const username = `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.floor(Math.random() * 1000)}`;
        const creator = await tx.creator.create({
          data: {
            userId: newUser.id,
            displayName: name,
            username,
            country: country || 'India',
            verificationStatus: 'EMAIL_VERIFIED',
          },
        });

        // Initialize Creator Rate Card & Availability
        await tx.creatorRateCard.create({
          data: {
            creatorId: creator.id,
            startingPrice: 2500000, // 25,000 INR default starting price (in paise)
            currency: 'INR',
          },
        });

        await tx.creatorAvailability.create({
          data: {
            creatorId: creator.id,
            status: 'AVAILABLE',
            leadTimeDays: 7,
            maxSimultaneousCampaigns: 3,
          },
        });
      } else if (role === 'BRAND_ADMIN' || role === 'BRAND_USER') {
        const org = await tx.organization.create({
          data: {
            name: organizationName || `${name}'s Organization`,
            legalName: organizationName || `${name}'s Organization`,
            country: country || 'India',
            businessCategory: businessCategory || 'General',
            verificationStatus: 'PENDING',
          },
        });

        await tx.organizationMember.create({
          data: {
            organizationId: org.id,
            userId: newUser.id,
            role: role === 'BRAND_ADMIN' ? 'OWNER' : 'CAMPAIGN_MANAGER',
          },
        });

        await tx.brandProfile.create({
          data: {
            organizationId: org.id,
            companyName: organizationName || `${name}'s Brand`,
            industry: businessCategory || 'General',
          },
        });
      }

      return newUser;
    });

    await setSessionCookie({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    await logAuditEvent({
      userId: user.id,
      userRole: user.role,
      action: 'REGISTER',
      entityType: 'USER',
      entityId: user.id,
    });

    return NextResponse.json(
      {
        message: 'Account registered successfully',
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during registration' },
      { status: 500 }
    );
  }
}
