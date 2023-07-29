// microCMS settings
export const CMS_API_KEY = {
  headers: { 'X-API-KEY': process.env.API_KEY as string },
};
export const CMS_URL = `https://kdevlog.microcms.io/api/v1/posts?offset=0&limit=10`;

// posts per page
export const PER_PAGE = 10;

// range of pagenation
export const range = (start, end) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

// regist language for apply hilightjs
export const RegistLanguages = {
  ruby: 'Ruby',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  go: 'Go',
  rust: 'Rust',
  c: 'C',
  cpp: 'CPP',
  python: 'Python',
  java: 'Java',
  elixir: 'Elixir',
  shell: 'Shell',
};

const flameWorks = {
  rubyonrails: 'Ruby on Rails',
  react: 'React',
  nextjs: 'Next.js',
  echo: 'Echo',
};

const infra = {
  aws: 'AWS',
  docker: 'Docker',
  kubernetes: 'Kubernetes',
  nginx: 'Nginx',
  linux: 'Linux',
};

const others = {
  github: 'GitHub',
  vim: 'Vim',
  vscode: 'VSCode',
  nodejs: 'Node.js',
  mysql: 'MySQL',
};

export const categories = {
  ...RegistLanguages,
  ...flameWorks,
  ...infra,
  ...others,
};
