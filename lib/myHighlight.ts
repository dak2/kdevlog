import hljs from 'highlight.js/lib/core';
import { RegistLanguages } from '../lib/const';

export const registLanguage = (language: string) => {
  if (RegistLanguages.includes(language)) {
    hljs.registerLanguage(
      `${language}`,
      require(`highlight.js/lib/languages/${language}`),
    );
  } else {
    return false;
  }
};

export default hljs;
