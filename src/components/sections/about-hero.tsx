'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Award, TrendingUp } from 'lucide-react';

export function AboutHero() {
  const stats = [
    { icon: Users, label: 'Happy Clients', value: 'Growing' },
    { icon: Award, label: 'Years Experience', value: '5+' },
    { icon: TrendingUp, label: 'Proven Results', value: 'Delivered' },
    { icon: MapPin, label: 'Local to NJ', value: 'Sparta' }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-midnight via-navy-900 to-midnight relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-electric-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunset-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-container container-padding mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-electric-500/20 border border-electric-500/30 rounded-full text-electric-300 text-sm font-medium mb-6"
              >
                <MapPin className="w-4 h-4" />
                <span>Proudly serving New Jersey since 2016</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6">
                Meet the team behind{' '}
                <span className="gradient-text">Devority</span>
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-8">
                We're not just another web design agency. We're your local New Jersey partners 
                who understand the unique challenges of growing a business in our community. 
                From our home base in Sparta, we've helped hundreds of local businesses 
                transform their online presence and dominate their markets.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-white/80 leading-relaxed">
                To empower local businesses with cutting-edge websites and AI solutions 
                that drive real results. We believe every business deserves a professional 
                online presence that converts visitors into customers.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="glass-card p-6 text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Team Photo Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-card p-8 text-center"
            >
              <div className="w-full h-48 bg-gradient-to-br from-electric-500/20 to-sunset-500/20 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Users className="w-12 h-12 text-white/60 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Team Photo Coming Soon</p>
                </div>
              </div>
              <p className="text-white/80 text-sm">
                The Devority team at our Sparta, NJ headquarters
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
