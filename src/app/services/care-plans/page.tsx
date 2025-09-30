import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Clock, Zap, HeartHandshake, AlertTriangle, RefreshCw, Lock, Activity, Headphones, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Website Care Plans - Maintenance, Security & Support | Devority',
  description: 'Keep your website secure, fast, and up-to-date with our care plans. 24/7 monitoring, regular updates, backups, and priority support starting at $197/month.',
  keywords: [
    'website maintenance',
    'website care plans',
    'website security',
    'website support',
    'wordpress maintenance',
    'website monitoring',
    'website backups',
    'website updates'
  ],
};

const features = [
  {
    icon: Shield,
    title: '24/7 Security Monitoring',
    description: 'Proactive threat detection and instant response to keep your site safe from hackers.'
  },
  {
    icon: RefreshCw,
    title: 'Regular Updates',
    description: 'Core, plugin, and security updates applied safely with thorough testing.'
  },
  {
    icon: Activity,
    title: 'Performance Optimization',
    description: 'Monthly speed audits and optimization to keep your site lightning fast.'
  },
  {
    icon: Lock,
    title: 'Daily Backups',
    description: 'Automated daily backups with one-click restore if anything goes wrong.'
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    description: 'Direct access to our team with guaranteed same-day response times.'
  },
  {
    icon: TrendingUp,
    title: 'Monthly Reports',
    description: 'Detailed reports on uptime, performance, security, and recommendations.'
  },
];

const plans = [
  {
    name: 'Essential',
    price: '$197',
    period: '/month',
    description: 'Perfect for small business websites',
    features: [
      'Weekly security scans',
      'Monthly updates',
      'Daily backups (30 days)',
      'Uptime monitoring',
      'Basic support (48hr response)',
      'Quarterly reports',
      '1 hour monthly updates',
    ],
    highlighted: [],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Professional',
    price: '$397',
    period: '/month',
    description: 'For growing businesses that need more',
    features: [
      'Daily security scans',
      'Weekly updates',
      'Daily backups (90 days)',
      '24/7 uptime monitoring',
      'Priority support (24hr response)',
      'Monthly performance optimization',
      'Monthly reports',
      '3 hours monthly updates',
      'Content updates included',
    ],
    highlighted: ['Content updates included', 'Monthly performance optimization'],
    cta: 'Most Popular',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$797',
    period: '/month',
    description: 'Complete peace of mind for critical sites',
    features: [
      'Real-time security monitoring',
      'Immediate updates & patches',
      'Hourly backups (1 year retention)',
      'Advanced threat protection',
      'Dedicated support (2hr response)',
      'Weekly performance audits',
      'Custom reporting',
      'Unlimited update hours',
      'A/B testing & optimization',
      'Load testing & scaling',
    ],
    highlighted: ['Unlimited update hours', 'Real-time security monitoring', 'Dedicated support'],
    cta: 'Contact Sales',
    featured: false,
  },
];

const benefits = [
  {
    title: 'Never Worry About Security',
    description: 'We handle all security updates, patches, and monitoring so you can sleep soundly.',
    icon: '🛡️',
  },
  {
    title: 'Zero Downtime',
    description: 'With 24/7 monitoring and instant alerts, we fix issues before they affect your visitors.',
    icon: '✅',
  },
  {
    title: 'Stay Fast & Competitive',
    description: 'Regular performance optimization keeps your site faster than competitors.',
    icon: '⚡',
  },
  {
    title: 'Focus on Your Business',
    description: 'Stop wasting time on technical issues. We handle everything technical.',
    icon: '🎯',
  },
];

const includes = [
  'Software updates & patches',
  'Security monitoring & firewall',
  'Malware scanning & removal',
  'Daily automated backups',
  'Uptime monitoring (1-minute checks)',
  'Performance monitoring',
  'Broken link monitoring',
  'SSL certificate monitoring',
  'Google Search Console monitoring',
  'Monthly health reports',
  'Emergency support',
  'Update staging & testing',
];

