import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us - Get Your Free Website Audit | Devority',
  description: 'Ready to grow your business? Contact Devority for a free website audit and strategy session. Located in Sparta, NJ, serving all of New Jersey.',
  keywords: [
    'contact devority',
    'free website audit',
    'web design consultation',
    'sparta nj web design',
    'new jersey digital agency',
    'get quote website'
  ],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-500/10 via-transparent to-purple-500/10 animate-gradient" />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
              Let's Build Something <span className="text-gradient">Amazing</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Ready to transform your business? Get a free consultation and see how we can help you dominate your market.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </section>
    </main>
  );
}