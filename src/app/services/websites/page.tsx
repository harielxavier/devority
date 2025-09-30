import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe, Smartphone, Zap, Shield, Search, BarChart3, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Website Design Services - Fast, Beautiful, Converting | Devority',
  description: 'Get a high-converting website that dominates local search. Mobile-first design, lightning-fast performance, and built to convert visitors into customers.',
  keywords: [
    'website design',
    'web design services',
    'responsive web design',
    'small business websites',
    'local business websites',
    'sparta nj web design',
    'conversion optimization',
    'mobile-first design'
  ],
};

const features = [
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Beautiful on every device. 60% of your visitors are on mobile - we design for them first.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Load times under 2 seconds. Fast sites rank better and convert 3x more visitors.'
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    description: 'Built to rank from day one. Every page optimized for local search dominance.'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'SSL certificates, daily backups, and 99.9% uptime guarantee.'
  },
  {
    icon: BarChart3,
    title: 'Conversion Focused',
    description: 'Strategic design that turns visitors into customers. Average 34% conversion boost.'
  },
  {
    icon: Users,
    title: 'User Experience',
    description: 'Intuitive navigation and clear calls-to-action that guide visitors to contact you.'
  },
];

const process = [
  {
    step: '1',
    title: 'Discovery',
    description: 'We learn your business, goals, and target audience.',
    timeline: 'Day 1-2',
  },
  {
    step: '2',
    title: 'Design',
    description: 'Custom mockups tailored to your brand and objectives.',
    timeline: 'Day 3-5',
  },
  {
    step: '3',
    title: 'Development',
    description: 'Your site comes to life with clean, optimized code.',
    timeline: 'Day 6-10',
  },
  {
    step: '4',
    title: 'Launch',
    description: 'Go live and start dominating your local market.',
    timeline: 'Day 14',
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '$2,497',
    description: 'Perfect for new businesses',
    features: [
      '5-page responsive website',
      'Mobile-optimized design',
      'Basic SEO setup',
      'Contact form integration',
      '30-day support',
      '1 round of revisions',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Professional',
    price: '$4,997',
    description: 'Most popular for growing businesses',
    features: [
      '10-page responsive website',
      'Custom design mockups',
      'Advanced SEO optimization',
      'Google Analytics setup',
      'CRM integration',
      '90-day support',
      '3 rounds of revisions',
      'Blog functionality',
    ],
    cta: 'Get Started',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For businesses ready to scale',
    features: [
      'Unlimited pages',
      'Custom functionality',
      'E-commerce capability',
      'Advanced integrations',
      'Priority support',
      'Unlimited revisions',
      'Monthly performance reports',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function WebsitesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 animate-gradient" />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                <Globe className="w-4 h-4" />
                Website Design Services
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                Websites That <span className="text-gradient">Convert</span>
              </h1>
              
              <p className="text-xl text-white/70 mb-8">
                Get a stunning website that turns visitors into customers. 
                Fast, beautiful, and built to dominate local search.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" className="btn-primary">
                  Get Your Free Design Mockup
                </Link>
                <Link href="/work" className="btn-secondary">
                  View Portfolio
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  14-day delivery
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  340% avg ROI
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-cyan-400 mb-1">2 sec</div>
                    <div className="text-sm text-white/60">Avg load time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-cyan-400 mb-1">98%</div>
                    <div className="text-sm text-white/60">Mobile score</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-cyan-400 mb-1">3x</div>
                    <div className="text-sm text-white/60">More conversions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-cyan-400 mb-1">#1</div>
                    <div className="text-sm text-white/60">Local rankings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
            Everything You Need to Succeed Online
          </h2>
          <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
            We don't just build websites. We build growth engines for your business.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="glass-card p-6 hover:bg-white/10 transition">
                  <Icon className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
            From Concept to Launch in 14 Days
          </h2>
          <p className="text-xl text-white/70 text-center mb-12">
            Our proven process delivers results fast without sacrificing quality.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
                )}
                <div className="glass-card p-6 text-center hover:bg-white/10 transition">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-cyan-400">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm mb-2">{item.description}</p>
                  <div className="inline-flex items-center gap-1 text-xs text-cyan-400">
                    <Clock className="w-3 h-3" />
                    {item.timeline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-12">
            What's Included in Every Website
          </h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl mx-auto">
            {[
              'Custom design tailored to your brand',
              'Mobile-responsive on all devices',
              'SEO optimization for local search',
              'SSL security certificate',
              'Google Analytics integration',
              'Contact forms with email notifications',
              'Social media integration',
              'Fast hosting included for 1 year',
              'XML sitemap for search engines',
              'Schema markup for rich snippets',
              '404 error page',
              'GDPR compliant privacy tools',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
            Transparent Pricing, No Surprises
          </h2>
          <p className="text-xl text-white/70 text-center mb-12">
            Choose the package that fits your business needs and budget.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`glass-card p-8 relative ${
                  plan.featured ? 'border-2 border-cyan-500 scale-105' : ''
                } hover:bg-white/10 transition`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-sm font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <p className="text-white/60 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-cyan-400 mb-6">{plan.price}</div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
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
        </div>
      </section>

      {/* Portfolio CTA */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 lg:p-12 text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              See Our Work in Action
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Real websites we've built for businesses like yours. Featuring Cleynz, PBNJ Law, and more.
            </p>
            <Link href="/work" className="btn-primary inline-flex items-center gap-2">
              View Portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Ready for a Website That Works?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Get a free design mockup and see exactly what your new website will look like.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get Free Design Mockup
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