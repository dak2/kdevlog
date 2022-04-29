module.exports = {
  purge: [
    './components/**/*.tsx',
    './pages/**/*.tsx',
    './public/**/*.html',
    './styles/*.scss',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkgray: '#333333',
        darkorange: '#F36C21',
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
