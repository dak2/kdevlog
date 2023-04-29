module.exports = {
  purge: [
    './components/**/*.tsx',
    './pages/**/*.tsx',
    './public/**/*.html',
    './styles/*.scss',
  ],
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
