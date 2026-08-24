import { createClient } from '@supabase/supabase-js';

/**
 * Service Role Admin client.
 * Bypasses Row Level Security (RLS) for server-only background processes:
 * - Payment webhook processing (Razorpay/Stripe)
 * - Financial ledger milestone settlement
 * - Background audience data synchronizers
 *
 * NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser or public client!
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn('⚠️ Supabase Admin client missing service role credentials.');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export const supabaseAdmin = createAdminClient();
