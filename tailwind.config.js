/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'homepage-areas': "url('/homepage_areas.jpg')",
        "homepage-categories": "url('/homepage_categories.jpg')"
      },
      colors: {
        primary: '#FFA458',
        secondary: '#BA3B0A'
      }
    },
  },
  plugins: [],
}
