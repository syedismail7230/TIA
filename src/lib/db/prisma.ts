import { PrismaClient } from '@prisma/client';

const DEFAULT_DATABASE_URL =
  'postgresql://postgres.egagtpzlvtcxihuargcv:MqNHANcIaE6Vu23g@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require';

const rawUrl = process.env.DATABASE_URL;
const isDirectIpv6Supabase = rawUrl && rawUrl.includes('db.egagtpzlvtcxihuargcv.supabase.co');

const dbUrl =
  rawUrl && rawUrl.startsWith('postgres') && !isDirectIpv6Supabase
    ? rawUrl
    : DEFAULT_DATABASE_URL;

process.env.DATABASE_URL = dbUrl;

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
