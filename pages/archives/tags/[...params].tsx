import Layout, { siteTitle } from '../../../components/molecules/layout';
import { httpRequest } from '../../../lib/api';
import Link from 'next/link';
import { CMS_API_KEY, CMS_URL } from '../../../lib/const';
import Head from 'next/head';
import { FormatedCreatedAt } from '../../../components/atoms/date';
import TagIcon from '../../../components/atoms/tagIcon';

export default function Tags({ allPostsData, tagName }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="flex mb-10">
        <TagIcon tagName={tagName} />
        <h2 className="ml-2 font-bold">{tagName}</h2>
      </div>
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
                  query: {
                    params: `${tag.name.toLowerCase().replace(/\s+/g, '')}`,
                  },
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

export const getStaticPaths = async () => {
  const res = await httpRequest(CMS_URL, CMS_API_KEY);
  const contents = await res.contents;
  const tags = getTags(contents);
  const toLowerCaseTags = tags.map((tag: string) =>
    tag.toLowerCase().replace(/\s+/g, ''),
  );
  const newPaths = [];
  for (let tag of toLowerCaseTags) {
    newPaths.push({ params: { params: [tag] } });
  }

  return { paths: newPaths, fallback: false };
};

export const getStaticProps = async (context) => {
  const tag = toUpperCaseTag(context.params.params[0]);
  const res = await httpRequest(CMS_URL, CMS_API_KEY);
  const allPosts = await res.contents;
  const posts = groupedPostsByTag(allPosts, tag);

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
  return posts.filter((post) => {
    return post.tags.some((tag) => tag.name === tag_name);
  });
};

const toUpperCaseTag = (tag: string) => {
  if (tag.includes('rubyonrails')) {
    return 'Ruby on Rails';
  } else if (tag.includes('typescript')) {
    return 'TypeScript';
  } else if (tag.includes('javascript')) {
    return 'JavaScript';
  } else if (tag.includes('go')) {
    return 'Go';
  } else if (tag.includes('rust')) {
    return 'Rust';
  } else if (tag.includes('ruby')) {
    return 'Ruby';
  } else if (tag.includes('react')) {
    return 'React';
  } else if (tag.includes('aws')) {
    return 'AWS';
  } else if (tag.includes('docker')) {
    return 'Docker';
  }
};
