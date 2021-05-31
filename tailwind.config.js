module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx', './public/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkgrey: '#374151',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const extendUnderline = {
        '.underline': {
          textDecoration: 'underline',
          'text-decoration-color': 'white',
        },
      };
      addUtilities(extendUnderline);
    },
  ],
};
