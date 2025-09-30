'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Trophy, ExternalLink, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const caseStudies = [
  {
    id: 'pbnj-law',
    client: 'PBNJ Law',
    industry: 'Legal',
    websiteUrl: 'https://pbnjlaw.com',
    challenge: 'Need for a professional web presence that converts visitors into consultations',
    solution: 'Custom website with integrated contact forms and clear service offerings',
    timeline: 'Recently Launched',
    image: '/images/pbnjlaw.png',
    description: 'Professional legal services website designed to build trust and facilitate client communication',
    features: [
      'Professional design',
      'Mobile responsive',
      'Contact forms',
      'Service pages'
    ],
    technologies: ['Next.js', 'Responsive Design', 'SEO Optimization'],
    featured: true
  },
  {
    id: 'cleynz',
    client: 'Cleynz',
    industry: 'Cleaning Services',
    websiteUrl: 'https://www.cleynz.com',
    challenge: 'Standing out in a competitive local cleaning services market',
    solution: 'Clean, modern website with online booking capabilities',
    timeline: 'Recently Launched',
    image: '/images/cleynz.png',
    description: 'Modern cleaning services website with streamlined booking and service information',
    features: [
      'Online booking',
      'Service packages',
      'Customer portal',
      'Mobile optimized'
    ],
    technologies: ['React', 'Booking System', 'Payment Integration']
  },
  {
    id: 'spartan-rad',
    client: 'Spartan Rad',
    industry: 'Medical/Radiology',
    websiteUrl: 'https://www.spartanrad.com',
    challenge: 'Presenting complex medical services in an accessible way',
    solution: 'Professional healthcare website with patient resources',
    timeline: 'Recently Launched',
    image: '/images/spartanrad.png',
    description: 'Healthcare website focused on patient education and easy access to services',
    features: [
      'Patient resources',
      'Service information',
      'Contact system',
      'HIPAA considerations'
    ],
    technologies: ['Next.js', 'Secure Forms', 'Healthcare Compliance']
  },
  {
    id: 'hariel-xavier',
    client: 'Hariel Xavier Photography',
    industry: 'Photography',
    websiteUrl: 'https://harielxavier.com',
    challenge: 'Showcasing portfolio work in a visually stunning way',
    solution: 'Gallery-focused website with client booking system',
    timeline: 'Recently Launched',
    image: '/images/harielxavier.png',
    description: 'Portfolio website designed to showcase photography work and attract new clients',
    features: [
      'Gallery showcase',
      'Portfolio sections',
      'Booking system',
      'Client galleries'
    ],
    technologies: ['React', 'Image Optimization', 'Gallery System']
  }
];

export function WorkShowcase() {
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
            Our <span className="gradient-text">Work</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Real websites for real businesses. See our recent projects.
          </p>
        </motion.div>

        {/* Featured Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {caseStudies
            .filter(study => study.featured)
            .map((study) => (
              <div key={study.id} className="glass-card p-8 lg:p-12 ring-2 ring-electric-500/30">
                <div className="flex items-center space-x-2 mb-6">
                  <Trophy className="w-5 h-5 text-sunset-400" />
                  <span className="text-sm font-medium text-sunset-400">Featured Project</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-display font-bold text-white mb-2">
                        {study.client}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-white/60 mb-4">
                        <span>{study.industry}</span>
                        <span>•</span>
                        <span>{study.timeline}</span>
                      </div>
                      <p className="text-white/80 mb-4">{study.description}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-2">Challenge</h4>
                      <p className="text-white/70 mb-4">{study.challenge}</p>

                      <h4 className="font-semibold text-white mb-2">Solution</h4>
                      <p className="text-white/70">{study.solution}</p>
                    </div>

                    {/* Features List */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {study.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-white/70">
                            <Check className="w-4 h-4 text-electric-400 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium text-electric-300 bg-electric-500/10 rounded-full border border-electric-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a 
                      href={study.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-electric-500 to-sunset-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
                    >
                      Visit Live Site
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </div>

                  {/* Right column image */}
                  <div>
                    <div className="relative w-full h-96 mb-6">
                      <Image
                        src={study.image}
                        alt={study.client}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-contain object-top rounded-xl"
                        priority={true}
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/10 to-transparent rounded-xl" />
                    </div>
                    
                    {/* Website URL Card */}
                    <div className="glass-card p-6">
                      <div className="text-sm text-white/60 mb-2">Live Website</div>
                      <a 
                        href={study.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-electric-300 hover:text-electric-200 font-medium flex items-center"
                      >
                        {study.websiteUrl.replace('https://', '')}
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </motion.div>

        {/* Additional Case Studies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {caseStudies
            .filter(study => !study.featured)
            .map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden group hover:bg-white/10 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={study.image}
                    alt={study.client}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-electric-300 transition-colors">
                      {study.client}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm text-white/60">
                      <span className="px-2 py-1 bg-white/10 rounded-full">{study.industry}</span>
                    </div>
                  </div>

                  <p className="text-sm text-white/70 mb-4">{study.description}</p>

                  {/* Features Preview */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {study.features.slice(0, 3).map((feature, index) => (
                        <span 
                          key={index} 
                          className="text-xs text-electric-300 bg-electric-500/10 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={study.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-electric-400 hover:text-electric-300 font-medium flex items-center group-hover:translate-x-1 transition-transform"
                  >
                    Visit Website
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center glass-card p-8"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Ready to Build Your Website?
          </h3>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Let's create a website that drives results for your business.
          </p>
          <Button href="/contact" size="lg" variant="primary">
            Start Your Project
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}