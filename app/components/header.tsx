'use client';

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <h1 className="text-2xl font-bold">Link Shortener</h1>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
