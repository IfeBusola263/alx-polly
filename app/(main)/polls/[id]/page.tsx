import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PollDetail from '@/components/polls/poll-detail';
import { getPollById } from '@/data/mock-polls';

type PollPageProps = {
  params: {
    id: string;
  };
};

export default function PollPage({ params }: PollPageProps) {
  const { id } = params;
  const poll = getPollById(id);

  if (!poll) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/polls">← Back to Polls</Link>
          </Button>
        </div>

        <PollDetail poll={poll} />
      </div>
    </div>
  );
}