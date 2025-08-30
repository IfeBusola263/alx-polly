import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PollCard from '@/components/polls/poll-card';
import { createClient } from '@/lib/supabase/server';
import { Poll, PollOption } from '@/types';

export default async function PollsPage() {
  const supabase = createClient();
  
  // Fetch polls with their options
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
    .order('created_at', { ascending: false });
  
  // Format the polls data to match our Poll type
  const polls: Poll[] = pollsData?.map((pollData: any) => {
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
  }) || [];
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Browse Polls</h1>
          <p className="text-muted-foreground">Discover and vote on polls created by the community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>

        {polls.length === 0 && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>No polls found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>There are no polls available at the moment. Check back later or create your own!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}