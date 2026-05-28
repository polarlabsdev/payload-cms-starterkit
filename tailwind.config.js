import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  plugins: [
    tailwindcssAnimate,
    typography,
    function ({ addUtilities }) {
      const newUtilities = {
        '.autofill-transparent': {
          '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 1000px transparent inset !important',
            '-webkit-text-fill-color': 'hsl(var(--foreground)) !important',
            color: 'hsl(var(--foreground)) !important',
            'background-color': 'transparent !important',
            transition: 'background-color 5000s ease-in-out 0s, -webkit-text-fill-color 0s',
          },
          '&:-webkit-autofill:hover': {
            '-webkit-box-shadow': '0 0 0 1000px transparent inset !important',
            '-webkit-text-fill-color': 'hsl(var(--foreground)) !important',
            color: 'hsl(var(--foreground)) !important',
            'background-color': 'transparent !important',
          },
          '&:-webkit-autofill:focus': {
            '-webkit-box-shadow': '0 0 0 1000px transparent inset !important',
            '-webkit-text-fill-color': 'hsl(var(--foreground)) !important',
            color: 'hsl(var(--foreground)) !important',
            'background-color': 'transparent !important',
          },
          '&:-webkit-autofill:active': {
            '-webkit-box-shadow': '0 0 0 1000px transparent inset !important',
            '-webkit-text-fill-color': 'hsl(var(--foreground)) !important',
            color: 'hsl(var(--foreground)) !important',
            'background-color': 'transparent !important',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
  darkMode: ['selector', '[data-theme="dark"]', '.dark', 'class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px', // Used by useIsMobile hook for mobile detection, update use-mobile.ts if this changes
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2200px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--muted-foreground))',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-lead': 'hsl(var(--muted-foreground))',
            '--tw-prose-links': 'hsl(var(--foreground))',
            '--tw-prose-bold': 'hsl(var(--foreground))',
            '--tw-prose-counters': 'hsl(var(--muted-foreground))',
            '--tw-prose-bullets': 'hsl(var(--muted-foreground))',
            '--tw-prose-hr': 'hsl(var(--border))',
            '--tw-prose-quotes': 'hsl(var(--muted-foreground))',
            '--tw-prose-quote-borders': 'hsl(var(--border))',
            '--tw-prose-captions': 'hsl(var(--muted-foreground))',
            '--tw-prose-kbd': 'hsl(var(--foreground))',
            '--tw-prose-kbd-shadows': 'hsl(var(--muted))',
            '--tw-prose-code': 'hsl(var(--foreground))',
            '--tw-prose-pre-code': 'hsl(var(--foreground))',
            '--tw-prose-pre-bg': 'hsl(var(--muted))',
            '--tw-prose-th-borders': 'hsl(var(--border))',
            '--tw-prose-td-borders': 'hsl(var(--border))',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        body: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        header: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: 'var(--radius) + 2px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xs: 'calc(var(--radius) - 6px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        dark: {
          DEFAULT: 'hsl(var(--dark))',
          foreground: 'hsl(var(--dark-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
};

export default config;
