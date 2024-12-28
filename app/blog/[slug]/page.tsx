'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CiCalendar } from 'react-icons/ci'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'
import { Post } from '../../../lib/type'

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const [post, setPost] = useState<Post>()

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        const res = await fetch(`/api/posts/${slug}`)
        const data = await res.json()
        setPost(data)
      }

      fetchPost()
    }
  }, [slug])

  if (!post) {
    return <div>Loading...</div>
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
