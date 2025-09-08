'use client';

import { motion } from 'framer-motion';

const results = [
  {
    metric: '340%',
    label: 'Average ROI',
    description: 'Return on investment within 6 months',
    color: 'text-green-400'
  },
  {
    metric: '8+ hrs',
    label: 'Time Saved',
    description: 'Per week on average',
    color: 'text-electric-400'
  },
  {
    metric: '+28%',
    label: 'Revenue Increase',
    description: 'Average across all clients',
    color: 'text-sunset-400'
  },
  {
    metric: '24/7',
    label: 'Availability',
    description: 'AI never sleeps',
    color: 'text-orchid-400'
  }
];

export function AIResults() {
  return (
    <section className="section-padding relative">
      <div className="max-w-container container-padding mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title text-white mb-6">
            Proven <span className="gradient-text">Results</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Our AI solutions deliver measurable results for local businesses across all industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center"
            >
              <div className={`text-4xl font-display font-black mb-2 ${result.color}`}>
                {result.metric}
              </div>
              <div className="text-white font-semibold mb-2">{result.label}</div>
              <div className="text-sm text-white/60">{result.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
