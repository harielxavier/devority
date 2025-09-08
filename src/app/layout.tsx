import type { Metadata } from 'next';
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

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
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-gradient-dark noise-overlay">
            <Header />
            <main className="relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
