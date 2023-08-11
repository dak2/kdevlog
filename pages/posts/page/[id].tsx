import Link from 'next/link';
import Head from 'next/head';
import Layout, { siteTitle } from '../../../components/molecules/layout';
import Pagination from '../../../components/molecules/pagination';
import { FormatedDate } from '../../../components/atoms/date';
import { PER_PAGE } from '../../../lib/const';
import { Post } from '../../../lib/type';
import { getPostIds, getPosts, range } from '../../../utils/functions';
import { PostNotFound } from '../../../components/molecules/postNotFound';

type Props = {
  posts: Post[];
  totalCount: number;
};

const Posts = (props: Props) => {
  return (
    <Layout home={null}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div id="post-container">
        {PostContent(props.posts)}
        <Pagination totalCount={props.totalCount} />
      </div>
    </Layout>
  );
};

const PostContent = (posts: Post[]) => {
  return (
    <ul>
      {posts.map(({ id, title, published_at, categories }, postIndex) => (
        <li key={postIndex}>
          <div id="post-sub-container" className="mb-12">
            <Link href={`/posts/${id}`}>
              <h2 className="mb-2 text-2xl font-extrabold">
                <p className="cursor-pointer hover:underline">{title}</p>
              </h2>
            </Link>
            <small id="date" className="text-gray-200">
              <span>
                <FormatedDate dateString={published_at} type={'published_at'} />
              </span>
            </small>
            <div>
              <ul>
                {categories.map((category, index) => (
                  <li key={index} className="inline-block">
                    <Link
                      href={{
                        pathname: '/archives/categories/[params]',
                        query: {
                          params: `${category
                            .toLowerCase()
                            .replace(/\s+/g, '')}`,
                        },
                      }}
                    >
                      <p
                        id="tag"
                        className="mr-2 text-sm font-bold cursor-pointer hover:underline"
                      >
                        {category ? `#${category}` : ''}
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
  );
};

export default function PostsPageId(props: Props) {
  if (props.posts.length > 0) {
    return Posts(props);
  } else {
    return PostNotFound;
  }
}

export const getStaticPaths = async () => {
  const postIds = getPostIds();
  const paths = range(1, Math.ceil(postIds.length / PER_PAGE)).map(
    (repo) => `/posts/page/${repo}`,
  );

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const pageNumber = context.params.id;
  const offset = (pageNumber - 1) * PER_PAGE;
  const limit = PER_PAGE;
  const posts = getPosts();
  const postsPerPage = posts.slice(offset, offset + limit);

  return {
    props: {
      posts: postsPerPage,
      totalCount: posts.length,
    },
  };
};
