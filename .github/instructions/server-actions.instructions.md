---
description: Read this before implementing server actions and data mutations in this project.
---

# Server Actions Instructions

## Overview

All data mutations in this app must be performed through **server actions**. This ensures secure handling of sensitive operations, direct database access, and proper validation before any changes are persisted.

## Core Rules

### 1. File Organization

- Server action files **MUST** be named `actions.ts`
- They **MUST** be colocated in the directory of the component that calls them
- Example structure:
  ```
  app/dashboard/
    actions.ts          ← Server actions for dashboard
    page.tsx            ← Dashboard component
  ```

### 2. Calling Server Actions

- Server actions can **ONLY** be called from **client components** (`'use client'`)
- Use the `"use server"` directive at the top of `actions.ts`
- Client components import and invoke server actions like regular async functions

```typescript
// app/dashboard/actions.ts
'use server';

export async function updateLink(data: UpdateLinkRequest) {
  // ...
}

// app/dashboard/page.tsx
('use client');
import { updateLink } from './actions';

export default function Dashboard() {
  async function handleUpdate() {
    await updateLink(formData);
  }
  // ...
}
```

### 3. Type Safety

- All data passed to server actions **MUST** have explicit TypeScript types
- **DO NOT** use the `FormData` TypeScript type
- Define clear request/response types:

```typescript
interface UpdateLinkRequest {
  id: string;
  shortCode: string;
  destination: string;
}

interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### 4. Validation

- **ALL** data passed to server actions **MUST** be validated using **Zod**
- Validate immediately after receiving parameters
- Return validation errors in the response object (never throw)

```typescript
import { z } from 'zod';

const updateLinkSchema = z.object({
  id: z.string().uuid(),
  shortCode: z.string().min(1).max(50),
  destination: z.string().url(),
});

export async function updateLink(data: unknown): Promise<ActionResult<Link>> {
  const validation = updateLinkSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: 'Invalid input' };
  }
  // ...
}
```

### 5. Authentication Check

- **ALL** server actions **MUST** check for a logged-in user **before** proceeding
- Use `auth()` from Clerk to verify authentication
- Return an error if the user is not authenticated

```typescript
import { auth } from '@clerk/nextjs/server';

export async function updateLink(
  data: UpdateLinkRequest,
): Promise<ActionResult<Link>> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }
  // Continue with database operations
}
```

### 6. Database Operations

- **DO NOT** use Drizzle queries directly in server actions
- All database operations **MUST** go through helper functions in the `/data` directory
- Import and call these helper functions from server actions

```typescript
// data/links.ts - Helper function
export async function getLink(id: string) {
  return db.query.links.findFirst({ where: eq(links.id, id) });
}

// app/dashboard/actions.ts - Server action
import { getLink } from '@/data/links';

export async function updateLink(data: UpdateLinkRequest) {
  const link = await getLink(data.id);
  // ...
}
```

### 7. Error Handling

- Server actions **MUST NOT throw errors**
- Always return an object with `success` and `error` properties
- Use this pattern for consistent error responses:

```typescript
export async function updateLink(data: unknown): Promise<ActionResult<Link>> {
  try {
    // Validation
    const validation = updateLinkSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, error: 'Validation failed' };
    }

    // Auth check
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    // Database operation
    const result = await updateLinkInDb(validation.data);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
}
```

## Summary

1. **File naming**: `actions.ts` (colocated with component)
2. **Caller**: Client components only
3. **Types**: Explicit TS types (no `FormData`)
4. **Validation**: Zod schemas for all inputs
5. **Auth**: Check logged-in user first
6. **DB access**: Via `/data` helper functions, not direct Drizzle
7. **Errors**: Return error/success objects, no throwing

This pattern ensures security, maintainability, and consistent error handling across all data mutations.
