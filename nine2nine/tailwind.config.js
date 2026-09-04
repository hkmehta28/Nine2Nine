/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0c0b0a',
        charcoal: '#17140f',
        gold: '#c9a35a',
        'gold-bright': '#e8c579',
        wine: '#4a1420',
        ivory: '#f1e9d8',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}