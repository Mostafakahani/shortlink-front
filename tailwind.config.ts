import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'code-1': {
          '0%': { opacity: '0' },
          '2.5%': { opacity: '1' },
          '97.5%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'code-2': {
          '16.2%': { opacity: '0' },
          '18.75%': { opacity: '1' },
          '97.5%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'code-3': {
          '32.5%': { opacity: '0' },
          '35%': { opacity: '1' },
          '97.5%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'code-4': {
          '48.75%': { opacity: '0' },
          '51.25%': { opacity: '1' },
          '97.5%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'code-5': {
          '65%': { opacity: '0' },
          '72.5%': { opacity: '1' },
          '97.5%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'code-6': {
          '81.25%': { opacity: '0' },
          '83.75%': { opacity: '1' },
          '97.5%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        breath: {
          '0%, 100%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5%)' },
        },
        line: {
          '0%, 100%': { left: '0', opacity: '0' },
          '50%': { left: '100%', transform: 'translateX(-100%)' },
          '10%, 40%, 60%, 90%': { opacity: '0' },
          '25%, 75%': { opacity: '1' },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
