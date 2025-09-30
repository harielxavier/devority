import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Search, MapPin, TrendingUp, BarChart3, Globe, Star, Users, Shield, Clock, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Local SEO & Search Optimization Services | Devority',
  description: 'Dominate local search and attract more customers. We help businesses rank #1 on Google with proven SEO strategies that deliver 340% average ROI.',
  keywords: [
    'local seo services',
    'seo optimization',
    'google my business optimization',
    'local search marketing',
    'sparta nj seo',
    'organic search growth',
    'technical seo',
    'content marketing'
  ],
};

const features = [
  {
    icon: MapPin,
    title: 'Local SEO Dominance',
    description: 'Rank #1 in your local market. We optimize for "near me" searches that convert.'
  },
  {
    icon: Globe,
    title: 'Google My Business',
    description: 'Fully optimized GMB profiles that attract reviews and drive foot traffic.'
  },
  {
    icon: Target,
    title: 'Keyword Research',
    description: 'Target the exact phrases your customers search for, backed by real data.'
  },
  {
    icon: TrendingUp,
    title: 'Technical SEO',
    description: 'Fast loading, mobile-friendly, and technically perfect for search engines.'
  },
  {
    icon: Star,
    title: 'Review Management',
    description: 'Build and maintain 5-star reputation across all review platforms.'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Track rankings, traffic, and conversions with monthly reports.'
  },
];

const services = [
  {
    category: 'On-Page SEO',
    items: [
      'Title tag optimization',
      'Meta descriptions',
      'Header tag structure',
      'Internal linking',
      'Schema markup',
      'Content optimization',
    ],
  },
  {
    category: 'Local SEO',
    items: [
      'Google My Business setup',
      'Local citations',
      'NAP consistency',
      'Local link building',
      'Review generation',
      'Local content strategy',
    ],
  },
  {
    category: 'Technical SEO',
    items: [
      'Site speed optimization',
      'Mobile responsiveness',
      'XML sitemaps',
      'Robots.txt optimization',
      'SSL implementation',
      'Core Web Vitals',
    ],
  },
  {
    category: 'Content Strategy',
    items: [
      'Keyword research',
      'Content calendar',
      'Blog optimization',
      'Landing pages',
      'FAQ sections',
      'Location pages',
    ],
  },
];

const results = [
  { metric: '340%', label: 'Average ROI', sublabel: 'Within 12 months' },
  { metric: '#1', label: 'Local Rankings', sublabel: 'For target keywords' },
  { metric: '156%', label: 'Organic Traffic', sublabel: 'Average increase' },
  { metric: '3x', label: 'Lead Generation', sublabel: 'More qualified leads' },
];

