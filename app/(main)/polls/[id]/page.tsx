import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PollVote from '@/components/polls/poll-vote';
import PollResults from '@/components/polls/poll-results';
import { Poll, PollOption } from '@/types';

export default async function PollPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch the poll with its options
  const { data: pollData, error: pollError } = await supabase
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
    .eq('id', params.id)
    .single();
  
  if (pollError || !pollData) {
    notFound();
  }
  
  // Check if the user has already voted on this poll
  let hasVoted = false;
  if (user) {
    const { data: voteData } = await supabase
      .from('votes')
      .select()
      .eq('poll_id', params.id)
      .eq('user_id', user.id)
      .single();
    
    hasVoted = !!voteData;
  }
  
  // Format the poll data to match our Poll type
  const options: PollOption[] = pollData.poll_options.map((option: any) => ({
    id: option.id,
    text: option.text,
    votes: option.votes,
  }));
  
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
  
  const poll: Poll = {
    id: pollData.id,
    title: pollData.title,
    description: pollData.description || undefined,
    createdBy: pollData.created_by,
    createdAt: pollData.created_at,
    expiresAt: pollData.expires_at || undefined,
    options,
    totalVotes,
  };
  
  // Check if poll has expired
  const isExpired = poll.expiresAt ? new Date(poll.expiresAt) < new Date() : false;

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/polls">← Back to Polls</Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{poll.title}</CardTitle>
          {poll.description && (
            <p className="text-muted-foreground">{poll.description}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            {poll.expiresAt && (
              <p className="text-sm text-muted-foreground">
                Expires: {new Date(poll.expiresAt).toLocaleDateString()}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              Created: {new Date(poll.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Show voting UI if user hasn't voted and poll isn't expired */}
        {!hasVoted && !isExpired && user && (
          <div className="md:col-span-1">
            <PollVote poll={poll} />
          </div>
        )}
        
        {/* Always show results */}
        <div className={`${!hasVoted && !isExpired && user ? 'md:col-span-1' : 'md:col-span-2'}`}>
          <PollResults poll={poll} />
        </div>
      </div>
      
      {/* Messages for different states */}
      {isExpired && (
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <p className="text-center">This poll has expired and is no longer accepting votes.</p>
          </CardContent>
        </Card>
      )}
      
      {!user && !isExpired && (
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <p className="text-center">Please <a href="/login" className="underline">log in</a> to vote on this poll.</p>
          </CardContent>
        </Card>
      )}
      
      {hasVoted && !isExpired && (
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <p className="text-center">Thank you for voting! You have already cast your vote on this poll.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}