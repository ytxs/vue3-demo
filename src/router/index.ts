import { RouteRecord } from 'wjh-biz-common'
import v1 from './v1'

const route = {
  v1,
}

export const routes = route[process.env.VITE_APP_VERSION as keyof typeof route] as RouteRecord[]
export default routes
