import Layout from '../../components/molecules/layout';
import { httpRequest } from '../../lib/api';
import { CMS_API_KEY } from '../../lib/const';
import Head from 'next/head';
import { FormatedDate } from '../../components/atoms/date';
import marked from 'marked';
import hljs, { registLanguage } from '../../lib/myHighlight';
import 'highlight.js/styles/ocean.css';
import { useEffect } from 'react';
import { PostType, TagType, LanguageTypes } from '../../lib/type';

type PropsType = {
  post: PostType;
};

const PostDetail = (post: PostType) => {
  if (post.tags.length > 0) {
    registLanguage(postLang(post.tags));
  }
  useEffect(() => {
    hljs.highlightAll();
    hljs.highlightAll.called = false;
  });
  return (
    <Layout home={null}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article id="post-container">
        <h1
          id="post-title"
          className="my-4 text-3xl font-extrabold tracking-tighter"
        >
          {post.title}
        </h1>
        <div id="updated-at" className="text-gray-200">
          <FormatedDate dateString={post.updatedAt} />
        </div>
        <div
          className="post-contents"
          dangerouslySetInnerHTML={{ __html: marked(post.body) }}
        />
      </article>
    </Layout>
  );
};

const postLang = (tags: TagType[]): string => {
  let postLang = '';
  const tagNames = tags.map((tag) => tag.name);
  for (const langType of LanguageTypes) {
    postLang = tagNames.find((tag) => tag === langType.lang);
    if (postLang) break;
  }
  return postLang;
};

const noPost = () => {
  <Layout home={null}>
    <h1 className="my-4 text-3xl font-extrabold tracking-tighter">
      記事がありません。
    </h1>
  </Layout>;
};

marked.setOptions({
  gfm: true,
  breaks: true,
  silent: false,
});

export default function Post(props: PropsType) {
  const post = props.post;
  if (post) {
    return PostDetail(post);
  } else {
    return noPost;
  }
}

export const getStaticPaths = async () => {
  // TODO : リファクタリング
  const newPaths = [];
  const res = await httpRequest(
    `https://kdevlog.microcms.io/api/v1/posts?offset=0&limit=10`,
    CMS_API_KEY,
  );
  const contents = await res.contents;
  const paths = contents.map((content) => `${content.id}`);
  for (const path of paths) {
    newPaths.push({ params: { id: path } });
  }
  const count = Math.floor(res.totalCount / 10);
  if (count != 0) {
    let offset = 10;
    for (let i = 0; i < count; i++) {
      const res = await httpRequest(
        `https://kdevlog.microcms.io/api/v1/posts?offset=${offset}&limit=10`,
        CMS_API_KEY,
      );
      const contents = await res.contents;
      const paths = contents.map((content) => `${content.id}`);
      for (const path of paths) {
        newPaths.push({ params: { id: path } });
      }
      offset += 10;
    }
  }

  return { paths: newPaths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await httpRequest(
    `https://kdevlog.microcms.io/api/v1/posts/${id}`,
    CMS_API_KEY,
  );
  const content = await res;

  return {
    props: {
      post: content,
      revalidate: 60,
    },
  };
};
