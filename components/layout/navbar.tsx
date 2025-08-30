'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">Polly</Link>
          
          {user && (
            <nav className="hidden md:flex gap-6">
              <Link 
                href="/polls" 
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/polls') ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Browse Polls
              </Link>
              <Link 
                href="/polls/create" 
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/polls/create') ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Create Poll
              </Link>
              <Link 
                href="/my-polls" 
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/my-polls') ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                My Polls
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarFallback>{user.email?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-polls">My Polls</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/api/auth/signout" prefetch={false}>Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}