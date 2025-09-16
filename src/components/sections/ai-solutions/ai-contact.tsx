'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  Calendar,
  Phone,
  Mail,
  Lightbulb
} from 'lucide-react';

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant answers to your AI questions',
    action: 'Start Chat',
    available: 'Available now'
  },
  {
    icon: Calendar,
    title: 'Schedule Consultation',
    description: 'Book a free 30-minute AI strategy session',
    action: 'Book Call',
    available: 'Next available: Today'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with an AI specialist',
    action: '(973) 555-0123',
    available: 'Mon-Fri 9AM-6PM EST'
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us your AI project details',
    action: 'ai@devority.io',
    available: 'Response within 2 hours'
  }
];

export function AIContact() {
  return (
    <section id="ai-contact" className="section-padding relative">
      <div className="max-w-container container-padding mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title text-white mb-6">
            Start Your <span className="gradient-text">AI Journey</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Free consultation • Custom AI strategy • Same-day response
          </p>
          
          <div className="glass-card p-6 max-w-xl mx-auto mb-12">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold gradient-text mb-1">Free</div>
                <div className="text-sm text-white/80">Consultation</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text mb-1">30min</div>
                <div className="text-sm text-white/80">Strategy Call</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text mb-1">Today</div>
                <div className="text-sm text-white/80">Available</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-brand flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{method.title}</h3>
              <p className="text-sm text-white/70 mb-4">{method.description}</p>
              <div className="text-electric-400 font-medium mb-2">{method.action}</div>
              <div className="text-xs text-white/60">{method.available}</div>
            </motion.div>
          ))}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass-card p-8 lg:p-12 text-center"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Start Your AI Transformation Today
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join 50+ local businesses already saving time and increasing revenue with our AI solutions. 
            Book your free consultation and discover how AI can transform your business.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button href="/contact" size="xl" className="group">
              Book Free AI Consultation
              <Calendar className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" />
            </Button>
            <Button href="/work" variant="secondary" size="xl">
              See AI Success Stories
            </Button>
          </div>

          <div className="text-sm text-white/60">
            <p className="flex items-center">
              <Lightbulb className="w-4 h-4 text-electric-400 mr-2" />
              <strong className="text-white">No commitment required.</strong> Just honest advice about how AI can help your business.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
