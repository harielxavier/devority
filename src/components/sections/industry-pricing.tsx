'use client';

import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingTier {
  price: number;
  setupFee: number;
  features: string[];
  popular?: boolean;
}

interface IndustryPricingProps {
  data: {
    essential: PricingTier;
    premium: PricingTier;
  };
  industry: string;
}

export function IndustryPricing({ data, industry }: IndustryPricingProps) {
  const tiers = [
    {
      name: 'Essential',
      ...data.essential,
      description: `Perfect for ${industry} getting started online`,
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Premium',
      ...data.premium,
      description: `Everything you need to dominate your market`,
      cta: 'Start Dominating',
      popular: data.premium.popular || false
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-midnight via-navy-900 to-midnight">
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
            <span className="gradient-text">Specialized pricing</span> for {industry}
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your practice. All plans include hosting, security, and ongoing support 
            specifically tailored for your industry.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-electric-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, index) => (
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
                    MOST POPULAR
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
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: featureIndex * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 bg-electric-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-electric-400" />
                    </div>
                    <span className="text-white/90 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className={`w-full group ${
                  tier.popular 
                    ? 'bg-gradient-brand hover:shadow-electric-500/25' 
                    : 'bg-white/10 hover:bg-white/20 border border-white/20'
                }`}
              >
                <span>{tier.cta}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Guarantee */}
              <div className="text-center mt-4">
                <p className="text-xs text-white/60">
                  ✓ 30-day money-back guarantee
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Not sure which plan is right for you?
            </h3>
            <p className="text-white/70 mb-6">
              Schedule a free consultation and we'll recommend the perfect solution 
              for your practice goals and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="group">
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                View Portfolio
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
