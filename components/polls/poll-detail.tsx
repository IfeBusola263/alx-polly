'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Poll } from '@/types';
import { useAuth } from '@/contexts/auth-context';

type PollDetailProps = {
  poll: Poll;
};

export default function PollDetail({ poll }: PollDetailProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleVote = async () => {
    if (!selectedOption) return;
    if (!user) {
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      // This would be replaced with actual API call
      console.log('Voting for option:', selectedOption);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Refresh the page to show updated results
      router.refresh();
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate percentages for the progress bars
  const calculatePercentage = (votes: number) => {
    if (poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{poll.title}</CardTitle>
        {poll.description && (
          <CardDescription>{poll.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {poll.options.map((option) => (
            <div key={option.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id={option.id}
                  name="poll-option"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  className="h-4 w-4"
                />
                <label htmlFor={option.id} className="flex-grow cursor-pointer">
                  {option.text}
                </label>
                <span className="text-sm text-muted-foreground">
                  {calculatePercentage(option.votes)}%
                </span>
              </div>
              <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${calculatePercentage(option.votes)}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground">
                {option.votes} {option.votes === 1 ? 'vote' : 'votes'}
              </div>
            </div>
          ))}
        </div>

        <div className="text-sm text-muted-foreground pt-4">
          <p>Total votes: {poll.totalVotes}</p>
          {poll.expiresAt && (
            <p>
              Expires: {new Date(poll.expiresAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleVote} 
          disabled={!selectedOption || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Vote'}
        </Button>
      </CardFooter>
    </Card>
  );
}