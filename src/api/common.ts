import CreateAxios from '@/utils/axios'
import { Obj, Api } from '#'

const request = CreateAxios(process.env.VITE_APP_BASE_API)
const urls = {
  getRelation: '/v2/common/component/enumList', // 枚举
  getPublicUrl: '/common/oss/getPublicUrl', // oss路径
  pageSearch: '/basic/pageSearch', // 公共搜索接口
  queryCustomerList: '/v2/common/component/getCus', // 客户搜索接口
  querySupplierList: '/v2/common/component/getSup', // 供应商列表
  componentGetOssSecret: '/v2/common/component/getOssSecret', // 获取上传文件的token
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

export const {
  getRelation,
  // getPublicUrl,
  pageSearch,
  queryCustomerList,
  querySupplierList,
  componentGetOssSecret
} = post()
