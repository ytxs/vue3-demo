export default [
  {
    hidden: true,
    path: '/',
    redirect: '/home',
  },
  {
    path: '/base',
    name: 'Base',
    meta: { title: '常规布局', permissionPage: [] },
    component: () => import('@/views/Base.vue') // 懒加载 Axios 组件
  },
]
