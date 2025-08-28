'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PollForm from '@/components/polls/poll-form';
import ProtectedRoute from '@/components/auth/protected-route';

export default function CreatePollPage() {

  return (
    <ProtectedRoute>
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Create a New Poll</h1>
            <Button variant="outline" asChild>
              <Link href="/polls">Cancel</Link>
            </Button>
          </div>
          
          <PollForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}