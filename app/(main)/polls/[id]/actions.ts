'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function voteOnPoll(pollId: string, optionId: string) {
  const supabase = await createClient();
  
  // Get the current user
const supabaseClient = supabase;
const { data: { user } } = await supabaseClient.auth.getUser();
  
  if (!user) {
    return { error: 'You must be logged in to vote' };
  }
  
  try {
    // Check if user has already voted on this poll
    const { data: existingVote } = await supabase
      .from('votes')
      .select()
      .eq('poll_id', pollId)
      .eq('user_id', user.id)
      .single();
    
    if (existingVote) {
      return { error: 'You have already voted on this poll' };
    }
    
    // Start a transaction to ensure data consistency
    // 1. Insert the vote
    const { error: voteError } = await supabase
      .from('votes')
      .insert({
        poll_id: pollId,
        option_id: optionId,
        user_id: user.id,
      });
    
    if (voteError) throw voteError;
    
    // 2. Increment the vote count for the option
    const { error: updateError } = await supabase.rpc('increment_vote', {
      option_id_param: optionId
    });
    
    if (updateError) throw updateError;
    
    // Revalidate the poll page to show updated results
    revalidatePath(`/polls/${pollId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error voting on poll:', error);
    return { error: 'Failed to vote. Please try again.' };
  }
}