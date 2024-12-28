'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import BlogPost from './components/blog-post'
import Pagination from './components/pagination'
import { Post } from '../lib/type'

export default function Home() {
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
      const res = await fetch(`/api/fetchPosts?page=${pageParam}`)
      const data = await res.json()
      setPosts(data.posts)
      setTotalPages(data.totalPages)
    }

    fetchData()
  }, [searchParams])

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
