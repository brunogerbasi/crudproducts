'use client'

import type { Dispatch, SetStateAction } from 'react'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: Dispatch<SetStateAction<number>>
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <nav className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded cursor-pointer ${
          currentPage === 1
            ? 'text-gray-400 border-gray-200'
            : 'text-purple-800 border-purple-800 hover:bg-purple-100'
        }`}
      >
        Anterior
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded cursor-pointer ${
            page === currentPage
              ? 'bg-purple-800 text-white'
              : 'text-purple-800 border-purple-800 hover:bg-purple-100'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded cursor-pointer ${
          currentPage === totalPages
            ? 'text-gray-400 border-gray-200'
            : 'text-purple-800 border-purple-800 hover:bg-purple-100'
        }`}
      >
        Próxima
      </button>
    </nav>
  )
}