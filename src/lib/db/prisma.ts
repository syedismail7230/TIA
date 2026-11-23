import { PrismaClient } from '@prisma/client';

const rawUrl = process.env.DATABASE_URL || process.env.DIRECT_URL;

if (!rawUrl) {
  console.warn('WARNING: DATABASE_URL is not set in environment variables. Database operations will fail.');
}

const dbUrl = rawUrl || '';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
export default prisma;
