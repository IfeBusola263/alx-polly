import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Creates a Supabase server client with cookie management for middleware operations.
 * 
 * @description
 * This middleware is crucial for handling authentication state and session management
 * in the server-side rendering (SSR) context of the Polly application.
 * 
 * Why it's needed:
 * - Manages authentication cookies across server-side operations
 * - Ensures session persistence between client and server
 * - Handles token refresh and session recovery
 * - Enables protected route access control
 * 
 * Assumptions:
 * - Running in middleware or server component context
 * - Environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
 * - NextRequest object is available
 * 
 * Edge Cases:
 * - Handles cookie expiration and renewal
 * - Manages concurrent requests with different auth states
 * - Preserves session during route changes
 * - Handles missing or invalid cookies
 * 
 * Connected Components:
 * - Used in middleware.ts for route protection
 * - Powers server-side authentication checks in layout.tsx
 * - Enables SSR data fetching in protected pages
 * 
 * @param request - The incoming Next.js request object
 * @returns Object containing Supabase client and modified response
 */
export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is updated, update the cookies for the request and response
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the cookies for the request and response
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  return { supabase, response }
}
