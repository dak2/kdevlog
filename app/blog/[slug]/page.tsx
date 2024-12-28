import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { getBlogPostBySlug } from '../../../lib/blog'
import { CiCalendar } from 'react-icons/ci'
import remarkGfm from 'remark-gfm'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return <div>Post not found</div>
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
      <div className="flex flex-wrap gap-2 mb-8">
        {post.categories.map((category) => (
          <span
            key={category}
            className="bg-indigo-900 text-indigo-200 px-2 py-1 rounded-full text-xs"
          >
            #{category}
          </span>
        ))}
      </div>
      <div className="prose prose-invert max-w-none">
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
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
