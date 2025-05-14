import { fetchProducts } from './data/products'
import type { Product } from './types/products'
import ProductsManager from './ProductsManager'

export default async function Home() {
  const products: Product[] = await fetchProducts()

  return <ProductsManager products={products} />
}