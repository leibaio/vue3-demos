// @ts-nocheck
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    meta: { layout: "default" },
    component: () => import("@/views/home.vue"),
  },
  {
    path: "/mouse-light",
    name: "MouseLight",
    meta: { layout: "sidebar" },
    component: () => import("@/views/side-demos/mouse-light/index.vue"),
  },
  {
    path: "/virtual-list",
    name: "VirtualList",
    meta: { layout: "sidebar" },
    component: () => import("@/views/side-demos/virtual-list/index.vue"),
  },
  {
    path: "/tab-a",
    name: "TabA",
    meta: { layout: "sidebar" },
    component: () => import("@/views/side-demos/tab-a/index.vue"),
  },
  {
    path: "/tab-b",
    name: "TabB",
    meta: { layout: "sidebar" },
    component: () => import("@/views/side-demos/tab-b/index.vue"),
  },
  {
    path: "/gtag",
    name: "GTag",
    meta: { layout: "sidebar" },
    component: () => import("@/views/side-demos/gtag/index.vue"),
  },
  {
    path: "/threejs",
    name: "Threejs",
    meta: { layout: "sidebar" },
    component: () => import("@/views/side-demos/threejs/index.vue"),
  },
  {
    path: "/gsap",
    name: "Gsap",
    meta: { layout: "sidebar" },
    component: () => import("@/views/side-demos/gsap/index.vue"),
  },
  {
    path: "/add",
    name: "Add",
    meta: { layout: "sidebar" },
    component: () => import("@/views/side-demos/add/index.vue"),
  },
  {
    path: "/communication",
    name: "Communication",
    meta: { layout: "sidebar" },
    component: () => import("@/views/side-demos/communication/index.vue"),
  },
  {
    path: "/canvas",
    name: "Canvas",
    meta: { layout: "sidebar" },
    component: () => import("@/views/side-demos/canvas/index.vue"),
  },
  {
    path: "/",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) => {
  document.title = to.name ? to.name : "Vite +  Vue3 + TS";
});

export default router;
