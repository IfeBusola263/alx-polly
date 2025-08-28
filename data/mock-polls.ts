import { Poll } from '@/types';

export const mockPolls: Poll[] = [
  {
    id: '1',
    title: 'What is your favorite programming language?',
    description: 'Vote for your preferred programming language for web development.',
    createdBy: 'user1',
    createdAt: '2023-06-15T10:00:00Z',
    options: [
      { id: '1-1', text: 'JavaScript', votes: 42 },
      { id: '1-2', text: 'TypeScript', votes: 35 },
      { id: '1-3', text: 'Python', votes: 28 },
      { id: '1-4', text: 'Java', votes: 15 },
      { id: '1-5', text: 'C#', votes: 20 },
    ],
    totalVotes: 140,
  },
  {
    id: '2',
    title: 'Which frontend framework do you prefer?',
    description: 'Vote for your favorite frontend framework or library.',
    createdBy: 'user2',
    createdAt: '2023-06-20T14:30:00Z',
    options: [
      { id: '2-1', text: 'React', votes: 50 },
      { id: '2-2', text: 'Vue', votes: 30 },
      { id: '2-3', text: 'Angular', votes: 25 },
      { id: '2-4', text: 'Svelte', votes: 15 },
    ],
    totalVotes: 120,
  },
  {
    id: '3',
    title: 'How do you prefer to style your web applications?',
    createdBy: 'user1',
    createdAt: '2023-07-05T09:15:00Z',
    options: [
      { id: '3-1', text: 'CSS Modules', votes: 22 },
      { id: '3-2', text: 'Tailwind CSS', votes: 45 },
      { id: '3-3', text: 'Styled Components', votes: 30 },
      { id: '3-4', text: 'SASS/SCSS', votes: 28 },
      { id: '3-5', text: 'CSS-in-JS (other)', votes: 15 },
    ],
    totalVotes: 140,
  },
  {
    id: '4',
    title: 'What is your preferred deployment platform?',
    description: 'Where do you usually deploy your web applications?',
    createdBy: 'user3',
    createdAt: '2023-07-10T16:45:00Z',
    expiresAt: '2023-08-10T16:45:00Z',
    options: [
      { id: '4-1', text: 'Vercel', votes: 38 },
      { id: '4-2', text: 'Netlify', votes: 32 },
      { id: '4-3', text: 'AWS', votes: 25 },
      { id: '4-4', text: 'Google Cloud', votes: 18 },
      { id: '4-5', text: 'Azure', votes: 12 },
      { id: '4-6', text: 'Self-hosted', votes: 10 },
    ],
    totalVotes: 135,
  },
  {
    id: '5',
    title: 'How many years of experience do you have in web development?',
    createdBy: 'user2',
    createdAt: '2023-07-15T11:30:00Z',
    options: [
      { id: '5-1', text: 'Less than 1 year', votes: 15 },
      { id: '5-2', text: '1-3 years', votes: 25 },
      { id: '5-3', text: '3-5 years', votes: 30 },
      { id: '5-4', text: '5-10 years', votes: 20 },
      { id: '5-5', text: 'More than 10 years', votes: 10 },
    ],
    totalVotes: 100,
  },
];

export function getPollById(id: string): Poll | undefined {
  return mockPolls.find(poll => poll.id === id);
}