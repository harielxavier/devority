'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Building } from 'lucide-react';
import { Shield, GraduationCap, Trophy, Award, Accessibility, Lock } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Devority transformed our online presence completely. The AI chatbot alone has saved us 10+ hours per week and increased our qualified leads by 45%. Best investment we've made for our practice.",
    author: "Dr. Sarah Chen",
    title: "Owner, Summit Dental Care",
    location: "Summit, NJ",
    rating: 5,
    image: "/images/testimonials/sarah-chen.jpg",
    results: "+45% qualified leads",
    featured: true
  },
  {
    id: 2,
    quote: "The team at Devority doesn't just build websites - they build business solutions. Our new site with AI automation has doubled our conversion rate and streamlined our entire intake process.",
    author: "Michael Rodriguez",
    title: "Managing Partner, Rodriguez Law Firm",
    location: "Morristown, NJ",
    rating: 5,
    image: "/images/testimonials/michael-rodriguez.jpg",
    results: "2x conversion rate"
  },
  {
    id: 3,
    quote: "Professional, responsive, and results-driven. They delivered exactly what they promised, on time and on budget. Our online bookings have increased 300% since launch.",
    author: "Tony Precision",
    title: "Owner, Precision HVAC Solutions",
    location: "Sparta, NJ",
    rating: 5,
    image: "/images/testimonials/tony-precision.jpg",
    results: "+300% online bookings"
  },
  {
    id: 4,
    quote: "Working with Devority was seamless from start to finish. They understood our vision and delivered a website that perfectly represents our brand while driving real business results.",
    author: "Lisa Thompson",
    title: "Director, Hope Foundation",
    location: "Madison, NJ",
    rating: 5,
    image: "/images/testimonials/lisa-thompson.jpg",
    results: "+150% donations"
  },
  {
    id: 5,
    quote: "The AI features have been a game-changer for our restaurant. Automated reservations, order management, and customer communication - it's like having a full-time assistant.",
    author: "Chef Marco Italiano",
    title: "Owner, Bella Vista Restaurant",
    location: "Chatham, NJ",
    rating: 5,
    image: "/images/testimonials/marco-italiano.jpg",
    results: "+80% efficiency"
  },
  {
    id: 6,
    quote: "Exceptional service and incredible results. Our website now ranks #1 for local searches and the AI chatbot qualifies leads 24/7. Couldn't be happier with our decision.",
    author: "Jennifer Walsh",
    title: "Practice Manager, Walsh Orthodontics",
    location: "Florham Park, NJ",
    rating: 5,
    image: "/images/testimonials/jennifer-walsh.jpg",
    results: "#1 local ranking"
  }
];

const certifications = [
  {
    name: "Google Partner",
    description: "Certified in Google Ads & Analytics",
    icon: Trophy
  },
  {
    name: "Better Business Bureau",
    description: "A+ Rating",
    icon: Award
  },
  {
    name: "WCAG 2.2 AA",
    description: "Accessibility Certified",
    icon: Accessibility
  },
  {
    name: "SOC 2 Compliant",
    description: "Security & Privacy Standards",
    icon: Lock
  }
];

const localCredentials = [
  {
    organization: "Sparta Chamber of Commerce",
    role: "Technology Committee Member",
    year: "2023-Present"
  },
  {
    organization: "Morris County Business Council",
    role: "Digital Innovation Advisor",
    year: "2022-Present"
  },
  {
    organization: "NJ Small Business Association",
    role: "Featured Speaker",
    year: "2023"
  }
];

export function TrustSignals() {
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
            Trusted by <span className="gradient-text">local businesses</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-4">
            Don't just take our word for it. See what our clients say about working with us.
          </p>

          {/* Quick Stats */}
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white/80">4.9/5 Rating</span>
            </div>
            <div className="text-white/60">•</div>
            <div className="text-white/80">50+ Projects Completed</div>
            <div className="text-white/60">•</div>
            <div className="text-white/80">100% Client Satisfaction</div>
          </div>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {testimonials
            .filter(testimonial => testimonial.featured)
            .map((testimonial) => (
              <div key={testimonial.id} className="glass-card p-8 lg:p-12 ring-2 ring-electric-500/30">
                <div className="flex items-center space-x-2 mb-6">
                  <Trophy className="w-5 h-5 text-sunset-400" />
                  <span className="text-sm font-medium text-sunset-400">Featured Review</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Quote */}
                  <div className="lg:col-span-2">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-white/90 italic mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-semibold">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.author}</div>
                        <div className="text-sm text-white/70">{testimonial.title}</div>
                        <div className="flex items-center text-sm text-white/60">
                          <MapPin className="w-3 h-3 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="text-center">
                    <div className="glass-card p-6">
                      <div className="text-3xl font-display font-black gradient-text mb-2">
                        {testimonial.results}
                      </div>
                      <div className="text-white/80 font-medium">
                        Business Impact
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {testimonials
            .filter(testimonial => !testimonial.featured)
            .slice(0, 6)
            .map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:bg-white/10 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/90 text-sm italic mb-4 leading-relaxed">
                  "{testimonial.quote.length > 150 ? testimonial.quote.substring(0, 150) + '...' : testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{testimonial.author}</div>
                    <div className="text-xs text-white/70">{testimonial.title}</div>
                  </div>
                </div>

                {/* Location & Results */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center text-white/60">
                    <MapPin className="w-3 h-3 mr-1" />
                    {testimonial.location}
                  </div>
                  <div className="text-green-400 font-medium">
                    {testimonial.results}
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Certifications & Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Certifications */}
          <div>
            <h3 className="text-xl font-display font-semibold text-white mb-6 flex items-center">
              <Shield className="w-6 h-6 text-electric-400 mr-2" />
              Certifications & Standards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-4 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-electric-400 mb-2">
                    <cert.icon className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="font-semibold text-white text-sm mb-1">{cert.name}</div>
                  <div className="text-xs text-white/60">{cert.description}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Local Credentials */}
          <div>
            <h3 className="text-xl font-display font-semibold text-white mb-6 flex items-center">
              <Building className="w-6 h-6 text-sunset-400 mr-2" />
              Local Community Involvement
            </h3>
            <div className="space-y-4">
              {localCredentials.map((credential, index) => (
                <motion.div
                  key={credential.organization}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-4 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white text-sm mb-1">
                        {credential.organization}
                      </div>
                      <div className="text-xs text-electric-300">
                        {credential.role}
                      </div>
                    </div>
                    <div className="text-xs text-white/60">
                      {credential.year}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Google Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-8 text-center"
        >
          <h3 className="text-xl font-display font-semibold text-white mb-4">
            See all our reviews
          </h3>
          <p className="text-white/70 mb-6">
            Read more client success stories and reviews on Google Business Profile
          </p>

          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">4.9/5</div>
              <div className="text-sm text-white/60">Google Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">50+</div>
              <div className="text-sm text-white/60">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">100%</div>
              <div className="text-sm text-white/60">Recommend</div>
            </div>
          </div>

          <a
            href="https://g.page/r/devority-reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-ink font-medium rounded-full hover:bg-white/90 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Read Google Reviews
          </a>
        </motion.div>
      </div>
    </section>
  );
}
