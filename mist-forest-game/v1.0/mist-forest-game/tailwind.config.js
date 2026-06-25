/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-dark': '#0a0f0d',
        'forest-light': '#1a2622',
        'magic-purple': '#6b46c1',
        'magic-green': '#2f855a',
        'parchment': '#f4ebd8',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Songti SC"', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}