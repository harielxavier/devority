import type { Config } from 'tailwindcss';

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A'
        },
        // NEW DEVORITY BRAND COLORS - Bold, Modern, Energetic

        // Deep Midnight - Primary Background & Text
        midnight: {
          DEFAULT: '#0A0A0A',
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#313131',
          950: '#0A0A0A',
        },

        // Electric Cyan - Primary Accent (buttons, links, CTAs)
        electric: {
          DEFAULT: '#00E5FF',
          50: '#f0fdff',
          100: '#ccfbff',
          200: '#99f6ff',
          300: '#5eecff',
          400: '#22d9ff',
          500: '#00E5FF',
          600: '#00b8d4',
          700: '#0091a7',
          800: '#0a7489',
          900: '#0e5f71',
          950: '#023d4d',
        },

        // Vibrant Magenta - Highlighting Important Elements
        magenta: {
          DEFAULT: '#FF0080',
          50: '#fef7ff',
          100: '#feeeff',
          200: '#fce7ff',
          300: '#f9d0ff',
          400: '#f3a8ff',
          500: '#FF0080',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },

        // Sunset Orange - Secondary Buttons & Alert States
        sunset: {
          DEFAULT: '#FF6B35',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#ff9142',
          500: '#FF6B35',
          600: '#ed4f0c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431a07',
        },

        // Royal Blue - Informational Elements & Secondary Navigation
        royal: {
          DEFAULT: '#0066FF',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0066FF',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'aurora': 'aurora 60s linear infinite',
        'skew-scroll': 'skew-scroll 20s linear infinite',
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        'skew-scroll': {
          '0%': {
            transform: 'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(0)',
          },
          '100%': {
            transform: 'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-100%)',
          },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5) translateZ(0)",
          },
          "100%": {
            opacity: "0.3",
            transform: "translate(-50%,-40%) scale(1) translateZ(0)",
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #00E5FF 0%, #FF0080 100%)',
        'gradient-brand-reverse': 'linear-gradient(135deg, #FF0080 0%, #00E5FF 100%)',
        'gradient-energy': 'linear-gradient(135deg, #FF0080 0%, #0066FF 50%, #00E5FF 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FF6B35 0%, #FF0080 100%)',
        'gradient-cool': 'linear-gradient(135deg, #00E5FF 0%, #0066FF 100%)',
        'gradient-midnight': 'linear-gradient(135deg, #0A0A0A 0%, #313131 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    addVariablesForColors,
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
