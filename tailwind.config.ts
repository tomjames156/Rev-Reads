/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        bodoni: ['var(--font-bodoni)'],
      },
      colors: {
        'brand': {
          brown: '#8B4513',
          green: '#4C7E43',
          'brown-light': '#A67B5B',
          'green-light': '#6BA45D',
          'brown-dark': '#5C2E0E',
          'green-dark': '#2E4C28',
        }
      },
    },
  },
  plugins: [],
}
