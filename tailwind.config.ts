import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'hsl(var(--color-surface) / <alpha-value>)',
          secondary: 'hsl(var(--color-surface-secondary) / <alpha-value>)',
          tertiary: 'hsl(var(--color-surface-tertiary) / <alpha-value>)',
          hover: 'hsl(var(--color-surface-hover) / <alpha-value>)',
          elevated: 'hsl(var(--color-surface-elevated) / <alpha-value>)',
        },
        text: {
          primary: 'hsl(var(--color-text-primary) / <alpha-value>)',
          secondary: 'hsl(var(--color-text-secondary) / <alpha-value>)',
          tertiary: 'hsl(var(--color-text-tertiary) / <alpha-value>)',
          disabled: 'hsl(var(--color-text-tertiary) / <alpha-value>)',
        },
        border: 'hsl(var(--color-border) / <alpha-value>)',
        brand: {
          DEFAULT: 'hsl(var(--color-brand) / <alpha-value>)',
          active: 'hsl(var(--color-brand-active) / <alpha-value>)',
          bg: 'hsl(var(--color-brand) / 0.12)',
          text: 'hsl(var(--color-brand-active) / <alpha-value>)',
        },
        'button-secondary': {
          DEFAULT: 'hsl(var(--color-button-secondary) / <alpha-value>)',
          foreground: 'hsl(var(--color-button-secondary-foreground) / <alpha-value>)',
          border: 'hsl(var(--color-button-secondary-border) / <alpha-value>)',
        },
        'button-tertiary': {
          DEFAULT: 'hsl(var(--color-button-tertiary) / <alpha-value>)',
          foreground: 'hsl(var(--color-button-tertiary-foreground) / <alpha-value>)',
          border: 'hsl(var(--color-button-tertiary-border) / <alpha-value>)',
        },
        streak: {
          DEFAULT: 'hsl(var(--color-streak) / <alpha-value>)',
          soft: 'hsl(var(--color-streak-soft) / <alpha-value>)',
          bg: 'hsl(var(--color-streak) / 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Young Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"Share Tech Mono"', 'ui-monospace', 'monospace'],
        figtree: ['Figtree', 'ui-sans-serif', 'sans-serif'],
        rubik: ['Rubik', 'ui-sans-serif', 'sans-serif'],
      },
      borderRadius: {
        '28': '28px',
      },
      animation: {
        wiggle: 'wiggle 1.4s ease-in-out infinite',
        'pulse-wiggle': 'pulse-wiggle 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'pulse-wiggle': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.55' },
          '50%': { transform: 'scale(1.08) rotate(2deg)', opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
