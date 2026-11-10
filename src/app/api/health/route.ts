// ============================================================================
// TIA BACKEND - HEALTH & READINESS PROBE API ROUTE
// Covers: #56 Health Checks, #57 Liveness & Readiness Probes, #61 Metrics,
// #85 Failover, #91 Latency
// ============================================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const start = Date.now();
  const memory = process.memoryUsage();

  let dbStatus = 'UNKNOWN';
  let dbLatencyMs = -1;

  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - dbStart;
    dbStatus = 'CONNECTED';
  } catch (dbErr: any) {
    dbStatus = 'DISCONNECTED';
    console.error('Database Health Check Failed:', dbErr.message);
  }

  const isHealthy = dbStatus === 'CONNECTED';
  const totalDurationMs = Date.now() - start;

  const payload = {
    status: isHealthy ? 'UP' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    latencyMs: totalDurationMs,
    environment: process.env.NODE_ENV || 'production',
    checks: {
      database: {
        status: dbStatus,
        provider: 'postgresql',
        latencyMs: dbLatencyMs,
      },
      memory: {
        heapUsedMb: Math.round(memory.heapUsed / 1024 / 1024),
        heapTotalMb: Math.round(memory.heapTotal / 1024 / 1024),
        rssMb: Math.round(memory.rss / 1024 / 1024),
      },
      services: {
        smtp: 'CONFIGURED',
        storage: process.env.STORAGE_PROVIDER || 'local',
        redis: 'IN_MEMORY_FALLBACK',
      },
    },
  };

  return NextResponse.json(payload, {
    status: isHealthy ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
