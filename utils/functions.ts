import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';
import { Post } from '../lib/type';
import { PER_PAGE } from '../lib/const';

export const getPosts = (perPage?: number) => {
  const postDirectory = join(process.cwd(), 'pages', 'contents');
  const fileNames = readdirSync(postDirectory);
  const posts: Post[] = fileNames.map((fileName) => {
    const fullPath = join(postDirectory, fileName);
    const fileContents = readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id: fileName.replace(/\.md$/, ''),
      title: data.title,
      updated_at: data.updated_at,
      published_at: data.published_at,
      categories: (data.categories || '').split(','),
      content,
    };
  });

  const sortedPosts = posts.sort((a, b) => {
    return a.published_at < b.published_at ? 1 : -1;
  });

  return perPage ? sortedPosts.slice(0, perPage) : sortedPosts;
};

export const getPostsDataByCategory = (category: string) => {
  const posts = getPosts(PER_PAGE);
  return posts.filter((post) => {
    return post.categories.includes(category);
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
    categories: (data.categories || '').split(','),
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

export const range = (start, end) =>
  [...Array(end - start + 1)].map((_, i) => start + i);
