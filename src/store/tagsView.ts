import { defineStore } from 'pinia'
import tagsView from 'wjh-biz-common/stores/tagsView'
import { store } from '@/store'

const StoreDefinition = defineStore(tagsView)

export default () => StoreDefinition(store)
