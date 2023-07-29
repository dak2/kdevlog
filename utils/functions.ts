import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';
import { MdPost } from '../lib/type';

export const getPostsData = () => {
  const postDirectory = join(process.cwd(), 'pages', 'contents');
  const fileNames = readdirSync(postDirectory);
  const posts: MdPost[] = fileNames.map((fileName) => {
    const fullPath = join(postDirectory, fileName);
    const fileContents = readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id: fileName.replace(/\.md$/, ''),
      title: data.title,
      updated_at: data.updated_at,
      published_at: data.published_at,
      categories: data.categories,
      content,
    };
  });

  return posts.sort((a, b) => {
    return a.published_at < b.published_at ? 1 : -1;
  });
};

export const getPostData = (fileName: string) => {
  const postDirectory = join(process.cwd(), 'pages', 'contents');
  const fullPath = join(postDirectory, `${fileName}.md`);
  const fileContents = readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    id: fileName,
    title: data.title,
    updated_at: data.updated_at,
    published_at: data.published_at,
    categories: data.categories,
    content,
  };
};

export const getPostIds = () => {
  const postDirectory = join(process.cwd(), 'pages', 'contents');
  const fileNames = readdirSync(postDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
};
