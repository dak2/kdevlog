import Layout from '../../components/molecules/Layout';
import { httpRequest } from '../../lib/api';
import { CMS_API_KEY, CMS_URL } from '../../lib/const';
import Head from 'next/head';
import { FormatedCreatedAt } from '../../components/atoms/Date';
import marked from 'marked';
import hljs, { registLanguage } from '../../lib/myHighlight';
import 'highlight.js/styles/ocean.css';
import { useEffect } from 'react';

marked.setOptions({
  gfm: true,
  breaks: true,
  silent: false,
});

export default function Post({ postData }) {
  registLanguage(postData.tags[0].name.toLowerCase().replace(/\s+/g, ''));
  useEffect(() => {
    hljs.initHighlighting();
    hljs.initHighlighting.called = false;
  });
  return (
    <Layout home={null}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="text-3xl font-extrabold	tracking-tighter my-4">
          {postData.title}
        </h1>
        <div className="text-gray-400">
          <FormatedCreatedAt dateString={postData.createdAt} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: marked(postData.body) }} />
      </article>
    </Layout>
  );
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
  const blog = await res;

  return {
    props: {
      postData: blog,
      revalidate: 60,
    },
  };
};
