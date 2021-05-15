import hljs from 'highlight.js/lib/core';

export const registLanguage = (language: string) => {
  hljs.registerLanguage(
    `${language}`,
    require(`highlight.js/lib/languages/${language}`),
  );
};

export default hljs;
