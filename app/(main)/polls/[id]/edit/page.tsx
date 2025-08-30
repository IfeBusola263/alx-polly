import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PollForm from '@/components/polls/poll-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function EditPollPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: poll } = await supabase
    .from('polls')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!poll || poll.createdBy !== user.id) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Poll</CardTitle>
        </CardHeader>
        <CardContent>
          <PollForm initialData={poll} />
        </CardContent>
      </Card>
    </div>
  );
}