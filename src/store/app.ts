import { defineStore } from 'pinia'
import app from 'wjh-biz-common/stores/app'
import { store } from '@/store'

const StoreDefinition = defineStore(app)
export const useAppStore = () => StoreDefinition(store)
window.addEventListener('beforeunload', () => {
  const s = StoreDefinition(store)
  s && localStorage.setItem('store_app', JSON.stringify({ ...s.$state, powers: [] }))
})
export default useAppStore
