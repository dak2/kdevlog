import Link from 'next/link'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  return (
    <div className="flex justify-center items-center space-x-4">
      {prevPage && (
        <Link
          href={prevPage === 1 ? '/' : `/?page=${prevPage}`}
          className="flex items-center text-indigo-400 hover:text-indigo-300"
        >
          <FaChevronLeft size={20} />
          <span>Previous</span>
        </Link>
      )}
      <span className="text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      {nextPage && (
        <Link
          href={`/?page=${nextPage}`}
          className="flex items-center text-indigo-400 hover:text-indigo-300"
        >
          <span>Next</span>
          <FaChevronRight size={20} />
        </Link>
      )}
    </div>
  )
}
