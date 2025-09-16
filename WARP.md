# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is the Devority website - a modern, AI-forward website for premium website design and AI solutions for local businesses. Built with Next.js 14, it showcases AI solutions for attorneys, dentists, trades, and other local businesses.

**Key Business Focus**: Devority (located in Sparta, NJ) provides premium website design, AI solutions, SEO services, and monthly care plans for local businesses.

## Development Commands

### Core Development
- `npm install` - Install dependencies (includes Prisma client generation)
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

### Testing
- `npm run test` - Run Vitest tests
- `npm run test:ui` - Run tests with UI
- `npm run test:run` - Run tests once without watch
- `npm run test:coverage` - Run tests with coverage report

### Database (Prisma + PostgreSQL)
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and apply migrations
- `npm run db:studio` - Open Prisma Studio

### Analysis
- `npm run analyze` - Bundle analysis with ANALYZE=true

### Development Setup Requirements
Node.js is required. On macOS, install via:
```bash
# Install Homebrew and Xcode Command Line Tools if needed
xcode-select --install
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: PostgreSQL with Prisma ORM
- **Animations**: Framer Motion
- **Email**: Resend (configured but not yet implemented)
- **Testing**: Vitest with Testing Library
- **Deployment Target**: Vercel

### Design System Architecture

The project uses a sophisticated design system with brand-specific colors and utilities:

**Brand Colors**:
- `midnight` (0A0A0A) - Primary backgrounds/text
- `electric` (00E5FF) - Primary accent (buttons, links, CTAs)
- `magenta` (FF0080) - Highlighting important elements
- `sunset` (FF6B35) - Secondary buttons & alert states
- `royal` (0066FF) - Informational elements

**Typography**:
- **Display/Headings**: Poppins (loaded via Next.js font optimization)
- **Body/UI**: Inter
- **Code**: JetBrains Mono

### Component Architecture

**Layout Components** (`src/components/layout/`):
- `header.tsx` - Fixed header with scroll effects, mobile menu with animations
- `footer.tsx` - Comprehensive footer with links

**UI Components** (`src/components/ui/`):
- `button.tsx` - Sophisticated button system with CVA variants (primary, secondary, ghost, outline, energy, royal, etc.)
- `card.tsx`, `input.tsx`, `textarea.tsx` - Form and content components
- `logo.tsx` - Brand logo component
- Animation components: `aurora-background.tsx`, `beams-background.tsx`, `spotlight.tsx`

**Section Components** (`src/components/sections/`):
- Page sections organized by functionality (hero, services, testimonials, etc.)
- `ai-solutions/` subfolder for AI-specific page components
- Form components with multi-step flows

### Database Schema (Prisma)

Key models:
- `Contact` - Lead capture with status tracking (NEW, CONTACTED, QUALIFIED, etc.)
- `BlogPost` - Content management with SEO fields
- `User` - User management with roles
- `Analytics` - Event tracking system

### File Structure Pattern

```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components (header, footer)
│   ├── sections/       # Page sections
│   └── blocks/         # Content blocks
├── lib/                # Utility functions and configurations
├── styles/             # Global styles and Tailwind config
└── types/              # TypeScript definitions
```

## Styling System

### Glass Card System
- `glass-card` - Basic glassmorphism effect with backdrop blur
- `glass-card-enhanced` - Advanced version with hover effects and better shadows
- Uses radial gradients for subtle color overlays

### CSS Utilities
- `gradient-text` variants for brand-colored text
- `btn-*` classes for consistent button styling
- `section-padding`, `container-padding` for layout consistency
- `noise-overlay` for texture effects

### Animation System
Custom animations include:
- `aurora` - 60s animated background gradient
- `skew-scroll` - Tilted scrolling effects
- `spotlight` - Spotlight reveal effects
- Standard animations: `fade-in`, `slide-up`, `scale-in`, `float`

## Development Patterns

### Component Patterns
- Use `'use client'` directive for client-side interactivity
- Framer Motion for animations with `whileInView` for scroll triggers
- Custom hooks for scroll detection and state management
- CVA (Class Variance Authority) for component variants

### Form Architecture
- Multi-step forms with state management
- API routes for form submission (`/api/send-email`)
- Error handling and loading states
- Conditional form flows based on user input

### SEO & Metadata
- Comprehensive metadata in `layout.tsx`
- Structured data (JSON-LD) for local business
- OpenGraph and Twitter card optimization
- Robots and sitemap generation

## API Routes

- `/api/send-email` - Form submission endpoint
- `/api/health` - Health check endpoint
- `/api/analytics` - Analytics tracking endpoint

## Environment Variables

Required for full functionality:
- `DATABASE_URL` - PostgreSQL connection string
- Email service configuration (Resend)
- Analytics configuration

## Performance Considerations

### Targets
- Lighthouse Performance: ≥ 90
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- SEO Score: ≥ 95
- Accessibility: ≥ 95

### Optimization Features
- Next.js Image optimization
- Font optimization with next/font
- Bundle analysis available
- Static generation for performance

## Current Development Status

**Completed**: Core architecture, design system, basic homepage sections, component library, database schema, SEO foundation.

**In Progress**: Form validation with React Hook Form + Zod, API integrations, content completion.

**Priority Next Steps**: Complete AI demonstration sections, implement form submission workflow, add real case study content, complete service detail pages.

The codebase is well-architected with a solid foundation for rapid development and scaling.