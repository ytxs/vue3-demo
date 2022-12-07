import Create, { CreateRequest as Request } from 'wjh-biz-common/utils/axios'
import { AxiosRequestConfig } from 'axios'
import { AxiosCreateRequest } from '#'

const interceptors = (baseURL = '') => ({
  requestBefore: ({ headers }: AxiosRequestConfig) => {
    if (process.env.NODE_ENV === 'v1/development') {
      if (baseURL?.includes('gyl-stage')) {
        // eslint-disable-next-line max-len
        headers['auth-header-params'] = '%7B%22auth_store_id%22%3A100001023%2C%22auth_store_name%22%3A%22%E5%A4%A9%E9%97%A8%E8%90%A5%E8%BF%90%E7%AE%A1%E7%90%86%22%2C%22auth_store_no%22%3A%22TP0001%22%2C%22auth_user_id%22%3A50000203%2C%22auth_user_name%22%3A%22%E9%BB%84%E9%92%B0%E5%AE%B8%22%2C%22auth_user_no%22%3A%22B9466%22%2C%22platform_id%22%3A30%2C%22platform_name%22%3A%22%E4%BA%A4%E6%98%93%E5%B9%B3%E5%8F%B0%EF%BC%88%E8%90%A5%E8%BF%90%EF%BC%89%22%2C%22platform_no%22%3A%22P00027%22%2C%22tenant_id%22%3A100001023%2C%22tenant_name%22%3A%22%E5%A4%A9%E9%97%A8%E8%90%A5%E8%BF%90%E7%AE%A1%E7%90%86%22%2C%22tenant_no%22%3A%22TP0001%22%2C%22user_id%22%3A50000203%2C%22user_name%22%3A%22%E9%BB%84%E9%92%B0%E5%AE%B8%22%2C%22user_no%22%3A%22B9466%22%7D'
      } else if (baseURL?.includes('gyl-dev')) {
        // eslint-disable-next-line max-len
        headers['auth-header-params'] = '%7B%22platform_id%22%3A25%2C%22platform_name%22%3A%22%E4%BA%A4%E6%98%93%E5%B9%B3%E5%8F%B0%EF%BC%88%E8%90%A5%E8%BF%90%EF%BC%89%22%2C%22platform_no%22%3A%22P00027%22%2C%22tenant_id%22%3A50000234%2C%22tenant_name%22%3A%22%E8%90%A5%E8%BF%90%E7%AE%A1%E7%90%86%22%2C%22tenant_no%22%3A%22TP0001%22%2C%22user_id%22%3A50000082%2C%22user_name%22%3A%22admin%22%2C%22user_no%22%3A%22B0001%22%7D'
      }
      headers['system-ua'] = 'gateway-platform'
    }
  }
})
export const CreateAxios = (baseURL?: string) => Create(baseURL, interceptors(baseURL))
export const CreateRequest: AxiosCreateRequest = params => Request(params, interceptors(params.baseURL))
export default CreateAxios
