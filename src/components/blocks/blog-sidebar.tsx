'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const categories = [
  { name: 'AI & Tech', href: '/blog/category/ai-tech', count: 12 },
  { name: 'SEO & Marketing', href: '/blog/category/seo-marketing', count: 8 },
  { name: 'Web Design', href: '/blog/category/web-design', count: 15 },
  { name: 'Business Growth', href: '/blog/category/business-growth', count: 6 },
  { name: 'Performance', href: '/blog/category/performance', count: 9 },
  { name: 'Automation', href: '/blog/category/automation', count: 7 },
  { name: 'Case Studies', href: '/blog/category/case-studies', count: 4 },
  { name: 'Tutorials', href: '/blog/category/tutorials', count: 11 },
];

const recentPosts = [
  {
    title: 'AI-Powered Web Development: The Future is Here',
    href: '/blog/ai-powered-web-development',
    date: '15 Jan 2024',
  },
  {
    title: 'Local SEO Strategies That Actually Work',
    href: '/blog/local-seo-strategies',
    date: '8 Jan 2024',
  },
  {
    title: 'Building High-Converting Landing Pages',
    href: '/blog/high-converting-landing-pages',
    date: '2 Jan 2024',
  },
];

export function BlogSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('space-y-8', className)}>
      {/* Categories */}
      <div className="glass-card rounded-2xl border border-electric-500/20 p-6 shadow-lg shadow-electric-500/10">
        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={category.href}
                className="flex items-center justify-between text-white/70 hover:text-electric-400 transition-colors duration-200 group"
              >
                <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                  {category.name}
                </span>
                <span className="text-xs bg-electric-500/20 text-electric-400 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="glass-card rounded-2xl border border-electric-500/20 p-6 shadow-lg shadow-electric-500/10">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Posts</h3>
        <ul className="space-y-4">
          {recentPosts.map((post, index) => (
            <li key={index}>
              <Link
                href={post.href}
                className="block group"
              >
                <h4 className="text-sm font-medium text-white/90 group-hover:text-electric-400 transition-colors duration-200 line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <p className="text-xs text-white/60">{post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter Signup */}
      <div className="glass-card rounded-2xl border border-electric-500/20 p-6 shadow-lg shadow-electric-500/10">
        <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
        <p className="text-sm text-white/70 mb-4">
          Get the latest insights delivered to your inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 bg-white/5 border border-electric-500/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-electric-400 transition-colors"
          />
          <button className="w-full bg-electric-500 hover:bg-electric-400 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </aside>
  );
}
