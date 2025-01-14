/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all files in the src folder for Tailwind classes
    "./public/index.html",        // Include the main HTML file
  ],
  theme: {
    extend: {}, // Extend the default theme here
  },
  plugins: [], // Add plugins if needed
};
