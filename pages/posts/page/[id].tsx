import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../../../components/molecules/Layout';
import Pagination from '../../../components/molecules/Pagination';
import { FormatedCreatedAt } from '../../../components/atoms/Date';
import { httpRequest } from '../../../lib/api';
import { CMS_API_KEY, CMS_URL } from '../../../lib/const';
import { range, PER_PAGE } from '../../../lib/const';

export default function PostsPageId({ allPostsData, totalCount }) {
  return (
    <Layout home={null}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <ul>
        {allPostsData.map(({ id, createdAt, title, tags }, postIndex) => (
          <li key={postIndex}>
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
                <ul>
                  {tags.map((tag, tagIndex) => (
                    <li key={tagIndex}>
                      <Link
                        href={{
                          pathname: '/archives/tags/[params]',
                          query: {
                            params: `${tag.name
                              .toLowerCase()
                              .replace(/\s+/g, '')}`,
                          },
                        }}
                      >
                        <p className="cursor-pointer p-1 text-sm	inline-block mr-2 text-white bg-gray-500 rounded-md">
                          {tag.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const res = await httpRequest(CMS_URL, CMS_API_KEY);
  const paths = range(1, Math.ceil(res.totalCount / PER_PAGE)).map(
    (repo) => `/posts/page/${repo}`,
  );

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await httpRequest(
    `https://kdevlog.microcms.io/api/v1/posts?offset=${(id - 1) * 5}&limit=5`,
    CMS_API_KEY,
  );
  const posts = await res;

  return {
    props: {
      allPostsData: posts.contents,
      totalCount: posts.totalCount,
    },
  };
};
