export type Poll = {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  options: PollOption[];
  totalVotes: number;
};

export type PollOption = {
  id: string;
  text: string;
  votes: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Vote = {
  id: string;
  pollId: string;
  optionId: string;
  userId: string;
  createdAt: string;
};