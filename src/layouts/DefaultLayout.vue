<template>
  <div class="default-layout">
    <header>
      <Header />
    </header>
    <main class="p-6 overflow-scroll">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>

<style scoped>
/* 布局样式 */
</style>
