'use client';

import { motion } from 'framer-motion';
import { 
  GlobeAltIcon, 
  CpuChipIcon, 
  ShieldCheckIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

const services = [
  {
    icon: GlobeAltIcon,
    title: 'Websites & Web Apps',
    description: 'Modern, fast, accessible websites and custom web applications built for conversion.',
    features: ['Responsive Design', 'Performance Optimized', 'SEO Ready'],
    href: '/services/websites',
  },
  {
    icon: CpuChipIcon,
    title: 'AI Solutions',
    description: 'Chatbots, automation, and predictive analytics that save time and increase revenue.',
    features: ['AI Chatbots', 'Document Automation', 'Predictive Analytics'],
    href: '/services/ai-solutions',
    featured: true,
  },
  {
    icon: ShieldCheckIcon,
    title: 'Monthly Care Plans',
    description: 'Ongoing maintenance, updates, and support to keep your site running perfectly.',
    features: ['24/7 Monitoring', 'Security Updates', 'Content Updates'],
    href: '/services/care-plans',
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'SEO & Local SEO',
    description: 'Get found by local customers with technical SEO and local search optimization.',
    features: ['Local SEO', 'Technical SEO', 'Content Strategy'],
    href: '/services/seo',
  },
];

export function ServicesOverview() {
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
          <h2 className="text-section-title gradient-text mb-6">
            Everything you need to dominate online
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            From stunning websites to AI-powered automation, we provide the complete digital foundation 
            your business needs to attract, convert, and retain customers.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href={service.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative glass-card p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 ${
                service.featured ? 'ring-2 ring-electric-500/50' : ''
              }`}
            >
              {/* Featured Badge */}
              {service.featured && (
                <div className="absolute -top-3 left-6">
                  <div className="bg-gradient-brand px-3 py-1 rounded-full text-xs font-semibold text-white">
                    AI Powered
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-electric-500/20 to-sunset-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-electric-400" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-card-title text-white mb-3 group-hover:text-electric-300 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-xs text-white/60">
                    <div className="w-1.5 h-1.5 bg-electric-400 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-6 h-6 rounded-full bg-electric-500/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-electric-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/60 text-sm mb-4">
            Need something custom? We build exactly what your business needs.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center text-electric-400 hover:text-electric-300 font-medium transition-colors duration-300"
          >
            Let's discuss your project
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
