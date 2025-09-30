import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

const navigation = {
  services: [
    { name: 'Websites', href: '/services/websites' },
    { name: 'Web Apps', href: '/services/web-apps' },
    { name: 'AI Solutions', href: '/services/ai-solutions' },
    { name: 'SEO & Local SEO', href: '/services/seo' },
    { name: 'Monthly Care Plans', href: '/services/care-plans' },
  ],
  industries: [
    { name: 'Attorneys', href: '/industries/attorneys' },
    { name: 'Dentists', href: '/industries/dentists' },
    { name: 'Trades', href: '/industries/trades' },
    { name: 'Restaurants', href: '/industries/restaurants' },
    { name: 'Nonprofits', href: '/industries/nonprofits' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Work', href: '/work' },
    { name: 'Process', href: '/process' },
    { name: 'Blog', href: '/blog' },
    { name: 'RSS', href: '/rss.xml' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin Sign In', href: '/admin/login' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-midnight border-t border-white/10">
      <div className="max-w-container container-padding mx-auto">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block">
                <Logo className="h-8 w-auto" />
              </Link>
              <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-sm">
                We design, build, and manage your website—so you can focus on your business.
                Premium websites with AI solutions for local businesses.
              </p>
              <div className="mt-6">
                <p className="text-sm font-medium text-white/80">Built in Sparta, NJ</p>
                <p className="text-sm text-white/60">Trusted nationwide</p>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Services
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Industries
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.industries.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Devority. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-white/60">
                Made with ❤️ in Sparta, New Jersey
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
