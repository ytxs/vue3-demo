import { CreateRequest } from '@/utils/axios'
import { Api, AxiosCreateRequestConfig } from '#'

const urls: AxiosCreateRequestConfig['urls'] = {
  getRelation: '/v2/common/component/enumList', // 枚举
  getPublicUrl: '/common/oss/getPublicUrl', // oss路径
  pageSearch: '/basic/pageSearch', // 公共搜索接口
  queryCustomerList: '/v2/common/component/getCus', // 客户搜索接口
  querySupplierList: '/v2/common/component/getSup', // 供应商列表
  componentGetOssSecret: '/v2/common/component/getOssSecret', // 获取上传文件的token
}
const request: Api<typeof urls> = CreateRequest({
  baseURL: `${process.env.VITE_APP_BASE_API || ''}`,
  urls
})

export const {
  getRelation,
  // getPublicUrl,
  pageSearch,
  queryCustomerList,
  querySupplierList,
  componentGetOssSecret
} = request
