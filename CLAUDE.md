# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Behavioral Rules

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## Project Overview

This is a **Next.js 15** application using the App Router with a custom UI component library built on **Radix UI** primitives and **shadcn/ui** patterns. The project uses **TypeScript**, **Tailwind CSS v4**, and supports multiple themes (light, dark, spring) via **next-themes**.

## Development Commands

**Package Manager: This project uses Yarn, NOT npm**

```bash
# Development server (uses Turbopack, port 3038)
yarn dev

# Production build (with Turbopack)
yarn build

# Start production server
yarn start

# Format code
yarn prettier:fix

# Run linter
yarn lint

# Run tests
yarn test

# Add new package
yarn add <package-name>

# Add dev dependency
yarn add -D <package-name>
```

**IMPORTANT**: Always use `yarn add` to install packages, NEVER use `npm install`.

## Architecture

### Core Technologies

- **Next.js 15** with App Router (`src/app` directory structure)
- **Radix UI** - Headless UI primitives (accordion, dialog, select, checkbox, etc.)
- **shadcn/ui** - Component patterns with `components.json` config (style: `new-york`)
- **Tailwind CSS v4** with `@tailwindcss/postcss` and `tw-animate-css`
- **class-variance-authority (CVA)** for component variant styling
- **tailwind-merge** + **clsx** via `cn()` utility
- **TypeScript** with strict mode enabled
- **Motion (Framer Motion)** for animations (`motion/react`)
- **React Hook Form** + **Zod** for form management and validation
- **Zustand** for global state management
- **Axios** for HTTP requests
- **Recharts** for charts
- **@tanstack/react-table** for data tables
- **Sonner** for toast notifications
- **Lottie** for animated illustrations (error, 404 pages)
- **Lucide React** for icons
- **next-themes** for theme switching
- **NProgress** + **nextjs-toploader** for page loading indicators

### Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout (fonts, metadata, ThemeProvider)
│   ├── page.tsx                 # Home page (uses LayoutComponents)
│   ├── globals.css              # Tailwind directives, theme variables, global styles
│   ├── error.tsx                # Global error boundary
│   ├── not-found.tsx            # 404 page
│   ├── robots.ts                # SEO robots.txt
│   └── sitemap.ts               # SEO sitemap
│
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components (shadcn/radix pattern)
│   │   ├── index.ts             # Barrel export for all UI components
│   │   ├── Accordion/           # Radix accordion
│   │   ├── Alert/               # Alert component
│   │   ├── Avatar/              # Avatar component
│   │   ├── Breadcrumb/          # Breadcrumb navigation
│   │   ├── Button/              # Button with CVA variants
│   │   ├── Calendar/            # Calendar component
│   │   ├── Card/                # Card component
│   │   ├── Carousel/            # Embla carousel
│   │   ├── Chart/               # Recharts wrapper
│   │   ├── Checkbox/            # Radix checkbox
│   │   ├── CircularProgress/    # Circular progress indicator
│   │   ├── Col/                 # Column layout component
│   │   ├── Command/             # Command palette (cmdk)
│   │   ├── Container/           # Responsive container with size variants
│   │   ├── DataTable/           # TanStack Table wrapper
│   │   ├── DatePicker/          # Date picker (react-day-picker)
│   │   ├── Dialog/              # Radix dialog/modal
│   │   ├── DropdownMenu/        # Radix dropdown menu
│   │   ├── Empty/               # Empty state component
│   │   ├── Flex/                # Flex layout component
│   │   ├── Form/                # React Hook Form integration
│   │   ├── FullCalendar/        # Full calendar view
│   │   ├── HoverCard/           # Radix hover card
│   │   ├── Image/               # Image component
│   │   ├── Input/               # Input with prefix/suffix support
│   │   ├── Label/               # Form label
│   │   ├── List/                # List component
│   │   ├── LoadingScreen/       # Full-screen loading
│   │   ├── Pagination/          # Pagination component
│   │   ├── Popover/             # Radix popover
│   │   ├── Progress/            # Linear progress bar
│   │   ├── Radio/               # Radix radio group
│   │   ├── Rate/                # Rating component
│   │   ├── RoundedTab/          # Rounded tab component
│   │   ├── Row/                 # Row layout component
│   │   ├── Select/              # Select + Autocomplete (Radix)
│   │   ├── Separator/           # Radix separator
│   │   ├── Skeleton/            # Loading skeleton
│   │   ├── Slider/              # Radix slider
│   │   ├── Sonner/              # Toast notifications (Sonner)
│   │   ├── Spin/                # Loading spinner
│   │   ├── Switch/              # Radix switch
│   │   ├── Table/               # HTML table styling
│   │   ├── Tabs/                # Radix tabs
│   │   ├── Tag/                 # Tag/chip component
│   │   ├── Text/                # Typography with CVA variants
│   │   ├── Timeline/            # Timeline component
│   │   ├── Tooltip/             # Radix tooltip
│   │   ├── Upload/              # File upload component
│   │   └── video-player/        # Video player component
│   │
│   ├── common/                  # Shared common components
│   │   ├── Animate/             # Motion wrapper components
│   │   │   └── index.tsx        # AnimateDiv, AnimateText, AnimateFlex, etc.
│   │   ├── ModeToggle.tsx       # Theme switcher (light/dark/system)
│   │   └── PageFlip.tsx         # Page flip animation
│   │
│   ├── layouts/                 # Layout components
│   │   ├── LayoutComponents.tsx # Main layout (Header + Content + Footer)
│   │   ├── contants.ts          # Menu items configuration
│   │   ├── Header/              # Header with navigation
│   │   │   ├── index.tsx
│   │   │   └── NavLink.tsx
│   │   └── Footer/              # Footer component
│   │       └── index.tsx
│   │
│   ├── icons/                   # SVG icon components (lucide-based)
│   │   └── index.tsx            # Icon exports (large file ~106KB)
│   │
│   └── theme/                   # Theme provider
│       └── ThemeProvider.tsx     # next-themes wrapper
│
├── modules/                     # Feature modules (screen-level components)
│   └── home/                    # Home module
│       └── index.tsx
│
├── services/                    # API services layer
│   ├── api.ts                   # CustomAxiosInstance base class
│   └── file.ts                  # File API service (example)
│
├── stores/                      # Zustand state management
│   ├── index.ts                 # Combined store (useBoundStore)
│   └── user.store.ts            # User slice
│
├── hooks/                       # Custom React hooks
│   ├── useAppRouter.ts          # Enhanced Next.js router with NProgress
│   ├── useDidUpdateEffect.ts    # Effect that skips first render
│   ├── useIsomorphicLayoutEffect.ts # SSR-safe useLayoutEffect
│   └── useMediaQuery.ts         # Responsive breakpoint hook
│
├── types/                       # TypeScript type definitions
│   └── user.ts                  # User types
│
├── lib/                         # Library utilities
│   ├── utils.ts                 # cn() utility (tailwind-merge + clsx)
│   ├── assets/                  # Static assets
│   │   ├── images/              # Image files
│   │   └── lotties/             # Lottie JSON animations
│   ├── contants/                # App constants
│   │   └── index.ts             # Route constants (ROUTES)
│   ├── enum/                    # Enums
│   │   ├── common.ts            # TokenType enum
│   │   ├── routes.ts            # Routes enum (page paths)
│   │   └── index.tsx            # TextSize enum + styles
│   ├── helpers/                 # Helper functions
│   │   └── safe-execute.ts      # Try-catch wrapper utility
│   ├── utils/                   # Utility functions
│   │   ├── index.ts             # cn() + isClient
│   │   ├── format.ts            # Number/money formatting, VND reader
│   │   ├── memo-func.ts         # Function memoization
│   │   ├── scroll.ts            # Smooth scroll utility
│   │   └── time.ts              # Time utilities (placeholder)
│   └── scripts/                 # Build/dev scripts
│       └── organize-shadcn.ts   # shadcn component organizer
│
├── test/                        # Test files
│   ├── Button.component.test.tsx
│   ├── Form.integration.test.tsx
│   ├── a11y.test.tsx
│   ├── performance.test.ts
│   └── sum.test.ts
│
public/                          # Public static assets
```

### Key Architectural Patterns

#### Provider Setup

The app uses a simple provider structure in `app/layout.tsx`:

1. `ThemeProvider` (next-themes) - Handles theme switching with `data-theme` attribute strategy
2. `NextTopLoader` - Page transition progress bar
3. Default theme is `system`, supports: `light`, `dark`, `spring`

#### Path Aliases

TypeScript paths are configured with two aliases:

```typescript
import { Button } from "@/components/ui"; // @/* → ./src/*
import logo from "@public/logo.png"; // @public/* → ./public/*
```

#### Environment Variables

```
NEXT_PUBLIC_BASE_URL    # API base URL (e.g., https://api-dev.dsc.com.vn)
NEXT_PUBLIC_SITE_URL    # Site URL for SEO/metadata
```

#### Site Configuration

Menu items are defined in `components/layouts/contants.ts` using the `Routes` enum from `lib/enum/routes.ts`. Update these files when adding new navigation items.

---

## UI Component System

### Component Library: shadcn/ui + Radix UI + CVA

This project uses a **custom component library** built on shadcn/ui patterns. Components are in `src/components/ui/` and follow these conventions:

- **Radix UI** for headless primitives (dialog, select, checkbox, etc.)
- **CVA (class-variance-authority)** for variant-based styling
- **`cn()` utility** (`tailwind-merge` + `clsx`) for class merging

### Component Import Pattern

**IMPORTANT: Import from `@/components/ui` barrel export or from individual component paths**

```typescript
// ✅ CORRECT - Import from barrel export
import { Button, Text, Container } from "@/components/ui";

