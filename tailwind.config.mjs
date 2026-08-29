/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFB7B2',
          peach: '#FFDAC1',
          cream: '#FDFBF7',
          sky: '#BEE3F8',
          purple: '#E2D4F0',
          yellow: '#FFF3B0',
          dark: '#1A1523',
          coffee: '#3C2C26',
        },
        primary: 'var(--primary, #FFB7B2)',
      },
      boxShadow: {
        'pastel-glow': '0 10px 30px rgba(255, 183, 178, 0.35)',
        'pastel-sky': '0 10px 30px rgba(190, 227, 248, 0.35)',
        'polaroid': '0 8px 25px rgba(60, 44, 38, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
