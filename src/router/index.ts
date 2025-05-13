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
    path: "/gsap",
    name: "Gsap",
    meta: { layout: "sidebar" },
    component: () => import("@/views/side-demos/gsap/index.vue"),
  },
  {
    path: "/add",
    name: "Add",
    meta: { layout: "sidebar" },
    component: () => import("@/views/add/index.vue"),
  },
  {
    path: "/communication",
    name: "Communication",
    meta: { layout: "sidebar" },
    component: () => import("@/views/communication/index.vue"),
  },
  {
    path: "/canvas",
    name: "Canvas",
    meta: { layout: "sidebar" },
    component: () => import("@/views/canvas/index.vue"),
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

export default router;
