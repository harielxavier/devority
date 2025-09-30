import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Code, Database, Cloud, Lock, Layers, Zap, Users, BarChart3, Settings, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Custom Web App Development - Scalable Business Solutions | Devority',
  description: 'Build powerful web applications that automate your business and scale with growth. From booking systems to customer portals, we create solutions that work.',
  keywords: [
    'web app development',
    'custom web applications',
    'saas development',
    'business automation',
    'cloud applications',
    'progressive web apps',
    'api development',
    'sparta nj software development'
  ],
};

const features = [
  {
    icon: Cloud,
    title: 'Cloud-Native Architecture',
    description: 'Built for the cloud with auto-scaling, high availability, and global reach.'
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Bank-level encryption, secure APIs, and compliance-ready infrastructure.'
  },
  {
    icon: Database,
    title: 'Real-Time Data',
    description: 'Live updates, instant syncing, and real-time collaboration features.'
  },
  {
    icon: Layers,
    title: 'API Integrations',
    description: 'Connect with any service. We integrate with 1000+ tools and platforms.'
  },
  {
    icon: Zap,
    title: 'Lightning Performance',
    description: 'Optimized code, efficient databases, and CDN delivery for instant loading.'
  },
  {
    icon: RefreshCw,
    title: 'Continuous Updates',
    description: 'Regular feature releases, security patches, and performance improvements.'
  },
];

const useCases = [
  {
    title: 'Customer Portals',
    description: 'Give customers 24/7 access to their accounts, orders, and support.',
    examples: ['Account management', 'Order tracking', 'Support tickets', 'Document access'],
  },
  {
    title: 'Booking Systems',
    description: 'Automate scheduling with smart booking and calendar management.',
    examples: ['Appointment booking', 'Resource scheduling', 'Payment processing', 'Automated reminders'],
  },
  {
    title: 'Internal Tools',
    description: 'Streamline operations with custom tools built for your workflow.',
    examples: ['Inventory management', 'HR systems', 'Project tracking', 'Reporting dashboards'],
  },
  {
    title: 'SaaS Platforms',
    description: 'Launch your software service with multi-tenant architecture.',
    examples: ['User management', 'Subscription billing', 'Analytics dashboard', 'API access'],
  },
];

const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'AWS/Vercel', category: 'Hosting' },
  { name: 'Stripe', category: 'Payments' },
  { name: 'Auth0', category: 'Authentication' },
];

const pricing = [
  {
    name: 'MVP',
    price: '$9,997',
    timeline: '4-6 weeks',
    description: 'Launch fast and validate your idea',
    features: [
      'Core functionality',
      'User authentication',
      'Basic admin panel',
      'Mobile responsive',
      'Cloud deployment',
      '60-day support',
    ],
    cta: 'Start Your MVP',
    featured: false,
  },
  {
    name: 'Professional',
    price: '$24,997',
    timeline: '8-12 weeks',
    description: 'Full-featured application ready to scale',
    features: [
      'Complete feature set',
      'Advanced integrations',
      'Custom admin dashboard',
      'API development',
      'Performance optimization',
      'Analytics integration',
      '6-month support',
      'Documentation',
    ],
    cta: 'Build Your App',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    timeline: '3-6 months',
    description: 'Complex systems for large organizations',
    features: [
      'Unlimited features',
      'Multi-tenant architecture',
      'Advanced security',
      'Custom integrations',
      'Dedicated team',
      'SLA guarantee',
      'Ongoing support',
      'Training included',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function WebAppsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 animate-gradient" />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                <Code className="w-4 h-4" />
                Custom Web Applications
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                Web Apps That <span className="text-gradient">Scale</span>
              </h1>
              
              <p className="text-xl text-white/70 mb-8">
                From booking systems to customer portals, we build powerful 
                web applications that automate your business and grow with you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" className="btn-primary">
                  Discuss Your Project
                </Link>
                <Link href="/work" className="btn-secondary">
                  View Case Studies
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  4-week MVP delivery
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  99.9% uptime
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-sm text-white/60 mb-1">Active Users</div>
                      <div className="text-2xl font-bold">50,000+</div>
                    </div>
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-sm text-white/60 mb-1">API Requests/Day</div>
                      <div className="text-2xl font-bold">2M+</div>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-sm text-white/60 mb-1">Uptime SLA</div>
                      <div className="text-2xl font-bold">99.9%</div>
                    </div>
                    <Settings className="w-8 h-8 text-purple-400" />
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
            Built for Performance, Designed for Growth
          </h2>
          <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
            Every web app we build is engineered to handle your business today and scale for tomorrow.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="glass-card p-6 hover:bg-white/10 transition">
                  <Icon className="w-10 h-10 text-purple-400 mb-4" />
                  <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-12">
            Solutions for Every Business Need
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="glass-card p-8 hover:bg-white/10 transition">
                <h3 className="text-2xl font-display font-bold mb-3">{useCase.title}</h3>
                <p className="text-white/70 mb-6">{useCase.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {useCase.examples.map((example, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span className="text-white/60">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
            Modern Tech Stack
          </h2>
          <p className="text-xl text-white/70 text-center mb-12">
            We use cutting-edge technologies trusted by industry leaders.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="glass-card px-6 py-3 hover:bg-white/10 transition">
                <div className="text-sm text-white/60 mb-1">{tech.category}</div>
                <div className="font-semibold">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-12">
            Our Development Process
          </h2>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              { phase: 'Discovery & Planning', description: 'We map out your requirements, user flows, and technical architecture.', week: 'Week 1' },
              { phase: 'Design & Prototyping', description: 'Interactive mockups and user interface design for your approval.', week: 'Week 2-3' },
              { phase: 'Development Sprint', description: 'Agile development with weekly updates and progress demos.', week: 'Week 4-8' },
              { phase: 'Testing & Optimization', description: 'Rigorous testing, performance tuning, and security audits.', week: 'Week 9-10' },
              { phase: 'Launch & Support', description: 'Deployment, monitoring setup, and ongoing maintenance.', week: 'Week 11-12' },
            ].map((step, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                  <span className="font-bold text-purple-400">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-display font-bold">{step.phase}</h3>
                    <span className="text-sm text-purple-400">{step.week}</span>
                  </div>
                  <p className="text-white/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-4">
            Investment Options
          </h2>
          <p className="text-xl text-white/70 text-center mb-12">
            Choose the development package that matches your vision and budget.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`glass-card p-8 relative ${
                  plan.featured ? 'border-2 border-purple-500 scale-105' : ''
                } hover:bg-white/10 transition`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-purple-500 text-black text-sm font-bold rounded-full">
                    RECOMMENDED
                  </div>
                )}
                
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <p className="text-white/60 mb-2">{plan.description}</p>
                <div className="text-sm text-purple-400 mb-4">{plan.timeline}</div>
                <div className="text-4xl font-bold text-purple-400 mb-6">{plan.price}</div>
                
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

      {/* Maintenance CTA */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 lg:p-12 text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Ongoing Support & Maintenance
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Keep your app secure, fast, and up-to-date with our care plans. 
              Starting at $997/month with 24/7 monitoring and priority support.
            </p>
            <Link href="/services/care-plans" className="btn-primary inline-flex items-center gap-2">
              View Care Plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Ready to Build Your Web App?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Let's discuss your project and create a custom solution that fits your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Start Your Project
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