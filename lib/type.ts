export type PostType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  tags: TagType[];
};

export type TagType = {
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
]
