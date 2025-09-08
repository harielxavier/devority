'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChartBarIcon,
  PhoneIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

const aiFeatures = [
  {
    id: 'chatbot',
    icon: ChatBubbleLeftRightIcon,
    title: 'AI Intake Assistant',
    subtitle: 'Qualify leads 24/7',
    description: 'Intelligent chatbot pre-qualifies potential clients, collects key information, and schedules consultations automatically.',
    metrics: {
      primary: '8+ hours',
      secondary: 'saved per week',
      improvement: '+42% qualified leads'
    },
    demo: {
      type: 'chat',
      messages: [
        { type: 'bot', text: 'Hi! I\'m here to help with your legal consultation. What type of case do you need assistance with?' },
        { type: 'user', text: 'I need help with a personal injury case' },
        { type: 'bot', text: 'I can help with that. When did the incident occur?' },
        { type: 'user', text: 'About 2 weeks ago' },
        { type: 'bot', text: 'Perfect! I\'ve gathered your initial information. Let me schedule you with Attorney Johnson for a free consultation. What\'s your preferred time?' }
      ]
    },
    industries: ['Attorneys', 'Dentists', 'Trades']
  },
  {
    id: 'automation',
    icon: DocumentTextIcon,
    title: 'Document Automation',
    subtitle: 'Generate contracts instantly',
    description: 'AI-powered document generation creates contracts, intake forms, and follow-up emails based on client information.',
    metrics: {
      primary: '90%',
      secondary: 'faster processing',
      improvement: '-75% admin time'
    },
    demo: {
      type: 'document',
      steps: [
        'Client submits intake form',
        'AI extracts key information',
        'Contract template auto-populated',
        'Document ready for review',
        'Client receives via email'
      ]
    },
    industries: ['Attorneys', 'Trades', 'Restaurants']
  },
  {
    id: 'analytics',
    icon: ChartBarIcon,
    title: 'Predictive Analytics',
    subtitle: 'Prevent no-shows & churn',
    description: 'Machine learning identifies patterns to predict no-shows, optimize scheduling, and increase client retention.',
    metrics: {
      primary: '-28%',
      secondary: 'no-show rate',
      improvement: '+$15K monthly revenue'
    },
    demo: {
      type: 'dashboard',
      insights: [
        { label: 'No-show Risk', value: 'High', color: 'text-ember-400' },
        { label: 'Best Time Slot', value: '2-4 PM', color: 'text-electric-400' },
        { label: 'Revenue Impact', value: '+$2,400', color: 'text-green-400' },
        { label: 'Recommended Action', value: 'Send reminder + incentive', color: 'text-sunset-400' }
      ]
    },
    industries: ['Dentists', 'Trades', 'Restaurants']
  }
];

export function AIInAction() {
  const [activeFeature, setActiveFeature] = useState(aiFeatures[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFeatureChange = (feature: typeof aiFeatures[0]) => {
    if (feature.id === activeFeature.id) return;

    setIsAnimating(true);
    setTimeout(() => {
      setActiveFeature(feature);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sunset-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-container container-padding mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title gradient-text mb-6">
            AI in Action
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-4">
            See how our AI solutions save time and increase revenue for local businesses.
          </p>
          <p className="text-sm text-electric-300 font-medium">
            Save 8+ hours/month with AI intake & document automation
          </p>
        </motion.div>

        {/* Feature Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12"
        >
          {/* Feature Selection */}
          <div className="lg:w-1/3">
            <div className="space-y-4">
              {aiFeatures.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleFeatureChange(feature)}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                    activeFeature.id === feature.id
                      ? 'glass-card ring-2 ring-electric-500/50 bg-white/10'
                      : 'glass-card hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      activeFeature.id === feature.id
                        ? 'bg-gradient-brand'
                        : 'bg-white/10'
                    }`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-electric-300 mb-2">
                        {feature.subtitle}
                      </p>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Metrics */}
                      <div className="mt-4 flex items-center space-x-4">
                        <div>
                          <div className="text-lg font-bold gradient-text">
                            {feature.metrics.primary}
                          </div>
                          <div className="text-xs text-white/60">
                            {feature.metrics.secondary}
                          </div>
                        </div>
                        <div className="text-xs text-green-400 font-medium">
                          {feature.metrics.improvement}
                        </div>
                      </div>

                      {/* Industries */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {feature.industries.map((industry) => (
                          <span
                            key={industry}
                            className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded-full"
                          >
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Demo Area */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? 20 : 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 h-full min-h-[500px]"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-display font-semibold text-white mb-2">
                    {activeFeature.title} Demo
                  </h3>
                  <p className="text-white/70">
                    {activeFeature.description}
                  </p>
                </div>

                {/* Chat Demo */}
                {activeFeature.demo.type === 'chat' && (
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-white/80">Live Chat - Attorney Website</span>
                      </div>
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {activeFeature.demo.messages?.map((message, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.5 }}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs px-4 py-2 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-electric-600 text-white'
                                : 'bg-white/10 text-white/90'
                            }`}>
                              <p className="text-sm">{message.text}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-400 font-medium">
                        ✓ Lead qualified and consultation scheduled automatically
                      </p>
                    </div>
                  </div>
                )}

                {/* Document Demo */}
                {activeFeature.demo.type === 'document' && (
                  <div className="space-y-4">
                    {activeFeature.demo.steps?.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.2 }}
                        className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-white/90">{step}</p>
                        </div>
                        <div className="text-green-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </motion.div>
                    ))}
                    <div className="text-center mt-6">
                      <p className="text-sm text-green-400 font-medium">
                        ✓ Contract generated in under 2 minutes
                      </p>
                    </div>
                  </div>
                )}

                {/* Analytics Demo */}
                {activeFeature.demo.type === 'dashboard' && (
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-4">
                        AI Insights Dashboard
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeFeature.demo.insights?.map((insight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white/5 rounded-lg p-4 border border-white/10"
                          >
                            <div className="text-sm text-white/60 mb-1">
                              {insight.label}
                            </div>
                            <div className={`text-lg font-semibold ${insight.color}`}>
                              {insight.value}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-400 font-medium">
                        ✓ Predictive insights updated in real-time
                      </p>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8 text-center">
                  <Button href="/services/ai-solutions" variant="primary" size="lg">
                    Explore AI Solutions
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-display font-semibold text-white mb-4">
              Ready to automate your business with AI?
            </h3>
            <p className="text-white/70 mb-6">
              Join 50+ local businesses already saving time and increasing revenue with our AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Get AI Consultation
              </Button>
              <Button href="/work" variant="secondary" size="lg">
                See Success Stories
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
