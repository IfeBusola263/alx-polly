'use client';

import { useState } from 'react';
import { Poll } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { voteOnPoll } from '@/app/(main)/polls/[id]/actions';

type PollVoteProps = {
  poll: Poll;
  onVoteComplete?: () => void;
};

export default function PollVote({ poll, onVoteComplete }: PollVoteProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVote = async () => {
    if (!selectedOption) {
      setError('Please select an option');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const result = await voteOnPoll(poll.id, selectedOption);
      
      if (result.error) {
        setError(result.error);
      } else if (onVoteComplete) {
        onVoteComplete();
      }
    } catch (err) {
      setError('Failed to submit vote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Cast Your Vote</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedOption || ''} 
          onValueChange={setSelectedOption}
          className="space-y-3"
        >
          {poll.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {error && (
          <div className="text-destructive text-sm mt-4">{error}</div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleVote} 
          disabled={isSubmitting || !selectedOption}
          className="w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Vote'}
        </Button>
      </CardFooter>
    </Card>
  );
}