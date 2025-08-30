'use server';

import { createClient } from '@/lib/supabase/server';
import { Poll, PollOption } from '@/types';

export async function getUserPolls() {
  const supabase = await createClient();
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }
  
  // Fetch polls created by the current user with their options
  const { data: pollsData, error } = await supabase
    .from('polls')
    .select(`
      id,
      title,
      description,
      created_by,
      created_at,
      expires_at,
      poll_options (id, text, votes)
    `)
    .eq('created_by', user.id)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching user polls:', error);
    return [];
  }
  
  // Format the polls data to match our Poll type
  const polls: Poll[] = pollsData.map((pollData: any) => {
    const options: PollOption[] = pollData.poll_options.map((option: any) => ({
      id: option.id,
      text: option.text,
      votes: option.votes,
    }));
    
    const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
    
    return {
      id: pollData.id,
      title: pollData.title,
      description: pollData.description || undefined,
      createdBy: pollData.created_by,
      createdAt: pollData.created_at,
      expiresAt: pollData.expires_at || undefined,
      options,
      totalVotes,
    };
  });
  
  return polls;
}