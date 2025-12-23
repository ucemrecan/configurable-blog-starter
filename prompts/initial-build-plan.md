# Next.js Personal Blog Setup

## Folder Structure

```
configurable-blog-starter/
├── client/                 # Next.js frontend
│   ├── app/               # App router
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities & mock data
│   └── public/           # Static assets
├── backend/               # Backend (boş, sonra eklenecek)
└── docker-compose.yml     # Docker config (sonra eklenecek)
```

## Implementation Steps

### 1. Project Setup

- Initialize Next.js 14+ with TypeScript in `client/` directory
- Configure Tailwind CSS
- Set up folder structure for future backend integration

### 2. Core Layout & Navigation

- Create root layout with sidebar and main content area
- Sidebar component: profile picture, description, navigation links
- Navigation component: Blog, About Me, Contact links
- Responsive design (mobile-friendly)

### 3. Pages

- **Blog page** (`/blog`): List of blog posts with mock data
- **About Me page** (`/about`): Personal information page
- **Contact page** (`/contact`): Contact form or information

### 4. Mock Data Structure

- Blog posts: title, date, content (stored in `client/lib/mockData.ts`)
- Profile information: name, description, profile picture path
- About me content: bio, skills, etc.

### 5. Components

- `Sidebar.tsx`: Profile picture, description, navigation
- `BlogCard.tsx`: Individual blog post card component
- `Navigation.tsx`: Top navigation bar

## Files to Create

### Configuration

- `client/package.json` - Next.js dependencies
- `client/tsconfig.json` - TypeScript config
- `client/tailwind.config.ts` - Tailwind configuration
- `client/next.config.js` - Next.js config
- `client/postcss.config.js` - PostCSS config

### Core App Files

- `client/app/layout.tsx` - Root layout with sidebar
- `client/app/page.tsx` - Home page (redirects to blog)
- `client/app/blog/page.tsx` - Blog listing page
- `client/app/about/page.tsx` - About Me page
- `client/app/contact/page.tsx` - Contact page

### Components

- `client/components/Sidebar.tsx` - Left sidebar with profile
- `client/components/Navigation.tsx` - Top navigation
- `client/components/BlogCard.tsx` - Blog post card

### Utilities

- `client/lib/mockData.ts` - Mock blog posts and profile data
- `client/lib/types.ts` - TypeScript types for blog posts

### Styles

- `client/app/globals.css` - Global styles with Tailwind directives

### Assets

- `client/public/profile.jpg` - Placeholder profile image
- `backend/` - Empty directory for future backend
- `docker-compose.yml` - Placeholder for future docker setup

## Design Approach

- Modern, clean design with Tailwind CSS
- Left sidebar fixed on desktop, collapsible on mobile
- Responsive grid layout for blog posts
- Smooth transitions and hover effects
