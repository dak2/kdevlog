import Layout, { siteTitle } from '../../../components/layout';
import { httpRequest } from '../../../lib/api';
import Link from 'next/link';
import { CMS_API_KEY, CMS_URL } from '../../../lib/const';
import Head from 'next/head';
import { FormatedCreatedAt } from '../../../components/date';

export default function Tags({ allPostsData, tagName }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h2>{tagName}</h2>
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
              <p className="p-1	text-sm	inline-block mr-2 text-white bg-gray-500 rounded-md">
                {tag.name}
              </p>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const res = await httpRequest(CMS_URL, CMS_API_KEY);
  const contents = await res.contents;
  const tags = getTags(contents);
  const newPaths = [];
  for (let tag of tags) {
    newPaths.push({ params: { params: [tag] } });
  }

  return { paths: newPaths, fallback: false };
};

export const getStaticProps = async (context) => {
  const tag = context.params.params[0];
  const res = await httpRequest(CMS_URL, CMS_API_KEY);
  const allPosts = await res.contents;
  const posts = groupedPostsByTag(allPosts, tag);
  console.log('posts', posts);

  return {
    props: {
      allPostsData: posts,
      tagName: tag,
      revalidate: 60,
    },
  };
};

const getTags = (contents) => {
  const tags = contents
    .flatMap((content) => content.tags)
    .map((tag) => tag.name);
  return [...new Set(tags)];
};

const groupedPostsByTag = (posts, tag_name) => {
  console.log('tag_name', tag_name);
  return posts.filter((post) => {
    return post.tags.some((tag) => tag.name === tag_name);
  });
};