export default function CarePlansPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-red-500/10 animate-gradient" />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Website Care Plans
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                Your Website, <span className="text-gradient">Protected</span>
              </h1>
              
              <p className="text-xl text-white/70 mb-8">
                Keep your website secure, fast, and always online. 
                Our care plans provide complete peace of mind with 24/7 monitoring and expert support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="#pricing" className="btn-primary">
                  View Care Plans
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get Custom Quote
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  No setup fees
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Cancel anytime
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-white/60">All Systems Operational</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <span className="text-sm">Security Status</span>
                    <span className="text-sm text-green-400">Protected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <span className="text-sm">Last Backup</span>
                    <span className="text-sm text-green-400">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <span className="text-sm">Uptime This Month</span>
                    <span className="text-sm text-green-400">99.99%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <span className="text-sm">Page Speed Score</span>
                    <span className="text-sm text-green-400">98/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="px-6 py-8 bg-red-500/10 border-y border-red-500/20">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 text-center">
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
          <p className="text-white/80">
            <strong>60% of small businesses</strong> that suffer a cyber attack go out of business within 6 months. 
            Don't become a statistic.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
            Complete Website Care
          </h2>
          <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
            Everything you need to keep your website secure, fast, and converting visitors into customers.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="glass-card p-6 hover:bg-white/10 transition">
                  <Icon className="w-10 h-10 text-orange-400 mb-4" />
                  <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-12">
            Why You Need a Care Plan
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass-card p-8 hover:bg-white/10 transition">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-display font-bold mb-3">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-12">
            Included in Every Plan
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 max-w-4xl mx-auto">
            {includes.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
            Choose Your Protection Level
          </h2>
          <p className="text-xl text-white/70 text-center mb-12">
            All plans include our core protection. Scale up as you grow.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`glass-card p-8 relative ${
                  plan.featured ? 'border-2 border-orange-500 scale-105' : ''
                } hover:bg-white/10 transition`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-orange-500 text-black text-sm font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <p className="text-white/60 mb-4">{plan.description}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-orange-400">{plan.price}</span>
                  <span className="text-white/60 ml-1">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => {
                    const isHighlighted = plan.highlighted.includes(feature);
                    return (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle className={`w-4 h-4 ${isHighlighted ? 'text-orange-400' : 'text-green-400'} flex-shrink-0 mt-0.5`} />
                        <span className={isHighlighted ? 'text-white font-medium' : 'text-white/80'}>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
                
                <Link
                  href="/contact"
                  className={plan.featured ? 'btn-primary w-full' : 'btn-secondary w-full'}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-white/60 mb-4">
              Need a custom plan? We offer tailored solutions for complex sites and specific requirements.
            </p>
            <Link href="/contact" className="text-orange-400 hover:text-orange-300 underline">
              Contact us for enterprise solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 lg:p-12 text-center bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <HeartHandshake className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Site Down? Been Hacked?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Don't panic. Our emergency response team can help even if you're not a current client. 
              We'll get you back online fast and secure your site.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Get Emergency Help
              </Link>
              <a href="tel:+1234567890" className="btn-secondary">
                Call Now: (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-12">
            Common Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'What happens if my site gets hacked?',
                a: 'We immediately isolate the threat, clean the infection, patch vulnerabilities, and restore from a clean backup if needed. Most sites are back online within 2-4 hours.'
              },
              {
                q: 'Do you work with all platforms?',
                a: 'Yes! We support WordPress, Shopify, custom-built sites, and most major platforms. Contact us to confirm support for your specific setup.'
              },
              {
                q: 'Can I upgrade or downgrade anytime?',
                a: 'Absolutely. You can change your plan at any time with no penalties. Upgrades take effect immediately, downgrades at the next billing cycle.'
              },
              {
                q: 'What if I need updates outside the plan?',
                a: 'Additional work beyond your plan hours is billed at $150/hour, or you can upgrade to a higher plan for more included hours.'
              },
            ].map((item, index) => (
              <div key={index} className="glass-card p-6 hover:bg-white/10 transition">
                <h3 className="text-lg font-semibold mb-2">{item.q}</h3>
                <p className="text-white/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Protect Your Investment
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Your website is too important to leave unprotected. 
            Join hundreds of businesses that trust us with their online presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get Started Today
            </Link>
            <Link href="/pricing" className="btn-secondary">
              Compare All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}