'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface Props {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const normalized = query.trim().toLowerCase()
    if (normalized.length >= 3) {
      const handle = setTimeout(() => onSearch(normalized), 300)
      return () => clearTimeout(handle)
    }    
    onSearch('')
  }, [query, onSearch])

  return (
    <div className="relative w-full max-w-md mb-0 md:mb-6">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="search"
        aria-label="Buscar produtos"
        placeholder="Buscar produtos..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          aria-label="Limpar busca"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
