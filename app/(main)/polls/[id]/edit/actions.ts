'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updatePoll(pollId: string, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const expiresAt = formData.get('expiresAt') as string;

  const options: { text: string }[] = [];
  formData.forEach((value, key) => {
    if (key.startsWith('option-')) {
      options.push({ text: value as string });
    }
  });

  if (!title || options.length < 2) {
    return { error: 'Title and at least two options are required.' };
  }

  const { data: existingPoll, error: fetchError } = await supabase
    .from('polls')
    .select('createdBy')
    .eq('id', pollId)
    .single();

  if (fetchError || !existingPoll) {
    return { error: 'Poll not found.' };
  }

  if (existingPoll.createdBy !== user.id) {
    return { error: 'Forbidden: You do not own this poll.' };
  }

  const { error } = await supabase
    .from('polls')
    .update({
      title,
      description,
      options,
      expiresAt: expiresAt || null,
    })
    .eq('id', pollId);

  if (error) {
    console.error('Error updating poll:', error);
    return { error: 'Failed to update poll.' };
  }

  revalidatePath(`/polls/${pollId}`);
  revalidatePath('/my-polls');
  redirect(`/polls/${pollId}`);
}