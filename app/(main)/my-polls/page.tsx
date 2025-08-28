'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PollCard from '@/components/polls/poll-card';
import { useAuth } from '@/contexts/auth-context';
import { mockPolls } from '@/data/mock-polls';
import ProtectedRoute from '@/components/auth/protected-route';

export default function MyPollsPage() {
  const { user } = useAuth();

  // Filter polls created by the current user
  // In a real app, this would be fetched from an API
  const userPolls = mockPolls.filter(poll => poll.createdBy === user?.id);

  return (
    <ProtectedRoute>
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">My Polls</h1>
            <p className="text-muted-foreground">Manage polls you've created</p>
          </div>

          {userPolls.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPolls.map((poll) => (
                <PollCard key={poll.id} poll={poll} />
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>No polls found</CardTitle>
              </CardHeader>
              <CardContent>
                <p>You haven't created any polls yet. Create your first poll to get started!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}