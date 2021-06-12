import Head from 'next/head';
import Layout, { siteTitle } from '../components/molecules/Layout';
import { httpRequest } from '../lib/api';
import { CMS_API_KEY, CMS_URL } from '../lib/const';
import Link from 'next/link';
import { FormatedCreatedAt } from '../components/atoms/Date';
import Pagination from '../components/molecules/Pagination';
import { PostType } from '../lib/type';

type PropsType = {
  allPosts: PostType[];
  totalCount: number;
};

const postLists = (props: PropsType) => {
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <ul>
        {props.allPosts.map(({ id, createdAt, title, tags }, postIndex) => (
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
                    <li key={tagIndex} className="inline-block">
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
                        <p className="cursor-pointer p-1 text-sm mr-2 text-white bg-gray-500 rounded-md">
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
      <Pagination totalCount={props.totalCount} />
    </Layout>
  );
};

const noPosts = () => {
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="grid justify-items-center pt-64">
        <h1 className="text-5xl mb-10 font-bold">記事はありません</h1>
      </div>
    </Layout>
  );
};

export default function Home(props: PropsType) {
  if (props.allPosts.length > 0) {
    return postLists(props);
  } else {
    return noPosts;
  }
}

export const getStaticProps = async () => {
  const res = await httpRequest(CMS_URL, CMS_API_KEY);
  const data = await res.contents;

  return {
    props: {
      allPosts: data,
      revalidate: 60,
      totalCount: res.totalCount,
    },
  };
};
