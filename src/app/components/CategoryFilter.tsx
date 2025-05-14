'use client'

import type { Dispatch, SetStateAction } from 'react'

interface Props {
  categories: string[]
  selected: string[]
  onChange: Dispatch<SetStateAction<string[]>>
}

export function CategoryFilter({ categories, selected, onChange }: Props) {
  function toggleCategory(cat: string) {
    if (selected.includes(cat)) {
      onChange(selected.filter(c => c !== cat))
    } else {
      onChange([...selected, cat])
    }
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Filtrar por categoria</h3>
      <div className="space-y-2">
        {categories.map(cat => (
          <label key={cat} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-gray-700">{cat}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
