import { Hero } from '@/components/sections/hero';
import { ServicesOverview } from '@/components/sections/services-overview';
import { WhyDevority } from '@/components/sections/why-devority';
import { AIInAction } from '@/components/sections/ai-in-action';
import { WorkShowcase } from '@/components/sections/work-showcase';
import { PricingPreview } from '@/components/sections/pricing-preview';
import { ProcessOverview } from '@/components/sections/process-overview';
import { TrustSignals } from '@/components/sections/trust-signals';
import { ConversionForm } from '@/components/sections/conversion-form';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyDevority />
      <AIInAction />
      <WorkShowcase />
      <PricingPreview />
      <ProcessOverview />
      <TrustSignals />
      <ConversionForm />
    </>
  );
}
