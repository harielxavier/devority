'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How much does a website cost?",
      answer: "Our websites start at $179/month with a setup fee ranging from $2,000-$5,000 depending on complexity. This includes hosting, security, updates, and ongoing support. We believe in transparent pricing with no hidden fees."
    },
    {
      question: "How long does it take to build a website?",
      answer: "Most websites are completed within 2-4 weeks. Complex projects with custom AI integrations may take 4-6 weeks. We provide a detailed timeline during our initial consultation and keep you updated throughout the process."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Absolutely! All our plans include ongoing support, security updates, hosting, and maintenance. We're your long-term partner, not just a one-time vendor. Our team is always available to help you grow."
    },
    {
      question: "What makes Devority different from other web design companies?",
      answer: "We're local to New Jersey, we specialize in AI integration, and we focus on results, not just pretty designs. Every website we build is designed to convert visitors into customers. Plus, we offer ongoing support and optimization."
    },
    {
      question: "Can you help with SEO and digital marketing?",
      answer: "Yes! We specialize in local SEO for New Jersey businesses. Our websites are built with SEO best practices, and we offer ongoing digital marketing services including Google Ads, social media, and content marketing."
    },
    {
      question: "Do you work with businesses outside of New Jersey?",
      answer: "While we're based in Sparta, NJ and specialize in local businesses, we do work with clients nationwide. However, our expertise in local New Jersey markets gives us a unique advantage for businesses in our area."
    },
    {
      question: "What if I already have a website?",
      answer: "We can redesign your existing website or optimize what you have. We start with a free audit to identify opportunities for improvement and provide recommendations based on your specific goals and budget."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes! Our monthly plans make professional web design affordable for any business. We also offer custom payment arrangements for larger projects. Contact us to discuss options that work for your budget."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We work with all types of businesses but have particular expertise in legal services, healthcare/dental, home services (HVAC, plumbing), restaurants, and professional services. We understand the unique needs of each industry."
    },
    {
      question: "How do I get started?",
      answer: "Simply contact us for a free consultation! We'll discuss your goals, provide a custom strategy, and give you a detailed proposal. There's no obligation, and you'll walk away with valuable insights about your online presence."
    }
  ];

  return (
    <section className="section-padding bg-white/5 border-y border-white/10">
      <div className="max-w-container container-padding mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-500/20 border border-electric-500/30 rounded-full text-electric-300 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Got questions? We have answers</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Frequently <span className="gradient-text">asked questions</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            We've answered the most common questions about our services, pricing, and process. 
            Don't see your question? Contact us and we'll be happy to help.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-electric-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-electric-400" />
                    )}
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-white/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/80 mb-6">
              We're here to help! Schedule a free consultation and we'll answer 
              all your questions while providing valuable insights about your online presence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-brand text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Schedule Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
              >
                Call (973) 555-0123
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
