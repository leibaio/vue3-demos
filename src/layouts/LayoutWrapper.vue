<template>
  <component :is="layout">
    <slot></slot>
  </component>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "./DefaultLayout.vue";
import SidebarLayout from "./SidebarLayout.vue";

const route = useRoute();

const layout = computed(() => {
  const layoutName = (route.meta.layout || "default") + "Layout";
  switch (layoutName) {
    case "defaultLayout":
      return DefaultLayout;
    case "sidebarLayout":
      return SidebarLayout;
    default:
      return DefaultLayout;
  }
});
</script>
<style lang="less" scoped></style>
