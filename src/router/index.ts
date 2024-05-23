import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/mouse-light',
    name: 'MouseLight',
    component: () => import('@/views/mouse-light/index.vue')
  },
  {
    path: '/',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router