// ✅ CORRECT - Import from individual component
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

// ✅ CORRECT - Default exports
import Card, { CardContent, CardHeader } from "@/components/ui/Card";
```

### Available UI Components

The project has 50+ UI components. **Always check and use existing components before creating new ones:**

**Layout:**

- `Container` - Responsive container (sizes: medium, large, xl, 2xl)
- `Flex` - Flexbox wrapper
- `Col` / `Row` - Column/Row layout helpers
- `Separator` - Divider line

**Typography & Display:**

- `Text` - Typography with variants (h1-h6, subtitle, body, small) and size/weight props
- `Tag` - Tag/chip component
- `Empty` - Empty state

**Form Components:**

- `Form` / `FormField` / `FormItem` / `FormLabel` / `FormControl` / `FormMessage` - React Hook Form integration
- `Input` - Text input with prefix/suffix support
- `Select` / `Autocomplete` - Radix-based dropdowns
- `Checkbox` - Radix checkbox
- `Radio` - Radix radio group
- `Switch` - Radix switch
- `Slider` - Radix slider
- `DatePicker` - Date selection
- `Upload` - File upload

**Buttons & Actions:**

- `Button` - Button with variants (container, outline, text, link, dashed, filled) and colors (default, primary, secondary, success, warning, info, error)

**Feedback:**

- `Alert` - Alert messages
- `Toaster` (Sonner) - Toast notifications
- `Spin` - Loading spinner
- `Skeleton` - Loading skeleton
- `Progress` / `CircularProgress` - Progress indicators
- `LoadingScreen` - Full-screen loading

**Overlay:**

- `Dialog` - Modal dialog (Radix)
- `DropdownMenu` - Dropdown menus (Radix)
- `Popover` - Popovers (Radix)
- `Tooltip` - Tooltips (Radix)
- `HoverCard` - Hover cards (Radix)
- `Command` - Command palette (cmdk)

**Data Display:**

- `DataTable` - TanStack Table wrapper
- `Table` - HTML table styling
- `Card` - Card container
- `Avatar` - User avatar
- `Carousel` - Embla carousel
- `Chart` - Recharts wrapper
- `Rate` - Rating stars
- `Timeline` - Timeline display
- `Breadcrumb` - Breadcrumb navigation
- `Calendar` / `FullCalendar` - Calendar views

**Navigation:**

- `Tabs` / `RoundedTab` - Tab navigation
- `Accordion` - Collapsible sections
- `Pagination` - Page navigation

**Rules for Using UI Components:**

- ✅ **ALWAYS check `@/components/ui/` first** before building custom components
- ✅ Use existing components and customize styling with `className` and CVA variants
- ✅ Refer to `src/components/ui/index.ts` for full list of available components
- ❌ DO NOT rebuild what already exists (select, checkbox, switch, etc.)

### Component Structure Convention

- **Folder-based structure**: Each component has its own directory with `index.tsx`
- Example: `components/ui/Button/index.tsx` (NOT `components/ui/Button.tsx`)
- Some components have additional sub-files (e.g., `Select/` has `index.tsx`, `select.tsx`, `autocomplete.tsx`)

### Button Component API

```tsx
import { Button } from "@/components/ui";

