import Layout from '../../components/molecules/layout';
import Head from 'next/head';
import { FormatedDate } from '../../components/atoms/date';
import { marked } from 'marked';
import hljs from '../../lib/myHighlight';
import 'highlight.js/styles/base16/decaf.css';
import { useEffect } from 'react';
import { Post, MdPost } from '../../lib/type';
import { getPostData, getPostIds } from '../../utils/functions';

type Props = {
  post: MdPost;
};

marked.setOptions({
  mangle: false,
  headerIds: false,
});

const PostDetail = (post: MdPost) => {
  useEffect(() => {
    hljs.highlightAll();
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
        <div id="date" className="text-gray-200">
          <FormatedDate dateString={post.published_at} />
        </div>
        <div
          className="post-contents"
          dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        />
      </article>
    </Layout>
  );
};

const PostNotFound = () => {
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

export default function Post(props: Props) {
  const post = props.post;
  if (post) {
    return PostDetail(post);
  } else {
    return PostNotFound;
  }
}

export const getStaticPaths = async () => {
  return { paths: getPostIds(), fallback: false };
};

export const getStaticProps = async (context) => {
  return {
    props: {
      post: getPostData(context.params.id),
      revalidate: 60,
    },
  };
};
