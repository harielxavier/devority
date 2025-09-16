import { env } from './env'

// Google Analytics
export const GA_TRACKING_ID = env.NEXT_PUBLIC_GA_ID

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    })
  }
}

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom analytics tracking
export const trackEvent = async (eventData: {
  event: string
  page?: string
  data?: any
}) => {
  try {
    // Track to our own analytics endpoint
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...eventData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    })
  } catch (error) {
    console.error('Analytics tracking failed:', error)
  }
}

// Common event tracking functions
export const analytics = {
  // Form submissions
  formSubmit: (formName: string, data?: any) => {
    event({
      action: 'form_submit',
      category: 'engagement',
      label: formName,
    })
    trackEvent({
      event: 'form_submit',
      page: window.location.pathname,
      data: { formName, ...data },
    })
  },

  // Button clicks
  buttonClick: (buttonName: string, location?: string) => {
    event({
      action: 'button_click',
      category: 'engagement',
      label: buttonName,
    })
    trackEvent({
      event: 'button_click',
      page: window.location.pathname,
      data: { buttonName, location },
    })
  },

  // Page views
  pageView: (page: string) => {
    pageview(page)
    trackEvent({
      event: 'page_view',
      page,
    })
  },

  // Scroll depth
  scrollDepth: (depth: number) => {
    event({
      action: 'scroll_depth',
      category: 'engagement',
      value: depth,
    })
  },

  // Time on page
  timeOnPage: (seconds: number) => {
    event({
      action: 'time_on_page',
      category: 'engagement',
      value: seconds,
    })
  },
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: any
    ) => void
  }
}
