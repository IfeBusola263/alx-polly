'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

import { createClient } from '@/lib/supabase/browser';


import { Poll } from '@/types';

interface PollActionsProps {
  poll: Poll;
  currentUserId: string | null;
}

export default function PollActions({ poll, currentUserId }: PollActionsProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this poll?')) {
      return;
    }
    setIsDeleting(true);
    const { error } = await supabase.from('polls').delete().eq('id', poll.id);
    if (error) {
      toast.error('Failed to delete poll.');
      console.error('Error deleting poll:', error);
    } else {
      toast.success('Poll deleted successfully.');
      router.push('/my-polls');
      router.refresh();
    }
    setIsDeleting(false);
  };

  if (!currentUserId || poll.createdBy !== currentUserId) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Link href={`/polls/${poll.id}/edit/`}>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </Link>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  );
}