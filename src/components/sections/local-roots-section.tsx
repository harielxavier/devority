'use client';

import { motion } from 'framer-motion';
import { MapPin, Coffee, Users, Heart, Building, Car } from 'lucide-react';

export function LocalRootsSection() {
  const localFeatures = [
    {
      icon: MapPin,
      title: 'Sparta, NJ Headquarters',
      description: 'Located in the heart of Sussex County, serving all of Northern New Jersey'
    },
    {
      icon: Coffee,
      title: 'Local Coffee Meetings',
      description: 'We prefer face-to-face conversations at your favorite local spot'
    },
    {
      icon: Users,
      title: 'Community Involvement',
      description: 'Active members of local business associations and community events'
    },
    {
      icon: Heart,
      title: 'NJ Business Advocates',
      description: 'Passionate about helping New Jersey businesses compete and thrive'
    }
  ];

  const serviceAreas = [
    'Sparta', 'Newton', 'Hopatcong', 'Dover', 'Morristown', 'Parsippany',
    'Wayne', 'Paterson', 'Clifton', 'Passaic', 'Hackensack', 'Paramus',
    'Ridgewood', 'Fair Lawn', 'Mahwah', 'Ramsey', 'Franklin Lakes'
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
            Proudly <span className="gradient-text">New Jersey</span> born and raised
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            We're not just another remote agency. We're your neighbors, your community partners, 
            and your local advocates. When you succeed, our entire community benefits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Local Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Why being local matters
              </h3>
              <div className="space-y-6">
                {localFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Local Business Stats */}
            <div className="glass-card p-6">
              <h4 className="font-bold text-white mb-4">Local Impact</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">500+</div>
                  <div className="text-white/70 text-sm">NJ Businesses Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">$2.5M+</div>
                  <div className="text-white/70 text-sm">Revenue Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">8</div>
                  <div className="text-white/70 text-sm">Years in NJ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">96%</div>
                  <div className="text-white/70 text-sm">Client Retention</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Service Areas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Map Placeholder */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Service Areas Across Northern NJ
              </h3>
              
              {/* Map Visual */}
              <div className="relative bg-gradient-to-br from-electric-500/20 to-sunset-500/20 rounded-lg p-8 mb-6">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 rounded-lg"></div>
                <div className="relative text-center">
                  <MapPin className="w-16 h-16 text-electric-400 mx-auto mb-4" />
                  <div className="text-white font-semibold mb-2">Sparta, NJ</div>
                  <div className="text-white/70 text-sm">Our Headquarters</div>
                  
                  {/* Service Area Indicators */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-electric-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-6 w-2 h-2 bg-sunset-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-8 w-2 h-2 bg-electric-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 right-4 w-3 h-3 bg-sunset-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Service Areas List */}
              <div>
                <h4 className="font-semibold text-white mb-4 text-center">
                  Cities We Serve
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {serviceAreas.map((city, index) => (
                    <motion.div
                      key={city}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="px-3 py-2 bg-white/5 rounded-lg text-white/80 text-center hover:bg-electric-500/20 transition-colors"
                    >
                      {city}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="glass-card p-6 text-center">
              <Building className="w-12 h-12 text-electric-400 mx-auto mb-4" />
              <h4 className="font-bold text-white mb-3">
                Let's Meet in Person
              </h4>
              <p className="text-white/80 text-sm mb-4">
                Nothing beats a face-to-face conversation. Let's grab coffee 
                and discuss how we can help your business grow.
              </p>
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-brand text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Schedule Coffee
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-all"
                >
                  <Car className="w-4 h-4 inline mr-2" />
                  Get Directions
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
