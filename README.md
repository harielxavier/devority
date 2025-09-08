# Devority Website

A modern, AI-forward website for Devority - premium website design and AI solutions for local businesses.

## Features

- **Modern Design System**: Dark theme with glassmorphism effects and brand gradients
- **AI-First Messaging**: Showcasing AI solutions for local businesses
- **Performance Optimized**: Built with Next.js 14, optimized for Core Web Vitals
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG 2.2 AA compliant
- **SEO Ready**: Structured data, meta tags, and sitemap

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Heroicons & Lucide React
- **Forms**: React Hook Form with Zod validation
- **Email**: Resend for transactional emails
- **Deployment**: Vercel (recommended)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your actual values in `.env.local`

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components (header, footer)
│   ├── sections/       # Page sections
│   └── forms/          # Form components
├── lib/                # Utility functions
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## Brand Colors

- **Ink Black**: `#020103` - Base surfaces, backgrounds
- **Deep Navy**: `#0A1B53` - Headings, cards, buttons
- **Electric Blue**: `#0A689A` - Primary accents, links
- **Sunset Orange**: `#DD551C` - CTA/hover/attention
- **Orchid Magenta**: `#9F4884` - Secondary accents
- **Neon Rose**: `#DF899B` - Highlights/badges
- **Ember Red**: `#71131D` - Warnings, depth

## Typography

- **Display/Headings**: Poppins (ExtraBold for hero)
- **Body/UI**: Inter
- **Code**: JetBrains Mono

## Development

- **Linting**: `npm run lint`
- **Type Checking**: `npm run type-check`
- **Build**: `npm run build`

## Deployment

This project is optimized for deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## Performance Targets

- **Lighthouse Performance**: ≥ 90
- **Core Web Vitals**: LCP < 2.5s, CLS < 0.1, INP < 200ms
- **SEO Score**: ≥ 95
- **Accessibility**: ≥ 95

## License

© 2024 Devority. All rights reserved.
