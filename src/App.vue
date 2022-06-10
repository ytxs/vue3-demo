<template>
  <wjh-layout
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
nextTick(() => {
  isMicroApp.value = !!globalConfig.isMicroApp
})
const menuList = toMenuList(routes, '')
</script>

<style lang="stylus">
</style>