// Variants: container (default), outline, text, link, dashed, filled
// Colors: default, primary, secondary, success, warning, info, error
// Sizes: default, sm, lg, xLg, icon
<Button variant="container" color="primary" size="default" loading={false}>
  Click me
</Button>;
```

### Text Component API

```tsx
import { Text } from "@/components/ui";

// Variants: h1, h2, h3, h4, h5, h6, subtitle, body, small
// Sizes: x-small, small, base, medium, x-medium, large, x-large, 2x-large, 3x-large
// Weights: 100, 400, 500, 600, 700
// textAlign: left, center, right, justify
<Text variant="h2" size="large" weight={600} as="h2">
  Title
</Text>

// With ellipsis (line clamp)
<Text ellipsis={2} allowControlEllipsis>
  Long text that will be clamped...
</Text>
```

### Toast Notifications

```typescript
import { toast } from "sonner";

// Success
toast.success("Operation completed successfully");

// Error
toast.error("An error occurred");

// Custom
toast("Custom message", { description: "Details here" });
```

The `<Toaster />` component from `@/components/ui/Sonner` must be included in the layout.

---

## Styling System

### Tailwind CSS v4

- Uses `@tailwindcss/postcss` plugin
- `tw-animate-css` for animation utilities
- Global styles in `src/app/globals.css`

### Theme System (Multi-theme with CSS Variables)

The project supports **3 themes**: `light` (default `:root`), `dark`, and `spring`.

Themes are controlled via `data-theme` attribute on `<html>`:

- `ThemeProvider` from `next-themes` manages theme switching
- CSS variables use **OKLCH color space** for modern color handling

**Theme variables** are defined in `globals.css`:

```css
:root {              /* Light theme */
[data-theme="dark"]  /* Dark theme */
[data-theme="spring"]/* Spring theme (pink/coral) */
```

### Color System (CSS Variables)

**Semantic Color Variables:**

| Variable                 | Usage                         |
| ------------------------ | ----------------------------- |
| `--background`           | Page background               |
| `--foreground`           | Default text color            |
| `--primary`              | Primary brand color           |
| `--primary-foreground`   | Text on primary backgrounds   |
| `--secondary`            | Secondary accent color        |
| `--secondary-foreground` | Text on secondary backgrounds |
| `--success`              | Success state                 |
| `--warning`              | Warning state                 |
| `--info`                 | Info state                    |
| `--destructive`          | Error/danger state            |
| `--muted`                | Muted backgrounds             |
| `--muted-foreground`     | Muted text                    |
| `--accent`               | Accent backgrounds            |
| `--accent-foreground`    | Text on accent backgrounds    |
| `--card`                 | Card background               |
| `--popover`              | Popover background            |
| `--border`               | Border color                  |
| `--input`                | Input border/background       |
| `--ring`                 | Focus ring color              |
| `--disabled`             | Disabled state background     |

**Tailwind usage:**

```tsx
// ✅ CORRECT - Use semantic Tailwind classes
<div className="bg-background text-foreground border-border" />
<button className="bg-primary text-primary-foreground" />
<p className="text-muted-foreground" />
<span className="text-destructive" />

// ❌ WRONG - Don't hardcode colors
<div style={{ color: '#ff0000' }} />
<div className="bg-[#09171B]" />
```

### Gradient System

Gradients are defined as CSS custom properties:

| Variable                        | Tailwind Class          | Usage                   |
| ------------------------------- | ----------------------- | ----------------------- |
| `--gradient-primary`            | `bg-gradient-primary`   | Primary gradient bg     |
| `--gradient-accent`             | `bg-gradient-accent`    | Accent gradient bg      |
| `--gradient-border`             | `bg-gradient-border`    | Gradient border effect  |
| `--foreground-gradient-primary` | `text-gradient-primary` | Gradient text (primary) |
| `--foreground-gradient-accent`  | `text-gradient-accent`  | Gradient text (accent)  |
| `--foreground-gradient-border`  | `text-gradient-border`  | Gradient text (border)  |

```tsx
// Background gradient
<div className="bg-gradient-primary" />

// Text gradient
<span className="text-gradient-primary" />
```

### `cn()` Utility

Always use `cn()` for merging Tailwind classes:

```typescript
import { cn } from "@/lib/utils";

// Merges classes with proper conflict resolution
<div className={cn("p-4 bg-background", isActive && "bg-primary", className)} />
```

### Font Configuration

- **Geist Sans** (`--font-geist-sans`) - Default sans-serif
- **Geist Mono** (`--font-geist-mono`) - Monospace

Fonts are loaded via `next/font/google` in `app/layout.tsx`.

---

## Animations (Motion/Framer Motion)

### Pre-built Animate Wrappers

The project provides motion-wrapped components in `@/components/common/Animate/`:

```typescript
import {
  AnimateDiv,
  AnimateText,
  AnimateFlex,
  AnimateContainer,
  AnimateSpan,
  AnimateButton,
  AnimateH1, AnimateH2, AnimateH3,
  AnimateUl, AnimateLi,
  AnimateNav,
} from "@/components/common/Animate";

// Usage
<AnimateDiv
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</AnimateDiv>
```

### Animation Utilities

- `tw-animate-css` provides CSS animation classes
- Custom `animate-ripple` keyframe defined in `globals.css`
- Use `motion/react` for complex animations (AnimatePresence, motion components)

---

## Form Management (React Hook Form + Zod)

### Form Components

The form system uses **React Hook Form** with **Zod** for validation, integrated via `@/components/ui/Form`:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" color="primary">Submit</Button>
      </form>
    </Form>
  );
}
```

### FormItem Error Behavior

`FormItem` automatically:

- Adds `mb-5` spacing by default
- When there's an error: positions `FormMessage` absolutely below the field with `translate-y-full`
- This prevents layout shifts when error messages appear

### Best Practices

1. ✅ Always use `zodResolver` for validation
2. ✅ Define TypeScript types from Zod schema using `z.infer<typeof schema>`
3. ✅ Use `FormField` + render props pattern for field binding
4. ✅ Use `FormItem` > `FormLabel` > `FormControl` > `FormMessage` structure
5. ❌ Don't use raw `<input>` - wrap with `FormControl` + `Input`

---

## State Management (Zustand)

### Store Structure

The project uses **Zustand** with a **slice pattern** and **devtools** middleware:

```
stores/
├── index.ts          # Combined store with devtools
└── user.store.ts     # User slice
```

### Usage

```typescript
import useBoundStore from "@/stores";

// In components
const userDetail = useBoundStore((state) => state.userDetail);
const setUserDetail = useBoundStore((state) => state.setUserDetail);
```

### Creating a New Slice

```typescript
// stores/my-feature.store.ts
import { StateCreator } from "zustand";

export type TMyFeatureSlice = {
  data: string | null;
  setData: (data: string | null) => void;
  resetMyFeatureSlice: () => void;
};

const initialState = { data: null };

const createMyFeatureSlice: StateCreator<
  TMyFeatureSlice,
  [],
  [],
  TMyFeatureSlice
> = (set) => ({
  ...initialState,
  setData: (data) => set(() => ({ data })),
  resetMyFeatureSlice: () => set(() => initialState),
});

export { createMyFeatureSlice };
```

Then add to `stores/index.ts`:

```typescript
type TBoundSlice = TUserSlice & TMyFeatureSlice;

const useBoundStore = create<TBoundSlice>()(
  devtools((...a) => ({
    ...createUserSlice(...a),
    ...createMyFeatureSlice(...a),
  })),
);
```

---

## API Layer (Axios)

### Architecture

The API layer uses a custom `CustomAxiosInstance` class in `services/api.ts`:

```
services/
├── api.ts    # Base CustomAxiosInstance class
└── file.ts   # Example: FileApi service
```

### Creating an API Service

```typescript
import CustomAxiosInstance from "@/services/api";

// 1. Define the service class
export class UserApi {
  apiInstance: CustomAxiosInstance;
  constructor(apiInstance: CustomAxiosInstance) {
    this.apiInstance = apiInstance;
  }

  getUsers() {
    return this.apiInstance.get<TUser[]>("/users");
  }

  createUser(data: CreateUserDto) {
    return this.apiInstance.post<TUser>("/users", data);
  }

  updateUser(id: number, data: UpdateUserDto) {
    return this.apiInstance.put<TUser>(`/users/${id}`, data);
  }

  deleteUser(id: number) {
    return this.apiInstance.delete(`/users/${id}`);
  }
}

// 2. Create singleton instance
const apiInstance = new CustomAxiosInstance(process.env.NEXT_PUBLIC_BASE_URL);
export const userApi = new UserApi(apiInstance);
```

### API Instance Features

- Automatic response unwrapping (returns `response.data`)
- Centralized error handling with Vietnamese error messages
- Request interceptor (ready for auth token injection)
- Response interceptor (ready for token refresh)
- Methods: `get<T>`, `post<T>`, `put<T>`, `patch<T>`, `delete<T>`

---

## Custom Hooks

### `useAppRouter`

Enhanced Next.js router with NProgress loading bar:

```typescript
import { useAppRouter } from "@/hooks/useAppRouter";

const router = useAppRouter();
router.push("/dashboard"); // With loading animation
router.pushWithoutAnimation("/page"); // Without animation
router.pushToNewTab("/external"); // New tab
router.back(); // Go back
router.replace("/new-url"); // Replace URL
```

### `useMediaQuery`

Responsive breakpoint detection:

```typescript
import { useMediaQuery, BREAKPOINT } from "@/hooks/useMediaQuery";

const isMobile = useMediaQuery(`(max-width: ${BREAKPOINT.MOBILE}px)`);
const isTablet = useMediaQuery(`(max-width: ${BREAKPOINT.TABLET}px)`);
const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINT.DESKTOP}px)`);

