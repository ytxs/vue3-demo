import { defineStore } from 'pinia'
import { store } from '@/store'

const StoreDefinition = defineStore({
  id: 'numFactory',
  state: () => ({
    name: 'numFactory-module',
    count: 1
  }),
  actions: {
    DOUBLE_COUNT() {
      this.count *= 2
    }
  }
})

export const useFactoryStore = () => StoreDefinition(store)
export default useFactoryStore
