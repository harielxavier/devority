"use client";

import { motion } from "framer-motion";
import { TiltedScroll } from "@/components/ui/tilted-scroll";
import { 
  Bot, 
  Clock, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target,
  Users,
  Award
} from "lucide-react";

const devorityBenefits = [
  {
    id: 1,
    name: "24/7 AI Assistant",
    description: "Intelligent chatbots that never sleep, qualifying leads and answering questions around the clock so you never miss an opportunity.",
    icon: <Bot className="w-6 h-6" />,
  },
  {
    id: 2,
    name: "Save 8+ Hours/Week",
    description: "Automate repetitive tasks like appointment scheduling, follow-ups, and document generation to focus on what matters most.",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: 3,
    name: "+28% Revenue Boost",
    description: "Our clients see an average 28% increase in revenue within 6 months through better lead qualification and conversion optimization.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: 4,
    name: "Local Business Experts",
    description: "Built in Sparta, NJ with deep understanding of local business needs. We know what works for attorneys, dentists, and trades.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 5,
    name: "Lightning Fast Delivery",
    description: "Professional websites launched in under 30 days. Our streamlined process means faster time-to-market for your business.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 6,
    name: "Enterprise Security",
    description: "SOC 2 compliant infrastructure with enterprise-grade security. Your data and your clients' data are always protected.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    id: 7,
    name: "50+ Happy Clients",
    description: "Join the growing community of local businesses that have transformed their operations with our AI-powered solutions.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 8,
    name: "340% Average ROI",
    description: "Our clients see exceptional returns on investment through increased efficiency, better lead conversion, and reduced operational costs.",
    icon: <Award className="w-6 h-6" />,
  },
];

export function DevorityTiltedScroll() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects with NEW brand colors */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sunset-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/6 w-80 h-80 bg-royal-500/4 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 left-1/6 w-72 h-72 bg-magenta-500/3 rounded-full blur-3xl" />
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
            Why Local Businesses Choose Devority
          </motion.div>

          <h2 className="text-section-title gradient-text mb-6">
            AI-Powered Benefits That Drive Results
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-4">
            Discover the key advantages that make Devority the preferred choice for local businesses 
            looking to leverage AI for growth and efficiency.
          </p>
          <p className="text-sm text-electric-300 font-medium">
            Scroll through our proven benefits • Real results from real businesses
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
            <div className="absolute inset-0" style={{ transform: 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)' }}>
              <TiltedScroll 
                items={devorityBenefits} 
                className="h-full flex items-center"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="glass-card p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-display font-black gradient-text mb-2">50+</div>
                <div className="text-white/80 font-medium">Local Businesses</div>
              </div>
              <div>
                <div className="text-3xl font-display font-black gradient-text mb-2">340%</div>
                <div className="text-white/80 font-medium">Average ROI</div>
              </div>
              <div>
                <div className="text-3xl font-display font-black gradient-text mb-2">&lt;30</div>
                <div className="text-white/80 font-medium">Day Launch</div>
              </div>
              <div>
                <div className="text-3xl font-display font-black gradient-text mb-2">24/7</div>
                <div className="text-white/80 font-medium">AI Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
