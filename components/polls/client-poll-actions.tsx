'use client';

import { Poll } from '@/types';
import PollActions from './poll-actions';

interface ClientPollActionsProps {
  poll: Poll;
  currentUserId: string | null;
}

export default function ClientPollActions({
  poll,
  currentUserId,
}: ClientPollActionsProps) {
  return <PollActions poll={poll} currentUserId={currentUserId} />;
}