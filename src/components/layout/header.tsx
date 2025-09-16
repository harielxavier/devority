'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Services', href: '/#services' },
  { name: 'Industries', href: '/#services' }, // Industries are covered in the services section
  { name: 'Work', href: '/#work' },
  { name: 'Process', href: '/#process' },
  { name: 'About', href: '/#about' },
  { name: 'Blog', href: '/#blog' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showAdminLink = searchParams?.get('admin') === '1';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-midnight/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-container container-padding mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-electric-400'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/#pricing"
              className="text-sm font-medium text-sunset-400 hover:text-sunset-300 transition-colors duration-200"
            >
              Pricing
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {showAdminLink && (
              <Link href="/admin" className="text-xs text-white/60 hover:text-white">Admin</Link>
            )}
            <Button href="/contact" variant="primary">
              Get a Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-white/80 hover:text-white transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="glass-card mt-4 p-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block text-base font-medium transition-colors duration-200 ${
                      pathname === item.href
                        ? 'text-electric-400'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/#pricing"
                  className="block text-base font-medium text-sunset-400 hover:text-sunset-300 transition-colors duration-200"
                >
                  Pricing
                </Link>
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <Button href="/contact" variant="primary" className="w-full">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold">Get Free Strategy Call</span>
                      <span className="text-xs opacity-75">($500 value)</span>
                    </div>
                  </Button>
                  <Button href="tel:+19738234567" variant="secondary" className="w-full">
                    📞 Call Now: (973) 823-4567
                  </Button>
                  <div className="text-center text-xs text-white/60 pt-2">
                    🕒 Same-day response guaranteed
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
