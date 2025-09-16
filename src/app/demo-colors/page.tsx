import type { Metadata } from 'next';
import { DynamicHero } from '@/components/sections/dynamic-hero';
import { DevorityFeatures } from '@/components/sections/devority-features';
import { DevorityTestimonials } from '@/components/sections/devority-testimonials';

export const metadata: Metadata = {
  title: 'New Brand Colors | Devority',
  description: 'Experience the bold, modern, energetic brand identity with Electric Cyan, Vibrant Magenta, and Deep Midnight',
};

export default function ColorsDemoPage() {
  return (
    <div className="space-y-0">
      {/* Dynamic Hero with Strategic Color Usage */}
      <DynamicHero />
      
      {/* Updated Features Section */}
      <DevorityFeatures />
      
      {/* Updated Testimonials Section */}
      <DevorityTestimonials />
      
      {/* Color Palette Showcase */}
      <section className="section-padding bg-ink">
        <div className="max-w-container container-padding mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-section-title gradient-text-brand mb-6">
              Bold Modern Brand Identity
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              A vibrant, dynamic color palette that conveys innovation and energy
              while maintaining professional appeal for local business clients.
            </p>
          </div>

          {/* YOUR Primary Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-electric-500 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Electric</h3>
              <p className="text-sm text-white/70">Dominant upper/middle</p>
              <p className="text-xs text-electric-300 mt-2">#00E5FF</p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-sunset-500 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Sunset</h3>
              <p className="text-sm text-white/70">Center-left glow</p>
              <p className="text-xs text-sunset-300 mt-2">#FF6B35</p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-magenta-500 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Magenta</h3>
              <p className="text-sm text-white/70">Left side accent</p>
              <p className="text-xs text-magenta-300 mt-2">#FF1493</p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Red</h3>
              <p className="text-sm text-white/70">Left edge power</p>
              <p className="text-xs text-red-300 mt-2">#DC143C</p>
            </div>
          </div>

          {/* YOUR Secondary Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-magenta-500 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Magenta</h3>
              <p className="text-sm text-white/70">Blue-magenta blend</p>
              <p className="text-xs text-magenta-300 mt-2">#FF0080</p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-royal-500 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Royal</h3>
              <p className="text-sm text-white/70">Blue-green variations</p>
              <p className="text-xs text-royal-300 mt-2">#0066FF</p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-peach-500 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Peach</h3>
              <p className="text-sm text-white/70">Soft background tones</p>
              <p className="text-xs text-peach-300 mt-2">#FFCBA4</p>
            </div>
          </div>

          {/* Gradient Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="w-full h-16 bg-gradient-brand rounded-lg mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Brand Gradient</h3>
              <p className="text-sm text-white/70">Primary brand combination</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-full h-16 bg-gradient-energy rounded-lg mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Energy Gradient</h3>
              <p className="text-sm text-white/70">High-impact elements</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-full h-16 bg-gradient-warm rounded-lg mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Warm Gradient</h3>
              <p className="text-sm text-white/70">Friendly, approachable</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
