<template>
  <n-config-provider>
    <LayoutWrapper>
      <router-view />
    </LayoutWrapper>
  </n-config-provider>
</template>

<script setup>
import LayoutWrapper from "@/layouts/LayoutWrapper.vue";
import { NConfigProvider } from "naive-ui";
</script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: var(--color-bg);
}
#app {
  color: var(--color-text);
  background-color: var(--color-bg);
}
</style>
