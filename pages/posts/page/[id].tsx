import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../../../components/molecules/layout';
import Pagination from '../../../components/molecules/pagination';
import { FormatedDate } from '../../../components/atoms/date';
import { httpRequest } from '../../../lib/api';
import { CMS_API_KEY, CMS_URL } from '../../../lib/const';
import { range, PER_PAGE } from '../../../lib/const';
import { PostType } from '../../../lib/type';

type PropsType = {
  posts: PostType[];
  totalCount: number;
};

const postLists = (props: PropsType) => {
  return (
    <Layout home={null} children={undefined}>
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
                        <p className="mr-2 text-sm font-bold cursor-pointer rounded-md hover:underline">
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
      <div className="grid justify-items-center pt-64">
        <h1 className="text-5xl mb-10 font-bold">記事はありません</h1>
      </div>
    </Layout>
  );
};

export default function PostsPageId(props: PropsType) {
  if (props.posts.length > 0) {
    return postLists(props);
  } else {
    return noPosts;
  }
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
    `https://kdevlog.microcms.io/api/v1/posts?offset=${(id - 1) * 5}&limit=10`,
    CMS_API_KEY,
  );
  const posts = await res;
  const postsByNewestSorted = posts.contents.sort(
    (a: { updatedAt: string }, b: { updatedAt: string }) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return {
    props: {
      posts: postsByNewestSorted,
      totalCount: posts.totalCount,
    },
  };
};
