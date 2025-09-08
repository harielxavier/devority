'use client';

import { motion } from 'framer-motion';

const metrics = [
  {
    value: '<30',
    unit: 'days',
    label: 'Average Launch Time',
    description: 'From kickoff to live site, we move fast without compromising quality.',
  },
  {
    value: '+28%',
    unit: 'avg',
    label: 'Conversion Lift in 90 Days',
    description: 'Our data-driven approach consistently improves business results.',
  },
  {
    value: '<1',
    unit: 'hour',
    label: 'Response Time on Care+',
    description: 'When you need support, we\'re there. Fast response, faster resolution.',
  },
];

export function WhyDevority() {
  return (
    <section className="section-padding relative">
      <div className="max-w-container container-padding mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title text-white mb-6">
            Why choose <span className="gradient-text">Devority</span>?
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            We're not just another web agency. We're your long-term digital partner, 
            committed to your success with proven results and unmatched support.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              {/* Metric Card */}
              <div className="glass-card p-8 mb-6 group-hover:bg-white/10 transition-all duration-300 transform group-hover:scale-105">
                <div className="mb-4">
                  <div className="text-5xl lg:text-6xl font-display font-black gradient-text mb-2">
                    {metric.value}
                  </div>
                  <div className="text-white/60 text-sm font-medium uppercase tracking-wider">
                    {metric.unit}
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-3">
                  {metric.label}
                </h3>
              </div>

              {/* Description */}
              <p className="text-white/70 leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="glass-card p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-6">
                  Built for <span className="gradient-text">local businesses</span> who want to scale
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-electric-500/20 flex items-center justify-center mr-4 mt-0.5">
                      <div className="w-2 h-2 bg-electric-400 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">No Technical Headaches</h4>
                      <p className="text-white/70 text-sm">We handle everything—hosting, updates, security, backups. You focus on your business.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-sunset-500/20 flex items-center justify-center mr-4 mt-0.5">
                      <div className="w-2 h-2 bg-sunset-400 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">AI That Actually Works</h4>
                      <p className="text-white/70 text-sm">Not just buzzwords. Real AI tools that qualify leads, automate tasks, and save you hours every week.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-orchid-500/20 flex items-center justify-center mr-4 mt-0.5">
                      <div className="w-2 h-2 bg-orchid-400 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Transparent Pricing</h4>
                      <p className="text-white/70 text-sm">No surprises. Clear pricing, detailed proposals, and honest timelines from day one.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-electric-500/10 to-sunset-500/10 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-brand mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="text-2xl font-display font-bold gradient-text mb-2">
                      Sparta, NJ
                    </div>
                    <div className="text-white/60 text-sm">
                      Built local, trusted nationwide
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
