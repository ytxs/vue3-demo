import { CreateRequest } from '@/utils/axios'
import { Api, AxiosCreateRequestConfig } from '#'

const urls: AxiosCreateRequestConfig['urls'] = {
  create: 'add', // 创建
  update: 'update', // 修改
  remove: 'delete', // 启用
  list: 'list', // 启用
  // page: 'list', // 查询列表
  export: {
    // baseURL: process.env.VITE_APP_BASE_API,
    headers: {
      // 请求头
    },
    method: 'get',
    url: 'export',
    responseType: 'blob'
  }
}
const request: Api<typeof urls> = CreateRequest({
  baseURL: `${process.env.VITE_APP_BASE_API || ''}/manager-admin/configureMgr/`,
  urls
})
export const { create, update, remove, list } = request

export function page() {
  return {
    rows: [
      {
        name: '数据1',
        alias: '1111',
        i_date: Date.now(),
        amount: 111,
        amountZH: 111,
        percentage: 0.1111,
        status: 1,
        audit_name: '张三',
        audit_no: 'N0003'
      },
      {
        name: '数据2',
        i_date: Date.now(),
        amount: 111,
        amountZH: 111,
        percentage: 0.1111,
        status: 1,
        audit_name: '张三',
      }
    ],
    total: 2
  }
}
