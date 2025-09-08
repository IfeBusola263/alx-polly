'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a Supabase client for browser-side operations.
 * 
 * @description
 * This module is essential for client-side Supabase operations in the Polly application.
 * It's specifically marked with 'use client' to ensure it only runs in the browser context.
 * 
 * Why it's needed:
 * - Handles client-side authentication state
 * - Manages real-time subscriptions for live poll updates
 * - Provides direct database access for immediate UI updates
 * 
 * Assumptions:
 * - Environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
 * - Only used in client components (marked with 'use client')
 * 
 * Edge Cases:
 * - Handles token refresh automatically
 * - Manages connection drops and reconnections
 * - Maintains state consistency during page navigation
 * 
 * Connected Components:
 * - Used in auth-context.tsx for user session management
 * - Powers real-time updates in poll-results.tsx
 * - Enables immediate UI feedback in poll-vote.tsx
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}