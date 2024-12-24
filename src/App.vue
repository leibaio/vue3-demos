<template>
  <LayoutWrapper>
    <router-view />
  </LayoutWrapper>
</template>

<script setup lang="ts">
import LayoutWrapper from "@/layouts/LayoutWrapper.vue";
</script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--color-bg);
}
#app {
  color: var(--color-text);
  background-color: var(--color-bg);
}
</style>
