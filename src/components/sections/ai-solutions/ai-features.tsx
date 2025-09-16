'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  FileText,
  BarChart3,
  Phone,
  Mail,
  Calendar,
  Cpu,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const aiFeatures = [
  {
    id: 'chatbots',
    icon: MessageCircle,
    title: 'AI Chatbots & Virtual Assistants',
    subtitle: 'Intelligent customer interactions 24/7',
    description: 'Deploy smart chatbots that understand context, qualify leads, answer questions, and seamlessly hand off to your team when needed.',
    benefits: [
      'Qualify leads automatically',
      'Answer common questions instantly',
      'Schedule appointments',
      'Collect customer information',
      'Multilingual support',
      'Seamless human handoff'
    ],
    features: [
      {
        name: 'Natural Language Processing',
        description: 'Understands customer intent and context'
      },
      {
        name: 'Lead Qualification',
        description: 'Pre-qualifies prospects based on your criteria'
      },
      {
        name: 'Appointment Scheduling',
        description: 'Books meetings directly in your calendar'
      },
      {
        name: 'Knowledge Base Integration',
        description: 'Trained on your business information'
      }
    ],
    pricing: {
      setup: 500,
      monthly: 149,
      included: 'Basic chatbot with 1,000 conversations/month'
    },
    industries: ['Attorneys', 'Dentists', 'Trades', 'Restaurants']
  },
  {
    id: 'automation',
    icon: FileText,
    title: 'Document & Process Automation',
    subtitle: 'Eliminate repetitive paperwork',
    description: 'Automate document generation, data entry, and workflow processes. From contracts to invoices, let AI handle the paperwork.',
    benefits: [
      'Generate documents instantly',
      'Auto-populate forms',
      'Digital signature workflows',
      'Data extraction from PDFs',
      'Automated follow-ups',
      'Compliance tracking'
    ],
    features: [
      {
        name: 'Smart Document Generation',
        description: 'Create contracts, proposals, and forms automatically'
      },
      {
        name: 'Data Extraction',
        description: 'Pull information from uploaded documents'
      },
      {
        name: 'Workflow Automation',
        description: 'Trigger actions based on document status'
      },
      {
        name: 'E-signature Integration',
        description: 'Seamless digital signing process'
      }
    ],
    pricing: {
      setup: 750,
      monthly: 199,
      included: 'Up to 3 automated workflows'
    },
    industries: ['Attorneys', 'Trades', 'Real Estate', 'Healthcare']
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Predictive Analytics & Insights',
    subtitle: 'Make data-driven decisions',
    description: 'Harness the power of machine learning to predict customer behavior, optimize operations, and identify growth opportunities.',
    benefits: [
      'Predict customer churn',
      'Optimize pricing strategies',
      'Forecast demand',
      'Identify upsell opportunities',
      'Prevent no-shows',
      'Performance insights'
    ],
    features: [
      {
        name: 'Customer Behavior Analysis',
        description: 'Understand patterns and predict actions'
      },
      {
        name: 'Revenue Forecasting',
        description: 'Predict future revenue trends'
      },
      {
        name: 'Risk Assessment',
        description: 'Identify potential issues early'
      },
      {
        name: 'Performance Optimization',
        description: 'Recommendations for improvement'
      }
    ],
    pricing: {
      setup: 1000,
      monthly: 299,
      included: 'Custom analytics dashboard with insights'
    },
    industries: ['All Industries']
  },
  {
    id: 'communication',
    icon: Phone,
    title: 'AI Communication & Follow-up',
    subtitle: 'Never miss a lead again',
    description: 'Automated email sequences, SMS follow-ups, and voice messages that nurture leads and keep customers engaged.',
    benefits: [
      'Automated email sequences',
      'SMS reminders and follow-ups',
      'Voice message campaigns',
      'Personalized content',
      'Optimal timing delivery',
      'Response tracking'
    ],
    features: [
      {
        name: 'Smart Email Campaigns',
        description: 'Personalized emails based on customer behavior'
      },
      {
        name: 'SMS Automation',
        description: 'Timely text message reminders and updates'
      },
      {
        name: 'Voice Broadcasting',
        description: 'Automated voice messages for important updates'
      },
      {
        name: 'Multi-channel Coordination',
        description: 'Coordinated messaging across all channels'
      }
    ],
    pricing: {
      setup: 400,
      monthly: 99,
      included: 'Up to 2,000 messages/month'
    },
    industries: ['Healthcare', 'Service Providers', 'Retail']
  }
];

export function AIFeatures() {
  const [activeFeature, setActiveFeature] = useState(aiFeatures[0]);

  return (
    <section id="ai-features" className="section-padding relative">
      <div className="max-w-container container-padding mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title gradient-text mb-6">
            AI Features That Transform Your Business
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Choose from our suite of AI-powered tools designed specifically for local businesses. 
            Each solution is customized to your industry and integrated seamlessly with your existing systems.
          </p>
        </motion.div>

        {/* Feature Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {aiFeatures.map((feature, index) => (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveFeature(feature)}
              className={`p-6 rounded-xl transition-all duration-300 text-left ${
                activeFeature.id === feature.id
                  ? 'glass-card ring-2 ring-electric-500/50 bg-white/10'
                  : 'glass-card hover:bg-white/5'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 ${
                activeFeature.id === feature.id
                  ? 'bg-gradient-brand'
                  : 'bg-white/10'
              }`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-semibold text-white mb-2 text-sm">
                {feature.title}
              </h3>
              <p className="text-xs text-white/60">
                {feature.subtitle}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Feature Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-8 lg:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Content */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-brand flex items-center justify-center">
                    <activeFeature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-1">
                      {activeFeature.title}
                    </h3>
                    <p className="text-electric-300 font-medium">
                      {activeFeature.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-white/80 mb-6 leading-relaxed">
                  {activeFeature.description}
                </p>

                {/* Benefits */}
                <div className="mb-8">
                  <h4 className="font-semibold text-white mb-4">Key Benefits:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeFeature.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-sm text-white/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="glass-card p-6 mb-6">
                  <h4 className="font-semibold text-white mb-3">Pricing</h4>
                  <div className="flex items-center space-x-6 mb-3">
                    <div>
                      <div className="text-2xl font-bold gradient-text">
                        ${activeFeature.pricing.monthly}
                      </div>
                      <div className="text-sm text-white/60">/month</div>
                    </div>
                    <div>
                      <div className="text-lg text-white/80">
                        ${activeFeature.pricing.setup}
                      </div>
                      <div className="text-sm text-white/60">setup fee</div>
                    </div>
                  </div>
                  <p className="text-sm text-white/70">
                    {activeFeature.pricing.included}
                  </p>
                </div>

                {/* Industries */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Perfect for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeFeature.industries.map((industry) => (
                      <span
                        key={industry}
                        className="px-3 py-1 bg-electric-500/20 text-electric-300 text-sm rounded-full"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div>
                <h4 className="font-semibold text-white mb-6">Technical Features:</h4>
                <div className="space-y-4">
                  {activeFeature.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="glass-card p-4"
                    >
                      <h5 className="font-semibold text-white mb-2">{feature.name}</h5>
                      <p className="text-sm text-white/70">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button href="#ai-contact" variant="primary" size="lg" className="w-full">
                    Get Started with {activeFeature.title}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
