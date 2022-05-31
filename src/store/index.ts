import { defineStore, createPinia } from 'pinia'
// import { throttle } from 'xe-utils'
import { Relations } from '#'
import app from './app'
import numFactory from './numFactory'
import tagsView from './tagsView'
import { list as productGroup } from '@/api/demo'
import { getRelation, pageSearch } from '@/api/common'
// import { getPublicUrl, getRelation, pageSearch } from '@/api/common'

// 与不同前缀的查询接口相对应的请求方法
const action = {
  search: pageSearch,
  list: (page: any) => page
}
// 与不同前缀的查询接口相对应的请求参数
const apiParams = {
  search: (type: string) => ({ type, where: { keyword: '' }}),
  // 特殊接口分别配置：例'list:product_group'
  list: (key: string) => ({
    product_group: productGroup({ size: 999, product_group_status: ['INIT', 'ENABLED'] })
  }[key])
}
// 与不同前缀的查询接口相对应的响应数据中的取值参数
const dataKeys = {
  search: 'rows',
  list: 'rows'
}
export const store = createPinia()
interface State {
  relation: Relations
  publicUrl: string
}
type Enums = (keys: string[]) => Relations
export const index = defineStore({
  id: 'main',
  state: (): State => ({
    relation: {},
    publicUrl: ''
  }),
  getters: {
    getFileUrl: state => (url: string) => `${state.publicUrl}${url}`,
    // 传入字符串时，返回 Relation，传入字符串数组时，返回 Relations
    getEnums: (state: any): Enums => (keys) => {
      state.getRelations(keys)
      return state.getRealEnums(keys)
    },
  },
  actions: {
    getRealEnums(keys: string[]) {
      const reg = /.+_all$/
      const non: string[] = []
      const obj: Relations = {}
      let pre: string
      let preReg: RegExp
      keys.forEach((key) => {
        if (reg.test(key)) {
          pre = key.replace('_all', '')
          preReg = new RegExp(`^${pre}_.+`)
          for (const [k, relation] of Object.entries(this.relation)) {
            preReg.test(k) && (obj[k] = relation)
          }
        } else non.push(key)
      })
      return $xe.assign(obj, $xe.pick(this.relation, non))
    },
    // getPublicUrl: throttle((state) => {
    //   false && getPublicUrl().then((publicUrl) => {
    //     state.publicUrl = publicUrl
    //   })
    // }, 1000),
    mergeRelation(relation: State['relation']) {
      $xe.assign(this.relation, relation)
    },
    async post(api: any, data: any, key: string | string[], dataKey?: string) {
      typeof key === 'string' ? this.relation[key] = [] : key.forEach((k) => { this.relation[k] = [] })
      const res = await api(await data)
      if (typeof key === 'string' && !res[key]) {
        this.relation[key] = dataKey && res[dataKey] ? res[dataKey] : res
      } else this.mergeRelation(res)
    },
    async getRelations(value?: string | string[], status: 'get' | 'update' = 'get') {
      if (!value) return this.relation
      if (value === 'getAll') {
        const res = await getRelation()
        this.mergeRelation(res)
        return this.relation
      } if (typeof value === 'string') {
        const [actionKey, params] = value.split(':') as [keyof typeof action, string?]
        if (!this.relation[value] || status === 'update') {
          if (params) await this.post(action[actionKey], apiParams[actionKey](params), params, dataKeys[actionKey])
          else await this.post(getRelation, { type: [value] }, value, value)
        }
        return this.relation[value]
      }
      const non: string[] = []
      for (const key of value) {
        const [actionKey, params] = key.split(':') as [keyof typeof action, string?]
        if (!this.relation[key] || status === 'update') {
          // eslint-disable-next-line no-await-in-loop
          if (params) await this.post(action[actionKey], apiParams[actionKey](params), key, dataKeys[actionKey])
          else non.push(key)
        }
      }
      non.length && await this.post(getRelation, { type: non }, non)
      return $xe.pick(this.relation, value)
    },
  },
})
export const main = () => {
  const s = index(store)
  if (!s.publicUrl) {
    // s.getPublicUrl(s.$state)
  }
  return s
}
export function useStore() {
  return {
    main: main(),
    app: app(),
    numFactory: numFactory(),
    tagsView: tagsView(),
  }
}
export default useStore
