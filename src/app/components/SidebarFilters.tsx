'use client'

import { useState, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { PriceRangeFilter } from './PriceRangeFilter'
import { CategoryFilter }    from './CategoryFilter'

interface Props {
  min: number
  max: number
  setRange: Dispatch<SetStateAction<[number, number]>>
  categories: string[]
  selectedCategories: string[]
  setSelectedCategories: Dispatch<SetStateAction<string[]>>
  isMobileOpen: boolean
  onClose: () => void
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    setIsDesktop(mql.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])
  return isDesktop
}

export default function SidebarFilters({
  min,
  max,
  setRange,
  categories,
  selectedCategories,
  setSelectedCategories,
  isMobileOpen,
  onClose,
}: Props) {
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    return (
      <aside className="w-64 pr-6">
        <div className="bg-white p-4 rounded-lg shadow space-y-6">
          <PriceRangeFilter min={min} max={max} onChange={setRange} />
          <CategoryFilter
            categories={categories}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>
      </aside>
    )
  }

  return (
    isMobileOpen && (
      <aside className="fixed inset-0 z-50 bg-white p-4 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <button onClick={onClose} aria-label="Fechar filtros">
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="space-y-6">
          <PriceRangeFilter min={min} max={max} onChange={setRange} />
          <CategoryFilter
            categories={categories}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>
        <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-900 transition"
          >
            Aplicar
          </button>
      </aside>
    )
  )
}
