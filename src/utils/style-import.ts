import { App } from 'vue'
import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'
import VXETablePluginElement from 'wjh-biz-common/lib/vxe-table-plugin-element'
import 'wjh-biz-common/lib/vxe-table-plugin-element/style.min.css'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
  size: 'small',
  zIndex: 2000,
})
VXETable.use(VXETablePluginElement)

const useTable = (app: App) => {
  // 表格功能
  app.use(VXETable)
}
export function styleImport(app: App) {
  useTable(app)
  return app
}
export default styleImport
