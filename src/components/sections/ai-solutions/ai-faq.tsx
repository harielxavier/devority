'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How quickly can AI solutions be implemented?',
    answer: 'Most AI solutions can be implemented within 2-4 weeks. Simple chatbots can be live in as little as 1 week, while complex automation workflows may take 4-6 weeks depending on integrations required.'
  },
  {
    question: 'Do I need technical knowledge to use AI solutions?',
    answer: 'No technical knowledge required. We handle all the setup, training, and maintenance. You\'ll receive a simple dashboard to monitor performance and make basic adjustments.'
  },
  {
    question: 'How do AI solutions integrate with my existing software?',
    answer: 'Our AI solutions integrate with 500+ popular business tools including CRMs, scheduling software, payment systems, and industry-specific platforms. We handle all integration work for you.'
  },
  {
    question: 'What kind of ROI can I expect from AI solutions?',
    answer: 'Our clients see an average ROI of 340% within 6 months. Typical benefits include 8+ hours saved per week, 28% increase in revenue, and significant reduction in manual tasks.'
  },
  {
    question: 'Is my data secure with AI solutions?',
    answer: 'Yes, we follow enterprise-grade security standards including SOC 2 compliance, data encryption, and GDPR compliance. Your data is never shared with third parties and remains completely private.'
  },
  {
    question: 'Can AI solutions be customized for my specific industry?',
    answer: 'Absolutely. We specialize in industry-specific AI solutions for attorneys, dentists, trades, restaurants, and more. Each solution is tailored to your industry\'s unique requirements and compliance needs.'
  },
  {
    question: 'What ongoing support is provided?',
    answer: 'All plans include ongoing support, regular updates, and performance monitoring. Higher-tier plans include dedicated support and monthly strategy calls to optimize your AI solutions.'
  },
  {
    question: 'Can I start with one AI solution and add more later?',
    answer: 'Yes, we recommend starting with one solution and expanding as you see results. Our modular approach allows you to add new AI capabilities as your business grows and needs evolve.'
  }
];

export function AIFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding relative">
      <div className="max-w-container container-padding mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title text-white mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Get answers to common questions about our AI solutions and implementation process.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-semibold text-white pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-white/60 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
