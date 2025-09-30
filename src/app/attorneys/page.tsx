import { Metadata } from 'next';
import { IndustryHero } from '@/components/sections/industry-hero';
import { IndustryFeatures } from '@/components/sections/industry-features';
import { IndustryPricing } from '@/components/sections/industry-pricing';
import { IndustryCaseStudy } from '@/components/sections/industry-case-study';
import { MobileContactForm } from '@/components/sections/mobile-contact-form';

export const metadata: Metadata = {
  title: 'Attorney Website Design & Legal AI Solutions | Devority',
  description: 'Specialized website design and AI solutions for law firms. Increase consultations by 340% with our proven legal marketing strategies. Free consultation.',
  keywords: [
    'attorney website design',
    'law firm websites',
    'legal marketing',
    'lawyer SEO',
    'legal AI solutions',
    'attorney lead generation',
    'law firm chatbot',
    'legal intake automation'
  ],
};

const attorneyData = {
  industry: 'Attorneys & Law Firms',
  headline: 'Websites that win cases and clients',
  subheadline: 'Specialized website design and AI solutions that help law firms dominate their practice areas and increase consultations by an average of 340%.',
  heroImage: '/images/industries/attorney-hero.jpg',
  
  painPoints: [
    'Potential clients can\'t find your firm online',
    'Website doesn\'t convey trust and expertise',
    'Missing calls and leads after hours',
    'Competitors ranking higher in search results',
    'Time wasted on unqualified leads'
  ],
  
  solutions: [
    {
      title: 'Legal Intake Automation',
      description: 'AI-powered chatbot qualifies leads 24/7, collects case details, and schedules consultations automatically.',
      icon: 'MessageSquare',
      results: '+65% qualified consultations'
    },
    {
      title: 'Authority-Building Design',
      description: 'Professional website design that establishes credibility and showcases your expertise and case results.',
      icon: 'Award',
      results: '+45% consultation conversion rate'
    },
    {
      title: 'Local Legal SEO',
      description: 'Dominate local search results for your practice areas and geographic region.',
      icon: 'Search',
      results: '+280% organic traffic'
    },
    {
      title: 'Case Result Showcase',
      description: 'Highlight your wins and settlements to build trust with potential clients.',
      icon: 'TrendingUp',
      results: '+35% case value inquiries'
    }
  ],
  
  caseStudy: {
    clientName: 'Chen & Associates Law',
    location: 'Summit, NJ',
    practiceAreas: ['Personal Injury', 'Criminal Defense'],
    challenge: 'Low online visibility and poor lead quality were limiting growth potential.',
    solution: 'Complete website redesign with AI intake system and local SEO optimization.',
    results: [
      { metric: 'Consultation Requests', improvement: '+340%', timeframe: '4 months' },
      { metric: 'Qualified Leads', improvement: '+180%', timeframe: '3 months' },
      { metric: 'Case Value', improvement: '+$2.3M', timeframe: '6 months' },
      { metric: 'Search Rankings', improvement: 'Top 3', timeframe: '5 months' }
    ],
    testimonial: "Devority transformed our practice. We went from struggling to find clients to having more qualified leads than we can handle. The AI system alone has saved us 20 hours per week.",
    clientTitle: 'Managing Partner'
  },
  
  pricing: {
    essential: {
      price: 199,
      setupFee: 2500,
      features: [
        'Professional 8-page law firm website',
        'Practice area optimization',
        'Attorney bio pages',
        'Case results showcase',
        'Contact forms with legal intake',
        'Mobile-responsive design',
        'Basic SEO optimization',
        'SSL certificate & hosting'
      ]
    },
    premium: {
      price: 449,
      setupFee: 4500,
      popular: true,
      features: [
        'Everything in Essential, plus:',
        'AI legal intake chatbot',
        'Automated consultation scheduling',
        'Local SEO domination',
        'Google My Business optimization',
        'Legal directory submissions',
        'Case study content creation',
        'Advanced analytics dashboard',
        'Priority support'
      ]
    }
  }
};

export default function AttorneysPage() {
  return (
    <>
      <IndustryHero data={attorneyData} />
      <IndustryFeatures data={attorneyData} />
      <IndustryCaseStudy data={attorneyData.caseStudy} />
      <IndustryPricing data={attorneyData.pricing} industry="attorneys" />
      
      {/* Contact Form Section */}
      <section className="section-padding bg-gradient-to-br from-midnight via-navy-900 to-midnight">
        <div className="max-w-container container-padding mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to <span className="gradient-text">dominate</span> your practice area?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join 50+ law firms that have transformed their digital presence with Devority. 
                Get your free legal marketing audit and custom strategy.
              </p>
              <div className="space-y-4 text-white/70">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-electric-400 rounded-full"></div>
                  <span>Free legal marketing audit ($500 value)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-electric-400 rounded-full"></div>
                  <span>Custom strategy for your practice areas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-electric-400 rounded-full"></div>
                  <span>No obligation consultation</span>
                </div>
              </div>
            </div>
            <div>
              <MobileContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
