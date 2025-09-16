'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Clock, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Same-Day Response',
    description: 'Get your strategy call scheduled within 24 hours'
  },
  {
    icon: Shield,
    title: '$500 Value - Free',
    description: 'Comprehensive business analysis at no cost'
  },
  {
    icon: Phone,
    title: 'No Commitment',
    description: 'Just insights to help your business grow'
  }
];

export function ConversionCTA() {
  return (
    <section className="section-padding relative">
      <div className="max-w-container container-padding mx-auto">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to <span className="gradient-text">dominate</span> your local market?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Join 50+ local businesses who've increased their revenue by an average of 340% 
              with our AI-powered websites and automation systems.
            </p>
            
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-12"
            >
              <Button 
                href="/contact" 
                size="xl" 
                className="group relative overflow-hidden text-lg px-12 py-6"
              >
                <div className="relative z-10 flex items-center">
                  <span className="font-semibold">Get Your Free Strategy Call</span>
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-electric-600 to-sunset-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 text-center"
                >
                  <benefit.icon className="w-8 h-8 text-electric-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/70">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-sm text-white/60 mb-4">
                Trusted by local businesses across New Jersey and nationwide
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 text-white/40">
                <div className="text-center">
                  <div className="text-2xl font-bold text-electric-400">50+</div>
                  <div className="text-xs">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-electric-400">340%</div>
                  <div className="text-xs">Average ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-electric-400">&lt;30</div>
                  <div className="text-xs">Day Launch</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-electric-400">24/7</div>
                  <div className="text-xs">AI Support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Secondary CTA for hesitant visitors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-8 text-center max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-display font-semibold text-white mb-4">
            Not ready to talk? No problem.
          </h3>
          <p className="text-white/70 mb-6">
            See our complete pricing and service details, or check out our case studies 
            to learn how we've helped businesses like yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/pricing" variant="secondary" className="flex-1 sm:flex-none">
              View Pricing
            </Button>
            <Button href="/work" variant="ghost" className="flex-1 sm:flex-none">
              See Case Studies
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
