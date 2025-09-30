'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TextRotate } from '@/components/ui/text-rotate';
import { Spotlight } from '@/components/ui/spotlight';
import { QuickContactForm } from '@/components/sections/quick-contact-form';


export function EnhancedHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image with Animation */}
      <div className="absolute inset-0">
        {/* Main Hero Background Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/images/HeroPage.png"
            alt="Abstract flowing design background"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover object-center sm:object-center md:object-center lg:object-center"
            quality={95}
          />
          {/* Minimal overlay to maximize background visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-midnight/20 via-transparent to-midnight/20 sm:from-midnight/15 sm:via-transparent sm:to-midnight/15 lg:from-midnight/10 lg:via-transparent lg:to-midnight/10" />
          {/* Very subtle bottom overlay only where text is */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/30 via-transparent to-transparent sm:from-midnight/25 lg:from-midnight/20" />
          {/* Subtle animated overlay for depth */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-electric-900/10 via-transparent to-sunset-900/10"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(0, 229, 255, 0.1) 0%, transparent 50%, rgba(255, 107, 53, 0.1) 100%)',
                'linear-gradient(45deg, rgba(255, 107, 53, 0.1) 0%, transparent 50%, rgba(0, 229, 255, 0.1) 100%)',
                'linear-gradient(45deg, rgba(0, 229, 255, 0.1) 0%, transparent 50%, rgba(255, 107, 53, 0.1) 100%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
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
      <div className="relative z-10 max-w-container container-padding mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-8 text-center lg:text-left"
          >

          {/* Enhanced Main Headline with improved readability */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-hero text-balance mb-8 leading-tight"
            style={{
              textShadow: '0 8px 32px rgba(0, 0, 0, 1), 0 4px 16px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 4px rgba(0, 0, 0, 0.7)',
              filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.8))'
            }}
          >
            <motion.span
              className="inline-block font-black"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #00f5ff, #ff6b6b, #4ecdc4, #00f5ff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 20px rgba(0, 229, 255, 0.5), 0 2px 8px rgba(255, 107, 53, 0.3)',
              }}
            >
              Dominate
            </motion.span>{' '}
            locally.{' '}
            <span className="text-white font-black">Scale with AI.</span>
          </motion.h1>

          {/* Enhanced Subtitle with improved readability */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-white font-medium text-balance mb-8 max-w-4xl mx-auto leading-relaxed"
            style={{
              textShadow: '0 6px 24px rgba(0, 0, 0, 1), 0 3px 12px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 4px rgba(0, 0, 0, 0.7)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8))'
            }}
          >
            Digital presence that works <em className="text-electric-300 not-italic font-bold" style={{ textShadow: '0 2px 8px rgba(0, 229, 255, 0.6)' }}>while you sleep</em>. Focus on your business—we&apos;ll handle the rest.
          </motion.p>

          {/* Trust Elements with improved readability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center lg:items-start gap-4 mb-8"
          >
            <div className="text-center lg:text-left bg-black/70 backdrop-blur-lg px-4 py-2 rounded-lg border border-white/30 shadow-xl">
              <p className="text-white font-bold text-sm"
                 style={{
                   textShadow: '0 4px 16px rgba(0, 0, 0, 1), 0 2px 8px rgba(0, 0, 0, 0.9)'
                 }}>
                Trusted by local businesses across New Jersey
              </p>
            </div>
          </motion.div>


          {/* Enhanced CTA Buttons - Hidden on large screens (form is in sidebar) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16 lg:hidden"
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

          {/* Dynamic Business Type Rotator with improved readability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-lg md:text-xl lg:text-2xl font-bold"
            style={{
              textShadow: '0 6px 24px rgba(0, 0, 0, 1), 0 3px 12px rgba(0, 0, 0, 0.9)'
            }}
          >
            <span className="text-white bg-black/20 backdrop-blur-lg px-3 py-1 rounded-lg border border-white/30 shadow-xl">We make websites for</span>
            <TextRotate
              texts={[
                "Attorneys",
                "Dentists",
                "Trades",
                "Restaurants",
                "Nonprofits",
                "Local Businesses"
              ]}
              mainClassName="text-white px-4 py-2 bg-gradient-to-r from-electric-500 to-sunset-500 overflow-hidden rounded-lg font-bold shadow-lg border border-white/20"
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

          {/* Contact Form Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-4"
          >
            <QuickContactForm />
          </motion.div>
        </div>

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
