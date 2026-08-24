import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import prisma from '@/lib/db/prisma';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tia_production_grade_jwt_secret_key_minimum_32_characters_long_entropy_secure_2026'
);

const SESSION_COOKIE_NAME = 'tia_session_token';
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  creatorId?: string;
  organizationId?: string;
  orgRole?: string;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_EXPIRATION_SECONDS}s`)
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(payload: SessionPayload) {
  const token = await createSessionToken(payload);
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_EXPIRATION_SECONDS,
    path: '/',
  });
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUser(): Promise<{
  id: string;
  userId: string;
  email: string;
  name: string;
  role: string;
  creatorProfile: any | null;
  orgMemberships: any[];
} | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = await verifySessionToken(token);
    if (!payload?.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        creatorProfile: {
          include: {
            socialAccounts: true,
            rateCard: true,
            availability: true,
          },
        },
        orgMemberships: {
          include: {
            organization: {
              include: {
                brandProfile: true,
              },
            },
          },
        },
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      creatorProfile: user.creatorProfile,
      orgMemberships: user.orgMemberships,
    };
  } catch {
    return null;
  }
}

export const getSession = getCurrentUser;
