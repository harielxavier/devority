'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail, Code, Palette, BarChart3, Zap } from 'lucide-react';

export function TeamSection() {
  const team = [
    {
      name: 'Alex Rodriguez',
      role: 'Founder & Lead Developer',
      bio: 'Full-stack developer with 8+ years building websites that convert. Passionate about helping local NJ businesses succeed online.',
      skills: ['React/Next.js', 'AI Integration', 'Performance Optimization'],
      icon: Code,
      image: '/images/team/alex.jpg' // Placeholder
    },
    {
      name: 'Sarah Chen',
      role: 'UI/UX Designer',
      bio: 'Creates beautiful, user-friendly designs that drive conversions. Specializes in local business branding and mobile-first design.',
      skills: ['UI/UX Design', 'Branding', 'Conversion Optimization'],
      icon: Palette,
      image: '/images/team/sarah.jpg' // Placeholder
    },
    {
      name: 'Mike Thompson',
      role: 'Digital Marketing Strategist',
      bio: 'Local SEO expert who helps NJ businesses dominate Google search results. 5+ years growing local business revenue.',
      skills: ['Local SEO', 'Google Ads', 'Analytics'],
      icon: BarChart3,
      image: '/images/team/mike.jpg' // Placeholder
    },
    {
      name: 'Jessica Park',
      role: 'AI Solutions Specialist',
      bio: 'Implements chatbots and automation that save businesses time and increase conversions. Makes AI accessible for everyone.',
      skills: ['AI Chatbots', 'Automation', 'Customer Support'],
      icon: Zap,
      image: '/images/team/jessica.jpg' // Placeholder
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
            Meet the <span className="gradient-text">dream team</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Our diverse team of experts brings together years of experience in web development, 
            design, marketing, and AI. We're all locals who understand the New Jersey business landscape.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center group hover:scale-105 transition-transform"
            >
              {/* Profile Image Placeholder */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <member.icon className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-electric-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Member Info */}
              <h3 className="text-xl font-bold text-white mb-2">
                {member.name}
              </h3>
              <div className="text-electric-400 font-medium mb-4">
                {member.role}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                {member.bio}
              </p>

              {/* Skills */}
              <div className="space-y-2 mb-6">
                {member.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="px-3 py-1 bg-electric-500/20 border border-electric-500/30 rounded-full text-electric-300 text-xs"
                  >
                    {skill}
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-white/10 hover:bg-electric-500/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-white/70" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-white/10 hover:bg-electric-500/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4 text-white/70" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="glass-card p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">
              What drives us every day
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-electric-400 font-bold text-lg mb-2">Local Focus</div>
                <p className="text-white/80 text-sm">
                  We understand NJ businesses because we are one. Every solution is tailored for our local market.
                </p>
              </div>
              <div>
                <div className="text-electric-400 font-bold text-lg mb-2">Results Driven</div>
                <p className="text-white/80 text-sm">
                  We don't just build websites, we build businesses. Every project is measured by your success.
                </p>
              </div>
              <div>
                <div className="text-electric-400 font-bold text-lg mb-2">Always Learning</div>
                <p className="text-white/80 text-sm">
                  Technology evolves fast. We stay ahead so your business always has the latest advantages.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
