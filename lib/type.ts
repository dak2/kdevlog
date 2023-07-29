export type MdPost = {
  id: string;
  title: string;
  date: string;
  categories: string;
  content: string;
};

export type Post = {
  id: string;
  createdAt: string;
  updatedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export const LanguageTypes = [
  { lang: 'javascript' },
  { lang: 'typescript' },
  { lang: 'ruby' },
  { lang: 'rust' },
  { lang: 'deno' },
  { lang: 'go' },
];
