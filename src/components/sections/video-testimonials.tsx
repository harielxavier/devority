'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, Star, Quote, TrendingUp, Users, DollarSign } from 'lucide-react';
import Image from 'next/image';

interface VideoTestimonial {
  id: string;
  name: string;
  business: string;
  location: string;
  industry: string;
  videoUrl: string;
  thumbnailUrl: string;
  quote: string;
  results: {
    metric: string;
    improvement: string;
    timeframe: string;
  };
  rating: number;
  duration: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    business: 'Johnson Family Dentistry',
    location: 'Morristown, NJ',
    industry: 'Dental',
    videoUrl: '/videos/testimonials/dr-johnson.mp4',
    thumbnailUrl: '/images/testimonials/dr-johnson-thumb.jpg',
    quote: "Devority's AI chatbot reduced our no-shows by 28% and increased new patient bookings by 65%. The ROI was immediate.",
    results: {
      metric: 'Patient Bookings',
      improvement: '+65%',
      timeframe: '3 months'
    },
    rating: 5,
    duration: '1:24'
  },
  {
    id: '2',
    name: 'Michael Chen',
    business: 'Chen & Associates Law',
    location: 'Summit, NJ',
    industry: 'Legal',
    videoUrl: '/videos/testimonials/michael-chen.mp4',
    thumbnailUrl: '/images/testimonials/michael-chen-thumb.jpg',
    quote: "Devority redesigned our website and implemented their AI system, significantly improving our consultation requests.",
    results: {
      metric: 'Consultations',
      improvement: 'Increased',
      timeframe: '4 months'
    },
    rating: 5,
    duration: '1:18'
  },
  {
    id: '3',
    name: 'Tony Rodriguez',
    business: 'Rodriguez HVAC Solutions',
    location: 'Sparta, NJ',
    industry: 'HVAC',
    videoUrl: '/videos/testimonials/tony-rodriguez.mp4',
    thumbnailUrl: '/images/testimonials/tony-rodriguez-thumb.jpg',
    quote: "Best investment we've made. The website pays for itself every month with the new customers it brings in.",
    results: {
      metric: 'Monthly Revenue',
      improvement: '+$12K',
      timeframe: '6 months'
    },
    rating: 5,
    duration: '0:58'
  }
];

export function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handlePlayVideo = (videoId: string) => {
    setActiveVideo(videoId);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-navy-900 via-midnight to-navy-900">
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
            Real businesses, <span className="gradient-text">real results</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            Don't just take our word for it. Hear directly from local business owners who've transformed their digital presence with Devority.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-electric-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-white/70">Proven Results</span>
            </div>
            <div className="flex items-center gap-2 text-sunset-400">
              <DollarSign className="w-4 h-4" />
              <span className="text-white/70">Revenue Growth</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Users className="w-4 h-4" />
              <span className="text-white/70">Happy Clients</span>
            </div>
          </div>
        </motion.div>

        {/* Video Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {videoTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-electric-500/20 to-sunset-500/20 overflow-hidden">
                {/* Placeholder for video thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-midnight to-navy-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                    <div className="text-white/80 text-sm">{testimonial.industry} Success Story</div>
                  </div>
                </div>
                
                {/* Play Button Overlay */}
                <button
                  onClick={() => handlePlayVideo(testimonial.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group"
                >
                  <div className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-midnight ml-1" />
                  </div>
                </button>
                
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-xs">
                  {testimonial.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-electric-400/50 absolute -top-2 -left-1" />
                  <blockquote className="text-white/90 italic pl-6 text-sm leading-relaxed">
                    {testimonial.quote}
                  </blockquote>
                </div>

                {/* Results Highlight */}
                <div className="bg-gradient-to-r from-electric-500/20 to-sunset-500/20 border border-electric-500/30 rounded-lg p-3 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-electric-300 mb-1">
                      {testimonial.results.improvement}
                    </div>
                    <div className="text-xs text-white/70">
                      {testimonial.results.metric} in {testimonial.results.timeframe}
                    </div>
                  </div>
                </div>

                {/* Business Info */}
                <div className="border-t border-white/10 pt-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-electric-300">{testimonial.business}</div>
                  <div className="text-xs text-white/60">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full aspect-video bg-midnight rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-midnight to-navy-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Video Player</p>
                  <p className="text-sm text-white/60">
                    {videoTestimonials.find(t => t.id === activeVideo)?.name} - {videoTestimonials.find(t => t.id === activeVideo)?.business}
                  </p>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to be our next success story?
            </h3>
            <p className="text-white/80 mb-6">
              Join hundreds of local businesses that have transformed their digital presence and dramatically increased their revenue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-electric-500 to-sunset-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Get My Free Strategy Call
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all"
              >
                View Our Portfolio
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
