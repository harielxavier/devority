import { Metadata } from 'next';
import { IndustryHero } from '@/components/sections/industry-hero';
import { IndustryFeatures } from '@/components/sections/industry-features';
import { IndustryPricing } from '@/components/sections/industry-pricing';
import { IndustryCaseStudy } from '@/components/sections/industry-case-study';
import { MobileContactForm } from '@/components/sections/mobile-contact-form';

export const metadata: Metadata = {
  title: 'Dental Website Design & Patient AI Solutions | Devority',
  description: 'Specialized website design and AI solutions for dental practices. Reduce no-shows by 28% and increase new patients by 65%. Free consultation.',
  keywords: [
    'dental website design',
    'dentist websites',
    'dental marketing',
    'dental SEO',
    'dental AI solutions',
    'patient scheduling',
    'dental chatbot',
    'dental practice growth'
  ],
};

const dentistData = {
  industry: 'Dental Practices',
  headline: 'Websites that fill your schedule',
  subheadline: 'Specialized website design and AI solutions that help dental practices reduce no-shows by 28% and increase new patient bookings by an average of 65%.',
  heroImage: '/images/industries/dental-hero.jpg',
  
  painPoints: [
    'Empty appointment slots due to no-shows',
    'Patients can\'t book appointments online',
    'Spending too much time on phone scheduling',
    'New patients choosing competitors',
    'Difficulty explaining procedures to patients'
  ],
  
  solutions: [
    {
      title: 'Smart Appointment Booking',
      description: 'AI-powered scheduling system that books appointments 24/7, sends reminders, and reduces no-shows.',
      icon: 'MessageSquare',
      results: '+65% new patient bookings'
    },
    {
      title: 'Treatment Education Hub',
      description: 'Interactive content that explains procedures, builds trust, and increases treatment acceptance.',
      icon: 'Award',
      results: '+40% treatment acceptance'
    },
    {
      title: 'Local Dental SEO',
      description: 'Dominate local search results when patients search for dental services in your area.',
      icon: 'Search',
      results: '+180% website traffic'
    },
    {
      title: 'Patient Communication',
      description: 'Automated follow-ups, appointment reminders, and post-treatment care instructions.',
      icon: 'TrendingUp',
      results: '-28% no-show rate'
    }
  ],
  
  caseStudy: {
    clientName: 'Johnson Family Dentistry',
    location: 'Morristown, NJ',
    practiceAreas: ['General Dentistry', 'Cosmetic Dentistry'],
    challenge: 'High no-show rates and difficulty attracting new patients were limiting practice growth.',
    solution: 'Complete website redesign with AI booking system and patient education portal.',
    results: [
      { metric: 'New Patient Bookings', improvement: '+65%', timeframe: '3 months' },
      { metric: 'No-Show Reduction', improvement: '-28%', timeframe: '2 months' },
      { metric: 'Treatment Acceptance', improvement: '+40%', timeframe: '4 months' },
      { metric: 'Online Visibility', improvement: '+180%', timeframe: '5 months' }
    ],
    testimonial: "The AI booking system has been a game-changer. We've reduced no-shows significantly and our schedule is consistently full. The patient education features have also helped increase treatment acceptance rates.",
    clientTitle: 'Practice Owner'
  },
  
  pricing: {
    essential: {
      price: 179,
      setupFee: 2000,
      features: [
        'Professional 6-page dental website',
        'Online appointment booking',
        'Treatment information pages',
        'Before/after photo galleries',
        'Patient forms integration',
        'Mobile-responsive design',
        'Basic SEO optimization',
        'SSL certificate & hosting'
      ]
    },
    premium: {
      price: 399,
      setupFee: 3500,
      popular: true,
      features: [
        'Everything in Essential, plus:',
        'AI patient communication system',
        'Automated appointment reminders',
        'No-show reduction tools',
        'Local SEO domination',
        'Google My Business optimization',
        'Patient education videos',
        'Advanced analytics dashboard',
        'Priority support'
      ]
    }
  }
};

export default function DentistsPage() {
  return (
    <>
      <IndustryHero data={dentistData} />
      <IndustryFeatures data={dentistData} />
      <IndustryCaseStudy data={dentistData.caseStudy} />
      <IndustryPricing data={dentistData.pricing} industry="dental practices" />
      
      {/* Contact Form Section */}
      <section className="section-padding bg-gradient-to-br from-midnight via-navy-900 to-midnight">
        <div className="max-w-container container-padding mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to <span className="gradient-text">fill your schedule</span> with quality patients?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join 30+ dental practices that have transformed their patient acquisition with Devority. 
                Get your free dental marketing audit and custom strategy.
              </p>
              <div className="space-y-4 text-white/70">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-electric-400 rounded-full"></div>
                  <span>Free dental marketing audit ($500 value)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-electric-400 rounded-full"></div>
                  <span>Custom patient acquisition strategy</span>
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
