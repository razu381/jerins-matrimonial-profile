/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        navy:  { DEFAULT: '#0b1426', 2: '#0f1e38' },
        gold:  { DEFAULT: '#c9a84c', 2: '#e8cc80', 3: '#f5e4a8' },
        rose:  '#c97b6a',
        cream: '#fdf6e3',
        ivory: '#f0e6cc',
        muted: '#a89070',
      },
      fontFamily: {
        amiri:    ['Amiri',           'serif'],
        playfair: ['Playfair Display','serif'],
        lato:     ['Lato',            'sans-serif'],
      },
    }
  },
  plugins: [],
}
