'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  service?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (formData.phone) {
      const phoneRegex = /^[\d\s\-\(\)+]+$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setSubmitStatus('idle');
    setStatusMessage('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Thank you for your message! We\'ll be in touch soon.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        
        // Clear success message after 10 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 10000);
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Something went wrong. Please try again.');
        
        // Handle rate limiting
        if (response.status === 429) {
          setStatusMessage('Too many submissions. Please wait a moment and try again.');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setStatusMessage('Unable to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-display font-bold mb-6">Get Your Free Audit</h2>
        
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-400">{statusMessage}</div>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-400">{statusMessage}</div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.name ? 'border-red-400' : 'border-white/20'
              } rounded-lg focus:outline-none focus:border-electric-400 transition-colors`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.email ? 'border-red-400' : 'border-white/20'
              } rounded-lg focus:outline-none focus:border-electric-400 transition-colors`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone <span className="text-white/40">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.phone ? 'border-red-400' : 'border-white/20'
              } rounded-lg focus:outline-none focus:border-electric-400 transition-colors`}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us about your project..."
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.message ? 'border-red-400' : 'border-white/20'
              } rounded-lg focus:outline-none focus:border-electric-400 transition-colors resize-none`}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-primary w-full flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
          
          <p className="text-xs text-white/40 text-center mt-4">
            By submitting this form, you agree to our{' '}
            <a href="/privacy" className="underline hover:text-white/60">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
      
      {/* Contact Info */}
      <div className="space-y-8">
        <div className="glass-card p-6">
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-electric-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Call Us</h3>
              <p className="text-white/70">(973) 555-0100</p>
              <p className="text-sm text-white/50 mt-1">Mon-Fri 9AM-6PM EST</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-electric-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Email Us</h3>
              <p className="text-white/70">hi@devority.io</p>
              <p className="text-sm text-white/50 mt-1">We reply within 24 hours</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-electric-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Visit Us</h3>
              <p className="text-white/70">Sparta, NJ</p>
              <p className="text-sm text-white/50 mt-1">Serving US Nationwide</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-electric-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Business Hours</h3>
              <p className="text-white/70">Mon-Fri: 9AM - 6PM EST</p>
              <p className="text-white/70">Sat-Sun: By Appointment</p>
              <p className="text-sm text-white/50 mt-1">24/7 Online Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}