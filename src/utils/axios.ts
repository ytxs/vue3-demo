import Create from 'wjh-biz-common/utils/axios'
import { AxiosRequestConfig } from 'axios'
import { AxiosInstance } from '#'

const CreateAxios = (baseURL = ''): AxiosInstance => Create(baseURL, { requestBefore: ({ headers }: AxiosRequestConfig) => {
  if (process.env.NODE_ENV === 'development') {
    if (baseURL?.includes('gyl-stage')) {
      // eslint-disable-next-line max-len
      headers['auth-header-params'] = '%7B%22user_id%22%3A%202%2C%22user_name%22%3A%20%22%E9%BB%84%E6%98%A5%E9%BE%99abc%22%2C%22user_no%22%3A%20%22U00000156%22%2C%22platform_id%22%3A%203%2C%22platform_no%22%3A%20%22P0003%22%2C%22platform_name%22%3A%20%22%E4%B8%8A%E6%B5%B7%E4%BE%9B%E5%BA%94%E9%93%BE(%E8%90%A5%E8%BF%90)%22%2C%22tenant_id%22%3A%209%2C%22tenant_no%22%3A%20%22T00000021%22%2C%22tenant_name%22%3A%20%22%E4%B8%8A%E6%B5%B7%E5%B9%B3%E5%8F%B0%20%22%7D'
    } else if (baseURL?.includes('gyl-dev')) {
      // eslint-disable-next-line max-len
      headers['auth-header-params'] = '%7B%22platform_id%22%3A5%2C%22platform_name%22%3A%22%E5%BC%80%E5%8F%91%E5%B9%B3%E5%8F%B0%22%2C%22platform_no%22%3A%22P0005%22%2C%22tenant_id%22%3A17%2C%22tenant_name%22%3A%22T0001%22%2C%22tenant_no%22%3A%22%E5%BC%80%E5%8F%91%E7%A7%9F%E6%88%B7%22%2C%22user_id%22%3A17%2C%22user_name%22%3A%22%E5%BC%A0%E4%B8%89%22%2C%22user_no%22%3A%22U0001%22%7D'
    }
    headers['system-ua'] = 'gateway-platform'
  }
} })
export default CreateAxios
