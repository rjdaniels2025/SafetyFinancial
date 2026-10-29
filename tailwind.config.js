/** @type {import('tailwindcss').Config} */
// WeWin Consulting Group design tokens (forest green, white and silver) — keep in sync with BRAND.md.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary: deep forest green
        ink: {
          DEFAULT: '#123A26',
          900: '#123A26',
          800: '#184A31',
          700: '#1F5A3C',
          600: '#2A6E4B',
        },
        // Accent: silver for lines, highlights and text on green;
        // `accent-dark` is a mid green for accent text on white backgrounds
        accent: {
          DEFAULT: '#7D8A84',
          dark: '#2A6E4B',
          light: '#D3D9D6',
          50: '#EEF3F0',
        },
        // Neutrals: clean white with cool silver-grey tints
        paper: {
          DEFAULT: '#F5F7F6',
          dark: '#E9EDEB',
        },
        line: '#D8DEDB',
        muted: '#56625C',
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
      transitionTimingFunction: {
        // Gentle, decelerating curve used for all brand motion
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,58,38,0.04), 0 8px 24px -12px rgba(18,58,38,0.12)',
        lift: '0 2px 4px rgba(18,58,38,0.05), 0 18px 40px -16px rgba(18,58,38,0.22)',
        float: '0 1px 2px rgba(18,58,38,0.04), 0 30px 60px -24px rgba(18,58,38,0.30)',
      },
    },
  },
  plugins: [],
};
