-- ====================================================================
-- THE INFLUENCER'S AGENCY (TIA) - MASTER SUPABASE POSTGRESQL SCHEMA
-- Complete Relational Engine with UUIDs, Foreign Keys, Triggers,
-- Row Level Security (RLS) & Storage Buckets.
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create Reusable Trigger Function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- --------------------------------------------------------------------
-- 3. CORE USERS & ORGANIZATIONS
-- --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'CREATOR', -- CREATOR, BRAND_USER, BRAND_ADMIN, TIA_SUPPORT, TIA_MODERATOR, TIA_FINANCE, TIA_SUPER_ADMIN
  email_verified BOOLEAN NOT NULL DEFAULT false,
  avatar_url TEXT,
  country VARCHAR(100),
  timezone VARCHAR(100) DEFAULT 'UTC',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  legal_name VARCHAR(255),
  country VARCHAR(100),
  website TEXT,
  business_category VARCHAR(100),
  verification_status VARCHAR(50) NOT NULL DEFAULT 'UNVERIFIED', -- UNVERIFIED, PENDING, VERIFIED, REJECTED
  reputation_score INT NOT NULL DEFAULT 100,
  payment_reliability_score INT NOT NULL DEFAULT 100,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'MEMBER', -- OWNER, ADMIN, CAMPAIGN_MANAGER, FINANCE, VIEWER
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_org_user UNIQUE (organization_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.brand_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL UNIQUE REFERENCES public.organizations(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  industry VARCHAR(100) NOT NULL,
  description TEXT,
  website TEXT,
  location VARCHAR(255),
  verification_status VARCHAR(50) NOT NULL DEFAULT 'UNVERIFIED',
  reputation_score INT NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 4. CREATOR PROFILES & SOCIAL INTELLIGENCE
-- --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  bio TEXT,
  country VARCHAR(100),
  region VARCHAR(100),
  city VARCHAR(100),
  timezone VARCHAR(100) DEFAULT 'UTC',
  languages JSONB DEFAULT '["English"]'::jsonb,
  categories JSONB DEFAULT '["Lifestyle"]'::jsonb,
  verification_status VARCHAR(50) NOT NULL DEFAULT 'UNVERIFIED', -- UNVERIFIED, EMAIL_VERIFIED, IDENTITY_VERIFIED, SOCIAL_CONNECTED, VERIFIED_CREATOR
  intelligence_score INT NOT NULL DEFAULT 0,
  reputation_score INT NOT NULL DEFAULT 100,
  brand_safety_score INT NOT NULL DEFAULT 100,
  availability_status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE', -- AVAILABLE, BUSY, UNAVAILABLE
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL, -- INSTAGRAM, YOUTUBE, FACEBOOK, X, LINKEDIN
  platform_account_id VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  profile_url TEXT,
  profile_image_url TEXT,
  account_metadata JSONB,
  connection_status VARCHAR(50) NOT NULL DEFAULT 'CONNECTED',
  permission_status VARCHAR(50) NOT NULL DEFAULT 'AUTHORIZED',
  audience_size INT NOT NULL DEFAULT 0,
  engagement_rate DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  average_views INT NOT NULL DEFAULT 0,
  content_count INT NOT NULL DEFAULT 0,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_platform_account UNIQUE (platform, platform_account_id)
);

CREATE TABLE IF NOT EXISTS public.social_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  social_account_id UUID NOT NULL UNIQUE REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_type VARCHAR(50) DEFAULT 'Bearer',
  scope TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audience_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL,
  social_account_id UUID REFERENCES public.social_accounts(id) ON DELETE SET NULL,
  country_code VARCHAR(10),
  country_name VARCHAR(100),
  percentage DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  region VARCHAR(100),
  city VARCHAR(100),
  age_13_17 DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  age_18_24 DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  age_25_34 DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  age_35_44 DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  age_45_54 DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  age_55_plus DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  gender_male DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  gender_female DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  gender_other DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  interests JSONB DEFAULT '[]'::jsonb,
  confidence VARCHAR(50) NOT NULL DEFAULT 'MEASURED',
  measured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.content_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  social_account_id UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  external_content_id VARCHAR(255) NOT NULL,
  title TEXT,
  content_type VARCHAR(50), -- POST, REEL, VIDEO, STORY, SHORT, ARTICLE
  url TEXT,
  published_at TIMESTAMPTZ,
  views INT NOT NULL DEFAULT 0,
  likes INT NOT NULL DEFAULT 0,
  comments INT NOT NULL DEFAULT 0,
  shares INT NOT NULL DEFAULT 0,
  saves INT NOT NULL DEFAULT 0,
  engagement_rate DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  estimated_reach INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.creator_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  overall_score INT NOT NULL DEFAULT 0,
  audience_quality_score INT NOT NULL DEFAULT 0,
  authenticity_score INT NOT NULL DEFAULT 0,
  engagement_quality_score INT NOT NULL DEFAULT 0,
  reputation_score INT NOT NULL DEFAULT 0,
  brand_safety_score INT NOT NULL DEFAULT 0,
  data_confidence_score INT NOT NULL DEFAULT 0,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.creator_risk_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  signal_type VARCHAR(100) NOT NULL, -- UNUSUAL_FOLLOWER_GROWTH, ABNORMAL_ENGAGEMENT, SUSPICIOUS_AUDIENCE, GEOGRAPHIC_ANOMALY
  severity VARCHAR(50) NOT NULL DEFAULT 'LOW', -- LOW, MEDIUM, HIGH, CRITICAL
  confidence DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  evidence_summary TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'DETECTED',
  detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.creator_rate_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL UNIQUE REFERENCES public.creators(id) ON DELETE CASCADE,
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  instagram_reel_minor INT DEFAULT 0,
  instagram_story_minor INT DEFAULT 0,
  instagram_post_minor INT DEFAULT 0,
  youtube_dedicated_minor INT DEFAULT 0,
  youtube_integration_minor INT DEFAULT 0,
  youtube_short_minor INT DEFAULT 0,
  bundle_package_minor INT DEFAULT 0,
  custom_terms TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.creator_availabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL UNIQUE REFERENCES public.creators(id) ON DELETE CASCADE,
  current_status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE',
  max_campaigns_per_month INT NOT NULL DEFAULT 4,
  active_campaigns_count INT NOT NULL DEFAULT 0,
  next_available_date DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 5. CAMPAIGNS, APPLICATIONS & NEGOTIATIONS
-- --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  brief_details TEXT,
  target_audience JSONB,
  categories JSONB DEFAULT '[]'::jsonb,
  channels JSONB DEFAULT '[]'::jsonb,
  budget_minor INT NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  milestone_count INT NOT NULL DEFAULT 1,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  application_deadline TIMESTAMPTZ,
  status VARCHAR(50) NOT NULL DEFAULT 'DRAFT', -- DRAFT, PUBLISHED, IN_PROGRESS, COMPLETED, CANCELLED
  brand_safety_threshold INT NOT NULL DEFAULT 70,
  min_creator_score INT NOT NULL DEFAULT 60,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.campaign_deliverable_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  format VARCHAR(50) NOT NULL,
  guidelines TEXT,
  due_offset_days INT NOT NULL DEFAULT 7
);