// Breakpoints: MOBILE=768, TABLET=1024, DESKTOP=1280, DESKTOP_LARGE=1536
```

### `useDidUpdateEffect`

Like `useEffect` but skips the initial mount:

```typescript
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";

useDidUpdateEffect(() => {
  // Only runs when `value` changes, not on mount
}, [value]);
```

### `useIsomorphicLayoutEffect`

SSR-safe `useLayoutEffect`:

```typescript
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

useIsomorphicLayoutEffect(() => {
  // Runs useLayoutEffect on client, useEffect on server
}, []);
```

---

## Helpers & Utilities

### `cn()` - Class Name Merger

```typescript
import { cn } from "@/lib/utils";
// or
import { cn } from "@/lib/utils/index";
```

### `safeExecute()` - Error-safe Async Wrapper

```typescript
import safeExecute from "@/lib/helpers/safe-execute";

// Returns undefined on error
const result = await safeExecute(() => riskyOperation());

// Returns default value on error
const data = await safeExecute(() => fetchData(), [], {
  log: true,
  notify: true,
});
```

### Format Utilities

```typescript
import {
  formatNumber,
  formatMoney,
  generateReadMoneyVND,
  encodeVietnamText,
} from "@/lib/utils/format";

formatNumber(1234567); // "1.234.567"
formatMoney(1500000); // "1,500,000"
generateReadMoneyVND(1500000); // "Một triệu năm trăm nghìn đồng"
encodeVietnamText("Việt Nam"); // "VIET%20NAM"
```

### `memoizeFunction`

```typescript
import { memoizeFunction } from "@/lib/utils/memo-func";

