'use client'

import { useState, useEffect } from 'react'
import * as Slider from '@radix-ui/react-slider'

interface Props {
  min: number
  max: number
  onChange: (range: [number, number]) => void
}

export function PriceRangeFilter({ min, max, onChange }: Props) {
  const [value, setValue] = useState<[number, number]>([min, max])

  useEffect(() => {
    onChange(value)
  }, [value, onChange])

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Filtrar por preço</h3>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-4"
        min={min}
        max={max}
        step={1}
        value={value}
        onValueChange={(v) => setValue([v[0], v[1]])}
      >        
        <Slider.Track className="relative bg-gray-200 grow h-1 rounded-full">          
          <Slider.Range className="absolute bg-purple-800 h-full rounded-full" />
        </Slider.Track>
        
        <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-purple-800 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400" />

        <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-purple-800 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400" />
      </Slider.Root>

      <div className="flex justify-between text-sm text-gray-700 mt-2">
        <span>R$ {value[0].toFixed(2)}</span>
        <span>R$ {value[1].toFixed(2)}</span>
      </div>
    </div>
  )
}
