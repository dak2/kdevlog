// TODO: change type name
export type Post = {
  id: string
  title: string
  updated_at: string
  published_at: string
  categories: string[]
  content: string
}

export type Tag = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
}

export const LanguageTypes = [
  { lang: 'javascript' },
  { lang: 'typescript' },
  { lang: 'ruby' },
  { lang: 'rust' },
  { lang: 'deno' },
  { lang: 'go' },
]
