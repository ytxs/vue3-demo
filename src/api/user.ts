import CreateAxios from '@/utils/axios'

const request = CreateAxios(process.env.VITE_APP_BASE_API)
/*
* 用户信息
*/

// 获取系统信息
export function sendSmsCode(data = {}) {
  return request({
    url: `${import.meta.env.VUE_APP_BASE_API}/auth/listStoreUserSystems`,
    method: 'post',
    data
  })
}

// 获取系统信息
export function login(data = {}) {
  return request({
    url: `${import.meta.env.VUE_APP_BASE_API}/auth/listStoreUserSystems`,
    method: 'post',
    data
  })
}
