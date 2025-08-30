'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPoll(formData: FormData) {
  const supabase = await createClient();
  
  // Get the current user
const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  // Extract form data
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  
  // Get all options (they come as option-0, option-1, etc.)
  const optionEntries = Array.from(formData.entries())
    .filter(([key]) => key.startsWith('option-'))
    .map(([_, value]) => value as string)
    .filter(value => value.trim() !== '');
  
  // Validate
  if (!title || title.trim() === '') {
    return { error: 'Title is required' };
  }
  
  if (optionEntries.length < 2) {
    return { error: 'At least two options are required' };
  }
  
  // Get expiration date if provided
  const expiresAtStr = formData.get('expiresAt') as string;
  const expiresAt = expiresAtStr ? new Date(expiresAtStr).toISOString() : null;
  
  try {
    // Insert poll into database
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .insert({
        title,
        description: description || null,
        created_by: user.id,
        expires_at: expiresAt,
      })
      .select()
      .single();
    
    if (pollError) throw pollError;
    
    // Insert options
    const optionsToInsert = optionEntries.map(text => ({
      poll_id: poll.id,
      text,
      votes: 0,
    }));
    
    const { error: optionsError } = await supabase
      .from('poll_options')
      .insert(optionsToInsert);
    
    if (optionsError) throw optionsError;
    
    // Revalidate the polls page and redirect
    revalidatePath('/polls');
    revalidatePath('/my-polls');
    redirect('/polls/' + poll.id);
  } catch (error) {
    console.error('Error creating poll:', error);
    return { error: 'Failed to create poll. Please try again.' };
  }
}