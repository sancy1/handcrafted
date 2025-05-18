
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
    center: true,
    padding: '1rem',
  },
    extend: {
      colors: {
        // Handcrafted Haven brand colors
        primary: '#5e3a00',    // Earthy brown
        secondary: '#c69f73',  // Warm cream
        accent: '#8b5a2b',     // Wood tone
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-cardo)'],
      },
      boxShadow: {
        'artisan': '0 4px 14px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Optional: for prose content
  ],
}