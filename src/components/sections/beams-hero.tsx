"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, FileText, BarChart3, Sparkles } from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";

const aiFeatures = [
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Qualify leads 24/7",
  },
  {
    icon: FileText,
    title: "Document Automation", 
    description: "Generate contracts instantly",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Prevent no-shows & churn",
  },
];

const industries = [
  { name: "Attorneys", href: "/industries/attorneys" },
  { name: "Dentists", href: "/industries/dentists" },
  { name: "Trades", href: "/industries/trades" },
  { name: "Restaurants", href: "/industries/restaurants" },
  { name: "Nonprofits", href: "/industries/nonprofits" },
];

export function BeamsHero() {
  return (
    <BeamsBackground intensity="medium" className="relative">
      <div className="flex flex-col items-center justify-center gap-8 px-4 text-center max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          className="flex items-center gap-2 rounded-full border border-electric/20 bg-electric/10 px-4 py-2 text-sm text-electric-300 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="h-4 w-4" />
          AI-Powered Business Solutions • Sparta, NJ → Nationwide
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Websites that win local clients.{" "}
          <span className="bg-gradient-to-r from-electric via-magenta to-electric bg-clip-text text-transparent">
            AI apps that scale your time.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We design, build, and{" "}
          <span className="text-electric font-semibold">manage</span> your site—so you can focus on the business.{" "}
          <span className="text-magenta font-semibold">Save 8+ hours/week</span> with AI automation that actually works.
        </motion.p>

        {/* AI Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {aiFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-gradient-to-br from-electric/20 to-magenta/20">
                <feature.icon className="h-8 w-8 text-electric" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-white/70 text-center">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-electric to-magenta px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-electric/25 hover:scale-105"
          >
            Get AI Consultation
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/services/ai-solutions"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
          >
            Explore AI Solutions
          </a>
        </motion.div>

        {/* Industries */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="text-white/60 text-sm">Perfect for:</span>
          {industries.map((industry) => (
            <a
              key={industry.name}
              href={industry.href}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              {industry.name}
            </a>
          ))}
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-electric">&lt;30</div>
            <div className="text-sm text-white/60">Day Launch</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-magenta">+28%</div>
            <div className="text-sm text-white/60">Avg Conversion Lift</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-electric">340%</div>
            <div className="text-sm text-white/60">Average ROI</div>
          </div>
        </motion.div>
      </div>
    </BeamsBackground>
  );
}
