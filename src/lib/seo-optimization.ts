// SEO Optimization utilities and schema markup

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: any;
}

// Generate comprehensive schema markup for local business
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://devority.com/#organization",
    "name": "Devority",
    "alternateName": "Devority Web Design & AI Solutions",
    "description": "Professional web design and AI solutions for New Jersey businesses. Custom websites that convert visitors into customers.",
    "url": "https://devority.com",
    "logo": "https://devority.com/images/logo.png",
    "image": "https://devority.com/images/devority-office.jpg",
    "telephone": "(973) 555-0123",
    "email": "hello@devority.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Sparta",
      "addressRegion": "NJ",
      "postalCode": "07871",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.0348",
      "longitude": "-74.6396"
    },
    "openingHours": [
      "Mo-Fr 09:00-17:00"
    ],
    "priceRange": "$179-$499",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Check, Bank Transfer",
    "areaServed": [
      {
        "@type": "State",
        "name": "New Jersey"
      },
      {
        "@type": "City",
        "name": "Sparta"
      },
      {
        "@type": "City",
        "name": "Newton"
      },
      {
        "@type": "City",
        "name": "Morristown"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "41.0348",
        "longitude": "-74.6396"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Design & AI Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Design & Development",
            "description": "Custom website design and development services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Solutions & Chatbots",
            "description": "AI-powered chatbots and automation solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Services",
            "description": "Search engine optimization and local SEO"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Michael Johnson"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Devority transformed our law firm's online presence. We went from 2-3 leads per month to 15-20 qualified leads. The ROI has been incredible."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Dr. Sarah Bella"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "The automated booking system has been a game-changer. Our no-show rate dropped by 40% and we're consistently booked."
      }
    ],
    "sameAs": [
      "https://www.facebook.com/devority",
      "https://www.linkedin.com/company/devority",
      "https://twitter.com/devority"
    ]
  };
}

// Generate service-specific schema
export function generateServiceSchema(service: {
  name: string;
  description: string;
  price?: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Devority",
      "url": "https://devority.com"
    },
    "areaServed": {
      "@type": "State",
      "name": "New Jersey"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.name,
      "itemListElement": [
        {
          "@type": "Offer",
          "price": service.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "validFrom": new Date().toISOString(),
          "itemOffered": {
            "@type": "Service",
            "name": service.name,
            "description": service.description
          }
        }
      ]
    }
  };
}

// Generate FAQ schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Generate article schema for blog posts
export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image || "https://devority.com/images/blog-default.jpg",
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": "https://devority.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Devority",
      "logo": {
        "@type": "ImageObject",
        "url": "https://devority.com/images/logo.png"
      }
    },
    "datePublished": article.publishedDate,
    "dateModified": article.modifiedDate || article.publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

// SEO optimization utilities
export class SEOOptimizer {
  static generateMetaTags(seoData: SEOData) {
    const baseUrl = 'https://devority.com';
    
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords?.join(', '),
      canonical: seoData.canonicalUrl || baseUrl,
      openGraph: {
        title: seoData.title,
        description: seoData.description,
        url: seoData.canonicalUrl || baseUrl,
        siteName: 'Devority',
        images: [
          {
            url: seoData.ogImage || `${baseUrl}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: seoData.title,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        handle: '@devority',
        site: '@devority',
        cardType: 'summary_large_image',
      },
    };
  }

  static generateLocalSEOTags() {
    return {
      'geo.region': 'US-NJ',
      'geo.placename': 'Sparta',
      'geo.position': '41.0348;-74.6396',
      'ICBM': '41.0348, -74.6396',
      'DC.title': 'Devority - Web Design & AI Solutions in Sparta, NJ',
    };
  }

  static optimizeImageAlt(filename: string, context?: string): string {
    // Generate descriptive alt text based on filename and context
    const baseName = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
    const contextPrefix = context ? `${context} - ` : '';
    return `${contextPrefix}${baseName}`.toLowerCase();
  }

  static generateCanonicalUrl(path: string): string {
    const baseUrl = 'https://devority.com';
    return `${baseUrl}${path}`;
  }

  static validateSEOData(seoData: SEOData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!seoData.title || seoData.title.length < 30 || seoData.title.length > 60) {
      errors.push('Title should be between 30-60 characters');
    }

    if (!seoData.description || seoData.description.length < 120 || seoData.description.length > 160) {
      errors.push('Description should be between 120-160 characters');
    }

    if (seoData.keywords && seoData.keywords.length > 10) {
      errors.push('Too many keywords (max 10 recommended)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
