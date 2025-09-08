import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side operations in Next.js Server Components.
 * 
 * @description
 * This module provides server-side Supabase client initialization with cookie handling
 * specifically designed for Next.js Server Components and API routes.
 * 
 * Why it's needed:
 * - Enables server-side data fetching in Server Components
 * - Manages authentication state in server context
 * - Handles cookie operations for session management
 * - Provides type-safe database access on the server
 * 
 * Assumptions:
 * - Running in a Server Component or API route context
 * - Environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
 * - Next.js cookies API is available
 * 
 * Edge Cases:
 * - Handles cookie operations in Server Components gracefully
 * - Manages concurrent requests with different auth states
 * - Maintains session consistency during SSR
 * - Handles cookie errors and missing values
 * 
 * Connected Components:
 * - Used in layout.tsx for server-side auth checks
 * - Powers protected API routes in api/
 * - Enables SSR data fetching in page.tsx files
 * 
 * @returns Configured Supabase client for server-side operations
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookie = await cookieStore.get(name)
          return cookie?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            await cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            await cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
