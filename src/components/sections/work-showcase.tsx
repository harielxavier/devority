'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

const caseStudies = [
  {
    id: 'morris-law',
    client: 'Morris & Associates Law',
    industry: 'Legal',
    location: 'Morristown, NJ',
    challenge: 'Overwhelmed with unqualified leads and manual intake processes',
    solution: 'AI-powered intake system with automated lead qualification',
    timeline: '6 weeks',
    image: '/images/case-studies/morris-law.jpg',
    metrics: {
      primary: {
        value: '+42%',
        label: 'Qualified Consultations',
        description: 'Increase in high-quality leads'
      },
      secondary: [
        { value: '8 hrs/week', label: 'Time Saved', description: 'On manual intake processes' },
        { value: '+$28K', label: 'Monthly Revenue', description: 'From improved conversion' },
        { value: '24/7', label: 'Availability', description: 'AI assistant never sleeps' }
      ]
    },
    testimonial: {
      quote: "The AI intake system has transformed our practice. We're capturing leads we would have lost and our team can focus on what they do best - practicing law.",
      author: "Sarah Morris",
      title: "Managing Partner"
    },
    technologies: ['Next.js', 'AI Chatbot', 'CRM Integration', 'Analytics'],
    featured: true
  },
  {
    id: 'summit-dental',
    client: 'Summit Dental Care',
    industry: 'Healthcare',
    location: 'Summit, NJ',
    challenge: 'High no-show rates and inefficient appointment scheduling',
    solution: 'Predictive analytics and automated reminder system',
    timeline: '4 weeks',
    image: '/images/case-studies/summit-dental.jpg',
    metrics: {
      primary: {
        value: '-28%',
        label: 'No-Show Rate',
        description: 'Reduction in missed appointments'
      },
      secondary: [
        { value: '+$15K', label: 'Monthly Revenue', description: 'From reduced no-shows' },
        { value: '95%', label: 'Reminder Success', description: 'Patients receive timely alerts' },
        { value: '3 min', label: 'Booking Time', description: 'Average online scheduling' }
      ]
    },
    testimonial: {
      quote: "Our schedule is now consistently full. The AI predictions help us identify at-risk appointments and the automated reminders work incredibly well.",
      author: "Dr. Michael Chen",
      title: "Practice Owner"
    },
    technologies: ['React', 'Predictive AI', 'SMS Integration', 'Calendar Sync']
  },
  {
    id: 'precision-hvac',
    client: 'Precision HVAC Solutions',
    industry: 'Trades',
    location: 'Sparta, NJ',
    challenge: 'Manual estimate process and poor lead follow-up',
    solution: 'Automated estimate system with AI-powered follow-up',
    timeline: '5 weeks',
    image: '/images/case-studies/precision-hvac.jpg',
    metrics: {
      primary: {
        value: '+65%',
        label: 'Estimate Conversion',
        description: 'More estimates become jobs'
      },
      secondary: [
        { value: '2 hours', label: 'Estimate Time', description: 'Down from 4+ hours' },
        { value: '+$45K', label: 'Quarterly Revenue', description: 'From improved efficiency' },
        { value: '100%', label: 'Follow-up Rate', description: 'No leads fall through cracks' }
      ]
    },
    testimonial: {
      quote: "We've doubled our conversion rate and cut estimate time in half. The automated follow-up ensures we never lose a potential customer.",
      author: "Tony Rodriguez",
      title: "Owner"
    },
    technologies: ['Next.js', 'Estimate Calculator', 'CRM Automation', 'Mobile App']
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
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-4">
            Real results for real businesses. See how we've helped local companies grow.
          </p>
          <p className="text-sm text-electric-300 font-medium">
            Average ROI: 340% within 6 months
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
                  <TrophyIcon className="w-5 h-5 text-sunset-400" />
                  <span className="text-sm font-medium text-sunset-400">Featured Success Story</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-display font-bold text-white mb-2">
                        {study.client}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <span>{study.industry}</span>
                        <span>•</span>
                        <span>{study.location}</span>
                        <span>•</span>
                        <span>{study.timeline}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-2">Challenge</h4>
                      <p className="text-white/70 mb-4">{study.challenge}</p>

                      <h4 className="font-semibold text-white mb-2">Solution</h4>
                      <p className="text-white/70">{study.solution}</p>
                    </div>

                    {/* Primary Metric */}
                    <div className="mb-6">
                      <div className="text-4xl font-display font-black gradient-text mb-2">
                        {study.metrics.primary.value}
                      </div>
                      <div className="text-white font-semibold mb-1">
                        {study.metrics.primary.label}
                      </div>
                      <div className="text-sm text-white/60">
                        {study.metrics.primary.description}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <blockquote className="border-l-4 border-electric-500 pl-4 mb-6">
                      <p className="text-white/90 italic mb-3">
                        "{study.testimonial.quote}"
                      </p>
                      <footer className="text-sm text-white/60">
                        <strong className="text-white">{study.testimonial.author}</strong>
                        <span className="mx-2">•</span>
                        {study.testimonial.title}
                      </footer>
                    </blockquote>

                    <Button href={`/work/${study.id}`} variant="primary">
                      Read Full Case Study
                      <ArrowRightIcon className="ml-2 w-4 h-4" />
                    </Button>
                  </div>

                  {/* Metrics Grid */}
                  <div>
                    <div className="grid grid-cols-1 gap-6">
                      {study.metrics.secondary.map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="glass-card p-6 text-center"
                        >
                          <div className="text-2xl font-display font-bold gradient-text mb-2">
                            {metric.value}
                          </div>
                          <div className="font-semibold text-white mb-1">
                            {metric.label}
                          </div>
                          <div className="text-sm text-white/60">
                            {metric.description}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-white/80 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs bg-white/10 text-white/70 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
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
                className="glass-card p-6 group hover:bg-white/10 transition-all duration-300"
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-electric-300 transition-colors">
                    {study.client}
                  </h3>
                  <div className="flex items-center space-x-3 text-sm text-white/60">
                    <span className="px-2 py-1 bg-white/10 rounded-full">{study.industry}</span>
                    <span>{study.location}</span>
                  </div>
                </div>

                {/* Primary Metric */}
                <div className="mb-4">
                  <div className="text-3xl font-display font-black gradient-text mb-1">
                    {study.metrics.primary.value}
                  </div>
                  <div className="text-white font-medium mb-1">
                    {study.metrics.primary.label}
                  </div>
                  <div className="text-sm text-white/60">
                    {study.metrics.primary.description}
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="mb-4">
                  <p className="text-sm text-white/70 mb-2">
                    <strong className="text-white">Challenge:</strong> {study.challenge}
                  </p>
                  <p className="text-sm text-white/70">
                    <strong className="text-white">Solution:</strong> {study.solution}
                  </p>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {study.metrics.secondary.slice(0, 2).map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-lg font-bold text-electric-400">
                        {metric.value}
                      </div>
                      <div className="text-xs text-white/60">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="text-sm text-white/80 italic mb-4 border-l-2 border-electric-500/50 pl-3">
                  "{study.testimonial.quote.substring(0, 120)}..."
                </blockquote>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/60">
                    {study.timeline} timeline
                  </div>
                  <a
                    href={`/work/${study.id}`}
                    className="text-sm text-electric-400 hover:text-electric-300 font-medium flex items-center group-hover:translate-x-1 transition-transform"
                  >
                    Read More
                    <ArrowRightIcon className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-display font-black gradient-text mb-2">50+</div>
              <div className="text-white/80 font-medium">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-display font-black gradient-text mb-2">340%</div>
              <div className="text-white/80 font-medium">Average ROI</div>
            </div>
            <div>
              <div className="text-3xl font-display font-black gradient-text mb-2">28 Days</div>
              <div className="text-white/80 font-medium">Average Launch</div>
            </div>
            <div>
              <div className="text-3xl font-display font-black gradient-text mb-2">98%</div>
              <div className="text-white/80 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Ready to be our next success story?
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join the growing list of local businesses that have transformed their operations
            and increased revenue with our AI-powered solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Start Your Project
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              View All Case Studies
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
