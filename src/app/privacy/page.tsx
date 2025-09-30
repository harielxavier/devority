import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Devority',
  description: 'Learn how Devority collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">Privacy Policy</h1>
        <p className="text-white/60 mb-12">Last updated: January 2025</p>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Overview</h2>
            <p className="text-white/80 leading-relaxed">
              Devority ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website devority.io and use our services. Please read this privacy policy carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">Personal Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2 text-white/80 mb-6">
              <li>Name and contact information (email address, phone number)</li>
              <li>Business information (company name, industry, website)</li>
              <li>Billing and payment information</li>
              <li>Communications you send to us</li>
              <li>Information provided through forms, surveys, or consultations</li>
            </ul>

            <h3 className="text-xl font-display font-bold mb-3 text-white/90">Information Automatically Collected</h3>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>IP address and browser information</li>
              <li>Device and operating system information</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website addresses</li>
              <li>Cookie and tracking technology data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">How We Use Your Information</h2>
            <p className="text-white/80 mb-4">We use collected information to:</p>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>Provide and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Send marketing and promotional communications (with consent)</li>
              <li>Improve our website and services</li>
              <li>Protect against fraudulent or illegal activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-white/80 mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">Types of Cookies We Use:</h3>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li><strong>Necessary Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Marketing Cookies:</strong> Used to track visitors across websites for advertising</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Data Sharing and Disclosure</h2>
            <p className="text-white/80 mb-4">We may share your information in the following situations:</p>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li><strong>Service Providers:</strong> With third parties who perform services on our behalf</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Consent:</strong> With your consent or at your direction</li>
            </ul>
            <p className="text-white/80 mt-4">
              We do not sell, rent, or trade your personal information to third parties for their promotional purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Data Security</h2>
            <p className="text-white/80">
              We implement appropriate technical and organizational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Data Retention</h2>
            <p className="text-white/80">
              We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including satisfying legal, accounting, or reporting requirements. The retention period depends on the nature of the information and the purposes for which it is processed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Your Privacy Rights</h2>
            <p className="text-white/80 mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
              <li><strong>Restriction:</strong> Request restriction of processing</li>
            </ul>
            <p className="text-white/80 mt-4">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">California Privacy Rights</h2>
            <p className="text-white/80">
              California residents have specific rights under the California Consumer Privacy Act (CCPA). These include the right to know what personal information is collected, used, shared, or sold, and the right to request deletion of personal information. We do not sell personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Children's Privacy</h2>
            <p className="text-white/80">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">International Data Transfers</h2>
            <p className="text-white/80">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws different from those in your country. We take appropriate safeguards to ensure your personal information remains protected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Third-Party Links</h2>
            <p className="text-white/80">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-white/80">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Contact Us</h2>
            <p className="text-white/80 mb-4">
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="glass-card p-6 space-y-2">
              <p className="text-white/80"><strong>Devority</strong></p>
              <p className="text-white/80">Sparta, NJ</p>
              <p className="text-white/80">Email: privacy@devority.io</p>
              <p className="text-white/80">Phone: (973) 555-0100</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}