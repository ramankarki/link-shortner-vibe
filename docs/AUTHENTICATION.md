# Authentication Standards

## Overview

**All authentication** in this application is managed exclusively by **Clerk (v6.39.0)**. No alternative auth methods are permitted. Clerk provides user identity, session management, and account controls.

## Core Principles

1. **Clerk-only**: All auth logic routes through Clerk. No custom auth implementations.
2. **Protected routes**: Require explicit auth checks; use Clerk's `auth()` context in Server Components or `useAuth()` hook in Client Components.
3. **User-friendly flows**: Sign in/sign up always launch as modals, never replacing the page.
4. **Automatic redirects**: Logged-in users on the homepage redirect to `/dashboard`; unauthenticated users on protected routes bounce to sign in.

## Route Protection

### Protected Routes

The `/dashboard` route **must require** login:

- If unauthenticated: Clerk redirects to sign in modal or returns an error
- If authenticated: Route renders normally

Use the `auth()` context in a Server Component to check auth status:

```typescript
import { auth } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/'); // or let Clerk's middleware handle it
  }
  // Render dashboard
}
```

Alternatively, wrap the page with Clerk's `<SignedIn>` / `<SignedOut>` for client-side gating (useful for hybrid logic).

### Public Routes with Auth Redirect

The **homepage** (`/`) is public but redirects logged-in users to `/dashboard`:

```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) {
    redirect('/dashboard');
  }
  // Render login prompt or landing page
}
```

## Modal Sign In / Sign Up

Sign in and sign up **always launch as modals**:

- Use `<SignInButton mode="modal" />` and `<SignUpButton mode="modal" />` from the `@clerk/nextjs` package
- Do **not** use `mode="redirect"` which replaces the page
- Place these buttons in the header or login prompt for easy access

Example:

```tsx
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';

export default function Header() {
  return (
    <header>
      <SignedOut>
        <SignInButton mode="modal" />
        <SignUpButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
```

## Environment Variables

Ensure these Clerk environment variables are set in `.env.local`:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Public key for Clerk SDK initialization
- `CLERK_SECRET_KEY`: Secret key for server-side operations

These are configured in [app/layout.tsx](app/layout.tsx) under the `<ClerkProvider>` wrapper.

## Middleware (Optional)

If you want automatic redirection without Server Component logic, configure Clerk's middleware in `middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest))(?:.*))',
  ],
};
```

## User Session & Data

Access authenticated user data via Clerk hooks (Client Components):

```typescript
"use client";

import { useAuth, useUser } from "@clerk/nextjs";

export default function ProfileCard() {
  const { userId } = useAuth();
  const { user } = useUser();

  return <div>Hello, {user?.firstName}!</div>;
}
```

In Server Components, use `auth()`:

```typescript
import { auth } from '@clerk/nextjs/server';

const { userId, sessionId } = await auth();
```

## Logging Out

Clerk's `<UserButton />` component includes a logout option when clicked. No custom logout route is needed.

## Anti-Pattern: Do Not Use

❌ Custom JWT or session-based auth  
❌ Storing passwords in the database  
❌ Multiple auth providers mixed with Clerk  
❌ Bypassing Clerk's `useAuth()` or `auth()` checks

---

For more details, see [Clerk Documentation](https://clerk.com/docs).
