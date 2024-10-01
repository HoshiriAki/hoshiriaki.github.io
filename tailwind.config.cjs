/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}'],
  darkMode: 'class', // allows toggling dark mode manually
  theme: {
    extend: {
      fontFamily: {
        mono: ['FiraCode', 'monospace'],
        sans: [
          'Harmony_Regular',
          'Roboto',
          'sans-serif',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
