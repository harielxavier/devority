'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Facebook Pixel
export function FacebookPixel() {
  useEffect(() => {
    // Initialize Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('init', process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID);
      (window as any).fbq('track', 'PageView');
    }
  }, []);

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || 'YOUR_PIXEL_ID'}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || 'YOUR_PIXEL_ID'}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Google Analytics 4
export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {
                'custom_parameter_1': 'lead_source',
                'custom_parameter_2': 'industry_type'
              }
            });
            
            // Enhanced Ecommerce Setup
            gtag('config', '${GA_MEASUREMENT_ID}', {
              custom_map: {
                'custom_parameter_1': 'service_type',
                'custom_parameter_2': 'lead_value'
              }
            });
          `,
        }}
      />
    </>
  );
}

// Google Tag Manager
export function GoogleTagManager() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

// LinkedIn Insight Tag
export function LinkedInInsight() {
  const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || 'XXXXXXX';

  return (
    <Script
      id="linkedin-insight"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
        `,
      }}
    />
  );
}

// Conversion Tracking Functions
export const trackConversion = {
  // Form Submission
  formSubmit: (formType: string, leadValue?: number) => {
    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: formType,
        value: leadValue || 500,
        currency: 'USD'
      });
    }

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'Lead Generation',
        event_label: formType,
        value: leadValue || 500,
        currency: 'USD'
      });
    }

    // LinkedIn
    if (typeof window !== 'undefined' && (window as any).lintrk) {
      (window as any).lintrk('track', { conversion_id: 'XXXXXXX' });
    }
  },

  // Phone Call
  phoneCall: (source: string) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_name: 'Phone Call',
        content_category: source
      });
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'phone_call', {
        event_category: 'Contact',
        event_label: source
      });
    }
  },

  // Page View with Custom Data
  pageView: (pageName: string, industry?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: pageName,
        custom_parameter_1: 'organic',
        custom_parameter_2: industry || 'general'
      });
    }
  },

  // ROI Calculator Completion
  roiCalculator: (industry: string, projectedValue: number) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'CompleteRegistration', {
        content_name: 'ROI Calculator',
        content_category: industry,
        value: projectedValue,
        currency: 'USD'
      });
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'roi_calculator_complete', {
        event_category: 'Engagement',
        event_label: industry,
        value: projectedValue
      });
    }
  },

  // Chat Widget Interaction
  chatInteraction: (stage: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'chat_interaction', {
        event_category: 'Engagement',
        event_label: stage
      });
    }
  },

  // Video Play
  videoPlay: (videoName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'video_play', {
        event_category: 'Engagement',
        event_label: videoName
      });
    }
  }
};

// Main Tracking Component
export function TrackingPixels() {
  useEffect(() => {
    // Facebook Custom Audiences
    if (typeof window !== 'undefined' && (window as any).fbq) {
      // Website visitors
      (window as any).fbq('track', 'PageView');
      
      // Industry-specific audiences
      const currentPath = window.location.pathname;
      if (currentPath.includes('/attorneys')) {
        (window as any).fbq('trackCustom', 'AttorneyPageView');
      } else if (currentPath.includes('/dentists')) {
        (window as any).fbq('trackCustom', 'DentistPageView');
      }
    }

    // Google Analytics Custom Dimensions
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        custom_map: {
          'custom_parameter_1': 'visitor_type',
          'custom_parameter_2': 'industry_interest'
        }
      });
    }
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <GoogleTagManager />
      <FacebookPixel />
      <LinkedInInsight />
    </>
  );
}
