'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, Zap, Target, Users, Trophy } from 'lucide-react';

export function ValuesSection() {
  const values = [
    {
      icon: Shield,
      title: 'Transparency',
      description: 'No hidden fees, no confusing jargon. We explain everything in plain English and deliver exactly what we promise.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Local Community',
      description: 'We\'re invested in New Jersey\'s success. When local businesses thrive, our entire community benefits.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We stay ahead of technology trends so your business always has the competitive edge it needs to succeed.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'Results Focus',
      description: 'Pretty websites are nice, but we measure success by your ROI. Every decision is made with your bottom line in mind.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We\'re not just vendors, we\'re partners in your success. Your growth is our growth, and we\'re here for the long haul.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'Good enough isn\'t good enough. We obsess over details and continuously improve until you\'re completely satisfied.',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <section className="section-padding bg-white/5 border-y border-white/10">
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
            Our <span className="gradient-text">core values</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            These principles guide every decision we make, every project we take on, 
            and every relationship we build. They're not just words on a wall—they're 
            the foundation of how we do business.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 group hover:scale-105 transition-transform"
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-electric-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4">
                {value.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {value.description}
              </p>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-full h-1 bg-gradient-to-r from-electric-500 to-sunset-500 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <blockquote className="text-2xl font-light text-white/90 italic mb-6">
              "Our values aren't just aspirations—they're commitments. Every client interaction, 
              every line of code, and every design decision reflects these principles."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-brand rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Alex Rodriguez</div>
                <div className="text-electric-400 text-sm">Founder & Lead Developer</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
