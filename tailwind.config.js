/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      container: {
        sm: '480px',
        lg: '1024px'
      },
      fontFamily: {
        'sans': 'Inter',
    },
    },
  },
  plugins: [],
}