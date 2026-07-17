# DSC Landing Page

A modern, responsive landing page built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and React Query.

## 🚀 Features

- **Next.js 15** - Latest React framework with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Query (TanStack Query)** - Powerful data fetching and state management
- **Axios** - HTTP client for API requests
- **date-fns** - Modern date utility library
- **Responsive Design** - Mobile-first approach
- **Dark Mode Support** - Automatic theme switching
- **Comprehensive Constants** - Centralized configuration
- **Utility Helpers** - Reusable helper functions
- **Type Definitions** - Complete TypeScript interfaces

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Date Utilities**: date-fns
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd dsc-landing-page
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   ├── ui/                # shadcn/ui components
│   │   ├── button.tsx     # Button component
│   │   ├── card.tsx       # Card component
│   │   └── input.tsx      # Input component
│   └── providers.tsx      # React Query provider
├── constants/              # Application constants
│   ├── api.ts             # API configuration and endpoints
│   ├── app.ts             # App configuration and routes
│   └── validation.ts      # Validation rules and messages
├── helpers/                # Utility helper functions
│   ├── validation.ts      # Form validation helpers
│   ├── format.ts          # Data formatting helpers (using date-fns)
│   └── storage.ts         # Local storage and cookies helpers
├── hooks/                  # Custom React hooks
│   └── use-query.ts       # React Query utilities
├── lib/                    # Core utility functions
│   └── utils.ts           # Common utilities
├── services/               # API and external services
│   └── api.ts             # API service layer
├── types/                  # TypeScript type definitions
│   ├── api.ts             # API types and interfaces
└── assets/                 # Static assets and constants
    └── index.ts           # Asset exports and constants
```

## 🎨 Components

### UI Components (shadcn/ui)

- **Button** - Multiple variants and sizes
- **Card** - Flexible card layout component
- **Input** - Form input component with styling

### Custom Hooks

- **useApiQuery** - For GET requests
- **useApiMutation** - For POST requests
- **useApiPut** - For PUT requests
- **useApiDelete** - For DELETE requests

## 🔧 Configuration

### Constants

The project uses centralized constants for better maintainability:

- **API Constants** (`src/constants/api.ts`) - API endpoints, status codes, pagination
- **App Constants** (`src/constants/app.ts`) - App routes, features, contact info
- **Validation Constants** (`src/constants/validation.ts`) - Validation rules and messages

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

### Tailwind CSS

The project is configured with Tailwind CSS and includes custom CSS variables for theming.

### React Query

React Query is configured with:

- Default stale time: 1 minute
- Retry attempts: 1
- DevTools enabled in development

### date-fns

The project uses date-fns for date formatting and manipulation:

- Lightweight and tree-shakeable
- Immutable and pure functions
- Comprehensive date utilities

## 📱 Usage Examples

### Using Constants

```typescript
import { API_ENDPOINTS, APP_ROUTES } from "@/constants";

// Use API endpoints
const postsUrl = API_ENDPOINTS.POSTS.LIST;
const userUrl = API_ENDPOINTS.USERS.DETAIL(userId);

// Use app routes
const aboutUrl = APP_ROUTES.ABOUT;
const contactUrl = APP_ROUTES.CONTACT;
```

### Using Helpers

```typescript
import { ValidationHelper, FormatHelper, localStorage } from "@/helpers";

// Validation
const isValidEmail = ValidationHelper.isValidEmail("user@example.com");
const isValidPassword = ValidationHelper.isValidPassword("Password123!");

// Formatting with date-fns
const formattedDate = FormatHelper.formatDate(new Date(), "MMM dd, yyyy");
const formattedTime = FormatHelper.formatTime(new Date(), "HH:mm:ss");
const relativeTime = FormatHelper.formatRelativeTime(new Date());

// Storage
localStorage.set("user", userData);
const user = localStorage.get("user");
```

### Using React Query Hooks

```typescript
// Fetch data
const { data, isLoading, error } = useApiQuery(["posts"], "/posts");

// Create data
const createPost = useApiMutation("/posts", {
  onSuccess: (data) => console.log("Success:", data),
  onError: (error) => console.error("Error:", error),
});

createPost.mutate({ title: "New Post", body: "Content" });
```

### Using UI Components

```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>

<Button variant="outline" size="lg">
  Click me
</Button>
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:

```bash
npm run build
npm start
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [date-fns Documentation](https://date-fns.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

Built with ❤️ using modern web technologies
