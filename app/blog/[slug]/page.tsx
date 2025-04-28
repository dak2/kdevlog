import { Metadata } from 'next'
import { CiCalendar } from 'react-icons/ci'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'
import { getBlogPostBySlug, getPosts } from '../../../lib/blog'

export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  const posts = getPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const pageParams = await params
  const post = getBlogPostBySlug(pageParams.slug)

  return {
    openGraph: {
      title: post?.title || 'Default Title',
      description: post?.excerpt || 'Default Description',
    },
  }
}

export default async function BlogPostPage({ params }) {
  const pageParams = await params
  const post = getBlogPostBySlug(pageParams.slug)

  if (!post) {
    return <div>Page Not Found</div>
  }

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <CiCalendar size={16} className="mr-2" />
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString()}
        </time>
      </div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
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
            )
          },
        }}
        className="markdown"
      >
        {post.content}
      </ReactMarkdown>
    </article>
  )
}
