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
  {
    path: '/horizontal',
    name: 'Horizontal',
    meta: { title: '左右布局', permissionPage: [] },
    component: () => import('@/views/Horizontal.vue') // 懒加载 Axios 组件
  },
]
