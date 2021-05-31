// microCMS settings
export const CMS_API_KEY = {
  headers: { 'X-API-KEY': process.env.API_KEY as string },
};
export const CMS_URL = `https://kdevlog.microcms.io/api/v1/posts?offset=0&limit=5`;

// posts per page
export const PER_PAGE = 10;

// range of pagenation
export const range = (start, end) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

// regist language for apply hilightjs
export const RegistLanguages = [
  'ruby',
  'javascript',
  'typescript',
  'go',
  'rust',
  'c',
  'cpp',
  'shell',
];