const pricing = [
  {
    name: 'Local Starter',
    price: '$497',
    period: '/month',
    description: 'Perfect for small local businesses',
    features: [
      'Google My Business optimization',
      '10 local keywords',
      'Monthly reporting',
      'Review monitoring',
      'Local citation building',
      'Basic on-page SEO',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$997',
    period: '/month',
    description: 'For businesses ready to dominate',
    features: [
      'Everything in Starter',
      '25 target keywords',
      'Content creation (2 posts/month)',
      'Competitor analysis',
      'Technical SEO audit',
      'Link building campaign',
      'Conversion optimization',
      'Priority support',
    ],
    cta: 'Dominate Local Search',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$2,497+',
    period: '/month',
    description: 'Multi-location or national reach',
    features: [
      'Unlimited keywords',
      'Multiple locations',
      'Weekly content creation',
      'Advanced link building',
      'Custom reporting',
      'Dedicated SEO specialist',
      'Quarterly strategy sessions',
      'PR outreach',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function SEOPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-emerald-500/10 animate-gradient" />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                <Search className="w-4 h-4" />
                SEO & Local Search
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                Be #1 Where It <span className="text-gradient">Matters</span>
              </h1>
              
              <p className="text-xl text-white/70 mb-8">
                Dominate local search results and attract customers actively 
                looking for your services. Proven SEO that delivers 340% average ROI.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" className="btn-primary">
                  Get Free SEO Audit
                </Link>
                <Link href="#results" className="btn-secondary">
                  See Results
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  No contracts
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Guaranteed results
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white/60">Google Search Results</span>
                  <Search className="w-4 h-4 text-white/40" />
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-green-400">1</span>
                      </div>
                      <div>
                        <div className="font-semibold text-green-400 mb-1">Your Business</div>
                        <div className="text-sm text-white/60">Top local result with 5-star reviews</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg opacity-60">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white/40">2</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white/40 mb-1">Competitor</div>
                        <div className="text-sm text-white/30">Lower ranking, fewer reviews</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg opacity-40">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white/30">3</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white/30 mb-1">Competitor</div>
                        <div className="text-sm text-white/20">Barely visible</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-12">
            Real Results for Real Businesses
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {results.map((result, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">{result.metric}</div>
                <div className="text-white/80 mb-1">{result.label}</div>
                <div className="text-sm text-white/50">{result.sublabel}</div>
              </div>
            ))}
          </div>
          
          <div className="glass-card p-8 bg-gradient-to-r from-green-500/5 to-emerald-500/5">
            <blockquote className="text-xl text-white/80 mb-4">
              "Within 3 months, we went from page 5 to #1 for all our target keywords. 
              Our phone hasn't stopped ringing since."
            </blockquote>
            <cite className="text-white/60">- Local Business Owner, Sparta NJ</cite>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
            Complete SEO Solution
          </h2>
          <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
            Everything you need to dominate search results and grow your business online.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="glass-card p-6 hover:bg-white/10 transition">
                  <Icon className="w-10 h-10 text-green-400 mb-4" />
                  <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-12">
            What's Included
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="glass-card p-6">
                <h3 className="text-xl font-display font-bold mb-4 text-green-400">
                  {service.category}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-12">
            Our SEO Process
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                month: 'Month 1', 
                title: 'Foundation', 
                tasks: ['SEO audit', 'Keyword research', 'Technical fixes', 'GMB optimization'] 
              },
              { 
                month: 'Month 2-3', 
                title: 'Implementation', 
                tasks: ['On-page optimization', 'Content creation', 'Link building', 'Citation building'] 
              },
              { 
                month: 'Month 4+', 
                title: 'Growth', 
                tasks: ['Ranking improvements', 'Traffic growth', 'Lead generation', 'Continuous optimization'] 
              },
            ].map((phase, index) => (
              <div key={index} className="glass-card p-6 hover:bg-white/10 transition">
                <div className="text-sm text-green-400 mb-2">{phase.month}</div>
                <h3 className="text-xl font-display font-bold mb-4">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.tasks.map((task, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
            SEO Plans That Deliver ROI
          </h2>
          <p className="text-xl text-white/70 text-center mb-12">
            No contracts, cancel anytime. Pay for results, not promises.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`glass-card p-8 relative ${
                  plan.featured ? 'border-2 border-green-500 scale-105' : ''
                } hover:bg-white/10 transition`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-green-500 text-black text-sm font-bold rounded-full">
                    BEST VALUE
                  </div>
                )}
                
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <p className="text-white/60 mb-4">{plan.description}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-green-400">{plan.price}</span>
                  <span className="text-white/60 ml-1">{plan.period}</span>
                </div>
                
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

      {/* Free Audit CTA */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 lg:p-12 text-center bg-gradient-to-r from-green-500/10 to-emerald-500/10">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Get Your Free SEO Audit
            </h2>
            <p className="text-xl text-white/70 mb-8">
              See exactly where you rank, what's holding you back, 
              and how to fix it. No obligation, no spam.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Keyword rankings</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Technical issues</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Competitor analysis</span>
              </div>
            </div>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Get Free Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Ready to Dominate Local Search?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Join 500+ businesses ranking #1 in their markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Start Ranking Higher
            </Link>
            <Link href="/work" className="btn-secondary">
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}