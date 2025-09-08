import type { Metadata } from 'next';
import { AIHero } from '@/components/sections/ai-solutions/ai-hero';
import { AIFeatures } from '@/components/sections/ai-solutions/ai-features';
import { AIIntegrations } from '@/components/sections/ai-solutions/ai-integrations';
import { AIPricing } from '@/components/sections/ai-solutions/ai-pricing';
import { AIIndustries } from '@/components/sections/ai-solutions/ai-industries';
import { AIResults } from '@/components/sections/ai-solutions/ai-results';
import { AIFAQ } from '@/components/sections/ai-solutions/ai-faq';
import { AIContact } from '@/components/sections/ai-solutions/ai-contact';

export const metadata: Metadata = {
  title: 'AI Solutions for Local Businesses | Devority',
  description: 'Transform your business with AI chatbots, automation, and predictive analytics. Save 8+ hours per week and increase revenue by 28% on average.',
  keywords: [
    'AI solutions',
    'business automation',
    'AI chatbots',
    'predictive analytics',
    'document automation',
    'local business AI',
    'artificial intelligence',
    'business efficiency'
  ],
  openGraph: {
    title: 'AI Solutions for Local Businesses | Devority',
    description: 'Transform your business with AI chatbots, automation, and predictive analytics. Save 8+ hours per week and increase revenue by 28% on average.',
    images: ['/og-ai-solutions.jpg'],
  },
};

export default function AIServicesPage() {
  return (
    <>
      <AIHero />
      <AIFeatures />
      <AIIntegrations />
      <AIIndustries />
      <AIResults />
      <AIPricing />
      <AIFAQ />
      <AIContact />
    </>
  );
}
