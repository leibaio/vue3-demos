import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
    path: '/add',
    name: 'Add',
    component: () => import('@/views/add/index.vue')
  },
  {
    path: '/',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router