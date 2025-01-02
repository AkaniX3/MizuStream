/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Scans all files in src folder
    './public/index.html',         // Scans your index.html file
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
