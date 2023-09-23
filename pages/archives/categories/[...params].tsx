import Layout, { siteTitle } from '../../../components/molecules/layout';
import Link from 'next/link';
import { categories } from '../../../lib/const';
import Head from 'next/head';
import { FormatedDate } from '../../../components/atoms/date';
import GenericIcon from '../../../components/atoms/genericIcon';
import Pagination from '../../../components/molecules/pagination';
import { Post } from '../../../lib/type';
import { PostNotFound } from '../../../components/molecules/postNotFound';
import { getPostsDataByCategory } from '../../../utils/functions';

type Props = {
  posts: Post[];
  category: string;
  totalCount: number;
};

const boldCategories = ['linux', 'rubyonrails', 'mysql'];

const Posts = (props: Props) => {
  return (
    <Layout home={null}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div id="category-icon" className="flex mb-10">
        {CategoryIcon(props.category)}
      </div>
      <div id="post-container">
        {PostContent(props.posts)}
        <Pagination totalCount={props.totalCount} />
      </div>
    </Layout>
  );
};

const CategoryIcon = (category: string) => {
  if (!category) return null;
  const styleName = boldCategories.includes(category) ? 'text-4xl' : 'text-lg';
  return <GenericIcon iconName={category} styleName={styleName} />;
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

export default function Categories(props: Props) {
  if (props.posts.length > 0) {
    return Posts(props);
  } else {
    return PostNotFound();
  }
}

export const getStaticPaths = async () => {
  const paths = Object.keys(categories).map((category: string) => {
    return { params: { params: [category] } };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const category = context.params.params[0];
  const posts = getPostsDataByCategory(categories[category]);

  return {
    props: {
      posts,
      category,
      revalidate: 60,
      totalCount: posts.length,
    },
  };
};
