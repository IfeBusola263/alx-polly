import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PollCard from '@/components/polls/poll-card';
import { mockPolls } from '@/data/mock-polls';

export default function PollsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Browse Polls</h1>
          <p className="text-muted-foreground">Discover and vote on polls created by the community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPolls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>

        {mockPolls.length === 0 && (
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