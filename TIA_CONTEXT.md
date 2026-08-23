# THE INFLUENCER'S AGENCY (TIA) — PROJECT CONTEXT

**Abbreviation:** TIA  
**Product Type:** Global Creator Intelligence & Brand–Creator Campaign Marketplace SaaS  
**Commercial Model:** 5% platform commission on completed campaign transactions (configurable rate layer)  
**Primary Users:** Brands, Creators, Internal TIA Staff (Admin, Moderator, Finance, Support)  
**Market Scope:** Global (Multi-currency, Multi-region, ISO country/currency standards, IANA timezones)  
**Design Direction:** Minimal, geometric, enterprise-grade, white-first, 0px border radius, sharp edges, TIA Blue primary brand identity.

---

## 1. Product Overview & Principles

TIA is a global creator intelligence and campaign marketplace eliminating information asymmetry between brands and creators. Rather than relying on vanity metrics (follower counts, superficial likes), TIA provides deep audience intelligence, authenticity verification, explainable matching algorithms, closed-loop campaign execution, in-platform negotiation, digital agreements, milestone payments, content submission/approval workflows, and post-campaign performance attribution.

### Core Product Principles
1. **Intelligence over vanity metrics**: Follower count is never the sole basis for discovery or recommendation.
2. **Trust before transaction**: Authentic data, verified identity/ownership, dispute history, and reputation are visible before contract commitment.
3. **Data before opinion & Explainability**: Recommendations and Match Scores (0–100%) expose principal contributing factors with human-readable rationale.
4. **Marketplace neutrality**: Objective data without artificially fabricated outcome guarantees.
5. **Closed-loop execution (Zero outside communication)**: All discovery, messaging, negotiation, contracts, deliverables, approvals, payments, and reviews happen within TIA.
6. **No Mock / No Hallucinated Data**: Production data originates from real authenticated APIs and database persistence.
7. **Deterministic & Auditable Finance**: Real transactions, immutable ledger, configurable platform commission (5% default), recorded at transaction execution time.

---

## 2. User Roles & RBAC Matrix

The system enforces strict server-side Role-Based Access Control (RBAC) and Tenant Isolation:

| Role | Scope & Permissions |
|---|---|
| **Creator** | Own profile, social account connections, portfolio, rate cards, availability, campaign discovery, applications, bids, negotiation, contracts, submissions, payouts, earnings analytics, notifications. |
| **Brand User** | Assigned organization campaigns, creator discovery, shortlisting, reviewing applications/bids, workspace messaging, content approvals, performance reports. |
| **Brand Admin / Owner** | Full organization control, team member management, billing & funding, organization verification, campaign creation & management, contracts, payment authorization. |
| **TIA Support** | Ticket handling, read-only operational diagnostics, dispute triage without financial mutation powers. |
| **TIA Moderator** | Content moderation, report review, suspicious activity flags, community guidelines enforcement. |
| **TIA Finance** | Financial ledger inspection, commission management, manual payout reconciliation, escrow & refund governance. |
| **TIA Super Admin** | Full platform governance, RBAC management, platform-wide configuration, audit log investigation, system health. |

---

## 3. Technology Stack & Architecture

### Core Stack
- **Runtime:** Node.js (v20+ LTS)
- **Framework:** Next.js (App Router, Server Actions, API Route Handlers)
- **Language:** TypeScript (Strict mode enabled)
- **Database & ORM:** PostgreSQL / SQLite (for self-contained local development & testing) with Prisma ORM / Drizzle ORM
- **Authentication & Sessions:** Production-grade JWT & secure HTTP-only cookies, Argon2/bcrypt password hashing, CSRF protection, rate limiting
- **Styling & UI Architecture:** Vanilla CSS / CSS Modules with centralized Design Tokens (`tokens.css`), 0px border-radius, geometric sans typography (Open Sauce / Inter / Roboto), strictly no gradients, no glassmorphism, white canvas.
- **Background Jobs & Events:** In-memory queue / Redis worker pattern for asynchronous social synchronization, score computations, notification dispatch, and audit logging.
- **Search Engine Layer:** Dedicated structured search & indexing layer supporting multi-facet filtering (geography, age, gender, category, platform, audience size, engagement, intelligence score, match score, availability, price).

---

## 4. Domain & Data Architecture

