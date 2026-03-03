# Copilot Instructions for Link Shortener

## Project Overview

**Link Shortener** is a Next.js 16 application for creating and managing shortened URLs. Built with modern tools: Clerk for authentication, Drizzle ORM for database access with PostgreSQL (Neon), and styled with Tailwind CSS + Shadcn/UI components.

**Core Domain**: URL shortening service with user authentication and management.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript with strict mode enabled
- **Database**: PostgreSQL via Neon, accessed through Drizzle ORM 0.45.1
- **Auth**: Clerk (v6.39.0) for user management and authentication
- **UI**: React 19 + Tailwind CSS 4 + Shadcn/UI components + Radix UI
- **Build**: TSX for scripting, ESLint for linting, PostCSS for CSS processing

## Architecture

### Data Flow

Users authenticate via Clerk → Protected routes check auth context → Database queries via Drizzle ORM → Server Components render with data or Client Components for interactivity.

## Key Conventions & Patterns

### Import Path Alias

Use `@/*` for root-relative imports:

```typescript
import { cn } from '@/lib/utils'; // → ./lib/utils.ts
```

### CSS Class Merging

Use the `cn()` utility from [lib/utils.ts](lib/utils.ts) for safe Tailwind className composition:

```typescript
<button className={cn("px-4 py-2", isActive && "bg-blue-500")} />
```

### Authentication

Clerk components handle auth state; use `SignedIn` / `SignedOut` for conditional rendering without manual checks.

### Component Structure

- **Server Components** (default): Safe for sensitive logic, direct database access
- **Client Components** (`'use client'`): For interactive elements, form states, event handlers
- **UI Components**: Leverage Shadcn/UI for consistency; add via `components.json`

## Development Workflows

### Getting Started

```bash
pnpm install                  # Install dependencies
pnpm dev                      # Start dev server (localhost:3000 with hot reload)
```

### Building & Deployment

```bash
pnpm build                    # Production build
pnpm start                    # Start production server
pnpm lint                     # Run ESLint
```

### Database Migrations

```bash
drizzle-kit push/pull         # Sync schema with database (via drizzle.config.ts)
```

Schema is defined in `db/schema.ts` (referencing `drizzle.config.ts`); Drizzle Kit manages the migration workflow.

## Environment Setup

Required `.env` variables (see `.env` if available):

- `DATABASE_URL`: PostgreSQL connection string (Neon format)
- `CLERK_*`: Clerk publishable and secret keys

## File Organization

```
app/               # Next.js App Router pages and layouts
  layout.tsx       # Root layout with Clerk provider and header
  page.tsx         # Home page
  globals.css      # Global styles
db/
  index.ts         # Drizzle ORM instance
  schema.ts        # (Expected) Database schema definitions
lib/
  utils.ts         # Shared utilities (e.g., cn() for Tailwind classes)
.github/
  copilot-instructions.md  # This file
```

## Notes for Agents

- This is an **early-stage project**: only layout and page scaffolding exist; no API routes or complex features yet
- **No database schema defined**: Add schema to `db/schema.ts` before implementing features
- **Gradual API expansion expected**: Follow the established Clerk + Drizzle pattern when adding routes
- Always check **strict TypeScript** mode—types must be explicit and complete
