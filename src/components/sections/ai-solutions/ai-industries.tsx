'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const industries = [
  {
    name: 'Attorneys',
    icon: '⚖️',
    description: 'Legal intake automation, document generation, and client communication',
    solutions: ['AI Legal Intake', 'Contract Automation', 'Client Portal', 'Compliance Tracking'],
    results: '+42% qualified consultations',
    href: '/industries/attorneys'
  },
  {
    name: 'Dentists',
    icon: '🦷',
    description: 'Appointment automation, no-show reduction, and patient communication',
    solutions: ['Appointment Reminders', 'No-show Prediction', 'Treatment Explanations', 'Insurance Verification'],
    results: '-28% no-show rate',
    href: '/industries/dentists'
  },
  {
    name: 'Trades',
    icon: '🔧',
    description: 'Booking systems, estimate automation, and project tracking',
    solutions: ['Estimate Calculator', 'Booking Automation', 'Project Updates', 'Customer Communication'],
    results: '+65% estimate conversion',
    href: '/industries/trades'
  },
  {
    name: 'Restaurants',
    icon: '🍽️',
    description: 'Online ordering, reservation systems, and customer loyalty',
    solutions: ['Order Management', 'Reservation System', 'Loyalty Programs', 'Inventory Alerts'],
    results: '+80% efficiency',
    href: '/industries/restaurants'
  }
];

export function AIIndustries() {
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
            <span className="gradient-text">Industry-Specific</span> AI Solutions
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Our AI solutions are tailored to the unique needs of your industry, 
            ensuring maximum impact and ROI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl">{industry.icon}</div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">{industry.name}</h3>
                  <div className="text-electric-400 font-medium text-sm">{industry.results}</div>
                </div>
              </div>
              
              <p className="text-white/80 mb-6">{industry.description}</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">AI Solutions:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {industry.solutions.map((solution) => (
                    <div key={solution} className="text-sm text-white/70 flex items-center">
                      <span className="w-1.5 h-1.5 bg-electric-400 rounded-full mr-2"></span>
                      {solution}
                    </div>
                  ))}
                </div>
              </div>
              
              <Button href={industry.href} variant="secondary" className="w-full">
                Learn More
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
