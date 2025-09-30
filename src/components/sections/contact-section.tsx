'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Loader2, Building2, DollarSign, Target, Calendar, Users, Sparkles } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  projectType: string;
  budget: string;
  timeline: string;
  currentChallenges: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    projectType: '',
    budget: '',
    timeline: '',
    currentChallenges: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }
    
    if (!formData.budget) {
      newErrors.budget = 'Please select your budget range';
    }
    
    if (!formData.timeline) {
      newErrors.timeline = 'Please select your timeline';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your project';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitStatus('idle');
    setStatusMessage('');
    
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
        setStatusMessage('Thank you! We\'ll review your project and get back to you within 24 hours.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          website: '',
          projectType: '',
          budget: '',
          timeline: '',
          currentChallenges: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Unable to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative px-6 py-24 lg:py-32 bg-gradient-to-br from-midnight via-ink to-midnight overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-electric-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-r from-electric-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Let\'s Build Your Success Story
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Ready to <span className="text-gradient">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Tell us about your project and let\'s create something extraordinary together. 
            Get a free consultation and custom strategy within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-display font-bold mb-6 text-white">
                Why Work With Devority?
              </h3>
              <ul className="space-y-4">
                {[
                  'Free consultation & website audit',
                  'Custom solutions, not templates',
                  '30-day money-back guarantee',
                  '24/7 support & maintenance',
                  'Proven results across industries',
                  'Local team in Sparta, NJ'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-electric-400 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-display font-semibold text-white mb-4">Get In Touch</h4>
              
              <a href="tel:+19738864059" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-electric-400/30 hover:bg-electric-400/5 transition-all">
                <Phone className="w-5 h-5 text-electric-400" />
                <div>
                  <p className="text-white font-medium">Call Us</p>
                  <p className="text-white/60 text-sm">(973) 886-4059</p>
                </div>
              </a>

              <a href="mailto:contact@devority.io" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-electric-400/30 hover:bg-electric-400/5 transition-all">
                <Mail className="w-5 h-5 text-electric-400" />
                <div>
                  <p className="text-white font-medium">Email Us</p>
                  <p className="text-white/60 text-sm">contact@devority.io</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-5 h-5 text-electric-400" />
                <div>
                  <p className="text-white font-medium">Visit Us</p>
                  <p className="text-white/60 text-sm">Sparta, New Jersey</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-5 h-5 text-electric-400" />
                <div>
                  <p className="text-white font-medium">Business Hours</p>
                  <p className="text-white/60 text-sm">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      errors.name ? 'border-red-500' : 'border-white/10'
                    } text-white placeholder-white/40 focus:border-electric-400 focus:outline-none transition-colors`}
                    placeholder="John Smith"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    } text-white placeholder-white/40 focus:border-electric-400 focus:outline-none transition-colors`}
                    placeholder="john@company.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Company Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-electric-400 focus:outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-electric-400 focus:outline-none transition-colors"
                    placeholder="Your Company Inc."
                  />
                </div>
              </div>

              {/* Current Website */}
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-white/80 mb-2">
                  Current Website (if any)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-electric-400 focus:outline-none transition-colors"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-white/80 mb-2">
                  What do you need help with? *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.projectType ? 'border-red-500' : 'border-white/10'
                  } text-white focus:border-electric-400 focus:outline-none transition-colors`}
                >
                  <option value="" className="bg-midnight">Select a service...</option>
                  <option value="new-website" className="bg-midnight">New Website Design & Development</option>
                  <option value="redesign" className="bg-midnight">Website Redesign/Refresh</option>
                  <option value="seo" className="bg-midnight">SEO & Digital Marketing</option>
                  <option value="web-app" className="bg-midnight">Custom Web Application</option>
                  <option value="ecommerce" className="bg-midnight">E-commerce Store</option>
                  <option value="maintenance" className="bg-midnight">Website Maintenance & Support</option>
                  <option value="consulting" className="bg-midnight">Digital Strategy Consulting</option>
                  <option value="other" className="bg-midnight">Other / Multiple Services</option>
                </select>
                {errors.projectType && <p className="text-red-400 text-xs mt-1">{errors.projectType}</p>}
              </div>

              {/* Budget and Timeline */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-white/80 mb-2">
                    Project Budget *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      errors.budget ? 'border-red-500' : 'border-white/10'
                    } text-white focus:border-electric-400 focus:outline-none transition-colors`}
                  >
                    <option value="" className="bg-midnight">Select budget range...</option>
                    <option value="under-5k" className="bg-midnight">Under $5,000</option>
                    <option value="5k-10k" className="bg-midnight">$5,000 - $10,000</option>
                    <option value="10k-25k" className="bg-midnight">$10,000 - $25,000</option>
                    <option value="25k-50k" className="bg-midnight">$25,000 - $50,000</option>
                    <option value="50k-100k" className="bg-midnight">$50,000 - $100,000</option>
                    <option value="100k-plus" className="bg-midnight">$100,000+</option>
                    <option value="ongoing" className="bg-midnight">Ongoing Monthly</option>
                  </select>
                  {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget}</p>}
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-white/80 mb-2">
                    Project Timeline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      errors.timeline ? 'border-red-500' : 'border-white/10'
                    } text-white focus:border-electric-400 focus:outline-none transition-colors`}
                  >
                    <option value="" className="bg-midnight">Select timeline...</option>
                    <option value="asap" className="bg-midnight">ASAP / Urgent</option>
                    <option value="1-month" className="bg-midnight">Within 1 month</option>
                    <option value="2-3-months" className="bg-midnight">2-3 months</option>
                    <option value="3-6-months" className="bg-midnight">3-6 months</option>
                    <option value="6-months-plus" className="bg-midnight">6+ months</option>
                    <option value="ongoing" className="bg-midnight">Ongoing project</option>
                  </select>
                  {errors.timeline && <p className="text-red-400 text-xs mt-1">{errors.timeline}</p>}
                </div>
              </div>

              {/* Current Challenges */}
              <div>
                <label htmlFor="currentChallenges" className="block text-sm font-medium text-white/80 mb-2">
                  What are your current challenges? (Optional)
                </label>
                <textarea
                  id="currentChallenges"
                  name="currentChallenges"
                  value={formData.currentChallenges}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-electric-400 focus:outline-none transition-colors resize-none"
                  placeholder="E.g., Low website traffic, poor conversion rates, outdated design, slow loading times..."
                />
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  Tell us about your project *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.message ? 'border-red-500' : 'border-white/10'
                  } text-white placeholder-white/40 focus:border-electric-400 focus:outline-none transition-colors resize-none`}
                  placeholder="Describe your project goals, target audience, and any specific features or requirements..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <p>{statusMessage}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5" />
                  <p>{statusMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-electric-600 to-electric-500 text-white font-semibold hover:from-electric-500 hover:to-electric-400 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:ring-offset-2 focus:ring-offset-ink transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Send Message & Get Free Consultation</span>
                  </>
                )}
              </button>

              <p className="text-center text-white/50 text-sm">
                We respect your privacy. Your information will never be shared.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}