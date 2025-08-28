import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - Polly',
  description: 'Login or register for Polly polling app',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen flex items-center justify-center p-4">
      {children}
    </div>
  );
}