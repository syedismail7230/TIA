# The Influencer's Agency (TIA) — Production Readiness & Disaster Recovery Runbook (Phase 5)

---

## 1. Automated Testing & CI/CD Pipeline
- **GitHub Actions Configuration**: [`.github/workflows/ci.yml`](file:///c:/Users/syedi/OneDrive/Desktop/TIA/.github/workflows/ci.yml)
- **Automated Validation on Every Push / PR**:
  1. Dependency installation (`npm ci`).
  2. Prisma schema validation & client generation (`npx prisma validate && npx prisma generate`).
  3. Strict TypeScript compilation (`npx tsc --noEmit`).
  4. 37 Automated Unit & Integration QA Tests (`npm test`):
     - Auth & RBAC security tests
     - Zod payload validation & AppError handling
     - In-memory & Redis rate limiting
     - Magic bytes file upload security
     - Razorpay webhook & payment signature verification
     - Escrow ledger integer arithmetic & 5% commission verification
     - GST tax invoice generation (intra-state CGST+SGST vs. inter-state IGST)
     - 72-hour deliverable auto-approval SLA engine
     - Creator Intelligence & BotShield™ fraud detection scoring
  5. Next.js production build (`npm run build`) covering all 34 routes.

---

## 2. Database Backup & Disaster Recovery (DR) Strategy

### 2.1. Managed PostgreSQL Backups (Supabase / AWS RDS / Neon)
- **Continuous WAL Archiving**: Point-In-Time Recovery (PITR) enabled with 7-day or 30-day retention window.
- **Automated Daily Snapshots**: Taken at 03:00 UTC during off-peak hours.
- **Physical Recovery Objective**:
  - **RPO (Recovery Point Objective)**: < 5 minutes (via continuous WAL streaming).
  - **RTO (Recovery Time Objective)**: < 30 minutes to spin up a recovered instance.

### 2.2. Automated Logical Dump Script (`pg_dump`)
Run as a cron container or scheduled worker:
```bash
#!/usr/bin/env bash
set -euo pipefail

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/backups/tia"
FILENAME="$BACKUP_DIR/tia_db_backup_$TIMESTAMP.sql.gz"

mkdir -p "$BACKUP_DIR"

# Perform compressed backup with clean schema and ownership
pg_dump "$DATABASE_URL" \
  --format=custom \
  --no-owner \
  --no-privileges \
  --clean \
  --if-exists \
  | gzip > "$FILENAME"

# Upload to encrypted cloud cold storage (GCS / AWS S3)
aws s3 cp "$FILENAME" "s3://tia-production-db-backups/daily/tia_db_backup_$TIMESTAMP.sql.gz" --sse aws:kms

# Retention: Delete local backups older than 7 days
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +7 -delete

echo "✅ Backup successfully created and archived: $FILENAME"
```

### 2.3. Database Restoration Drill (Tested Quarterly)
1. Provision isolated staging database instance.
2. Download latest backup archive:
   ```bash
   aws s3 cp s3://tia-production-db-backups/daily/tia_db_backup_latest.sql.gz ./restore.sql.gz
   ```
3. Decompress and restore:
   ```bash
   gunzip -c ./restore.sql.gz | pg_restore --dbname="$STAGING_DATABASE_URL" --clean --no-owner
   ```
4. Verify schema parity and run test suite:
   ```bash
   npx prisma db pull
   npm test
   ```

---

## 3. Monitoring, Observability & Error Tracking

### 3.1. Health Probes
- **Live Health Endpoint**: [`/api/health`](file:///c:/Users/syedi/OneDrive/Desktop/TIA/src/app/api/health/route.ts)
  - Database connectivity probe (`SELECT 1`)
  - DB latency in milliseconds
  - Process uptime & memory usage (heapUsedMb, heapTotalMb, rssMb)
  - Returns `200 UP` for healthy state or `503 DEGRADED` for database stockouts.

### 3.2. Application Performance & Error Reporting
- **Sentry Integration**: Capture unhandled server-side exceptions and client-side React errors with release tags.
- **Structured JSON Logging**: Centralized via `src/lib/services/logger.service.ts` outputting ISO timestamps, log levels (`INFO`, `WARN`, `ERROR`), request IP, and correlation IDs.

---

## 4. Rate Limiting & Edge Protection
- **Edge Layer**: Configured via Next.js Middleware and Cloudflare WAF for volumetric DDoS mitigation.
- **API Application Layer**:
  - In-memory token bucket rate limiting active in `src/lib/services/ratelimit.service.ts`.
  - Upstash Redis interface ready for distributed multi-region rate limiting.

---

## 5. Security Credentials & Secret Rotation
- **Razorpay Key & Webhook Secret**: Managed in environment variables; rotated every 90 days.
- **JWT Secret**: Minimum 32-character high-entropy secret, stored in secret manager.
- **Zero Hardcoded Secrets**: All services inject credentials via runtime environment variables.
