<template>
  <wjh-layout
    v-loading="isLoading"
    :showMenu="command === 'serve' && !isMicroApp"
    :store="store"
    :menu-list="menuList"
  ></wjh-layout>
</template>

<script setup lang="ts">
// import zh from 'element-plus/lib/locale/lang/zh-cn'
import { toMenuList } from 'wjh-biz-common/utils'
import routes from '@/router'

const store = useStore()
const { command } = process.env
const globalConfig = $globalConfig()
const isMicroApp = ref(true)
onMounted(async() => {
  // const res = await store.main.getRelations('audit_status') // 获取单条数据，返回值是数组
  // const res = await store.main.getRelations(['audit_status', 'business_type', 'invoice_method']) // 获取多条数据，返回值是对象，对象的值是数组
  // const res = await store.main.getRelations('getAll') // 如果获取所有的，使用'getAll'
  // console.log('store.main.getRelations()', res)
})
nextTick(() => {
  isMicroApp.value = !!globalConfig.isMicroApp
})
const menuList = toMenuList(routes, '')
let isLoading = false
defineExpose({
  isLoading
})

</script>

<style lang="stylus">
</style>
