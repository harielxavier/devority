"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "The AI intake system has transformed our practice. We're capturing leads we would have lost and our team can focus on what they do best - practicing law. ROI was immediate.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Morris",
    role: "Managing Partner, Morris & Associates Law",
  },
  {
    text: "Our schedule is now consistently full. The AI predictions help us identify at-risk appointments and the automated reminders work incredibly well. No-shows dropped 28%.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    name: "Dr. Michael Chen",
    role: "Practice Owner, Summit Dental Care",
  },
  {
    text: "We've doubled our conversion rate and cut estimate time in half. The automated follow-up ensures we never lose a potential customer. Best investment we've made.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Tony Rodriguez",
    role: "Owner, Precision HVAC Solutions",
  },
  {
    text: "Devority doesn't just build websites - they build business solutions. Our new site with AI automation has doubled our conversion rate and streamlined our entire intake process.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Michael Rodriguez",
    role: "Managing Partner, Rodriguez Law Firm",
  },
  {
    text: "Professional, responsive, and results-driven. They delivered exactly what they promised, on time and on budget. Our online bookings have increased 300% since launch.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    name: "Tony Precision",
    role: "Owner, Precision HVAC Solutions",
  },
  {
    text: "Working with Devority was seamless from start to finish. They understood our vision and delivered a website that perfectly represents our brand while driving real business results.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Lisa Thompson",
    role: "Director, Hope Foundation",
  },
  {
    text: "The AI features have been a game-changer for our restaurant. Automated reservations, order management, and customer communication - it's like having a full-time assistant.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    name: "Chef Marco Italiano",
    role: "Owner, Bella Vista Restaurant",
  },
  {
    text: "Exceptional service and incredible results. Our website now ranks #1 for local searches and the AI chatbot qualifies leads 24/7. Couldn't be happier with our decision.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    name: "Jennifer Walsh",
    role: "Practice Manager, Walsh Orthodontics",
  },
  {
    text: "The team at Devority understands local business needs. Our AI-powered website has increased qualified leads by 45% and saved us 10+ hours per week on admin tasks.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    name: "David Kim",
    role: "Owner, Elite Fitness Studio",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function DevorityTestimonials() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects with NEW brand colors */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sunset-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/6 w-72 h-72 bg-magenta-500/4 rounded-full blur-2xl" />
      </div>

      <div className="max-w-container container-padding mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center glass-card px-4 py-2 rounded-full text-sm font-medium text-electric-300 mb-6"
          >
            <span className="w-2 h-2 bg-electric-400 rounded-full mr-2 animate-pulse" />
            Client Success Stories
          </motion.div>

          {/* Title */}
          <h2 className="text-section-title gradient-text mb-6">
            What Our Clients Say
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-white/80 mb-6">
            Real results from real businesses. See how our AI-powered solutions have transformed 
            local companies across industries.
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-white/80 font-medium">4.9/5</span>
            <span className="text-white/60">•</span>
            <span className="text-white/60">50+ reviews</span>
          </div>

          <p className="text-sm text-electric-300 font-medium">
            100% client satisfaction • 340% average ROI • 50+ successful projects
          </p>
        </motion.div>

        {/* Testimonials Columns */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] overflow-hidden"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn 
            testimonials={secondColumn} 
            className="hidden md:block" 
            duration={19} 
          />
          <TestimonialsColumn 
            testimonials={thirdColumn} 
            className="hidden lg:block" 
            duration={17} 
          />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-display font-semibold text-white mb-4">
              Ready to join our success stories?
            </h3>
            <p className="text-white/70 mb-6">
              See how our AI-powered solutions can transform your business like they have for 50+ other local companies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="btn-primary"
              >
                Get Your Free Consultation
              </a>
              <a
                href="/work"
                className="btn-secondary"
              >
                View All Case Studies
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
