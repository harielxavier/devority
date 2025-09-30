import { Metadata } from 'next';
import { WorkShowcase } from '@/components/sections/work-showcase';

export const metadata: Metadata = {
  title: 'Our Work - Real Results for New Jersey Businesses | Devority',
  description: 'See how we\'ve helped 500+ NJ businesses increase revenue by 340% on average. Real case studies with measurable results and client testimonials.',
  keywords: [
    'devority portfolio',
    'web design case studies',
    'new jersey business results',
    'website roi examples',
    'client success stories',
    'before after websites'
  ],
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-500/10 via-transparent to-purple-500/10 animate-gradient" />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
              Our <span className="text-gradient">Work</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Real projects. Real results. See how we've helped businesses dominate their markets.
            </p>
          </div>
          
          <WorkShowcase />
        </div>
      </section>
    </main>
  );
}