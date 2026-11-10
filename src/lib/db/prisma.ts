import { PrismaClient } from '@prisma/client';

const DEFAULT_DATABASE_URL =
  'postgresql://postgres:MqNHANcIaE6Vu23g@db.egagtpzlvtcxihuargcv.supabase.co:5432/postgres?sslmode=require';

const dbUrl =
  process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')
    ? process.env.DATABASE_URL
    : DEFAULT_DATABASE_URL;

if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.startsWith('postgres')) {
  process.env.DATABASE_URL = DEFAULT_DATABASE_URL;
}

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
