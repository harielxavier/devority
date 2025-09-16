'use client';

import { motion } from 'framer-motion';
import {
  MessageCircle,
  FileText,
  BarChart3,
  Clock,
  DollarSign,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Alternative geometric hero import
// import { AIServicesGeometricHero } from '@/components/sections/ai-solutions-geometric-hero';

const benefits = [
  {
    icon: Clock,
    value: '8+ hours',
    label: 'Saved per week',
    description: 'Automate repetitive tasks'
  },
  {
    icon: DollarSign,
    value: '+28%',
    label: 'Revenue increase',
    description: 'Better lead qualification'
  },
  {
    icon: Users,
    value: '24/7',
    label: 'Customer service',
    description: 'Never miss a lead'
  }
];

const aiCapabilities = [
  {
    icon: MessageCircle,
    title: 'AI Chatbots',
    description: 'Intelligent conversations that qualify leads and answer questions'
  },
  {
    icon: FileText,
    title: 'Document Automation',
    description: 'Generate contracts, forms, and reports automatically'
  },
  {
    icon: BarChart3,
    title: 'Predictive Analytics',
    description: 'Forecast trends and prevent issues before they happen'
  }
];

export function AIHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-900/30 via-midnight to-sunset-900/30" />
        
        {/* Animated AI Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(144)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-electric-500/20 rounded-sm"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sunset-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container container-padding mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center glass-card px-4 py-2 rounded-full text-sm font-medium text-electric-300 mb-6"
            >
              <span className="w-2 h-2 bg-electric-400 rounded-full mr-2 animate-pulse" />
              AI-Powered Business Solutions
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl lg:text-6xl font-display font-extrabold leading-tight mb-6"
            >
              <span className="gradient-text">AI Solutions</span>
              <br />
              <span className="text-white">That Actually Work</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/80 mb-8 leading-relaxed"
            >
              Transform your local business with intelligent automation that saves time, 
              increases revenue, and delights customers. No technical expertise required.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-electric-500/20 to-sunset-500/20 flex items-center justify-center mx-auto mb-2">
                    <benefit.icon className="w-6 h-6 text-electric-400" />
                  </div>
                  <div className="text-lg font-bold gradient-text">{benefit.value}</div>
                  <div className="text-sm text-white font-medium">{benefit.label}</div>
                  <div className="text-xs text-white/60">{benefit.description}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="#ai-contact" size="xl" className="group">
                Get AI Consultation
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              <Button href="#ai-features" variant="secondary" size="xl">
                Explore Features
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - AI Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <capability.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-electric-300 transition-colors">
                      {capability.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Trust Signal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-sm text-white/60 mb-2">Trusted by 50+ local businesses</div>
              <div className="text-2xl font-bold gradient-text">340% Average ROI</div>
              <div className="text-sm text-white/80">within 6 months</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
