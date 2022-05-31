import { createApp } from 'vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { createRouter, createWebHashHistory, RouterHistory } from 'vue-router'
import { QiankunProps } from 'vite-plugin-qiankun/es/helper'
import ElementPlus from 'element-plus'
import WjhBizCommon from 'wjh-biz-common'
import axios from 'wjh-biz-common/utils/axios'
import { styleImport } from '@/utils/style-import'
import routes from '@/router'
import { store } from '@/store'
import App from './App.vue'
import { setGlobalProperties } from '#/global' // 引入全局变量
import 'uno.css'

// let locale: any
let elementOptions: any
if (process.env.command === 'serve') {
  await import('vue-global-api')
  await import('element-plus/dist/index.css')
  await import('vxe-table/lib/style.css')
  await import('wjh-biz-common/styles/basic.styl')
  const { default: locale } = await import('element-plus/lib/locale/lang/zh-cn')
  elementOptions = {
    locale
  }
// eslint-disable-next-line no-undef
} else Object.assign(window, Vue)
import('@/styles/basic.styl')

let router = null
let app: any
let history: RouterHistory
function render(props: QiankunProps = {}) {
  const { container, routerBase, routerEntry } = props
  history = createWebHashHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? routerBase : '/')
  router = createRouter({
    history,
    routes,
  })

  app = createApp(App)
  setGlobalProperties(app.config.globalProperties)
  styleImport(app).use(WjhBizCommon, { axios }).use(router).use(store)
    .use(ElementPlus, elementOptions)
  app.config.globalProperties.isMicroApp = qiankunWindow.__POWERED_BY_QIANKUN__
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    app.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange
    app.config.globalProperties.$setGlobalState = props.setGlobalState
    app.config.globalProperties.$getGlobalState = props.getGlobalState
    app.config.globalProperties.$routerBase = routerBase
    app.config.globalProperties.$routerEntry = routerEntry
    console.log('我正在作为子应用运行')
  }
  app.mount(container ? container.querySelector('#app') : document.getElementById('app'))
}

// some code
renderWithQiankun({
  // 应用激活，类似于activated
  mount(props) {
    console.log('viteapp mount', props)
    render(props)
  },
  // 应用初始化，类似于created和mounted
  bootstrap() {
    console.log('bootstrap')
  },
  // 应用切出/卸载，类似于deactivated
  unmount(props) {
    console.log('vite被卸载了', props)
    app.unmount()
    app._container.innerHTML = ''
    history.destroy()// 不卸载  router 会导致其他应用路由失败
    router = null
    app = null
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