CREATE TABLE IF NOT EXISTS public.campaign_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  proposed_quote_minor INT NOT NULL,
  pitch_message TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'SUBMITTED', -- SUBMITTED, SHORTLISTED, REJECTED, ACCEPTED
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_campaign_creator_app UNIQUE (campaign_id, creator_id)
);

CREATE TABLE IF NOT EXISTS public.campaign_bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  bid_amount_minor INT NOT NULL,
  deliverable_breakdown JSONB,
  status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.campaign_negotiations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  initiated_by_org BOOLEAN NOT NULL DEFAULT true,
  offered_amount_minor INT NOT NULL,
  requested_revisions_count INT NOT NULL DEFAULT 2,
  terms TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 6. CONTRACTS, DELIVERABLES & CONTENT REVIEW STUDIO
-- --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.campaign_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  contract_number VARCHAR(100) NOT NULL UNIQUE,
  total_contract_value_minor INT NOT NULL,
  platform_fee_minor INT NOT NULL,
  creator_net_payout_minor INT NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  contract_terms TEXT NOT NULL,
  usage_rights_days INT NOT NULL DEFAULT 90,
  revision_limit INT NOT NULL DEFAULT 2,
  status VARCHAR(50) NOT NULL DEFAULT 'DRAFT', -- DRAFT, PENDING_SIGNATURE, EXECUTED, ACTIVE, COMPLETED, DISPUTED, CANCELLED
  brand_signed_at TIMESTAMPTZ,
  creator_signed_at TIMESTAMPTZ,
  vault_funded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.campaign_deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.campaign_contracts(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  format VARCHAR(50) NOT NULL,
  milestone_order INT NOT NULL DEFAULT 1,
  allocated_amount_minor INT NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PENDING, IN_PRODUCTION, SUBMITTED_FOR_REVIEW, REVISION_REQUESTED, APPROVED, SETTLED
  content_url TEXT,
  file_storage_path TEXT,
  revisions_used INT NOT NULL DEFAULT 0,
  auto_approval_deadline TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.deliverable_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deliverable_id UUID NOT NULL REFERENCES public.campaign_deliverables(id) ON DELETE CASCADE,
  revision_number INT NOT NULL,
  feedback_notes TEXT NOT NULL,
  frame_timestamp_ms INT,
  status VARCHAR(50) NOT NULL DEFAULT 'REQUESTED',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 7. FINANCIAL LEDGER, MILESTONE VAULT & INVOICING
-- --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  contract_id UUID NOT NULL REFERENCES public.campaign_contracts(id) ON DELETE CASCADE,
  transaction_type VARCHAR(50) NOT NULL, -- ESCROW_DEPOSIT, ESCROW_RELEASE, ESCROW_REFUND, PLATFORM_FEE
  gross_amount INT NOT NULL,
  commission_rate DOUBLE PRECISION NOT NULL DEFAULT 5.00,
  commission_amount INT NOT NULL,
  creator_allocation_amount INT NOT NULL,
  payment_processing_fee INT NOT NULL DEFAULT 0,
  tax_amount INT NOT NULL DEFAULT 0,
  net_amount INT NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  payment_provider VARCHAR(50) NOT NULL DEFAULT 'INTERNAL_LEDGER', -- RAZORPAY, STRIPE, INTERNAL_LEDGER
  provider_transaction_id VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'HELD_IN_ESCROW', -- HELD_IN_ESCROW, SETTLED, REFUNDED, FAILED
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payout_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  transaction_id UUID NOT NULL UNIQUE REFERENCES public.transactions(id) ON DELETE CASCADE,
  amount INT NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  payout_method VARCHAR(50) NOT NULL DEFAULT 'BANK_TRANSFER',
  status VARCHAR(50) NOT NULL DEFAULT 'SCHEDULED', -- SCHEDULED, PROCESSING, DISPATCHED, COMPLETED, FAILED
  provider_reference VARCHAR(255),
  dispatched_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL UNIQUE REFERENCES public.transactions(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  invoice_number VARCHAR(100) NOT NULL UNIQUE,
  subtotal_minor INT NOT NULL,
  tax_minor INT NOT NULL,
  total_minor INT NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  pdf_storage_url TEXT,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.commission_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  default_rate DOUBLE PRECISION NOT NULL DEFAULT 5.00,
  min_fee_minor INT NOT NULL DEFAULT 0,
  is_default BOOLEAN NOT NULL DEFAULT true,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 8. REPUTATION, REVIEWS & DISPUTES
-- --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.campaign_contracts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.campaign_contracts(id) ON DELETE CASCADE,
  initiated_by_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  decided_by_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  reason VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'OPEN', -- OPEN, UNDER_REVIEW, RESOLVED_REFUND, RESOLVED_RELEASE, DISMISSED
  decision_notes TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.dispute_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id UUID NOT NULL REFERENCES public.disputes(id) ON DELETE CASCADE,
  submitted_by_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  evidence_url TEXT NOT NULL,
  file_type VARCHAR(50),
  description TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 9. MESSAGING & NOTIFICATIONS
-- --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES public.message_threads(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  attachment_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- CAMPAIGN, CONTRACT, DELIVERABLE, MILESTONE, VAULT, REVIEW
  action_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id VARCHAR(255) NOT NULL,
  ip_address VARCHAR(100),
  user_agent TEXT,
  changes JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 10. ATTACH AUTOMATED UPDATED_AT TRIGGERS
-- --------------------------------------------------------------------

DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN
    SELECT table_name FROM information_schema.columns
    WHERE table_schema = 'public' AND column_name = 'updated_at'
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS trg_update_timestamp ON public.%I;
      CREATE TRIGGER trg_update_timestamp
        BEFORE UPDATE ON public.%I
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    ', tbl, tbl);
  END LOOP;
END $$;

-- --------------------------------------------------------------------
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------------------

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Allow users to read verified creators publicly for directory discovery
CREATE POLICY "Public verified creators readable" ON public.creators
  FOR SELECT USING (true);

-- Allow public read of published campaigns
CREATE POLICY "Public published campaigns readable" ON public.campaigns
  FOR SELECT USING (status = 'PUBLISHED' OR status = 'IN_PROGRESS');

-- --------------------------------------------------------------------
-- 12. SUPABASE STORAGE BUCKETS
-- --------------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', true),
  ('media-kits', 'media-kits', true),
  ('deliverable-reviews', 'deliverable-reviews', false),
  ('contract-pdfs', 'contract-pdfs', false),
  ('dispute-evidence', 'dispute-evidence', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public read for avatars and media-kits
CREATE POLICY "Public Avatar Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars' OR bucket_id = 'media-kits');

-- Storage RLS: Authenticated users can upload to avatars
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id IN ('avatars', 'media-kits', 'deliverable-reviews'));
