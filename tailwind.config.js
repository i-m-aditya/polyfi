const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    mode: 'all',
    content: ['./src/**/*.svelte', './src/**/*.html'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: colors
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [],
}
