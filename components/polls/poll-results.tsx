'use client';

import { useState } from 'react';
import { Poll } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type PollResultsProps = {
  poll: Poll;
};

export default function PollResults({ poll }: PollResultsProps) {
  // Calculate percentages for each option
  const getPercentage = (votes: number) => {
    if (poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {poll.options.map((option) => {
          const percentage = getPercentage(option.votes);
          
          return (
            <div key={option.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{option.text}</span>
                <span className="text-sm text-muted-foreground">
                  {option.votes} votes ({percentage}%)
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
        
        <div className="text-sm text-muted-foreground mt-4">
          Total votes: {poll.totalVotes}
        </div>
      </CardContent>
    </Card>
  );
}