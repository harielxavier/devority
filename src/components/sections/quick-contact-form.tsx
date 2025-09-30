'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Phone, ArrowRight, Sparkles } from 'lucide-react';

interface QuickFormData {
  name: string;
  phone: string;
  service: string;
}

export function QuickContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<QuickFormData>({
    name: '',
    phone: '',
    service: ''
  });

  const services = [
    'Website + AI Solutions',
    'Local SEO Domination',
    'AI Chatbot Setup',
    'Complete Digital Makeover'
  ];

  const handleInputChange = (field: keyof QuickFormData, value: string) => {
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
          email: '', // Will be collected in follow-up
          business: '',
          message: `Quick contact form submission - Service: ${formData.service}`,
          source: 'Hero Quick Contact Form',
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or call (973) 555-0123');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.phone && formData.service;

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 text-center"
      >
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6 text-green-400" />
        </div>
        <h4 className="text-lg font-bold text-white mb-2">We'll Call You!</h4>
        <p className="text-white/80 text-sm mb-4">
          Expect a call within 2 hours to discuss your project.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-electric-400">
          <Phone className="w-3 h-3" />
          <span>Or call us now: (973) 555-0123</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-card p-6"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h4 className="text-lg font-bold text-white mb-2">
          Get Your Free Strategy Call
        </h4>
        <p className="text-white/80 text-sm">
          <span className="text-sunset-400 font-semibold">$500 value</span> • No obligation • 2hr response
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors text-sm"
            placeholder="Your name"
            required
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors text-sm"
            placeholder="Phone number"
            required
          />
          <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
        </div>

        {/* Service */}
        <div>
          <select
            value={formData.service}
            onChange={(e) => handleInputChange('service', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors text-sm"
            required
          >
            <option value="" className="bg-midnight text-white">What do you need?</option>
            {services.map((service) => (
              <option key={service} value={service} className="bg-midnight text-white">
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-xs">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          size="lg"
          className="w-full group text-sm"
        >
          {isSubmitting ? (
            <span>Sending...</span>
          ) : (
            <>
              <span>Get My Free Call</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>

        {/* Trust Signal */}
        <p className="text-xs text-white/60 text-center">
          🔒 Secure • ⚡ 2hr response • 📞 (973) 555-0123
        </p>
      </form>
    </motion.div>
  );
}
