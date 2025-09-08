'use client';

import { motion } from 'framer-motion';
import { CheckIcon, StarIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';

const pricingTiers = [
  {
    name: 'Starter',
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
      'Basic analytics only',
      'Standard support hours'
    ],
    ideal: 'New businesses, simple service providers',
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Growth',
    price: 349,
    setupFee: 3000,
    description: 'For businesses ready to scale with AI features',
    features: [
      'Everything in Starter, plus:',
      'AI chatbot integration',
      'Advanced contact forms',
      'Local SEO optimization',
      'Google My Business setup',
      'Basic analytics dashboard',
      '5 hours monthly updates',
      'Priority email support',
      '1 AI automation workflow'
    ],
    limitations: [
      'Limited AI customization',
      'Basic reporting'
    ],
    ideal: 'Growing businesses, service professionals',
    cta: 'Start Growing',
    popular: true,
    savings: 'Most Popular'
  },
  {
    name: 'Authority',
    price: 749,
    setupFee: 6000,
    description: 'Complete digital dominance for established businesses',
    features: [
      'Everything in Growth, plus:',
      'Custom AI solutions',
      'Advanced automation workflows',
      'Predictive analytics',
      'Custom integrations',
      'Advanced SEO strategy',
      '10 hours monthly updates',
      'Phone & email support',
      'Monthly strategy calls',
      'Performance guarantees'
    ],
    limitations: [],
    ideal: 'Established businesses, multi-location companies',
    cta: 'Dominate Your Market',
    popular: false
  }
];

const addOns = [
  { name: 'SEO Boost Package', price: 300, description: 'Advanced SEO + content strategy' },
  { name: 'ADA Compliance', price: 500, description: 'Full accessibility compliance' },
  { name: 'Performance Pack', price: 300, description: 'Speed optimization + monitoring' },
  { name: 'Blog Content (4/month)', price: 600, description: 'Professional blog posts' }
];

export function PricingPreview() {
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
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
                    <StarIcon className="w-4 h-4 mr-1" />
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
                      <CheckIcon className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
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

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-display font-semibold text-white mb-2">
              Popular Add-ons
            </h3>
            <p className="text-white/70">
              Enhance your plan with these powerful additions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <h4 className="font-semibold text-white mb-2">{addon.name}</h4>
                <div className="text-2xl font-bold gradient-text mb-2">
                  +${addon.price}
                </div>
                <p className="text-sm text-white/70 mb-4">{addon.description}</p>
                <button className="text-sm text-electric-400 hover:text-electric-300 font-medium">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ROI Calculator Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-8 lg:p-12 text-center mb-16"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Calculate Your ROI
          </h3>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Our average client sees a 340% return on investment within 6 months.
            See what your business could achieve.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">+42%</div>
              <div className="text-white/80">Average Lead Increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">8 hrs</div>
              <div className="text-white/80">Time Saved Weekly</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">$28K</div>
              <div className="text-white/80">Avg Monthly Revenue Boost</div>
            </div>
          </div>

          <Button href="/pricing" variant="primary" size="lg">
            Use ROI Calculator
          </Button>
        </motion.div>

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
            <p>💡 <strong className="text-white">Pro tip:</strong> Most clients start with Growth and upgrade within 3 months</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
