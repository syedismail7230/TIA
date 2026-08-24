-- ====================================================================
-- THE INFLUENCER'S AGENCY (TIA) - SEED DATA FOR SUPABASE
-- Inserts Initial Platform Config, Verified Creators, and Campaigns
-- ====================================================================

-- 1. Default Commission Config (5.00%)
INSERT INTO public.commission_configs (default_rate, min_fee_minor, is_default, active)
VALUES (5.00, 0, true, true)
ON CONFLICT DO NOTHING;

-- 2. Seed Admin / Test Users
INSERT INTO public.users (id, email, password_hash, name, role, email_verified, country)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'creator.riya@tia.agency', '$2a$10$ep/0tWcQhKqC5P1l2pYcSe1k8T2hVz5k7.tqC0h7m9wQ3mKz6jWKi', 'Riya Sharma', 'CREATOR', true, 'India'),
  ('22222222-2222-2222-2222-222222222222', 'creator.arjun@tia.agency', '$2a$10$ep/0tWcQhKqC5P1l2pYcSe1k8T2hVz5k7.tqC0h7m9wQ3mKz6jWKi', 'Arjun Mehta', 'CREATOR', true, 'India'),
  ('33333333-3333-3333-3333-333333333333', 'brand.zomato@tia.agency', '$2a$10$ep/0tWcQhKqC5P1l2pYcSe1k8T2hVz5k7.tqC0h7m9wQ3mKz6jWKi', 'Marketing Lead', 'BRAND_ADMIN', true, 'India')
ON CONFLICT (email) DO NOTHING;

-- 3. Seed Verified Creators
INSERT INTO public.creators (id, user_id, display_name, username, bio, country, city, languages, categories, verification_status, intelligence_score, reputation_score, brand_safety_score)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Riya Sharma', 'riyasharma_tech', 'Tech reviewer, developer advocate, and gadget breakdowns.', 'India', 'Bengaluru', '["English", "Hindi"]'::jsonb, '["Tech", "AI & SaaS"]'::jsonb, 'VERIFIED_CREATOR', 94, 98, 99),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Arjun Mehta', 'arjun_fitness', 'Strength coach, nutrition facts, and athlete lifestyle.', 'India', 'Mumbai', '["English", "Hindi"]'::jsonb, '["Fitness", "Wellness"]'::jsonb, 'VERIFIED_CREATOR', 89, 95, 96)
ON CONFLICT (username) DO NOTHING;

-- 4. Seed Rate Cards
INSERT INTO public.creator_rate_cards (creator_id, currency, instagram_reel_minor, instagram_story_minor, youtube_dedicated_minor, youtube_integration_minor, bundle_package_minor)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'INR', 7500000, 2500000, 20000000, 10000000, 25000000),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'INR', 5000000, 1500000, 15000000, 7500000, 18000000)
ON CONFLICT (creator_id) DO NOTHING;

-- 5. Seed Brand Organization
INSERT INTO public.organizations (id, name, legal_name, country, website, business_category, verification_status)
VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Nexus D2C Brands', 'Nexus Consumer Products Pvt Ltd', 'India', 'https://nexus.example', 'D2C Consumer Tech', 'VERIFIED')
ON CONFLICT DO NOTHING;

INSERT INTO public.organization_members (organization_id, user_id, role)
VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'OWNER')
ON CONFLICT DO NOTHING;

-- 6. Seed Public Campaign
INSERT INTO public.campaigns (id, organization_id, title, description, brief_details, categories, channels, budget_minor, currency, milestone_count, status)
VALUES
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Q3 Next-Gen Smart Ring Launch', 'Looking for tier-1 tech & fitness creators for an authentic 60s Reel review of our smart health tracker.', 'Highlight sleep tracking, battery life, and lightweight titanium finish. Strict 2-round review cycle.', '["Tech", "Fitness"]'::jsonb, '["Instagram", "YouTube"]'::jsonb, 50000000, 'INR', 2, 'PUBLISHED')
ON CONFLICT DO NOTHING;
