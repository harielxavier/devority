import type { Metadata } from 'next';
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google';
import { Suspense } from 'react';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

import { LiveChatWidget } from '@/components/ui/live-chat-widget';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Devority - Websites that win local clients. AI apps that scale your time.',
    template: '%s | Devority',
  },
  description:
    'We design, build, and manage your website—so you can focus on your business. Premium websites with AI solutions for attorneys, dentists, trades, and local businesses.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  keywords: [
    'website design',
    'web development',
    'AI solutions',
    'local business',
    'attorney websites',
    'dental websites',
    'Sparta NJ',
    'website maintenance',
    'SEO',
  ],
  authors: [{ name: 'Devority' }],
  creator: 'Devority',
  publisher: 'Devority',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://devority.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devority.io',
    siteName: 'Devority',
    title: 'Devority - Websites that win local clients. AI apps that scale your time.',
    description:
      'We design, build, and manage your website—so you can focus on your business. Premium websites with AI solutions for attorneys, dentists, trades, and local businesses.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Devority - Premium Website Design & AI Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devority - Websites that win local clients. AI apps that scale your time.',
    description:
      'We design, build, and manage your website—so you can focus on your business. Premium websites with AI solutions for attorneys, dentists, trades, and local businesses.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code', // Add actual verification code when available
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Devority",
    "description": "Premium website design and AI solutions for local businesses",
    "url": "https://devority.io",
    "telephone": "+1-973-823-4567",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sparta",
      "addressRegion": "NJ",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.0348",
      "longitude": "-74.6395"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$149-$749",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": ["Website Design", "AI Solutions", "SEO Services", "Web Development"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Jennifer Walsh"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Devority completely transformed our dental practice website. We've seen a 65% increase in new patient appointments since launch. Highly recommend!"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Mark Thompson"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Professional, responsive, and results-driven. Our law firm's online presence has never been stronger. The AI chatbot is a game-changer."
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Design & Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Solutions & Chatbots"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local SEO Services"
          }
        }
      ]
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          storageKey="devority-theme"
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-gradient-dark noise-overlay">
            <Suspense fallback={<div className="h-16 lg:h-20" />}>
              <Header />
            </Suspense>
            <main className="relative z-10">{children}</main>
            <Footer />
            <LiveChatWidget delay={30000} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
