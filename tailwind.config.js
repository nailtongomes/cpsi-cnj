/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jus-blue': '#1e3a8a',
        'jus-green': '#16a34a',
        'jus-orange': '#ea580c',
        'jus-gray': '#64748b'
      }
    },
  },
  plugins: [],
}