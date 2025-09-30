import { EnhancedHero } from '@/components/sections/enhanced-hero';
import { SEOFeatures } from '@/components/sections/seo-features';
import { WorkShowcase } from '@/components/sections/work-showcase';
import { ContactSection } from '@/components/sections/contact-section';
import { PricingPreview } from '@/components/sections/pricing-preview';
import { CompactProcess } from '@/components/sections/compact-process';
import { Blog7 } from '@/components/blocks/blog7';

export default function HomePage() {
  return (
    <>
      <EnhancedHero />
      <SEOFeatures />
      <section id="work">
        <WorkShowcase />
      </section>
      <section id="blog">
        <Blog7 />
      </section>
      <section id="pricing">
        <PricingPreview />
      </section>
      <section id="process">
        <CompactProcess />
      </section>
      <ContactSection />
    </>
  );
}