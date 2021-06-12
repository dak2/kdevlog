import Layout from '../../components/molecules/Layout';
import { httpRequest } from '../../lib/api';
import { CMS_API_KEY, CMS_URL } from '../../lib/const';
import Head from 'next/head';
import { FormatedCreatedAt } from '../../components/atoms/Date';
import marked from 'marked';
import hljs, { registLanguage } from '../../lib/myHighlight';
import 'highlight.js/styles/ocean.css';
import { useEffect } from 'react';
import { PostType } from '../../lib/type';

type PropsType = {
  post: PostType;
};

const postDetail = (post: PostType) => {
  if (post.tags.length > 0) {
    registLanguage(post.tags[0].name.toLowerCase().replace(/\s+/g, ''));
  }
  useEffect(() => {
    hljs.initHighlighting();
    hljs.initHighlighting.called = false;
  });
  return (
    <Layout home={null}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className="text-3xl text-darkorange dark:text-yellow-300 font-extrabold	tracking-tighter my-4">
          {post.title}
        </h1>
        <div className="text-gray-400 dark:text-gray-200">
          <FormatedCreatedAt dateString={post.createdAt} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: marked(post.body) }} />
      </article>
    </Layout>
  );
};

const noPost = () => {
  <Layout home={null}>
    <h1 className="text-3xl font-extrabold	tracking-tighter my-4">
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
    return postDetail(post);
  } else {
    return noPost;
  }
}

export const getStaticPaths = async () => {
  const res = await httpRequest(CMS_URL, CMS_API_KEY);
  const contents = await res.contents;
  const paths = contents.map((content) => `${content.id}`);
  const newPaths = [];
  for (let path of paths) {
    newPaths.push({ params: { id: path } });
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
