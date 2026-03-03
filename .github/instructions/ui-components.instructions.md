---
description: Read this before implementing or modifying ui components in this project.
---

# UI Components Guidelines

## Overview

All UI elements in this application must use **Shadcn/UI components**. Custom components are not allowed. This ensures consistency, maintainability, and leverages battle-tested accessible components from the Radix UI foundation.

## Core Principles

1. **Shadcn/UI Only**: All UI elements must be built using Shadcn/UI components.
2. **No Custom Components**: Do not create custom wrapper components or styling wrappers around Shadcn components.
3. **Composition Over Customization**: Combine existing Shadcn components to achieve desired functionality.
4. **Consistent Styling**: Use Tailwind CSS utility classes and the `cn()` utility for className composition.

## Available Shadcn/UI Components

Shadcn/UI provides a wide range of components. Install new components as needed using:

```bash
pnpm dlx shadcn-ui@latest add <component-name>
```

Common components available:

- **Forms**: Input, Textarea, Select, Checkbox, Radio, Toggle, Combobox
- **Tables**: Data Table
- **Navigation**: Tabs, NavigationMenu, Breadcrumb, Pagination
- **Overlays**: Dialog, Drawer, Popover, Tooltip, Dropdown Menu
- **Display**: Badge, Avatar, Card, Separator, Skeleton
- **Alerts**: Alert, Toast (Sonner integration)
- **Buttons**: Button (primary interactive element)
- **Feedback**: Progress, Loading Spinner

Check the [Shadcn/UI Documentation](https://ui.shadcn.com) for complete list and component APIs.

## Component Usage Pattern

### Basic Button

```typescript
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}
```

### Form with Input

```typescript
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function UrlForm() {
  const [url, setUrl] = useState('');

  return (
    <div className="space-y-4">
      <Input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button onClick={() => console.log(url)}>Shorten</Button>
    </div>
  );
}
```

### Using Dialog

```typescript
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function MyDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Title</DialogTitle>
          </DialogHeader>
          {/* Dialog content */}
        </DialogContent>
      </Dialog>
    </>
  );
}
```

## Styling Components

### Using the `cn()` Utility

The `cn()` utility from [lib/utils.ts](../lib/utils.ts) safely merges Tailwind CSS classes:

```typescript
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function StyledButton() {
  const isActive = true;
  return (
    <Button
      className={cn(
        'px-4 py-2',
        isActive && 'bg-blue-500 text-white',
        'rounded-lg'
      )}
    >
      Active Button
    </Button>
  );
}
```

### Combining Shadcn Components

Compose Shadcn components to create complex UI without custom wrappers:

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function UrlCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Original URL
          <Badge variant="secondary">Active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>https://example.com/very/long/url</CardContent>
    </Card>
  );
}
```

## Component Variants & Props

Shadcn components support consistent variants and sizes. Always reference component documentation for available options:

```typescript
// Button variants
<Button variant="default" />
<Button variant="secondary" />
<Button variant="destructive" />
<Button variant="outline" />
<Button variant="ghost" />
<Button variant="link" />

// Button sizes
<Button size="sm" />
<Button size="default" />
<Button size="lg" />
```

## Client vs. Server Components

- **Server Components** (default): For display-only content; do not add `'use client'`
- **Client Components** (`'use client'`): Required for:
  - Form handling and state
  - Event listeners (onClick, onChange, etc.)
  - Hooks (useState, useEffect, etc.)
  - Interactive Shadcn components (Dialog, Popover, Tabs, etc.)

```typescript
// server component - just display
import { Button } from '@/components/ui/button';
export function DisplayButton() {
  return <Button>Static Button</Button>;
}
```

```typescript
// client component - with interaction
'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function ClickableButton() {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>;
}
```

## Theme & Customization

Tailwind CSS and Shadcn components are pre-configured in this project. Theming is managed through:

1. **Tailwind Config** (`tailwind.config.ts`): Base theme variables
2. **Global CSS** ([app/globals.css](../app/globals.css)): CSS variables for Shadcn component theming
3. **Component Styling** ([components/ui/](../components/ui/)): Individual component CSS modules

Do NOT modify component files in `components/ui/`. Instead, override styles in `globals.css` using CSS custom properties if needed.

## Common Patterns

### Form with Validation

```typescript
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function ValidatedForm() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!url) {
      setError('URL is required');
      return;
    }
    setError('');
    // Submit logic
  };

  return (
    <div className="space-y-4">
      <Input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          setError('');
        }}
      />
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
```

### Loading State

```typescript
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingUrls() {
  const isLoading = true;

  return (
    <div className="space-y-4">
      {isLoading ? (
        <>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </>
      ) : (
        <div>Loaded content</div>
      )}
    </div>
  );
}
```

## Accessibility

Shadcn/UI components are built on Radix UI primitives and include:

- Keyboard navigation support
- Screen reader announcements
- ARIA attributes
- Focus management

Always use semantic HTML where applicable and provide proper labels for form inputs.

## Troubleshooting

**Issue**: Component not found

- **Solution**: Ensure component is installed: `pnpm dlx shadcn-ui@latest add <component>`

**Issue**: Styling not applying

- **Solution**: Use `cn()` utility for className merging; check that Tailwind CSS is imported in globals.css

**Issue**: Component not interactive

- **Solution**: Add `'use client'` directive if using hooks or event handlers

## References

- [Shadcn/UI Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Authentication](./AUTHENTICATION.md) — How to use Shadcn with Clerk
