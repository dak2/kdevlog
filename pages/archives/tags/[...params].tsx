import Layout, { siteTitle } from '../../../components/molecules/layout';
import { httpRequest } from '../../../lib/api';
import Link from 'next/link';
import { CMS_API_KEY, CMS_URL } from '../../../lib/const';
import Head from 'next/head';
import { FormatedCreatedAt } from '../../../components/atoms/date';
import GenericIcon from '../../../components/atoms/genericIcon';
import Pagination from '../../../components/molecules/pagination';
import { PostType } from '../../../lib/type';

type PropsType = {
  allPosts: PostType[];
  tagName: string;
  totalCount: number;
};

const postLists = (props: PropsType) => {
  return (
    <Layout home={null}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="flex mb-10">
        {icon(props.tagName)}
      </div>
      <ul>
        {props.allPosts.map(({ id, createdAt, title, tags }, postIndex) => (
          <li key={postIndex}>
            <div className="mb-12">
              <Link href={`/posts/${id}`}>
                <h2 className="cursor-pointer text-2xl mb-2 text-darkorange dark:text-yellow-300">
                  <a>{title}</a>
                </h2>
              </Link>
              <small className="text-gray-500 dark:text-gray-200">
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

const icon = (tag: string) => {
  if(tag) return <GenericIcon iconName={tag} styleName={'mt-2 text-2xl'} />
  return null;
};

const noPosts = () => {
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="grid justify-items-center pt-64">
        <h1 className="text-5xl mb-10 font-bold">????????????????????????</h1>
      </div>
    </Layout>
  );
};

export default function Tags(props: PropsType) {
  if (props.allPosts.length > 0) {
    return postLists(props);
  } else {
    return noPosts;
  }
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
  const tag = context.params.params[0];
  const res = await httpRequest(CMS_URL, CMS_API_KEY);
  const allPosts = await res.contents;
  const posts = groupedPostsByTag(allPosts, tag);

  return {
    props: {
      allPosts: posts,
      tagName: tag,
      revalidate: 60,
      totalCount: res.totalCount,
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