const expensiveCalc = memoizeFunction((a: number, b: number) => {
  // cached by JSON.stringify([a, b])
  return a + b;
});
```

### `scrollToElement`

```typescript
import { scrollToElement } from "@/lib/utils/scroll";

scrollToElement(document.getElementById("section")!, 80); // 80px offset
```

---

## Enums & Constants

### Routes

```typescript
import { Routes } from "@/lib/enum/routes";

Routes.HOME; // "/"
```

### TokenType

```typescript
import { TokenType } from "@/lib/enum/common";

TokenType.ACCESS_TOKEN; // "access_token"
TokenType.REFRESH_TOKEN; // "refresh_token"
TokenType.CSRF_TOKEN; // "csrf_token"
```

### TextSize

```typescript
import { TextSize, TextSizeStyle } from "@/lib/enum";

TextSize.LARGE; // "large"   → { fontSize: "1.5rem", lineHeight: "2rem" }
TextSize.MEDIUM; // "medium"  → { fontSize: "17px",   lineHeight: "25px" }
TextSize.SMALL; // "small"   → { fontSize: "14px",   lineHeight: "22px" }
TextSize.X_SMALL; // "x-small" → { fontSize: "0.75rem", lineHeight: "1.25rem" }
```

---

## Testing

### Setup

- **Jest** with `ts-jest` preset and `jsdom` environment
- **@testing-library/react** for component testing
- **jest-axe** for accessibility testing
- Config: `jest.config.cjs`, `tsconfig.jest.json`

```bash
yarn test
```

### Test File Location

Tests are in `src/test/`:

- `*.component.test.tsx` - Component tests
- `*.integration.test.tsx` - Integration tests
- `a11y.test.tsx` - Accessibility tests
- `performance.test.ts` - Performance tests

---

## ESLint Configuration

- Extends `next/core-web-vitals` and `next/typescript`
- `@typescript-eslint/no-explicit-any` is **disabled**
- `react-hooks/rules-of-hooks` is **enforced**
- Ignores: `node_modules`, `.next`, `out`, `build`

---

## Docker

Multi-stage Dockerfile:

1. **Builder**: `node:23.6.1-alpine`, `yarn install` + `yarn build`
2. **Runner**: `node:23.6.1-alpine`, copies `.next` + `public`, `yarn install --production`
3. Exposes port 3000, runs `yarn start`

---

## Important Conventions

### 1. Page and Component Separation

```tsx
export default function HomePage() {
  return (
    <LayoutComponents>
      <Home />
    </LayoutComponents>
  );
}
```

```tsx
// ❌ WRONG - Don't put logic in page.tsx
export default function HomePage() {
  const [data, setData] = useState(); // ❌
  return <div>{/* UI logic */}</div>; // ❌
}
```

### 2. Server vs Client Components

- Most components can be server components by default
- Add `"use client"` directive only when needed (hooks, interactivity, browser APIs)
- Provider components (`ThemeProvider`) must be client components

### 3. Component File Structure

```
ComponentName/
└── index.tsx    # Main component (default export)
```

For components with sub-components:

```
ParentComponent/
├── index.tsx           # Main component
├── SubComponent/
│   └── index.tsx       # Sub-component
└── AnotherSub/
    └── index.tsx
