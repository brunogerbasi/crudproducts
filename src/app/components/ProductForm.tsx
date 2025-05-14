'use client'

import { FormEvent } from 'react'
import type { Product } from '@/app/types/products'
import { useProductFormStore } from '@/app/store/productFormStore'

interface Props {
  onAdd: (newProd: Omit<Product, 'id'>) => void
}

export default function ProductForm({ onAdd }: Props) {
  const {
    name,
    price,
    description,
    imageUrl,
    category,
    setName,
    setPrice,
    setDescription,
    setImageUrl,
    setCategory,
    reset,
  } = useProductFormStore()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onAdd({ name, price: parseFloat(price), description, imageUrl, category })
    reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label htmlFor="name" className="block font-medium">Nome</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="category" className="block font-medium">Categoria</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="price" className="block font-medium">Preço</label>
        <input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block font-medium">URL da Imagem</label>
        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="mt-1 block w-full border rounded px-2 py-1"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-900 transition"
      >
        Adicionar Produto
      </button>
    </form>
  )
}