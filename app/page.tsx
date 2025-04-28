import { getBlogPosts } from '../lib/blog'
import BlogPost from './components/blog-post'
import Pagination from './components/pagination'

export const dynamic = 'force-static'
export const revalidate = false

export default function Home({ searchParams }) {
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1
  const { posts, totalPages } = getBlogPosts(page)

  return (
    <div>
      <div>
        {posts.map((post) => (
          <BlogPost key={post.slug} post={post} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}
