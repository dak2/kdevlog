import { Post } from '../../lib/blog'
import { CiCalendar } from 'react-icons/ci'
import Link from 'next/link'

export default function BlogPost({ post }: { post: Post }) {
  return (
    <article className="mb-8">
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-xl font-bold mb-2 hover:text-gray-300">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-400 mb-2">{post.excerpt}</p>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <CiCalendar size={16} className="mr-2" />
        <time dateTime={post.date}>{post.date}</time>
      </div>
      <div className="space-x-1">
        {post.categories.map((category) => (
          <span key={category} className="text-gray-400">
            #{category}
          </span>
        ))}
      </div>
    </article>
  )
}
