'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Award, Shield, CheckCircle } from 'lucide-react';

const mediaLogos = [
  {
    name: 'Google Partner',
    logo: '/images/logos/google-partner.svg',
    width: 120,
    height: 40,
    verified: true
  },
  {
    name: 'Better Business Bureau',
    logo: '/images/logos/bbb-logo.svg',
    width: 80,
    height: 40,
    verified: true
  },
  {
    name: 'Yelp',
    logo: '/images/logos/yelp-logo.svg',
    width: 60,
    height: 40,
    verified: false
  },
  {
    name: 'Facebook',
    logo: '/images/logos/facebook-logo.svg',
    width: 100,
    height: 40,
    verified: false
  },
  {
    name: 'LinkedIn',
    logo: '/images/logos/linkedin-logo.svg',
    width: 100,
    height: 40,
    verified: false
  }
];

const achievements = [
  {
    icon: Star,
    title: 'Highly Rated',
    subtitle: 'Trusted by local businesses',
    color: 'text-yellow-400'
  },
  {
    icon: Award,
    title: 'Certified Agency',
    subtitle: 'In New Jersey',
    color: 'text-electric-400'
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    subtitle: '$2M Liability Coverage',
    color: 'text-green-400'
  },
  {
    icon: CheckCircle,
    title: 'Proven Results',
    subtitle: 'Successfully Delivered',
    color: 'text-sunset-400'
  }
];

const testimonialHighlights = [
  {
    quote: "Significantly increased our leads and improved our online presence",
    author: "Dr. Sarah Johnson",
    business: "Dental Practice"
  },
  {
    quote: "Best investment we've made for our law firm",
    author: "Michael Chen",
    business: "Attorney"
  },
  {
    quote: "Finally, a website that actually brings in customers",
    author: "Tony Rodriguez",
    business: "HVAC Company"
  }
];

export function CredibilitySection() {
  return (
    <section className="py-16 bg-white/5 border-y border-white/10">
      <div className="max-w-container container-padding mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Trusted by <span className="gradient-text">local businesses</span> across New Jersey
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Join the growing number of local businesses that trust Devority to handle their digital presence
          </p>
        </motion.div>

        {/* Media Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-white/90 mb-2">As Featured On & Certified By</h4>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {mediaLogos.map((media, index) => (
              <motion.div
                key={media.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="flex items-center justify-center p-4 bg-white/5 rounded-lg border border-white/10 hover:border-electric-500/30 transition-colors">
                  {/* Placeholder for logos - in production, you'd use actual logo files */}
                  <div 
                    className="flex items-center justify-center text-white/60 font-semibold text-sm"
                    style={{ width: media.width, height: media.height }}
                  >
                    {media.name}
                  </div>
                  {media.verified && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
              </div>
              <h5 className="font-semibold text-white mb-1">{achievement.title}</h5>
              <p className="text-sm text-white/60">{achievement.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonialHighlights.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center"
            >
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-white/90 mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-sm">
                <div className="font-semibold text-electric-300">{testimonial.author}</div>
                <div className="text-white/60">{testimonial.business}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Industry Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>5-Star Rated</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
