import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Brain, Globe, Search, Shield, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services - Web Design, AI Solutions & Digital Marketing | Devority',
  description: 'Transform your business with our comprehensive digital services. From AI-powered automation to stunning websites and local SEO dominance.',
  keywords: [
    'web design services',
    'ai business solutions',
    'local seo services',
    'web app development',
    'website maintenance',
    'digital marketing',
    'sparta nj web design'
  ],
};

const services = [
  {
    title: 'AI Solutions',
    description: 'Transform your business with intelligent automation. Save 8+ hours per week with AI chatbots, predictive analytics, and smart workflows.',
    icon: Brain,
    href: '/services/ai-solutions',
    features: ['24/7 AI Chatbots', 'Document Automation', 'Predictive Analytics', 'Smart Workflows'],
    color: 'from-electric-500 to-purple-500',
  },
  {
    title: 'Website Design',
    description: 'High-converting websites that turn visitors into customers. Fast, beautiful, and optimized for local search dominance.',
    icon: Globe,
    href: '/services/websites',
    features: ['Mobile-First Design', 'Lightning Fast', 'SEO Optimized', 'Conversion Focused'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Web Applications',
    description: 'Custom web apps that scale with your growth. From booking systems to customer portals, we build solutions that work.',
    icon: Code,
    href: '/services/web-apps',
    features: ['Custom Development', 'API Integrations', 'Real-time Updates', 'Secure & Scalable'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'SEO & Local SEO',
    description: 'Dominate local search results and attract more customers. We help you rank #1 where it matters most.',
    icon: Search,
    href: '/services/seo',
    features: ['Local SEO', 'Google My Business', 'Content Strategy', 'Technical SEO'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Care Plans',
    description: 'Keep your site secure, fast, and up-to-date. Proactive maintenance and optimization for peace of mind.',
    icon: Shield,
    href: '/services/care-plans',
    features: ['24/7 Monitoring', 'Security Updates', 'Performance Optimization', 'Regular Backups'],
    color: 'from-orange-500 to-red-500',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-500/10 via-transparent to-purple-500/10 animate-gradient" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Digital Solutions That Drive Growth
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            From AI automation to local SEO dominance, we provide the complete digital toolkit 
            your business needs to thrive in today's competitive landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get Started
            </Link>
            <Link href="/work" className="btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  href={service.href}
                  className="group relative glass-card p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 rounded-2xl`} />
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-10`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-electric-300 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-white/70 mb-6">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* Special Offer Card */}
          <div className="mt-8 glass-card p-8 bg-gradient-to-r from-electric-500/10 to-purple-500/10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">
                  Complete Digital Transformation Package
                </h3>
                <p className="text-white/70">
                  Combine multiple services for maximum impact and save up to 20% on bundled solutions.
                </p>
              </div>
              <Link href="/contact" className="btn-primary whitespace-nowrap">
                Get Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center mb-16">
            Why Businesses Choose Devority
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-electric-400 mb-2">340%</div>
              <div className="text-sm text-white/70 mb-1">Average ROI</div>
              <p className="text-xs text-white/50">Within first 12 months</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-electric-400 mb-2">8+ hrs</div>
              <div className="text-sm text-white/70 mb-1">Saved Weekly</div>
              <p className="text-xs text-white/50">Through AI automation</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-electric-400 mb-2">24/7</div>
              <div className="text-sm text-white/70 mb-1">Support & Monitoring</div>
              <p className="text-xs text-white/50">Peace of mind included</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Let's discuss how our services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Schedule Free Consultation
            </Link>
            <Link href="/pricing" className="btn-secondary">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}