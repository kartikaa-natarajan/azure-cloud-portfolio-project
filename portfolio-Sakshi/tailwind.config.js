/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#faf8ff',
          100: '#f3ebff',
          200: '#e8d8fe',
          300: '#d5bbfd',
          400: '#bc92f9',
          500: '#9d63f2',
          600: '#8338ec',
          700: '#6f26d2',
          800: '#5a20aa',
          900: '#491c88',
          950: '#2d0959',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}


