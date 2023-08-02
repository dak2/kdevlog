import Layout from '../../components/molecules/layout';
import Head from 'next/head';
import { FormatedDate } from '../../components/atoms/date';
import ReactMarkdown from 'react-markdown';
import { Post, MdPost } from '../../lib/type';
import { getPostData, getPostIds } from '../../utils/functions';
import { PostNotFound } from '../../components/molecules/postNotFound';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

type Props = {
  post: MdPost;
};

const PostDetail = (post: MdPost) => {
  return (
    <Layout home={null}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article id="post-container">
        <h1
          id="post-title"
          className="my-4 text-3xl font-extrabold tracking-tighter"
        >
          {post.title}
        </h1>
        <div id="date" className="text-gray-200">
          <FormatedDate dateString={post.published_at} type={'published_at'} />
        </div>
        <div className="post-contents">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    showLineNumbers={true}
                    wrapLongLines={true}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </Layout>
  );
};

export default function Post(props: Props) {
  const post = props.post;
  if (post) {
    return PostDetail(post);
  } else {
    return PostNotFound;
  }
}

export const getStaticPaths = async () => {
  return { paths: getPostIds(), fallback: false };
};

export const getStaticProps = async (context) => {
  return {
    props: {
      post: getPostData(context.params.id),
      revalidate: 60,
    },
  };
};
