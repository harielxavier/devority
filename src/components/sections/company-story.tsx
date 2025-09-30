'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Target, Rocket, Heart } from 'lucide-react';

export function CompanyStory() {
  const timeline = [
    {
      year: '2016',
      title: 'The Beginning',
      description: 'Started as a freelance web designer helping local Sparta businesses get online.',
      icon: Lightbulb
    },
    {
      year: '2018',
      title: 'Growing the Vision',
      description: 'Expanded to serve all of Northern New Jersey with a focus on results-driven design.',
      icon: Target
    },
    {
      year: '2021',
      title: 'AI Revolution',
      description: 'Pioneered AI integration for local businesses, becoming the first in NJ to offer chatbot solutions.',
      icon: Rocket
    },
    {
      year: '2024',
      title: 'Community Impact',
      description: 'Now serving 500+ businesses across New Jersey with websites that actually convert.',
      icon: Heart
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
            Our <span className="gradient-text">story</span> started with a simple belief
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Every local business deserves a website that works as hard as they do. 
            What started as a one-person mission in Sparta, NJ has grown into a team 
            dedicated to transforming how local businesses succeed online.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-electric-500 to-sunset-500 rounded-full hidden lg:block"></div>

          <div className="space-y-12 lg:space-y-16">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 lg:max-w-md">
                  <div className={`glass-card p-8 ${
                    index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                  }`}>
                    <div className="text-electric-400 font-bold text-lg mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Icon */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center border-4 border-midnight z-10 relative">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="flex-1 lg:max-w-md hidden lg:block"></div>
              </motion.div>
            ))}
          </div>
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
              Ready to be part of our success story?
            </h3>
            <p className="text-white/80 mb-6">
              Join hundreds of New Jersey businesses that have transformed their 
              online presence with Devority. Let's write your success story together.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-brand text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Start Your Story Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
