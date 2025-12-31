/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./themes/dsa-theme/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./content/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
