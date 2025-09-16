'use client';

import { motion } from 'framer-motion';
import { Search, Bot, Clock, TrendingUp, MapPin, Zap } from 'lucide-react';
import { LocalSEOBackground } from '@/components/ui/local-seo-background';

const seoFeatures = [
  {
    icon: Search,
    title: "Local SEO Domination",
    description: "Rank #1 in local search results and capture customers actively looking for your services in your area.",
    stats: "340% average increase in local visibility",
    color: "from-electric-500 to-blue-500"
  },
  {
    icon: Bot,
    title: "AI-Powered Solutions", 
    description: "Intelligent automation that handles customer inquiries, schedules appointments, and nurtures leads 24/7.",
    stats: "85% reduction in response time",
    color: "from-magenta-500 to-purple-500"
  },
  {
    icon: Clock,
    title: "Same-Day Response",
    description: "Lightning-fast implementation and support. Your website launches quickly and issues get resolved immediately.",
    stats: "< 4 hour average response time",
    color: "from-sunset-500 to-orange-500"
  }
];

const additionalFeatures = [
  { icon: TrendingUp, text: "Google My Business Optimization" },
  { icon: MapPin, text: "Local Citation Building" },
  { icon: Zap, text: "Speed & Performance Optimization" }
];

export function SEOFeatures() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-midnight to-midnight/95">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Local SEO Background Graphic */}
        <LocalSEOBackground className="text-white opacity-15" />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sunset-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center glass-card px-6 py-3 rounded-full text-sm font-medium text-electric-300 mb-6 border border-electric-500/20"
          >
            <Search className="w-4 h-4 mr-2 text-electric-400" />
            <span className="w-2 h-2 bg-electric-400 rounded-full mr-3 animate-pulse" />
            SEO & Performance Excellence
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">
            Dominate Local Search Results
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Our proven SEO strategies and AI-powered solutions ensure your business gets found by customers 
            actively searching for your services in your local area.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {seoFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="glass-card p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                {/* Icon with Gradient Background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-electric-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="flex items-center text-sm font-semibold">
                  <div className="w-2 h-2 bg-electric-400 rounded-full mr-3 animate-pulse" />
                  <span className="gradient-text">{feature.stats}</span>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-electric-500/5 to-sunset-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card p-8 rounded-2xl border border-white/10"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-6 text-center">
            Plus Everything You Need to Succeed Online
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-electric-500/20 to-sunset-500/20 mr-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5 h-5 text-electric-400" />
                </div>
                <span className="text-white/80 font-medium group-hover:text-white transition-colors">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
