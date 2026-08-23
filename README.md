# THE INFLUENCER'S AGENCY (TIA)

**The Enterprise Creator Intelligence & Closed-Loop Campaign Marketplace**

TIA is a full-stack SaaS platform designed to eliminate information asymmetry in influencer marketing through verified audience intelligence, in-platform negotiation, versioned digital agreements, 5% platform commission ledgering, and escrow milestone settlement.

---

## Key System Capabilities

- **Creator Intelligence Engine**: Composite 6-dimension **Creator Intelligence Score™** (0–100) and objective-parameterized **TIA Match Score™** (0–100%).
- **Closed-Loop Campaign Lifecycle**: 14-state campaign state machine enforcing in-platform negotiation, versioned digital contracts, and milestone content review.
- **Financial Ledger & 5% Commission**: Deterministic minor-currency integer arithmetic (zero floating-point error), escrow deposit holding, automatic 5% TIA fee capture, 95% creator net payout allocation, and automated VAT/GST invoices.
- **Anti-Circumvention Security**: Real-time pattern detector scanning messaging streams for off-platform contact attempts (phones, WhatsApp, external emails, UPI/payment handles).
- **Strict TIA Design System**: Pure white canvas (`#FFFFFF`), TIA Brand Blue (`#0052FF`), hard-locked `0px` radius, geometric typography, and high data density.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Database & ORM**: SQLite / PostgreSQL with Prisma ORM
- **Authentication**: Bcrypt hashing & Jose JWT in HTTP-only cookies with multi-tenant RBAC
- **Testing**: Node.js Native Test Runner with TSX

---

## Getting Started

### 1. Prerequisites
- Node.js 18.17+
- npm

### 2. Installation
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 4. Database Setup & Seed
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Running Automated Tests

```bash
npx tsx --test tests/**/*.test.ts
```

---

## Production Build

```bash
npm run build
npm run start
```
