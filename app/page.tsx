'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { Post } from '../lib/type'
import BlogPost from './components/blog-post'
import Pagination from './components/pagination'

function BlogContent({ page, posts, totalPages }) {
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

function BlogContentWrapper() {
  const searchParams = useSearchParams()
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const pageParam = searchParams?.get('page')
        ? parseInt(searchParams.get('page')!, 10)
        : 1
      setPage(pageParam)
      const res = await fetch(`/api/posts?page=${pageParam}`)
      const data = await res.json()
      setPosts(data.posts)
      setTotalPages(data.totalPages)
    }

    fetchData()
  }, [searchParams])

  return <BlogContent page={page} posts={posts} totalPages={totalPages} />
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContentWrapper />
    </Suspense>
  )
}
