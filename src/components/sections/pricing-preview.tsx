'use client';

import { motion } from 'framer-motion';
import { Check, Star, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pricingTiers = [
  {
    name: 'Essential',
    price: 149,
    setupFee: 1500,
    description: 'Perfect for small businesses getting started online',
    features: [
      'Professional 5-page website',
      'Mobile responsive design',
      'Basic SEO optimization',
      'Contact form integration',
      'SSL certificate & hosting',
      '2 hours monthly updates',
      'Email support'
    ],
    limitations: [
      'No AI features',
      'Basic analytics only'
    ],
    ideal: 'New businesses, simple service providers',
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Growth + AI',
    price: 349,
    setupFee: 3000,
    description: 'Everything you need to dominate your local market',
    features: [
      'Everything in Essential, plus:',
      'AI chatbot that qualifies leads 24/7',
      'Local SEO domination strategy',
      'Google My Business optimization',
      'Advanced analytics dashboard',
      '5 hours monthly updates',
      'Priority support (same-day response)',
      '1 custom AI automation workflow',
      '340% average ROI guarantee'
    ],
    limitations: [],
    ideal: 'Most popular choice • 85% of clients choose this plan',
    cta: 'Start Dominating Your Market',
    popular: true,
    savings: 'RECOMMENDED'
  }
];



export function PricingPreview() {
  return (
    <section id="pricing" className="section-padding relative">
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
            Simple, <span className="gradient-text">transparent pricing</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-4">
            Choose the plan that fits your business. All plans include hosting, security, and support.
          </p>
          <p className="text-sm text-electric-300 font-medium">
            No hidden fees • Cancel anytime • 30-day money-back guarantee
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative glass-card p-8 ${
                tier.popular ? 'ring-2 ring-electric-500/50 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-brand px-4 py-2 rounded-full text-sm font-semibold text-white flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {tier.savings}
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  {tier.description}
                </p>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-display font-black gradient-text">
                      ${tier.price}
                    </span>
                    <span className="text-white/60 ml-2">/month</span>
                  </div>
                  <div className="text-sm text-white/60 mt-2">
                    ${tier.setupFee.toLocaleString()} setup fee
                  </div>
                </div>

                {/* Ideal For */}
                <div className="text-xs text-electric-300 bg-electric-500/10 px-3 py-2 rounded-full">
                  Ideal for: {tier.ideal}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-electric-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Limitations */}
                {tier.limitations.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="text-xs text-white/60 mb-2">Limitations:</div>
                    <ul className="space-y-1">
                      {tier.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="text-xs text-white/50">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA */}
              <Button
                href="/contact"
                variant={tier.popular ? "primary" : "secondary"}
                className="w-full"
                size="lg"
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>



        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Not sure which plan is right for you?
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation and we'll recommend the perfect solution
            for your business goals and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Get Free Consultation
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              Compare All Features
            </Button>
          </div>

          <div className="mt-8 text-sm text-white/60">
            <p className="flex items-center">
              <Lightbulb className="w-4 h-4 text-electric-400 mr-2" />
              <strong className="text-white">Pro tip:</strong> Most clients start with Growth and upgrade within 3 months
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
