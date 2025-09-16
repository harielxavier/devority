"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export function DynamicHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      {/* Dynamic Background with NEW Brand Colors */}
      <div className="absolute inset-0">
        {/* Electric Cyan - Primary accent dominant */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-electric-400/15 rounded-full blur-2xl" />

        {/* Vibrant Magenta - Important elements highlighting */}
        <div className="absolute top-1/4 left-0 w-60 h-60 bg-magenta-500/18 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/8 w-48 h-48 bg-magenta-400/15 rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-magenta-500/12 rounded-full blur-2xl" />

        {/* Sunset Orange - Secondary elements */}
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-sunset-500/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/6 w-56 h-56 bg-sunset-400/12 rounded-full blur-2xl" />

        {/* Royal Blue - Informational balance */}
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-royal-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-52 h-52 bg-royal-400/12 rounded-full blur-2xl" />

        {/* Deep Midnight - Depth and contrast */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-midnight-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/2 right-1/6 w-36 h-36 bg-midnight-600/15 rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* AI Badge with Energy Colors */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 27, 141, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(0, 212, 221, 0.15) 100%)',
            border: '1px solid rgba(0, 212, 221, 0.3)',
            backdropFilter: 'blur(12px)'
          }}
        >
          <Sparkles className="w-5 h-5 text-electric-400 animate-pulse" />
          <span className="text-white font-medium">AI-Powered Business Revolution</span>
          <Zap className="w-4 h-4 text-magenta-400" />
        </motion.div>

        {/* Main Title with Strategic Color Gradients */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-black mb-8 leading-tight">
            <span className="block gradient-text-energy mb-4">
              Transform Your
            </span>
            <span className="block gradient-text">
              Business with AI
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl lg:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Harness the power of intelligent automation to save 8+ hours per week, 
          increase revenue by 28%, and revolutionize how your local business operates.
        </motion.p>

        {/* CTA Buttons with Strategic Color Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <Button variant="primary" size="xl" href="/contact" className="group text-lg px-10 py-5">
            Start Your AI Journey
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="energy" size="xl" href="/services/ai-solutions" className="text-lg px-10 py-5">
            Explore AI Solutions
          </Button>
        </motion.div>

        {/* Trust Metrics with Color-Coded Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-black gradient-text-cool mb-2">50+</div>
            <div className="text-white/70 text-sm">Local Businesses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black gradient-text-warm mb-2">340%</div>
            <div className="text-white/70 text-sm">Average ROI</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black gradient-text-energy mb-2">&lt;30</div>
            <div className="text-white/70 text-sm">Day Launch</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black gradient-text mb-2">24/7</div>
            <div className="text-white/70 text-sm">AI Support</div>
          </div>
        </motion.div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 4 === 0 ? '#00E5FF' :
                         i % 4 === 1 ? '#FF6B35' :
                         i % 4 === 2 ? '#FF0080' : '#0066FF',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent pointer-events-none" />
    </section>
  );
}
