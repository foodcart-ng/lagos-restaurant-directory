/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdead5',
          200: '#fad1aa',
          300: '#f6b074',
          400: '#f0853c',
          500: '#ec6817',
          600: '#dd520d',
          700: '#b73e0e',
          800: '#923314',
          900: '#762b13',
          950: '#401309',
        },
      },
    },
  },
  plugins: [],
}