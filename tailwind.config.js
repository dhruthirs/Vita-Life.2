/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-red': '#DC2626',
        'medical-gray': '#F3F4F6',
      },
      fontFamily: {
        'sans': ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
