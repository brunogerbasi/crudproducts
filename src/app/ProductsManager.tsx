'use client'

import { useState, useMemo, useEffect } from 'react'
import type { Product } from './types/products'
import { FunnelIcon } from '@heroicons/react/24/solid'
import { ProductCard } from './components/ProductCard'
import { SearchBar } from './components/SearchBar'
import { SortFilter, SortOption } from './components/SortFilter'
import SidebarFilters from './components/SidebarFilters'
import Modal from './components/Modal'
import ProductForm from './components/ProductForm'
import { Pagination } from './components/Pagination'

const PAGE_SIZE = 8

interface Props { products: Product[] }

export default function ProductsManager({ products: initial }: Props) {
  const [products, setProducts] = useState<Product[]>(initial)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('')
  const [bounds, setBounds] = useState<[number, number]>([0, 0]) 
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]) 
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
  if (products.length) {
    const prices = products.map(p => p.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    setBounds([min, max])
    
    setPriceRange(([prevMin, prevMax]) => [
      prevMin,
      Math.max(prevMax, max),
    ])
  }
}, [products])

  useEffect(() => setCurrentPage(1), [searchTerm, sortOption, priceRange, selectedCategories])

  const filtered = useMemo(() => {
    const list = [...products]  
      .filter(p => !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
      .filter(p => !selectedCategories.length || selectedCategories.includes(p.category))

    switch (sortOption) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price)
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return list
    }
  }, [products, searchTerm, priceRange, selectedCategories, sortOption])

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1)
  const paginated = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage]
  )

  function handleAddProduct(data: Omit<Product, 'id'>) {
    const newProd: Product = { ...data, id: Date.now().toString(), category: data.category }
    setProducts(prev => [newProd, ...prev])
    setCurrentPage(1)
    setIsModalOpen(false)
  }

  const allCategories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products])

  return (
    <main className="flex max-w-7xl mx-auto px-4 py-8 gap-8 relative">
      <SidebarFilters
        min={bounds[0]}
        max={bounds[1]}
        setRange={setPriceRange}
        categories={allCategories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1">        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Catálogo de Produtos</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-900 transition"
          >
            + Produtos
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <SearchBar onSearch={setSearchTerm} />
          <div className='flex items-center gap-4'>
            <SortFilter value={sortOption} onChange={setSortOption} />
            <button
                className="md:hidden mb-0 md:mb-6 flex items-center px-3 py-2 bg-purple-800 text-white rounded-md"
                onClick={() => setIsSidebarOpen(true)}
            >
                <FunnelIcon className="w-5 h-5 mr-2" />
                Filtros
            </button>
          </div>
          
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginated.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">Cadastrar Novo Produto</h2>
          <ProductForm onAdd={handleAddProduct} />
        </Modal>
      </div>
    </main>
  )
}
