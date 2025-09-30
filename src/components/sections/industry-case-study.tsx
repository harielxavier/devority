'use client';

import { motion } from 'framer-motion';
import { Quote, TrendingUp, MapPin, Star } from 'lucide-react';

interface CaseStudyResult {
  metric: string;
  improvement: string;
  timeframe: string;
}

interface IndustryCaseStudyProps {
  data: {
    clientName: string;
    location: string;
    practiceAreas: string[];
    challenge: string;
    solution: string;
    results: CaseStudyResult[];
    testimonial: string;
    clientTitle: string;
  };
}

export function IndustryCaseStudy({ data }: IndustryCaseStudyProps) {
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
            <span className="gradient-text">Real results</span> from a real client
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            See how we helped a business just like yours achieve dramatic growth with our specialized approach.
          </p>
        </motion.div>

        {/* Case Study Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Client Info */}
            <div className="glass-card p-6">
              <h3 className="text-2xl font-bold text-white mb-4">{data.clientName}</h3>
              <div className="flex items-center gap-2 text-white/70 mb-3">
                <MapPin className="w-4 h-4" />
                <span>{data.location}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.practiceAreas.map((area, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-electric-500/20 border border-electric-500/30 rounded-full text-electric-300 text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenge */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-3">The Challenge</h4>
              <p className="text-white/80 leading-relaxed">{data.challenge}</p>
            </div>

            {/* Solution */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-3">Our Solution</h4>
              <p className="text-white/80 leading-relaxed">{data.solution}</p>
            </div>

            {/* Testimonial */}
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-electric-400 flex-shrink-0 mt-1" />
                <div>
                  <blockquote className="text-white/90 italic mb-4 text-lg leading-relaxed">
                    "{data.testimonial}"
                  </blockquote>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <cite className="text-electric-300 font-semibold not-italic">
                    {data.clientTitle}
                  </cite>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-white mb-2">The Results</h4>
              <p className="text-white/70">Measurable improvements across all key metrics</p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 gap-6">
              {data.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-electric-500 to-sunset-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {result.improvement}
                  </div>
                  
                  <div className="font-semibold text-white mb-1">
                    {result.metric}
                  </div>
                  
                  <div className="text-sm text-white/60">
                    in {result.timeframe}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center pt-8"
            >
              <div className="glass-card p-6">
                <h5 className="text-lg font-semibold text-white mb-3">
                  Want similar results for your business?
                </h5>
                <p className="text-white/70 mb-4 text-sm">
                  Schedule a free consultation to discuss your specific goals
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-electric-500 to-sunset-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Get My Free Strategy
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
