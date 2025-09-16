import type { Metadata } from 'next';
import { DevorityGeometricHero } from '@/components/sections/devority-geometric-hero';
import { AIServicesCustomHero } from '@/components/sections/ai-solutions-geometric-hero';

export const metadata: Metadata = {
  title: 'Geometric Hero Demo | Devority',
  description: 'Demo page showcasing geometric hero components for Devority',
};

export default function GeometricDemoPage() {
  return (
    <div className="space-y-0">
      {/* Main Devority Geometric Hero */}
      <DevorityGeometricHero />
      
      {/* AI Services Geometric Hero */}
      <AIServicesCustomHero />
    </div>
  );
}
