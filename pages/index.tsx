import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { httpRequest } from '../lib/api';
import { CMS_API_KEY, CMS_URL } from '../lib/const';
import Link from 'next/link';
import { FormatedCreatedAt } from '../components/date';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {allPostsData.map(({ id, createdAt, title, tags }) => (
        <div className="mb-12">
          <Link href={`/posts/${id}`}>
            <h2 className="cursor-pointer text-2xl mb-2 text-blue-800 dark:text-gray-400">
              <a>{title}</a>
            </h2>
          </Link>
          <small className="text-gray-500">
            <FormatedCreatedAt dateString={createdAt} />
          </small>
          <div>
            {tags.map((tag) => (
              <Link
                href={{
                  pathname: '/archives/tags/[params]',
                  query: { params: `${tag.name}` },
                }}
              >
                <p className="cursor-pointer p-1	text-sm	inline-block mr-2 text-white bg-gray-500 rounded-md">
                  {tag.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await httpRequest(CMS_URL, CMS_API_KEY);
  const data = await res.contents;

  return {
    props: {
      allPostsData: data,
      revalidate: 60,
    },
  };
};
