import hljs from 'highlight.js/lib/core';
import { RegistLanguages } from '../lib/const';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import go from 'highlight.js/lib/languages/go';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';

const languages = {
  javascript,
  typescript,
  go,
  ruby,
  rust,
};

export const registLanguage = (language: string) => {
  if (RegistLanguages.includes(language)) {
    const langModule = languages[language];

    if (langModule) {
      hljs.registerLanguage(language, langModule);
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default hljs;
