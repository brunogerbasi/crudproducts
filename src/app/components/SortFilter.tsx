'use client'

import type { Dispatch, SetStateAction } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export type SortOption = '' | 'price-asc' | 'price-desc' | 'name-asc'

interface Props {
  value: SortOption
  onChange: Dispatch<SetStateAction<SortOption>>
}

export function SortFilter({ value, onChange }: Props) {
  return (
    <div className="mb-0 md:mb-6 w-64">
      
      <div className="relative">
        <select
          id="sort"
          value={value}
          onChange={e => onChange(e.target.value as SortOption)}
          className="block w-full border border-gray-300 bg-white rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 appearance-none"
        >        
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="name-asc">Ordem alfabética</option>
        </select>
        <ChevronDownIcon
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5"
        />
      </div>
    </div>
  )
}
