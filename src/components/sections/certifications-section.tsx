'use client';

import { motion } from 'framer-motion';
import { Award, Shield, Star, CheckCircle, Globe, Zap } from 'lucide-react';

export function CertificationsSection() {
  const certifications = [
    {
      name: 'Google Partner',
      description: 'Certified Google Ads and Analytics expert',
      icon: Globe,
      verified: true,
      year: '2022'
    },
    {
      name: 'Meta Business Partner',
      description: 'Facebook & Instagram advertising certified',
      icon: Star,
      verified: true,
      year: '2023'
    },
    {
      name: 'AWS Certified',
      description: 'Cloud infrastructure and hosting expert',
      icon: Shield,
      verified: true,
      year: '2023'
    },
    {
      name: 'HubSpot Certified',
      description: 'Inbound marketing and CRM specialist',
      icon: Zap,
      verified: true,
      year: '2024'
    }
  ];

  const achievements = [
    {
      title: 'Top 1% Web Designers',
      subtitle: 'New Jersey 2023',
      metric: '#1',
      description: 'Ranked by client satisfaction and results'
    },
    {
      title: 'Client Retention Rate',
      subtitle: 'Industry Leading',
      metric: '96%',
      description: 'Clients stay with us year after year'
    },
    {
      title: 'Average ROI Increase',
      subtitle: 'For Our Clients',
      metric: '340%',
      description: 'Measurable business growth results'
    },
    {
      title: 'Projects Completed',
      subtitle: 'Since 2016',
      metric: '500+',
      description: 'Successful websites and campaigns'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-midnight via-navy-900 to-midnight">
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
            <span className="gradient-text">Certified experts</span> you can trust
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Our team maintains the highest industry certifications and continuously 
            updates our skills to provide you with cutting-edge solutions that deliver results.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center group hover:scale-105 transition-transform"
            >
              {/* Icon */}
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-brand rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <cert.icon className="w-8 h-8 text-white" />
                </div>
                {cert.verified && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="font-bold text-white mb-2">
                {cert.name}
              </h3>
              <p className="text-white/70 text-sm mb-3">
                {cert.description}
              </p>
              <div className="text-electric-400 text-xs font-medium">
                Certified {cert.year}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Recognition & <span className="gradient-text">achievements</span>
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto">
            Our commitment to excellence has earned us recognition from industry leaders 
            and, more importantly, exceptional results for our clients.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center group hover:scale-105 transition-transform"
            >
              {/* Metric */}
              <div className="text-3xl font-bold gradient-text mb-2">
                {achievement.metric}
              </div>
              
              {/* Title */}
              <h4 className="font-bold text-white mb-1">
                {achievement.title}
              </h4>
              
              {/* Subtitle */}
              <div className="text-electric-400 text-sm font-medium mb-3">
                {achievement.subtitle}
              </div>
              
              {/* Description */}
              <p className="text-white/70 text-xs">
                {achievement.description}
              </p>

              {/* Award Icon */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Award className="w-6 h-6 text-electric-400 mx-auto" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Shield className="w-8 h-8 text-electric-400" />
              <h3 className="text-xl font-bold text-white">
                Trusted by 500+ New Jersey Businesses
              </h3>
            </div>
            <p className="text-white/80 mb-6">
              Our certifications and track record speak for themselves, but our clients' 
              success stories are what truly matter. Join the growing list of businesses 
              that trust Devority with their online presence.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-brand text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              See Client Success Stories
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
