import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Poll } from '@/types';

type PollCardProps = {
  poll: Poll;
};

export default function PollCard({ poll }: PollCardProps) {
  const { id, title, description, createdAt, totalVotes } = poll;
  
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {description && (
          <p className="text-muted-foreground line-clamp-3 mb-4">{description}</p>
        )}
        <div className="text-sm text-muted-foreground">
          <p>Created: {formattedDate}</p>
          <p>{totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/polls/${id}`}>View Poll</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}