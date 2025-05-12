import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'work-sans': ['var(--font-work-sans)', 'sans-serif'],
        'poppins': ['var(--font-poppins)', 'sans-serif'],
        'lato': ['var(--font-lato)', 'sans-serif'],
        'manrope': ['var(--font-manrope)', 'sans-serif'],
      },
      fontSize: {
        // Custom font size system
        'heading-mobile': ['40px', { lineHeight: '1.2' }],
        'heading-desktop': ['54px', { lineHeight: '1.2' }],
        'subheading-mobile': ['18px', { lineHeight: '1.5' }],
        'subheading-desktop': ['20px', { lineHeight: '1.5' }],
        'body-primary': ['18px', { lineHeight: '1.6' }],
        'body-secondary': ['14px', { lineHeight: '1.6' }],
        'title-primary': ['40px', { lineHeight: '1.3' }],
        'title-secondary': ['18px', { lineHeight: '1.4' }],
        'title-sm': ['16px', { lineHeight: '1.4' }],
        'body-heading': ['24px', { lineHeight: '1.4' }],
        'nav': ['16px', { lineHeight: '1.4', letterSpacing: '0.5px' }],
      },
      colors: {
        // Design system colors
        'home': 'var(--color-home)',
        'text-primary': 'var(--color-text-primary)',
        'text-on-accent': 'var(--color-text-on-accent)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-secondary-accent': 'var(--color-text-secondary-accent)',
        'text-body-secondary': 'var(--color-text-body-secondary)',
        'text-body-stroke': 'var(--color-text-body-stroke)',
        
        // Background colors
        'bg-card': 'var(--color-bg-card)',
        'bg-date-card': 'var(--color-bg-date-card)',
        'bg-card-active': 'var(--color-bg-card-active)',
        'bg-accent': 'var(--color-bg-accent)',
        'hero-bg-accent': 'var(--color-hero-bg-accent)',
        
        // Border and stroke colors
        'card-stroke-primary': 'var(--color-card-stroke-primary)',
        'card-active-stroke': 'var(--color-card-active-stroke)',
        'card-hero-stroke': 'var(--color-card-hero-stroke)',
        'avatar-card-stroke': 'var(--color-avatar-card-stroke)',
        'divider-stroke': 'var(--color-divider-stroke)',
        
        // Avatar colors
        'avatar-card-bg': 'var(--color-avatar-card-bg)',
        
        // Additional colors used in globals.css
        'white-100': '#FFFFFF',
        'primary': '#F7FDEF',
        'primary-100': '#DAEFC1',
        'secondary': '#FBE843', 
        'black-100': '#333333',
        'black-200': '#1A1A1A',
        'black-300': '#7D8087',
        'zinc-400': '#A1A1AA',
      },
      boxShadow: {
        'card': '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
        '100': '4px 4px 0px 0px #000',
        '200': '8px 8px 0px 0px #000',
        '300': '12px 12px 0px 0px #000',
      },
      screens: {
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  safelist: [
    'text-white-100/80',
    'bg-primary',
    'bg-secondary',
    'bg-primary-100',
    // Add text sizing classes to safelist to ensure they're always available
    'text-heading-mobile',
    'text-heading-desktop',
    'text-subheading-mobile',
    'text-subheading-desktop',
    'text-body-primary',
    'text-body-secondary',
    'text-title-primary',
    'text-title-secondary',
    'text-title-sm',
    'text-body-heading',
    'text-nav',
  ],
  plugins: [typography],
}

export default config;