import Image from 'next/image'
import type { Product } from '../types/products'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const truncatedName =
    product.name.length > 31
      ? product.name.slice(0, 31) + '...'
      : product.name

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ring-1 ring-gray-100">
      <div className="relative w-full pb-[75%] overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5 flex flex-col">
        <span className="self-start text-xs font-semibold text-purple-800 uppercase bg-purple-200 px-2 py-0.5 rounded-full mb-2">
          {product.category}
        </span>

        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          {truncatedName}
        </h2>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-base font-bold text-purple-800">
            R$ {product.price.toFixed(2)}
          </span>
          <button className="px-4 py-2 bg-purple-800 text-white text-sm font-medium rounded-lg hover:bg-purple-900 transition cursor-pointer">
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}
