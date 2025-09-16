"use client";

import { motion } from "framer-motion";
import { TiltedScroll } from "@/components/ui/tilted-scroll";
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Search,
  Heart,
  Zap
} from "lucide-react";

const devorityServices = [
  {
    id: 1,
    name: "AI-Powered Websites",
    description: "Professional websites with built-in AI chatbots, lead qualification, and automated customer interactions that work 24/7.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    id: 2,
    name: "Custom Web Apps",
    description: "Tailored web applications with AI automation, document generation, and workflow optimization for your specific business needs.",
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    id: 3,
    name: "AI Solutions Suite",
    description: "Complete AI automation including chatbots, predictive analytics, document processing, and intelligent customer communication.",
    icon: <Bot className="w-6 h-6" />,
  },
  {
    id: 4,
    name: "Local SEO Mastery",
    description: "Dominate local search results with our proven SEO strategies designed specifically for attorneys, dentists, and service providers.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    id: 5,
    name: "Monthly Care Plans",
    description: "Ongoing website maintenance, security updates, performance optimization, and AI system training to keep your business running smoothly.",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: 6,
    name: "Lightning Launch",
    description: "Get your professional website live in under 30 days with our streamlined process and pre-built AI components.",
    icon: <Zap className="w-6 h-6" />,
  },
];

export function ServicesTiltedScroll() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sunset-500/5 rounded-full blur-3xl" />
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
            Our Services
          </motion.div>

          <h2 className="text-section-title gradient-text mb-6">
            Complete AI-Powered Solutions
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            From intelligent websites to custom AI automation, we provide everything 
            your local business needs to thrive in the digital age.
          </p>
        </motion.div>

        {/* Tilted Scroll Component */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Perspective Container */}
          <div 
            className="relative h-96 overflow-hidden"
            style={{
              perspective: '1000px',
              perspectiveOrigin: 'center center',
            }}
          >
            {/* Gradient Masks */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent via-transparent to-ink z-10 pointer-events-none" />
            
            {/* Tilted Scroll */}
            <div className="absolute inset-0 transform rotate-x-12 -rotate-z-12 skew-x-12">
              <TiltedScroll 
                items={devorityServices} 
                className="h-full flex items-center"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
