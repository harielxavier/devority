'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Award, Search, TrendingUp, CheckCircle } from 'lucide-react';

interface Solution {
  title: string;
  description: string;
  icon: string;
  results: string;
}

interface IndustryFeaturesProps {
  data: {
    solutions: Solution[];
  };
}

const iconMap = {
  MessageSquare,
  Award,
  Search,
  TrendingUp,
  CheckCircle
};

export function IndustryFeatures({ data }: IndustryFeaturesProps) {
  return (
    <section className="section-padding bg-gradient-to-br from-navy-900 via-midnight to-navy-900">
      <div className="max-w-container container-padding mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our <span className="gradient-text">specialized solutions</span> for your industry
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            We understand the unique challenges of your business and have developed proven strategies 
            that deliver measurable results for companies just like yours.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.solutions.map((solution, index) => {
            const IconComponent = iconMap[solution.icon as keyof typeof iconMap] || CheckCircle;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 group hover:scale-105 transition-transform duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-electric-500 to-sunset-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4">
                  {solution.title}
                </h3>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  {solution.description}
                </p>

                {/* Results Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-semibold text-sm">{solution.results}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to see these results for your business?
            </h3>
            <p className="text-white/80 mb-6">
              Schedule a free consultation to discuss how we can implement these solutions for your specific needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-electric-500 to-sunset-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Schedule Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
