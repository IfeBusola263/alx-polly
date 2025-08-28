'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${new URL(process.env.NEXT_PUBLIC_SITE_URL!).origin}/auth/callback`,
    },
  })

  if (error) {
    return redirect('/register?message=Could not authenticate user')
  }

  return redirect('/register?message=Check email to continue sign in process')
}