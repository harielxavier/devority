'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import Link from 'next/link';

export function CaseStudyGrid() {
  const caseStudies = [
    {
      id: 'johnson-law',
      title: 'Johnson Law Firm',
      industry: 'Legal Services',
      location: 'Morristown, NJ',
      challenge: 'Low online visibility and poor lead generation',
      solution: 'Complete website redesign with AI chatbot and SEO optimization',
      results: {
        leads: '+285%',
        revenue: '+$180K',
        traffic: '+340%',
        timeframe: '6 months'
      },
      image: '/images/case-studies/johnson-law.jpg',
      featured: true,
      testimonial: "Devority transformed our practice. We went from 2-3 leads per month to 15-20 qualified leads. The ROI has been incredible.",
      clientName: "Michael Johnson",
      clientTitle: "Managing Partner"
    },
    {
      id: 'bella-dental',
      title: 'Bella Dental Care',
      industry: 'Healthcare',
      location: 'Wayne, NJ',
      challenge: 'High no-show rates and difficulty booking appointments',
      solution: 'AI appointment system with automated reminders and patient portal',
      results: {
        leads: '+165%',
        revenue: '+$95K',
        traffic: '+220%',
        timeframe: '4 months'
      },
      image: '/images/case-studies/bella-dental.jpg',
      featured: true,
      testimonial: "The automated booking system has been a game-changer. Our no-show rate dropped by 40% and we're consistently booked.",
      clientName: "Dr. Sarah Bella",
      clientTitle: "Practice Owner"
    },
    {
      id: 'summit-hvac',
      title: 'Summit HVAC Solutions',
      industry: 'Home Services',
      location: 'Summit, NJ',
      challenge: 'Seasonal revenue fluctuations and poor online presence',
      solution: 'Lead generation website with service booking and maintenance reminders',
      results: {
        leads: '+420%',
        revenue: '+$240K',
        traffic: '+380%',
        timeframe: '8 months'
      },
      image: '/images/case-studies/summit-hvac.jpg',
      featured: true,
      testimonial: "We used to rely on word-of-mouth. Now we have a steady stream of qualified leads year-round. Best investment we've made.",
      clientName: "Tony Martinez",
      clientTitle: "Owner"
    },
    {
      id: 'garden-bistro',
      title: 'Garden State Bistro',
      industry: 'Restaurant',
      location: 'Sparta, NJ',
      challenge: 'Limited online ordering and poor reservation system',
      solution: 'Complete digital transformation with online ordering and table management',
      results: {
        leads: '+190%',
        revenue: '+$85K',
        traffic: '+280%',
        timeframe: '3 months'
      },
      image: '/images/case-studies/garden-bistro.jpg',
      featured: false,
      testimonial: "Online orders now make up 35% of our revenue. The system pays for itself every month.",
      clientName: "Maria Rodriguez",
      clientTitle: "Restaurant Manager"
    },
    {
      id: 'tech-startup',
      title: 'InnovateTech Solutions',
      industry: 'Technology',
      location: 'Princeton, NJ',
      challenge: 'Need for professional B2B presence and lead generation',
      solution: 'Corporate website with lead magnets and automated nurturing',
      results: {
        leads: '+310%',
        revenue: '+$450K',
        traffic: '+290%',
        timeframe: '5 months'
      },
      image: '/images/case-studies/tech-startup.jpg',
      featured: false,
      testimonial: "The lead generation system has been incredible. We've closed deals we never would have reached before.",
      clientName: "David Kim",
      clientTitle: "CEO"
    },
    {
      id: 'wellness-center',
      title: 'Harmony Wellness Center',
      industry: 'Healthcare',
      location: 'Ridgewood, NJ',
      challenge: 'Difficulty showcasing services and booking appointments',
      solution: 'Service showcase website with integrated booking and client portal',
      results: {
        leads: '+245%',
        revenue: '+$120K',
        traffic: '+200%',
        timeframe: '4 months'
      },
      image: '/images/case-studies/wellness-center.jpg',
      featured: false,
      testimonial: "Our clients love the new booking system and we've seen a significant increase in new patient inquiries.",
      clientName: "Dr. Lisa Chen",
      clientTitle: "Director"
    }
  ];

  return (
    <section className="section-padding bg-white/5 border-y border-white/10">
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
            <span className="gradient-text">Success stories</span> from every industry
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            From law firms to restaurants, healthcare to home services—we've helped 
            businesses across New Jersey achieve remarkable growth. Here are some of our favorites.
          </p>
        </motion.div>

        {/* Featured Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.filter(study => study.featured).map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden group hover:scale-105 transition-transform"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-electric-500/20 to-sunset-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-white/60 mx-auto mb-2" />
                    <div className="text-white/60 text-sm">{study.industry}</div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-electric-500/80 rounded-full text-white text-xs font-medium">
                  Featured
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white text-lg">
                    {study.title}
                  </h3>
                  <div className="text-electric-400 text-sm">
                    {study.location}
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {study.challenge}
                </p>

                {/* Results Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold gradient-text">{study.results.leads}</div>
                    <div className="text-white/60 text-xs">More Leads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold gradient-text">{study.results.revenue}</div>
                    <div className="text-white/60 text-xs">Revenue</div>
                  </div>
                </div>

                {/* Testimonial */}
                <blockquote className="text-white/80 italic text-sm mb-4 border-l-2 border-electric-500 pl-3">
                  "{study.testimonial}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium text-sm">{study.clientName}</div>
                    <div className="text-electric-400 text-xs">{study.clientTitle}</div>
                  </div>
                  <Link 
                    href={`/work/${study.id}`}
                    className="flex items-center gap-2 text-electric-400 hover:text-electric-300 text-sm font-medium group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.filter(study => !study.featured).map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 group hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white">
                  {study.title}
                </h3>
                <div className="text-electric-400 text-sm">
                  {study.industry}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold gradient-text">{study.results.leads}</div>
                  <div className="text-white/60 text-xs">Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold gradient-text">{study.results.revenue}</div>
                  <div className="text-white/60 text-xs">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold gradient-text">{study.results.timeframe}</div>
                  <div className="text-white/60 text-xs">Timeline</div>
                </div>
              </div>

              <Link 
                href={`/work/${study.id}`}
                className="flex items-center justify-between text-electric-400 hover:text-electric-300 text-sm font-medium group-hover:translate-x-1 transition-transform"
              >
                <span>View Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to be our next success story?
            </h3>
            <p className="text-white/80 mb-6">
              Every business is unique, but the results speak for themselves. 
              Let's discuss how we can help you achieve similar growth.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-brand text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Start Your Success Story
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
