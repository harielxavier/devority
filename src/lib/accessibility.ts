// Accessibility utilities for WCAG 2.2 AA compliance

export interface AccessibilityConfig {
  enableHighContrast: boolean;
  enableLargeText: boolean;
  enableReducedMotion: boolean;
  enableScreenReader: boolean;
}

// Color contrast utilities
export class ColorContrast {
  static calculateRatio(foreground: string, background: string): number {
    const getLuminance = (color: string): number => {
      // Convert hex to RGB
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;

      // Calculate relative luminance
      const sRGB = [r, g, b].map(c => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  static meetsWCAG(foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean {
    const ratio = this.calculateRatio(foreground, background);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }

  static getHighContrastColors() {
    return {
      background: '#000000',
      text: '#FFFFFF',
      primary: '#FFFF00',
      secondary: '#00FFFF',
      accent: '#FF00FF',
      border: '#FFFFFF',
      focus: '#FFFF00'
    };
  }
}

// Keyboard navigation utilities
export class KeyboardNavigation {
  static trapFocus(element: HTMLElement) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  }

  static addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
      border-radius: 4px;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

// Screen reader utilities
export class ScreenReader {
  static announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  static addAriaLabels() {
    // Add aria-labels to common elements that might be missing them
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach((button, index) => {
      if (!button.textContent?.trim()) {
        button.setAttribute('aria-label', `Button ${index + 1}`);
      }
    });

    const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
    links.forEach((link, index) => {
      if (!link.textContent?.trim()) {
        link.setAttribute('aria-label', `Link ${index + 1}`);
      }
    });
  }

  static addLandmarkRoles() {
    // Ensure proper landmark roles are present
    const header = document.querySelector('header');
    if (header && !header.getAttribute('role')) {
      header.setAttribute('role', 'banner');
    }

    const nav = document.querySelector('nav');
    if (nav && !nav.getAttribute('role')) {
      nav.setAttribute('role', 'navigation');
    }

    const main = document.querySelector('main');
    if (main && !main.getAttribute('role')) {
      main.setAttribute('role', 'main');
    }

    const footer = document.querySelector('footer');
    if (footer && !footer.getAttribute('role')) {
      footer.setAttribute('role', 'contentinfo');
    }
  }
}

// Motion and animation utilities
export class MotionAccessibility {
  static respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
      
      // Disable autoplay videos
      const videos = document.querySelectorAll('video[autoplay]');
      videos.forEach(video => {
        (video as HTMLVideoElement).removeAttribute('autoplay');
      });
    }

    return prefersReducedMotion.matches;
  }

  static addMotionToggle() {
    const toggle = document.createElement('button');
    toggle.textContent = 'Reduce Motion';
    toggle.className = 'motion-toggle';
    toggle.setAttribute('aria-label', 'Toggle reduced motion');
    
    let motionReduced = this.respectReducedMotion();
    
    toggle.addEventListener('click', () => {
      motionReduced = !motionReduced;
      
      if (motionReduced) {
        document.documentElement.classList.add('reduce-motion');
        toggle.textContent = 'Enable Motion';
      } else {
        document.documentElement.classList.remove('reduce-motion');
        toggle.textContent = 'Reduce Motion';
      }
      
      ScreenReader.announceToScreenReader(
        `Motion ${motionReduced ? 'reduced' : 'enabled'}`,
        'assertive'
      );
    });

    return toggle;
  }
}

// Form accessibility utilities
export class FormAccessibility {
  static enhanceFormAccessibility(form: HTMLFormElement) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      const label = form.querySelector(`label[for="${input.id}"]`);
      
      if (!label && !input.getAttribute('aria-label')) {
        console.warn('Input missing label:', input);
      }
      
      // Add required indicators
      if (input.hasAttribute('required')) {
        input.setAttribute('aria-required', 'true');
        
        if (label) {
          const requiredIndicator = document.createElement('span');
          requiredIndicator.textContent = ' *';
          requiredIndicator.setAttribute('aria-label', 'required');
          requiredIndicator.className = 'required-indicator';
          label.appendChild(requiredIndicator);
        }
      }
      
      // Add error handling
      input.addEventListener('invalid', (e) => {
        const target = e.target as HTMLInputElement;
        target.setAttribute('aria-invalid', 'true');
        
        let errorId = `${target.id}-error`;
        let errorElement = document.getElementById(errorId);
        
        if (!errorElement) {
          errorElement = document.createElement('div');
          errorElement.id = errorId;
          errorElement.className = 'error-message';
          errorElement.setAttribute('role', 'alert');
          target.parentNode?.insertBefore(errorElement, target.nextSibling);
        }
        
        errorElement.textContent = target.validationMessage;
        target.setAttribute('aria-describedby', errorId);
      });
      
      input.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.validity.valid) {
          target.removeAttribute('aria-invalid');
          const errorElement = document.getElementById(`${target.id}-error`);
          if (errorElement) {
            errorElement.remove();
          }
        }
      });
    });
  }
}

// Main accessibility initialization
export class AccessibilityManager {
  private config: AccessibilityConfig;

  constructor(config: Partial<AccessibilityConfig> = {}) {
    this.config = {
      enableHighContrast: false,
      enableLargeText: false,
      enableReducedMotion: false,
      enableScreenReader: true,
      ...config
    };
  }

  init() {
    // Add skip links
    KeyboardNavigation.addSkipLinks();
    
    // Enhance screen reader support
    if (this.config.enableScreenReader) {
      ScreenReader.addAriaLabels();
      ScreenReader.addLandmarkRoles();
    }
    
    // Handle reduced motion
    if (this.config.enableReducedMotion) {
      MotionAccessibility.respectReducedMotion();
    }
    
    // Enhance forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => FormAccessibility.enhanceFormAccessibility(form));
    
    // Add accessibility toolbar
    this.addAccessibilityToolbar();
  }

  private addAccessibilityToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'accessibility-toolbar';
    toolbar.setAttribute('role', 'toolbar');
    toolbar.setAttribute('aria-label', 'Accessibility options');
    
    // High contrast toggle
    const contrastToggle = document.createElement('button');
    contrastToggle.textContent = 'High Contrast';
    contrastToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('high-contrast');
      ScreenReader.announceToScreenReader('High contrast toggled');
    });
    
    // Large text toggle
    const textToggle = document.createElement('button');
    textToggle.textContent = 'Large Text';
    textToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('large-text');
      ScreenReader.announceToScreenReader('Large text toggled');
    });
    
    // Motion toggle
    const motionToggle = MotionAccessibility.addMotionToggle();
    
    toolbar.appendChild(contrastToggle);
    toolbar.appendChild(textToggle);
    toolbar.appendChild(motionToggle);
    
    document.body.appendChild(toolbar);
  }

  updateConfig(newConfig: Partial<AccessibilityConfig>) {
    this.config = { ...this.config, ...newConfig };
  }
}
