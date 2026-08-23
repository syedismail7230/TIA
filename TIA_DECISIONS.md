# THE INFLUENCER'S AGENCY (TIA) — ARCHITECTURAL DECISION LOG (ADR)

This document records all fundamental technical and architectural decisions for The Influencer's Agency, their rationale, trade-offs, alternatives considered, and PRD alignment.

---

## ADR-001: Next.js (App Router) + TypeScript as Unified Monolithic Architecture

### Status
Accepted

### Context & PRD Requirement
PRD Sections 68, 102, 104, 108 require a modular, robust, responsive, and secure full-stack web application with high performance, API-first architecture, strict typing, and server-side data integrity.

### Decision
Use Next.js (App Router) with TypeScript, Server Actions, and REST/RPC API Route Handlers in a modular monorepo structure.

### Alternatives Considered & Rejected
1. *Separate Microservices (Go/Python backend + React SPA frontend)*: Rejected for initial delivery phases to prevent operational fragmentation, deployment overhead, network latency between microservices, and unnecessary distributed transaction complexity without current business scale justification (PRD Section 56: Do not overengineer).
2. *NestJS + Angular*: Rejected due to slower UI iteration speed and inferior server-rendered performance compared to modern Next.js server components.

### Impact
- Single language (TypeScript) throughout domain logic, database queries, and client interactions ensures complete type safety.
- Server-side rendering guarantees fast initial paint and robust SEO for public marketplace pages.
- Server Actions provide atomic mutations with native CSRF protection and seamless form state handling.

---

## ADR-002: Relational Data Model with Strict Integer Financial Accounting

### Status
Accepted

### Context & PRD Requirement
PRD Sections 5, 8, 24, 34, 35, 61 require an auditable, immutable double-entry financial ledger, deterministic 5% commission calculation, and referential integrity across 30+ relational entities.

### Decision
1. Use a relational SQL database with Prisma ORM for schema migrations, strict relational foreign keys, cascade safety, and typed queries.
2. All monetary figures (budgets, bids, commissions, payouts, escrow balances) MUST be stored as integers in minor currency units (paise/cents) to prevent floating-point inaccuracy.
3. Every financial movement produces an immutable ledger record (`Transaction`) referencing the source campaign, contract, and platform commission rate active at the moment of execution.

### Alternatives Considered & Rejected
1. *Document Store (MongoDB)*: Rejected because non-relational document stores fail to guarantee strict ACID transactions and referential integrity required for complex multi-party marketplace contracts and ledgers.
2. *Floating-point numbers (Float/Double) for currency*: Absolutely prohibited due to IEEE 754 precision loss.

### Impact
- 100% auditable accounting and mathematical exactness.
- Historical commission rates remain locked and verifiable regardless of future platform commission changes.

---

## ADR-003: Strict TIA Design System Enforcement (White-first, 0px Radius, Sharp Geometric)

### Status
Accepted

### Context & PRD Requirement
PRD Sections 44, 45, 74–79, 104–106 prohibit rounded cards, pill-shaped buttons, purple/blue AI gradients, glassmorphism, floating decorative cards, and generic dashboard aesthetics. The interface must be white-first, geometric, sharp (0px border radius), high-density, and structured around first-class data tables.

### Decision
Implement a centralized CSS Design Token architecture (`tokens.css`) and strict custom UI component library where:
- Border radius is hard-locked to `0px` (`--radius-none: 0px`).
- Background is strictly pure white (`#FFFFFF`) with neutral geometric borders (`#E2E8F0` / `#0F172A`).
- Primary brand blue (`#0052FF` / TIA Blue) is used for semantic primary actions.
- Typography uses clean geometric sans (Open Sauce / Inter) with tabular numeric alignment for metrics.
- Tables are first-class data exploration interfaces with sorting, pagination, and multi-filter drawers.

### Alternatives Considered & Rejected
1. *Tailwind default utility classes with rounded-lg/rounded-full*: Prohibited because standard Tailwind encourages excessive rounding, arbitrary colors, and inconsistent visual language.
2. *Generic AI Dashboard Templates*: Prohibited by PRD Section 78.

### Impact
- The platform exudes an enterprise-grade, engineered, reliable aesthetic matching global financial and data infrastructure platforms.

---

## ADR-004: Closed-Loop Campaign State Machine with Server-Side Transition Guards

### Status
Accepted

### Context & PRD Requirement
PRD Sections 4, 18, 28, 64 require a closed-loop marketplace with strict campaign lifecycle progression (Draft -> Published -> Accepting Applications -> Shortlisting -> Negotiation -> Contracted -> Funded -> In Progress -> Content Review -> Approved -> Published -> Measuring -> Completed).

### Decision
Implement a server-side state machine engine with explicit validation guards. State mutations are executed inside database transactions and emit audit log events. Unauthorized state jumps (e.g. Creator marking content Approved or moving directly from Published to Completed) are strictly blocked at the backend layer.

### Alternatives Considered & Rejected
1. *Client-side state toggles*: Rejected because client state can be tampered with by malicious actors.

### Impact
- Eliminates marketplace bypass, fraudulent state transitions, and unauthorized deliverable releases.

---

## ADR-005: Modular Connector Pattern for Social Media APIs

### Status
Accepted

### Context & PRD Requirement
PRD Sections 6, 7, 8, 9, 99 require support for Instagram, YouTube, Facebook, X, and LinkedIn without tightly coupling the core platform to any single social network.

### Decision
Implement a generic `SocialPlatformConnector` interface exposing normalized methods:
- `getAuthorizationUrl(state: string): string`
- `exchangeCodeForTokens(code: string): Promise<TokenResponse>`
- `fetchProfile(tokens: TokenResponse): Promise<NormalizedProfile>`
- `fetchAudienceMetrics(tokens: TokenResponse): Promise<NormalizedAudienceData>`
- `fetchContentPerformance(tokens: TokenResponse): Promise<NormalizedPerformanceData>`
- `verifyAccountOwnership(tokens: TokenResponse): Promise<VerificationResult>`

Platform-specific connectors (`InstagramConnector`, `YouTubeConnector`, `LinkedInConnector`, `XConnector`, `FacebookConnector`) implement this interface and map data to normalized internal entities (`AudienceSize`, `EngagementMetric`, etc.).

### Alternatives Considered & Rejected
1. *Direct ad-hoc API calls inside route handlers*: Rejected due to code duplication and fragility when platforms update API schemas.

### Impact
- Core creator intelligence logic remains completely independent of social platform specifics.
- New platforms (e.g., TikTok, Threads, Twitch) can be plugged in seamlessly without altering core tables or algorithms.
