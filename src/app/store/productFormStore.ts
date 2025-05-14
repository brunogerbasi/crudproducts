import { create } from 'zustand'

interface ProductFormState {
  name: string
  price: string
  description: string
  imageUrl: string
  category: string
  setName: (name: string) => void
  setPrice: (price: string) => void
  setDescription: (desc: string) => void
  setImageUrl: (url: string) => void
  setCategory: (cat: string) => void
  reset: () => void
}

export const useProductFormStore = create<ProductFormState>((set) => ({
  name: '',
  price: '',
  description: '',
  imageUrl: '',
  category: '',
  setName: (name) => set({ name }),
  setPrice: (price) => set({ price }),
  setDescription: (description) => set({ description }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  setCategory: (category) => set({ category }),
  reset: () =>
    set({
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      category: '',
    }),
}))