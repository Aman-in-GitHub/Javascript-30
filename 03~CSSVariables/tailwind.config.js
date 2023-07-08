/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['*.html'],
  theme: {
    extend: {
      textColor: {
        change: {
          base: 'var(--base)'
        }
      }
    }
  },
  plugins: []
};
