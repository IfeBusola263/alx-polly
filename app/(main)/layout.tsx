import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polly - Interactive Polling App',
  description: 'Create and participate in polls with Polly',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {children}
    </div>
  );
}