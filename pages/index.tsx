import Head from 'next/head';
import Layout, { siteTitle } from '../components/molecules/layout';
import { httpRequest } from '../lib/api';
import { CMS_API_KEY, CMS_URL } from '../lib/const';
import Link from 'next/link';
import { FormatedDate } from '../components/atoms/date';
import Pagination from '../components/molecules/pagination';
import { PostType } from '../lib/type';

type PropsType = {
  posts: PostType[];
  totalCount: number;
};

const postLists = (props: PropsType) => {
  return (
    <Layout home={true} children={undefined}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <ul>
        {props.posts.map(({ id, updatedAt, title, tags }, postIndex) => (
          <li key={postIndex}>
            <div id="post-container" className="mb-12">
              <Link href={`/posts/${id}`}>
                <h2 className="mb-2 text-2xl font-extrabold">
                  <a className="cursor-pointer hover:underline">{title}</a>
                </h2>
              </Link>
              <small className="text-gray-200">
                <FormatedDate dateString={updatedAt} />
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
                        <p className="mr-2 text-sm font-bold cursor-pointer hover:underline">
                          #{tag.name}
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
    <Layout home={true} children={undefined}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="pt-64 grid justify-items-center">
        <h1 className="mb-10 text-5xl font-bold">記事はありません</h1>
      </div>
    </Layout>
  );
};

export default function Home(props: PropsType) {
  if (props.posts.length > 0) {
    return postLists(props);
  } else {
    return noPosts;
  }
}

export const getStaticProps = async () => {
  const res = await httpRequest(CMS_URL, CMS_API_KEY);
  const contents = await res.contents;
  const postsByNewestSorted = contents.sort(
    (a: { updatedAt: string }, b: { updatedAt: string }) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return {
    props: {
      posts: postsByNewestSorted,
      revalidate: 60,
      totalCount: res.totalCount,
    },
  };
};
