'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function ConversionForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    goal: ''
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or contact us directly.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-container container-padding mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-section-title text-white mb-6">
              Get your <span className="gradient-text">free quote</span>
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Quick 3-step form • Same-day response • No commitment
            </p>
            
            <div className="glass-card p-8">
              {/* Success State */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Thank you!</h3>
                  <p className="text-white/80 mb-6">
                    We've received your quote request and will get back to you within 24 hours.
                  </p>
                  <p className="text-sm text-white/60">
                    Check your email for a confirmation message.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Progress Bar */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            step >= num 
                              ? 'bg-electric-500 text-white' 
                              : 'bg-white/10 text-white/60'
                          }`}>
                            {num}
                          </div>
                          {num < 3 && (
                            <div className={`w-12 h-0.5 mx-2 transition-colors ${
                              step > num ? 'bg-electric-500' : 'bg-white/20'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Step 1: Contact Info */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-white mb-2">Let's get started</h3>
                        <p className="text-white/70 mb-6">How should we contact you?</p>
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors text-lg"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      
                      <div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors text-lg"
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <Button 
                        onClick={handleNext}
                        disabled={!formData.name || !formData.email}
                        size="lg" 
                        className="w-full"
                      >
                        Continue
                      </Button>
                    </motion.div>
                  )}

                  {/* Step 2: Business Info */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-white mb-2">About your business</h3>
                        <p className="text-white/70 mb-6">Help us understand your needs</p>
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          value={formData.business}
                          onChange={(e) => setFormData({...formData, business: e.target.value})}
                          className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors text-lg"
                          placeholder="Business name (optional)"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button onClick={handleBack} variant="secondary" size="lg" className="flex-1">
                          Back
                        </Button>
                        <Button onClick={handleNext} size="lg" className="flex-1">
                          Continue
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Project Goal */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-white mb-2">What's your main goal?</h3>
                        <p className="text-white/70 mb-6">This helps us provide the most relevant quote</p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          'Get more customers online',
                          'Improve my current website',
                          'Automate business processes',
                          'Build a new website from scratch',
                          'Other (tell us more)'
                        ].map((goal) => (
                          <button
                            key={goal}
                            onClick={() => setFormData({...formData, goal})}
                            className={`p-4 text-left rounded-lg border transition-all ${
                              formData.goal === goal
                                ? 'border-electric-500 bg-electric-500/10 text-white'
                                : 'border-white/20 bg-white/5 text-white/80 hover:border-white/30'
                            }`}
                          >
                            {goal}
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button onClick={handleBack} variant="secondary" size="lg" className="flex-1">
                          Back
                        </Button>
                        <Button 
                          onClick={handleSubmit}
                          disabled={!formData.goal || isSubmitting}
                          size="lg" 
                          className="flex-1"
                        >
                          {isSubmitting ? 'Sending...' : 'Get My Quote'}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              <p className="text-xs text-white/40 mt-6 text-center">
                Free quote • No spam • Response within 24 hours
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
