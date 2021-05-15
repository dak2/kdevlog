import Layout from '../../components/layout';
import { httpRequest } from '../../utils/api';
import { CMS_API_KEY, CMS_URL } from '../../utils/const';
import Head from 'next/head';
import { FormatedCreatedAt } from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import marked from 'marked';
import hljs, { matchLanguages } from '../../utils/my-highlight';
import 'highlight.js/styles/ocean.css';
import { useEffect } from 'react';

marked.setOptions({
  gfm: true,
  breaks: true,
  silent: false,
});

export default function Post({ postData }) {
  matchLanguages(postData.tags[0].name);
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
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
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
