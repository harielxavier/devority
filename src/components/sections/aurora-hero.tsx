'use client';

import { ArrowRight, Sparkles, Bot, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const industries = [
  'Attorneys',
  'Dentists', 
  'Trades',
  'Restaurants',
  'Nonprofits'
];

const aiFeatures = [
  {
    icon: Bot,
    title: 'AI Chatbots',
    description: 'Qualify leads 24/7'
  },
  {
    icon: FileText,
    title: 'Document Automation',
    description: 'Generate contracts instantly'
  },
  {
    icon: BarChart3,
    title: 'Predictive Analytics',
    description: 'Prevent no-shows & churn'
  }
];

export function AuroraHero() {
  return (
    <section className="relative min-h-screen bg-midnight flex items-center justify-center">
      <div className="relative z-10 max-w-container container-padding mx-auto text-center">
        <div className="max-w-5xl mx-auto">
          {/* AI Badge */}
          <div className="inline-flex items-center glass-card px-6 py-3 rounded-full text-sm font-medium text-electric-300 mb-8">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            AI-Powered Business Solutions • Sparta, NJ → Nationwide
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-tight mb-6 text-white">
            Websites that win{' '}
            <span className="gradient-text">local clients.</span>
            <br />
            <span className="text-4xl lg:text-6xl">
              AI apps that{' '}
              <span className="gradient-text">scale your time.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-white/90 text-balance mb-12 max-w-4xl mx-auto leading-relaxed">
            We design, build, and <em className="text-electric-300 not-italic font-semibold">manage</em> your site—so you can focus on the business.
            <br />
            <span className="text-lg text-white/70">Save 8+ hours/week with AI automation that actually works.</span>
          </p>

          {/* AI Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {aiFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-electric-400 mb-3 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button href="/contact" size="xl" className="group text-lg px-8 py-4">
              Get AI Consultation
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="/services/ai-solutions" variant="secondary" size="xl" className="text-lg px-8 py-4">
              Explore AI Solutions
            </Button>
          </div>

          {/* Industries Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-white/60 text-sm font-medium">Perfect for:</span>
            {industries.map((industry, index) => (
              <a
                key={industry}
                href={`/industries/${industry.toLowerCase()}`}
                className="glass-card px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                {industry}
              </a>
            ))}
          </div>
        </div>

        {/* Floating Metrics Card */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="glass-card p-8 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-electric-500 to-sunset-500" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl lg:text-5xl font-display font-black gradient-text mb-2">
                  &lt;30
                </div>
                <div className="text-white/80 text-sm font-medium">
                  Day Launch
                </div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display font-black gradient-text mb-2">
                  +28%
                </div>
                <div className="text-white/80 text-sm font-medium">
                  Avg Conversion Lift
                </div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display font-black gradient-text mb-2">
                  340%
                </div>
                <div className="text-white/80 text-sm font-medium">
                  Average ROI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
