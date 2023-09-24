// posts per page
export const PER_PAGE = 10;

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

const databases = {
  database: 'Database',
  mysql: 'MySQL',
  postgresql: 'PostgreSQL',
  redis: 'Redis',
  mongodb: 'MongoDB',
};

const others = {
  github: 'GitHub',
  vim: 'Vim',
  vscode: 'VSCode',
  nodejs: 'Node.js',
  book: 'Book',
  poem: 'Poem',
};

export const categories = {
  ...RegistLanguages,
  ...flameWorks,
  ...infra,
  ...databases,
  ...others,
};
