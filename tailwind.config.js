/** @type {import('tailwindcss').Config} */
// WeWin Consulting Group design tokens — keep in sync with BRAND.md.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary: deep navy family
        ink: {
          DEFAULT: '#0B1B2E',
          900: '#0B1B2E',
          800: '#12263F',
          700: '#1B3354',
          600: '#2A4467',
        },
        // Accent: muted brass, used sparingly
        brass: {
          DEFAULT: '#A8834A',
          dark: '#7F6131',
          light: '#D8C29B',
          50: '#F6F0E5',
        },
        // Neutrals: warm paper tones
        paper: {
          DEFAULT: '#F7F5F0',
          dark: '#EEEAE1',
        },
        line: '#DDD7CB',
        muted: '#535D6B',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
        prose: '42rem',
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,27,46,0.04), 0 8px 24px -12px rgba(11,27,46,0.12)',
        lift: '0 2px 4px rgba(11,27,46,0.05), 0 18px 40px -16px rgba(11,27,46,0.22)',
      },
    },
  },
  plugins: [],
};
