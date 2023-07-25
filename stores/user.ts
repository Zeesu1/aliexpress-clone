import { defineStore } from 'pinia'
import type { Product } from 'types/product'


interface UserState {
  isMenuOverlay: boolean
  isLoading: boolean
  cart: Product[]
  checkout: any[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [],
    checkout: [],
  }),
  persist: true,
})
