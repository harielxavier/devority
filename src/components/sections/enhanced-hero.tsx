'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TextRotate } from '@/components/ui/text-rotate';
import { Spotlight } from '@/components/ui/spotlight';

export function EnhancedHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle background collage using existing assets */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-[40vw] h-[40vh]">
            <Image src="/images/blog/law-firm-success.jpg" alt="law firm" fill priority sizes="40vw" className="object-cover rounded-3xl" />
          </div>
          <div className="absolute bottom-10 left-1/3 w-[30vw] h-[30vh]">
            <Image src="/images/blog/dental-ai-success.jpg" alt="dental" fill sizes="30vw" className="object-cover rounded-3xl" />
          </div>
          <div className="absolute -bottom-8 -right-8 w-[35vw] h-[35vh]">
            <Image src="/images/blog/local-seo-success.jpg" alt="seo" fill sizes="35vw" className="object-cover rounded-3xl" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-midnight via-midnight/80 to-midnight" />
        </div>
        {/* Spotlight Effects - Optimized for responsiveness */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 opacity-0"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw] md:h-[60vh] md:w-[40vw] opacity-0"
          fill="white"
        />
        <Spotlight
          className="top-28 left-80 h-[80vh] w-[50vw] md:h-[60vh] md:w-[40vw] lg:left-96 opacity-0"
          fill="white"
        />

        {/* Multi-layer Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-electric-900/30 via-midnight to-sunset-900/30" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sunset-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container container-padding mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >

          {/* Enhanced Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-hero gradient-text text-balance mb-8 leading-tight"
          >
            <motion.span
              className="inline-block"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #00f5ff, #ff6b6b, #4ecdc4, #00f5ff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dominate
            </motion.span>{' '}
            locally.{' '}
            <span className="text-white">Scale with AI.</span>
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-white/90 text-balance mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Digital presence that works <em className="text-electric-300 not-italic font-semibold">while you sleep</em>. Focus on your business—we'll handle the rest.
          </motion.p>



          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button href="/contact" size="xl" className="group relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-semibold">Get Your Free Strategy Call</span>
                  <span className="text-xs opacity-75 font-normal">($500 value • No obligation)</span>
                </div>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-electric-600 to-sunset-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

          </motion.div>

          {/* Dynamic Business Type Rotator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-2 text-lg md:text-xl lg:text-2xl font-medium"
          >
            <span className="text-white/90">We make websites for</span>
            <TextRotate
              texts={[
                "Attorneys",
                "Dentists",
                "Trades",
                "Restaurants",
                "Nonprofits",
                "Local Businesses"
              ]}
              mainClassName="text-white px-3 py-1 bg-gradient-to-r from-electric-500 to-sunset-500 overflow-hidden rounded-lg font-semibold"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Floating Glass Card with More Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="glass-card p-8 lg:p-12 relative overflow-hidden border border-white/10">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-electric-500 via-purple-500 to-sunset-500" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="text-3xl lg:text-4xl font-display font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                  &lt;21
                </div>
                <div className="text-white/80 text-sm font-medium">
                  Day Launch Guarantee
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="text-3xl lg:text-4xl font-display font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                  340%
                </div>
                <div className="text-white/80 text-sm font-medium">
                  Average ROI Increase
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="text-3xl lg:text-4xl font-display font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                  24/7
                </div>
                <div className="text-white/80 text-sm font-medium">
                  AI-Powered Support
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="text-3xl lg:text-4xl font-display font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                  500+
                </div>
                <div className="text-white/80 text-sm font-medium">
                  Successful Projects
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center hover:border-electric-400/50 transition-colors cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-gradient-to-b from-electric-400 to-sunset-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
