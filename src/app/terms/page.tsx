import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Devority',
  description: 'Terms and conditions for using Devority services. Read our terms of service, acceptable use policy, and service agreements.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-midnight via-ink to-midnight">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">Terms of Service</h1>
        <p className="text-white/60 mb-12">Effective Date: January 2025</p>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-white/80 leading-relaxed">
              By accessing or using the services provided by Devority ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you do not have permission to access our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">2. Services Description</h2>
            <p className="text-white/80 mb-4">Devority provides the following services:</p>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>Website design and development</li>
              <li>Web application development</li>
              <li>Search engine optimization (SEO)</li>
              <li>AI solutions and automation</li>
              <li>Website maintenance and care plans</li>
              <li>Digital marketing services</li>
              <li>Related consulting and support services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">3. Client Responsibilities</h2>
            <p className="text-white/80 mb-4">As a client, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>Provide accurate and complete information as required for service delivery</li>
              <li>Provide timely feedback and approvals during project development</li>
              <li>Ensure all content provided does not infringe on third-party rights</li>
              <li>Maintain confidentiality of access credentials we provide</li>
              <li>Make timely payments according to agreed terms</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">4. Payment Terms</h2>
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">4.1 Pricing</h3>
            <p className="text-white/80 mb-4">
              All prices are in USD unless otherwise specified. Prices are subject to change with 30 days notice for ongoing services. Project-based pricing is fixed upon agreement unless scope changes are requested.
            </p>
            
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">4.2 Payment Schedule</h3>
            <ul className="list-disc list-inside space-y-2 text-white/80 mb-4">
              <li><strong>Projects:</strong> 50% deposit upon agreement, 50% upon completion</li>
              <li><strong>Maintenance Plans:</strong> Monthly in advance</li>
              <li><strong>SEO Services:</strong> Monthly in advance</li>
              <li><strong>Custom Terms:</strong> As specified in individual agreements</li>
            </ul>
            
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">4.3 Late Payments</h3>
            <p className="text-white/80">
              Payments not received within 15 days of the due date may result in service suspension. A late fee of 1.5% per month may be applied to overdue balances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">5. Intellectual Property Rights</h2>
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">5.1 Client Content</h3>
            <p className="text-white/80 mb-4">
              You retain all rights to content you provide. You grant us a license to use, modify, and display this content as necessary to provide our services.
            </p>
            
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">5.2 Deliverables</h3>
            <p className="text-white/80 mb-4">
              Upon full payment, you own all custom designs, code, and content we create specifically for you. We retain the right to display work in our portfolio unless otherwise agreed.
            </p>
            
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">5.3 Third-Party Components</h3>
            <p className="text-white/80">
              Some deliverables may include third-party components (libraries, frameworks, plugins) which remain subject to their original licenses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">6. Confidentiality</h2>
            <p className="text-white/80">
              Both parties agree to maintain confidentiality of any proprietary information shared during the course of service delivery. This obligation survives termination of services for a period of three years.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">7. Warranties and Disclaimers</h2>
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">7.1 Service Warranty</h3>
            <p className="text-white/80 mb-4">
              We warrant that services will be performed in a professional and workmanlike manner. We provide a 30-day warranty on code defects from the date of delivery.
            </p>
            
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">7.2 Disclaimers</h3>
            <p className="text-white/80">
              EXCEPT AS EXPRESSLY PROVIDED, SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. WE DO NOT GUARANTEE SPECIFIC RESULTS, RANKINGS, OR BUSINESS OUTCOMES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">8. Limitation of Liability</h2>
            <p className="text-white/80">
              IN NO EVENT SHALL DEVORITY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">9. Indemnification</h2>
            <p className="text-white/80">
              You agree to indemnify and hold harmless Devority, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including attorneys' fees) arising from your breach of these Terms, violation of laws, or infringement of third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">10. Termination</h2>
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">10.1 Termination by Either Party</h3>
            <p className="text-white/80 mb-4">
              Either party may terminate services with 30 days written notice. For project-based work, termination fees may apply as specified in the project agreement.
            </p>
            
            <h3 className="text-xl font-display font-bold mb-3 text-white/90">10.2 Immediate Termination</h3>
            <p className="text-white/80">
              We may terminate services immediately for non-payment, breach of terms, illegal activity, or behavior that harms our reputation or operations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">11. Refund Policy</h2>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li><strong>Deposits:</strong> Non-refundable unless we fail to deliver services</li>
              <li><strong>Monthly Services:</strong> Pro-rated refund for unused portion if we terminate</li>
              <li><strong>Completed Work:</strong> No refunds for completed and delivered work</li>
              <li><strong>Satisfaction Guarantee:</strong> As specified in individual service agreements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">12. Dispute Resolution</h2>
            <p className="text-white/80 mb-4">
              Any disputes arising from these Terms or our services shall first be addressed through good faith negotiation. If unresolved, disputes shall be settled through binding arbitration in accordance with the rules of the American Arbitration Association.
            </p>
            <p className="text-white/80">
              These Terms are governed by the laws of New Jersey, United States, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">13. Acceptable Use Policy</h2>
            <p className="text-white/80 mb-4">You agree not to use our services for:</p>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>Illegal activities or promotion of illegal activities</li>
              <li>Harassment, abuse, or harm to individuals or groups</li>
              <li>Distribution of malware or malicious code</li>
              <li>Infringement of intellectual property rights</li>
              <li>Spam or unsolicited commercial communications</li>
              <li>Activities that harm our systems or other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">14. Force Majeure</h2>
            <p className="text-white/80">
              Neither party shall be liable for delays or failures in performance resulting from acts beyond their reasonable control, including but not limited to acts of God, natural disasters, pandemic, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, or equipment failures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">15. Modifications to Terms</h2>
            <p className="text-white/80">
              We reserve the right to modify these Terms at any time. Material changes will be notified via email or website notice at least 30 days before taking effect. Continued use of services after changes constitutes acceptance of modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">16. Severability</h2>
            <p className="text-white/80">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">17. Entire Agreement</h2>
            <p className="text-white/80">
              These Terms, together with any individual service agreements, constitute the entire agreement between you and Devority regarding our services and supersede all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">18. Contact Information</h2>
            <p className="text-white/80 mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="glass-card p-6 space-y-2">
              <p className="text-white/80"><strong>Devority</strong></p>
              <p className="text-white/80">Sparta, NJ</p>
              <p className="text-white/80">Email: legal@devority.io</p>
              <p className="text-white/80">Phone: (973) 555-0100</p>
            </div>
          </section>

          <section className="border-t border-white/20 pt-8 mt-12">
            <p className="text-white/60 text-sm">
              By using Devority's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}