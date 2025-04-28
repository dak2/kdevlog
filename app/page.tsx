import { getBlogPosts } from '../lib/blog'
import BlogPost from './components/blog-post'
import Pagination from './components/pagination'

export function generateStaticParams() {
  const { totalPages } = getBlogPosts()

  return Array.from({ length: totalPages }, (_, i) => ({
    searchParams: i === 0 ? {} : { page: (i + 1).toString() },
  }))
}

export default async function Home({ searchParams }) {
  const params = await searchParams
  const currentPage = params.page ? parseInt(params.page, 10) : 1
  const { posts, totalPages } = getBlogPosts(currentPage)

  return (
    <div>
      <div>
        {posts.map((post) => (
          <BlogPost key={post.slug} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
