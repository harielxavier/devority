import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing - Transparent Web Design & AI Solutions | Devority',
  description: 'Clear, honest pricing for websites that convert. Starting at $179/month. No hidden fees, no surprises. Get your custom quote in 60 seconds.',
  keywords: [
    'web design pricing',
    'website cost new jersey',
    'affordable web design',
    'ai solutions pricing',
    'monthly website plans',
    'custom quote calculator'
  ],
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      <section className="relative px-6 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-white/70 mb-12">
            Choose the perfect plan for your business
          </p>
          
          <div className="glass-card p-8">
            <p className="text-xl mb-8">
              For detailed pricing information, please visit our service pages:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/services/websites" className="btn-secondary">
                Website Pricing
              </Link>
              <Link href="/services/web-apps" className="btn-secondary">
                Web App Pricing
              </Link>
              <Link href="/services/seo" className="btn-secondary">
                SEO Plans
              </Link>
              <Link href="/services/care-plans" className="btn-secondary">
                Care Plans
              </Link>
            </div>
            <div className="mt-8">
              <Link href="/contact" className="btn-primary">
                Get Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
