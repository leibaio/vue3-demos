<template>
  <section class="nav">
    <div class="flex space-x-3">
      <h1
        class="text-3xl font-bold underline hover:text-blue-200 cursor-pointer"
        @click="goToAdd"
      >
        Add
      </h1>
      <h1 class="text-3xl font-bold underline" @click="goToMouseLight">
        Mouse Light!
      </h1>
    </div>
  </section>
  <div class="index-container"></div>
  <ThemeSwitch />
</template>

<script setup>
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import { useNavigation } from "@/hooks";

const { goToMouseLight, goToAdd } = useNavigation();
</script>

<style scoped lang="less">
.index-container {
  height: calc(100vh - 66px);
  overflow: auto;
}
</style>
