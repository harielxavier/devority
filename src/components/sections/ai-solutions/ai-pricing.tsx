'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';

const pricingTiers = [
  {
    name: 'AI Starter',
    price: 199,
    setupFee: 500,
    description: 'Perfect for small businesses getting started with AI',
    features: [
      'Basic AI chatbot (1,000 conversations/month)',
      'Simple automation workflows',
      'Email integration',
      'Basic analytics',
      'Standard support'
    ],
    popular: false
  },
  {
    name: 'AI Growth',
    price: 399,
    setupFee: 1000,
    description: 'For businesses ready to scale with advanced AI',
    features: [
      'Advanced AI chatbot (5,000 conversations/month)',
      'Document automation',
      'Predictive analytics',
      'CRM integration',
      'Priority support',
      'Custom workflows'
    ],
    popular: true
  },
  {
    name: 'AI Enterprise',
    price: 799,
    setupFee: 2000,
    description: 'Complete AI transformation for established businesses',
    features: [
      'Unlimited AI conversations',
      'Advanced automation suite',
      'Custom AI models',
      'Full integration package',
      'Dedicated support',
      'Monthly strategy calls'
    ],
    popular: false
  }
];

export function AIPricing() {
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
            AI Solutions <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Choose the AI package that fits your business needs and budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass-card p-8 ${tier.popular ? 'ring-2 ring-electric-500/50 scale-105' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-brand px-4 py-2 rounded-full text-sm font-semibold text-white">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-display font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-white/70 text-sm mb-6">{tier.description}</p>
                
                <div className="mb-4">
                  <div className="text-3xl font-display font-black gradient-text">
                    ${tier.price}
                  </div>
                  <div className="text-white/60 text-sm">/month</div>
                  <div className="text-white/60 text-xs mt-1">
                    ${tier.setupFee} setup fee
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-electric-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                href="#ai-contact"
                variant={tier.popular ? "primary" : "secondary"}
                className="w-full"
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
