'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

export function WorkHero() {
  const stats = [
    { icon: Users, label: 'Happy Clients', value: '500+', color: 'from-blue-500 to-cyan-500' },
    { icon: TrendingUp, label: 'Average ROI Increase', value: '340%', color: 'from-green-500 to-emerald-500' },
    { icon: Award, label: 'Projects Completed', value: '750+', color: 'from-purple-500 to-violet-500' },
    { icon: Target, label: 'Client Retention', value: '96%', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-midnight via-navy-900 to-midnight relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-electric-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunset-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-container container-padding mx-auto relative">
        
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-electric-500/20 border border-electric-500/30 rounded-full text-electric-300 text-sm font-medium mb-6"
          >
            <Award className="w-4 h-4" />
            <span>500+ successful projects since 2016</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6">
            Real <span className="gradient-text">results</span> for real businesses
          </h1>

          <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
            Don't just take our word for it. See how we've helped hundreds of New Jersey 
            businesses transform their online presence and achieve measurable growth. 
            Every project tells a story of success.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-brand text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              View All Case Studies
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
            >
              Get Your Free Audit
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="glass-card p-6 text-center group hover:scale-105 transition-transform"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-3xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              
              <div className="text-white/70 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              Every number tells a story
            </h3>
            <p className="text-white/80 leading-relaxed">
              Behind every statistic is a real business owner who trusted us with their 
              online presence. These aren't just numbers—they represent dreams achieved, 
              goals exceeded, and businesses transformed.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
