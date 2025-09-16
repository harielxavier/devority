'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';

const integrations = [
  {
    category: 'CRM & Sales',
    tools: [
      { name: 'HubSpot', logo: '/logos/hubspot.svg', description: 'Complete CRM integration' },
      { name: 'Salesforce', logo: '/logos/salesforce.svg', description: 'Enterprise sales platform' },
      { name: 'Pipedrive', logo: '/logos/pipedrive.svg', description: 'Sales pipeline management' },
      { name: 'Zoho CRM', logo: '/logos/zoho.svg', description: 'Business suite integration' }
    ]
  },
  {
    category: 'Communication',
    tools: [
      { name: 'Twilio', logo: '/logos/twilio.svg', description: 'SMS and voice messaging' },
      { name: 'Mailchimp', logo: '/logos/mailchimp.svg', description: 'Email marketing automation' },
      { name: 'SendGrid', logo: '/logos/sendgrid.svg', description: 'Transactional emails' },
      { name: 'Slack', logo: '/logos/slack.svg', description: 'Team notifications' }
    ]
  },
  {
    category: 'Scheduling & Calendar',
    tools: [
      { name: 'Calendly', logo: '/logos/calendly.svg', description: 'Appointment scheduling' },
      { name: 'Acuity', logo: '/logos/acuity.svg', description: 'Advanced booking system' },
      { name: 'Google Calendar', logo: '/logos/google-calendar.svg', description: 'Calendar synchronization' },
      { name: 'Outlook', logo: '/logos/outlook.svg', description: 'Microsoft calendar integration' }
    ]
  },
  {
    category: 'Industry-Specific',
    tools: [
      { name: 'Clio', logo: '/logos/clio.svg', description: 'Legal practice management' },
      { name: 'Dentrix', logo: '/logos/dentrix.svg', description: 'Dental practice software' },
      { name: 'ServiceTitan', logo: '/logos/servicetitan.svg', description: 'Field service management' },
      { name: 'Toast', logo: '/logos/toast.svg', description: 'Restaurant POS system' }
    ]
  },
  {
    category: 'Analytics & Reporting',
    tools: [
      { name: 'Google Analytics', logo: '/logos/google-analytics.svg', description: 'Web analytics' },
      { name: 'Mixpanel', logo: '/logos/mixpanel.svg', description: 'Event tracking' },
      { name: 'Tableau', logo: '/logos/tableau.svg', description: 'Data visualization' },
      { name: 'Power BI', logo: '/logos/powerbi.svg', description: 'Business intelligence' }
    ]
  },
  {
    category: 'Payment & E-commerce',
    tools: [
      { name: 'Stripe', logo: '/logos/stripe.svg', description: 'Payment processing' },
      { name: 'PayPal', logo: '/logos/paypal.svg', description: 'Online payments' },
      { name: 'Shopify', logo: '/logos/shopify.svg', description: 'E-commerce platform' },
      { name: 'WooCommerce', logo: '/logos/woocommerce.svg', description: 'WordPress e-commerce' }
    ]
  }
];

const integrationBenefits = [
  {
    title: 'Seamless Data Flow',
    description: 'Information flows automatically between your existing tools and AI systems',
    icon: '🔄'
  },
  {
    title: 'No Disruption',
    description: 'Keep using the tools you love while adding AI capabilities',
    icon: '⚡'
  },
  {
    title: 'Single Dashboard',
    description: 'Monitor all your AI automations from one central location',
    icon: '📊'
  },
  {
    title: 'Custom Workflows',
    description: 'Create unique automation workflows tailored to your business',
    icon: '🎯'
  }
];

export function AIIntegrations() {
  return (
    <section className="section-padding relative">
      <div className="max-w-container container-padding mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title text-white mb-6">
            Integrates with <span className="gradient-text">Your Existing Tools</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            Our AI solutions work seamlessly with the software you already use. 
            No need to change your workflow - we enhance it.
          </p>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {integrationBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-white/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration Categories */}
        <div className="space-y-12">
          {integrations.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-display font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-2 bg-electric-400 rounded-full mr-3"></span>
                {category.category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: toolIndex * 0.05 }}
                    viewport={{ once: true }}
                    className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <div className="w-8 h-8 bg-gradient-brand rounded flex items-center justify-center text-white font-bold text-sm">
                          {tool.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-electric-300 transition-colors">
                          {tool.name}
                        </h4>
                      </div>
                    </div>
                    <p className="text-sm text-white/70">{tool.description}</p>
                    <div className="mt-3 flex items-center text-xs text-electric-400">
                      <CheckIcon className="w-3 h-3 mr-1" />
                      Supported
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Integration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 glass-card p-8 lg:p-12 text-center"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Don't see your tool listed?
          </h3>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            We can integrate with virtually any software that has an API. 
            Our team will work with you to connect your existing tools with our AI solutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text mb-2">500+</div>
              <div className="text-white/80">Available Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text mb-2">24-48hrs</div>
              <div className="text-white/80">Custom Integration Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text mb-2">100%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary">
              Request Custom Integration
            </button>
            <button className="btn-secondary">
              View All Integrations
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
