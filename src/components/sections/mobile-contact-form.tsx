'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Phone, Mail, Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  message: string;
}

export function MobileContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    business: '',
    service: '',
    message: ''
  });

  const services = [
    'Website Design & Development',
    'AI Solutions & Chatbots',
    'Local SEO & Marketing',
    'Monthly Care Plans',
    'Not Sure - Need Consultation'
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Mobile Contact Form',
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setIsSubmitted(true);

      // Track conversion
      // Analytics tracking removed
    } catch (err) {
      setError('Something went wrong. Please try again or call us directly at (973) 555-0123');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.service;

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center max-w-md mx-auto"
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
        <p className="text-white/80 mb-6">
          We'll get back to you within 24 hours with a detailed quote and strategy recommendations.
        </p>
        <div className="space-y-3 text-sm text-white/70">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Response time: Under 24 hours</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Or call us: (973) 555-0123</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="glass-card p-6 md:p-8 max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Get Your Free Quote
        </h3>
        <p className="text-white/80 mb-4">
          Tell us about your business and we'll create a custom strategy
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-electric-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>24hr response</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            <span>No obligation</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
            placeholder="John Smith"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
            placeholder="john@business.com"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
              placeholder="(973) 555-0123"
              required
            />
            <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
          </div>
          <p className="text-xs text-white/60 mt-1">We'll call you to discuss your project</p>
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={formData.business}
            onChange={(e) => handleInputChange('business', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
            placeholder="Your Business Name"
          />
        </div>

        {/* Service Interest */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            What service interests you most? *
          </label>
          <select
            value={formData.service}
            onChange={(e) => handleInputChange('service', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors"
            required
          >
            <option value="" className="bg-midnight text-white">Select a service...</option>
            {services.map((service) => (
              <option key={service} value={service} className="bg-midnight text-white">
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Tell us about your goals
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors resize-none"
            placeholder="What are you hoping to achieve with your website or AI solution?"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          size="lg"
          className="w-full group"
        >
          {isSubmitting ? (
            <span>Sending...</span>
          ) : (
            <>
              <span>Get My Free Quote</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>

        {/* Trust Signals */}
        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-xs text-white/60 mb-2">
            🔒 Your information is secure and will never be shared
          </p>
          <p className="text-xs text-white/60">
            ⚡ Average response time: 4 hours • 📞 Call us: (973) 555-0123
          </p>
        </div>
      </form>
    </motion.div>
  );
}
