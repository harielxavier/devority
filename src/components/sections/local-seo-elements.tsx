'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Clock, Users, Award } from 'lucide-react';

const serviceAreas = [
  'Sparta, NJ',
  'Morristown, NJ',
  'Summit, NJ',
  'Madison, NJ',
  'Chatham, NJ',
  'Florham Park, NJ',
  'New Providence, NJ',
  'Berkeley Heights, NJ'
];

const googleReviews = [
  {
    id: 1,
    name: 'Jennifer Walsh',
    rating: 5,
    date: '2 weeks ago',
    text: 'Devority completely transformed our dental practice website. We\'ve seen a 65% increase in new patient appointments since launch. Highly recommend!',
    verified: true
  },
  {
    id: 2,
    name: 'Mark Thompson',
    rating: 5,
    date: '1 month ago',
    text: 'Professional, responsive, and results-driven. Our law firm\'s online presence has never been stronger. The AI chatbot is a game-changer.',
    verified: true
  },
  {
    id: 3,
    name: 'Lisa Rodriguez',
    rating: 5,
    date: '3 weeks ago',
    text: 'Best investment we\'ve made for our HVAC business. The website pays for itself with the new customers it brings in every month.',
    verified: true
  },
  {
    id: 4,
    name: 'David Chen',
    rating: 5,
    date: '1 week ago',
    text: 'Outstanding service and support. They don\'t just build websites, they build businesses. Our revenue has increased by 40% since working with them.',
    verified: true
  }
];

export function GoogleReviewsWidget() {
  const averageRating = 4.9;
  const totalReviews = 47;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
        <div>
          <h3 className="font-semibold text-white">Google Reviews</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                />
              ))}
            </div>
            <span className="text-white font-semibold">{averageRating}</span>
            <span className="text-white/60 text-sm">({totalReviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {googleReviews.map((review) => (
          <div key={review.id} className="border-b border-white/10 pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-electric-500 to-sunset-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-semibold">
                  {review.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-white text-sm">{review.name}</span>
                  {review.verified && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-white/60">{review.date}</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/10 text-center">
        <a 
          href="https://www.google.com/search?q=devority+sparta+nj" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-electric-400 hover:text-electric-300 transition-colors"
        >
          View all reviews on Google →
        </a>
      </div>
    </motion.div>
  );
}

export function ServiceAreasSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-6 h-6 text-electric-400" />
        <h3 className="text-xl font-semibold text-white">Service Areas</h3>
      </div>
      
      <p className="text-white/80 mb-6">
        Proudly serving businesses throughout Northern New Jersey with premium website design, 
        AI solutions, and digital marketing services.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {serviceAreas.map((area, index) => (
          <motion.div
            key={area}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-lg p-3 text-center hover:border-electric-500/30 transition-colors"
          >
            <span className="text-white text-sm font-medium">{area}</span>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-white/60 mb-3">
          Don't see your area? We serve all of Northern New Jersey!
        </p>
        <a 
          href="/contact" 
          className="text-sm text-electric-400 hover:text-electric-300 transition-colors font-medium"
        >
          Contact us to discuss your location →
        </a>
      </div>
    </motion.div>
  );
}

export function LocalBusinessInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-6 h-6 text-sunset-400" />
        <h3 className="text-xl font-semibold text-white">Local Business</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-electric-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-white">Headquarters</div>
            <div className="text-white/70 text-sm">Sparta, New Jersey 07871</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-electric-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-white">Phone</div>
            <a 
              href="tel:+19735550123" 
              className="text-electric-400 hover:text-electric-300 transition-colors text-sm"
            >
              (973) 555-0123
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-electric-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-white">Business Hours</div>
            <div className="text-white/70 text-sm">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-electric-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-white">Established</div>
            <div className="text-white/70 text-sm">Serving New Jersey since 2019</div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-electric-300">Local</div>
            <div className="text-xs text-white/60">Focus</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sunset-300">Trusted</div>
            <div className="text-xs text-white/60">Partner</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-300">5</div>
            <div className="text-xs text-white/60">Years</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function LocalSEOSection() {
  return (
    <section className="py-16 bg-white/5 border-y border-white/10">
      <div className="max-w-container container-padding mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="gradient-text">Local</span> New Jersey Business
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Based in Sparta, NJ, we understand the local market and help businesses throughout Northern New Jersey dominate their competition online.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GoogleReviewsWidget />
          <ServiceAreasSection />
          <LocalBusinessInfo />
        </div>
      </div>
    </section>
  );
}
