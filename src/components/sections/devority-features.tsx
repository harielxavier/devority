'use client';

import { motion } from 'framer-motion';
import { FeatureSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb } from 'lucide-react';

export function DevorityFeatures() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects with NEW brand colors */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sunset-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-magenta-500/4 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-royal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-container container-padding mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center glass-card px-4 py-2 rounded-full text-sm font-medium text-electric-300 mb-6"
          >
            <span className="w-2 h-2 bg-electric-400 rounded-full mr-2 animate-pulse" />
            Why Choose Devority
          </motion.div>

          <h2 className="text-section-title gradient-text mb-6">
            AI-Powered Solutions That Actually Work
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-4">
            We don't just build websites—we create intelligent business systems that save time, 
            increase revenue, and delight your customers.
          </p>
          <p className="text-sm text-electric-300 font-medium">
            Trusted by 50+ local businesses • 340% average ROI • &lt;30 day delivery
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <FeatureSectionWithHoverEffects />
        </motion.div>

      </div>
    </section>
  );
}