```
                    ┌──────────────────────────────────────┐
                    │                 User                 │
                    └──────────────────┬───────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
     ┌──────────────────────┐                      ┌──────────────────────┐
     │       Creator        │                      │  Brand / Org Member  │
     └──────────┬───────────┘                      └──────────┬───────────┘
                │                                             │
      ┌─────────┴─────────┐                                   │
      ▼                   ▼                                   ▼
┌─────────────┐   ┌──────────────┐                 ┌──────────────────────┐
│SocialAccount│   │ CreatorScore │                 │     Organization     │
└─────────────┘   └──────────────┘                 └──────────┬───────────┘
      │                   │                                   │
      ▼                   ▼                                   ▼
┌─────────────┐   ┌──────────────┐                 ┌──────────────────────┐
│  Audience   │   │  Reputation  │                 │       Campaign       │
└─────────────┘   └──────────────┘                 └──────────┬───────────┘
                                                              │
                ┌─────────────────────────────────────────────┴──────────┐
                ▼                                                        ▼
     ┌──────────────────────┐                                 ┌──────────────────────┐
     │ CampaignApplication  │                                 │ CampaignNegotiation  │
     └──────────┬───────────┘                                 └──────────┬───────────┘
                │                                                        │
                └──────────────────────────┬─────────────────────────────┘
                                           ▼
                                ┌──────────────────────┐
                                │   CampaignContract   │
                                └──────────┬───────────┘
                                           │
                ┌──────────────────────────┼──────────────────────────┐
                ▼                          ▼                          ▼
     ┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
     │ ContentSubmission    │   │     Transaction      │   │    MessageThread     │
     └──────────────────────┘   └──────────────────────┘   └──────────────────────┘
```

---

## 5. Campaign Lifecycle State Machine

1. `DRAFT`: Brand creates and configures campaign brief, deliverables, target audience, budget, timeline.
2. `PUBLISHED`: Campaign is live in marketplace; discoverable by eligible creators.
3. `ACCEPTING_APPLICATIONS`: Creators submit proposals and bids.
4. `SHORTLISTING`: Brand evaluates applicant intelligence and match scores.
5. `NEGOTIATION`: Brand and Creator counter-offer deliverable terms and pricing in-platform.
6. `CONTRACTED`: Digital agreement generated with formal versioning; signed by both parties.
7. `FUNDED`: Brand deposits campaign escrow amount into TIA payment engine.
8. `IN_PROGRESS`: Creator begins content production.
9. `CONTENT_REVIEW`: Creator submits deliverables (drafts/files/captions) for brand review.
10. `REVISION_REQUESTED`: (Optional loop) Brand requests specific adjustments.
11. `APPROVED`: Brand approves submitted deliverables.
12. `PUBLISHED_LIVE`: Creator publishes content to external social platform with tracking tags.
13. `MEASURING`: System tracks performance, reach, clicks, conversions, and attribution.
14. `COMPLETED`: Escrow released to Creator Net Payout (95%), TIA Commission captured (5%), dual reviews submitted.
15. *Terminal / Exceptional States:* `CANCELLED`, `DISPUTED`, `SUSPENDED`, `FAILED`.

---

## 6. Creator Intelligence & Authenticity Scoring System

### TIA Creator Intelligence Score™ (0–100)
A weighted composite calculated from:
- **Audience Quality (25%)**: Real follower distribution, absence of bot activity, engagement consistency.
- **Authenticity (20%)**: Growth spike analysis, engagement-to-reach ratios, comment naturalness.
- **Engagement Quality (20%)**: Normalized engagement rate relative to tier and platform.
- **Reputation (15%)**: Historical on-time delivery rate, dispute frequency, brand review average.
- **Brand Safety (10%)**: Content toxicity scanning, copyright safety, guideline compliance.
- **Data Confidence (10%)**: Verification level, OAuth connection freshness, measured vs. estimated data availability.

### TIA Match Score™ (0–100%)
Campaign-specific compatibility dynamically calculated via:
- Audience Geography Fit (Weight depends on campaign objective)
- Audience Age & Demographics Fit
- Content Category & Industry Alignment
- Platform Fit
- Price Efficiency (Creator rate vs. Campaign budget)
- Creator Availability & Capacity

---

## 7. Communication & Anti-Circumvention

- In-platform messaging is tightly bound to `campaign_id` and `contract_id`.
- Communication includes real-time messaging, file attachments, formal deliverable cards, payment notifications, and contract milestones.
- Anti-circumvention filters scan message payloads for external contact solicitation (phone numbers, WhatsApp handles, external payment URLs, direct emails) and flag violations for TIA moderation while preserving audit trails.

---

## 8. Financial Ledger & Commission Engine

- **Default Commission:** 5.00% (Stored per transaction, dynamically read from platform commercial rules).
- **Accounting Method:** Exact integer arithmetic (cents/paise) to eliminate floating-point rounding errors.
- **Ledger Records:**
  - `Gross Amount`: Total campaign budget paid by brand.
  - `Platform Commission`: Calculated percentage (e.g. 5%).
  - `Creator Allocation`: Gross minus Platform Commission (e.g. 95%).
  - `Processing Fees & Taxes`: Transparent breakdown.
  - `Creator Net Payout`: Final disbursed balance.
- **Escrow Mechanics:** Funds held in escrow status upon `FUNDED` transition, disbursed upon verified `COMPLETED` state.
