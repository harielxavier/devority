'use client';

import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  ChartBarSquareIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

const processSteps = [
  {
    step: 1,
    title: 'Discover',
    subtitle: 'Understanding your business',
    duration: '1-2 weeks',
    icon: MagnifyingGlassIcon,
    description: 'We dive deep into your business goals, target audience, and competitive landscape to create a strategic foundation.',
    deliverables: [
      'Business analysis & competitor research',
      'Target audience personas',
      'Technical requirements document',
      'Project timeline & milestones'
    ],
    clientTasks: [
      'Provide business information',
      'Share brand assets',
      'Review & approve strategy'
    ]
  },
  {
    step: 2,
    title: 'Design',
    subtitle: 'Creating your digital identity',
    duration: '1-2 weeks',
    icon: PencilSquareIcon,
    description: 'Our design team crafts a stunning, conversion-focused website that reflects your brand and engages your audience.',
    deliverables: [
      'Custom design mockups',
      'Mobile responsive layouts',
      'Brand style guide',
      'Interactive prototypes'
    ],
    clientTasks: [
      'Provide feedback on designs',
      'Approve final mockups',
      'Supply content & images'
    ]
  },
  {
    step: 3,
    title: 'Build',
    subtitle: 'Bringing designs to life',
    duration: '2-3 weeks',
    icon: CodeBracketIcon,
    description: 'We develop your website using cutting-edge technology, ensuring fast performance, security, and scalability.',
    deliverables: [
      'Fully functional website',
      'AI integrations & automation',
      'Content management system',
      'Quality assurance testing'
    ],
    clientTasks: [
      'Review development progress',
      'Test functionality',
      'Provide final content'
    ]
  },
  {
    step: 4,
    title: 'Launch',
    subtitle: 'Going live with confidence',
    duration: '3-5 days',
    icon: RocketLaunchIcon,
    description: 'We handle the technical launch process and ensure everything works perfectly before handing over the keys.',
    deliverables: [
      'Domain & hosting setup',
      'SSL certificate installation',
      'Analytics & tracking setup',
      'Launch checklist completion'
    ],
    clientTasks: [
      'Final approval',
      'Domain transfer (if needed)',
      'Review launch checklist'
    ]
  },
  {
    step: 5,
    title: 'Grow',
    subtitle: 'Ongoing optimization & support',
    duration: 'Ongoing',
    icon: ChartBarSquareIcon,
    description: 'We monitor performance, provide ongoing support, and continuously optimize to help your business grow.',
    deliverables: [
      'Monthly performance reports',
      'Ongoing maintenance & updates',
      'AI optimization & training',
      'Strategic recommendations'
    ],
    clientTasks: [
      'Review monthly reports',
      'Provide feedback',
      'Approve optimizations'
    ]
  }
];

export function ProcessOverview() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-sunset-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-container container-padding mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title text-white mb-6">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-4">
            From discovery to launch in 4-8 weeks
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="lg:w-1/2">
                <div className="glass-card p-8">
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-brand flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-2xl font-display font-bold text-white">
                          {step.step}. {step.title}
                        </h3>
                        <span className="px-3 py-1 bg-electric-500/20 text-electric-300 text-xs font-medium rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-electric-300 font-medium">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Deliverables & Client Tasks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Deliverables */}
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        What you get
                      </h4>
                      <ul className="space-y-2">
                        {step.deliverables.map((deliverable, deliverableIndex) => (
                          <li key={deliverableIndex} className="text-sm text-white/70 flex items-start">
                            <span className="text-green-400 mr-2 mt-1">•</span>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Client Tasks */}
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <span className="w-2 h-2 bg-electric-400 rounded-full mr-2"></span>
                        What we need from you
                      </h4>
                      <ul className="space-y-2">
                        {step.clientTasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="text-sm text-white/70 flex items-start">
                            <span className="text-electric-400 mr-2 mt-1">•</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Timeline */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-500 to-sunset-500 transform -translate-x-1/2" />

                  {/* Step Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="relative w-24 h-24 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-electric-500/25"
                  >
                    {step.step}

                    {/* Pulse Animation */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                      className="absolute inset-0 rounded-full bg-gradient-brand"
                    />
                  </motion.div>

                  {/* Step Details */}
                  <div className="mt-6 text-center">
                    <div className="text-lg font-display font-semibold text-white mb-1">
                      {step.title}
                    </div>
                    <div className="text-sm text-electric-300">
                      {step.duration}
                    </div>
                  </div>

                  {/* Connection Line to Next Step */}
                  {index < processSteps.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                      className="absolute top-24 left-1/2 w-0.5 h-16 bg-gradient-to-b from-electric-500/50 to-sunset-500/50 transform -translate-x-1/2 origin-top"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 glass-card p-8 lg:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              Why our process works
            </h3>
            <p className="text-white/70 max-w-3xl mx-auto">
              Our proven 5-step process ensures every project is delivered on time,
              on budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-display font-black gradient-text mb-2">
                98%
              </div>
              <div className="text-white/80 font-medium mb-2">
                On-Time Delivery
              </div>
              <div className="text-sm text-white/60">
                Projects completed within agreed timeline
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-black gradient-text mb-2">
                100%
              </div>
              <div className="text-white/80 font-medium mb-2">
                Client Satisfaction
              </div>
              <div className="text-sm text-white/60">
                Would recommend us to others
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-black gradient-text mb-2">
                &lt;30
              </div>
              <div className="text-white/80 font-medium mb-2">
                Day Average
              </div>
              <div className="text-sm text-white/60">
                From kickoff to live website
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Ready to start your project?
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Let's discuss your goals and create a custom plan that fits your timeline and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button href="/contact" variant="primary" size="lg">
                Start Your Project
              </Button>
            </motion.div>
            <Button href="/work" variant="secondary" size="lg">
              See Our Work
            </Button>
          </div>

          <div className="mt-8 text-sm text-white/60">
            <p>📞 <strong className="text-white">Free consultation:</strong> No commitment, just honest advice about your project</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
