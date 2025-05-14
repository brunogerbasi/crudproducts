import type { Product } from '../types/products'

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=20',
    { next: { revalidate: 60 } }
  )
  const posts: { id: number; title: string; body: string }[] = await res.json()

  const categoriesList = [
    'Eletrodomésticos',
    'Eletrônicos',
    'Periféricos',
    'Acessórios',
  ]

  return posts.map((post) => {
    const category =
      categoriesList[post.id % categoriesList.length]

    return {
      id: post.id.toString(),
      name: post.title,
      category,
      price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
      description: post.body,
      imageUrl: `https://picsum.photos/seed/${post.id}/600/400`,
    }
  })
}
