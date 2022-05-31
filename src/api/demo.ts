import CreateAxios from '@/utils/axios'
import { Obj, Api } from '#'

const request = CreateAxios(process.env.VITE_APP_BASE_API)
const urls = {
  create: '/v1/external/auth/role/create', // 创建
  update: '/v1/external/auth/role/update', // 修改
  disable: '/v1/external/auth/role/disable', // 封存/禁用
  enable: '/v1/external/auth/role/enable', // 启用
  // page: '/v1/external/auth/role/page', // 查询列表
  list: '/v1/external/auth/role/list', // 查询所有角色
  modelroleBind: '/v1/external/auth/modelrole/bind', // 角色绑定权限组
  modelroleList: '/v1/external/auth/modelrole/list', // 角色已绑定权限组
}
function post(): Api<typeof urls> {
  const obj: any = {}
  for (const [key, url] of Object.entries(urls)) {
    obj[key as keyof typeof urls] = (data?: Obj) => request({
      url,
      data
    })
  }
  return obj
}
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
export const { create, update, disable, enable, list, modelroleBind, modelroleList } = post()