```

### 4. Import Conventions

- Use `@/*` path alias for all internal imports
- Import from barrel exports when available (`@/components/ui`)
- Group imports: React → external → internal → types

### 5. Naming Conventions

- **Components**: PascalCase (`UserProfile`, `DataTable`)
- **Hooks**: camelCase with `use` prefix (`useAppRouter`, `useMediaQuery`)
- **Stores**: camelCase with `.store.ts` suffix (`user.store.ts`)
- **Services**: camelCase with service name (`api.ts`, `file.ts`)
- **Enums**: PascalCase (`Routes`, `TokenType`, `TextSize`)
- **Utilities**: camelCase (`formatNumber`, `safeExecute`)

### 6. Adding shadcn Components

This project uses shadcn/ui with custom organization. New components should follow the folder pattern in `src/components/ui/`:

```bash
# The components.json is already configured
# When adding new shadcn components, place them in their own folder
```

### 7. Icons

- Use **Lucide React** icons: `import { IconName } from "lucide-react"`
- Custom SVG icons are in `src/components/icons/index.tsx`

### 8. Images & Assets

- Static assets in `src/lib/assets/images/` and `src/lib/assets/lotties/`
- Public assets in `public/`
- Use Next.js `Image` component for optimized images

### 9. Error Handling

- Use `safeExecute()` wrapper for async operations that may fail
- Global error boundary in `app/error.tsx` with Lottie animation
- 404 page in `app/not-found.tsx` with Lottie animation
- API errors are caught in `CustomAxiosInstance` with Vietnamese fallback messages

### 10. SEO

The project has comprehensive SEO setup:

- Metadata API in `app/layout.tsx` (Open Graph, Twitter Card, etc.)
- `robots.ts` for crawler rules
- `sitemap.ts` for sitemap generation
- JSON-LD structured data (LocalBusiness, Organization, BreadcrumbList)
- PWA manifest (`site.webmanifest`)
