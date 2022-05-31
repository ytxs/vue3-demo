import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import qiankun from 'vite-plugin-qiankun'
import externalGlobals from 'rollup-plugin-external-globals'
import Unocss from 'unocss/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import styleImport from 'vite-plugin-style-import'
import html from 'vite-plugin-html'

// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
import unocssConfig from 'wjh-biz-common/configs/unocss'

console.log('-------------------------', process.env.NODE_ENV, '------------------------')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package')
// useDevMode 开启时与热更新插件冲突
const useDevMode = true // 如果是在主应用中加载子应用vite,必须打开这个,否则vite加载不成功, 单独运行没影响

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: new Date().toLocaleString(),
}
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // 根据运行环境判断加载的环境变量
  const runMode = mode.split('/').length > 1 ? mode.split('/')[1] : mode
  const envUrl = mode.split('/').length > 1 ? `env/${mode.split('/')[0]}` : 'env/'

  const envDir = `${process.cwd()}/${envUrl}`
  const env = loadEnv(runMode, envDir)
  env.command = command
  return {
    base: `${env.VITE_APP_Public_Path}/`,
    envDir, // 设置环境变量路径
    build: {
      sourcemap: true,
      assetsDir: 'static/img/',
      rollupOptions: {
        external: ['vue', 'element-plus', 'vue-router', 'echarts', 'VueDemi', 'pinia', 'exceljs', 'xe-utils', 'vxe-table-plugin-export-xlsx', 'vxe-table'],
        plugins: [
          externalGlobals({
            vue: 'Vue',
            'element-plus': 'ElementPlus',
            'vue-router': 'VueRouter',
            echarts: 'Echarts',
            VueDemi: 'vue-demi',
            pinia: 'Pinia',
            exceljs: 'ExcelJS',
            'xe-utils': 'XEUtils',
            'vxe-table-plugin-export-xlsx': 'VXETablePluginExportXLSX',
            'vxe-table': 'VXETable',
          })
        ],
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/assets/[name]-[hash].[ext]',
        },
      },
    },
    plugins: [
      vue({ reactivityTransform: true }),
      qiankun('vue3Vite', { useDevMode }),
      Unocss(unocssConfig),
      viteCompression({
        // 生成压缩包gz
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      html({
        minify: true,
      }),
    ],
    // 引入全局stylus文件
    css: {
      preprocessorOptions: {
        stylus: {
          additionalData: `@import 'wjh-biz-common/styles/var.styl'`,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
        '#': 'wjh-biz-common/types', // 设置 `#` 指向 `types` 目录
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
    define: {
      'process.env': env,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    server: {
      port: 7302, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      host: true, // 开启本地和局域网，方便后端联调
      fs: {
        strict: false
      },
      watch: {
        ignored: ['!**/node_modules/wjh-biz-common/**'],
        usePolling: true
      },

      // 设置代理，根据我们项目实际情况配置
      proxy: {
        // [env.VITE_APP_PHP_API]: {
        //   // target: 'http://gyl.com',
        //   target: 'http://c-supply-admin-api.gyl-dev.local.wangjiahuan.com',
        //   changeOrigin: true,
        //   secure: false,
        //   rewrite: (path: string) => path.replace(env.VITE_APP_PHP_API, '')
        // },
      }
    }
  }
})
