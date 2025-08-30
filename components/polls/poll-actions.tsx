'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

interface PollActionsProps {
  pollId: string;
  createdBy: string;
  currentUserId: string | undefined;
}

export default function PollActions({
  pollId,
  createdBy,
  currentUserId,
}: PollActionsProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this poll?')) {
      const { error } = await supabase.from('polls').delete().eq('id', pollId);
      if (error) {
        console.error('Error deleting poll:', error);
        alert('Failed to delete poll.');
      } else {
        alert('Poll deleted successfully!');
        router.push('/polls');
      }
    }
  };

  if (!currentUserId || createdBy !== currentUserId) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => router.push(`/polls/${pollId}/edit`)}>
        Edit Poll
      </Button>
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        Delete Poll
      </Button>
    </div>
  );
}