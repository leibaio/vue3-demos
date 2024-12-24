<template>
  <section>
    <div class="flex items-center justify-between p-6">
      <div class="flex items-center space-x-3">
        <h1
          class="text-xl font-bold hover:text-blue-200 cursor-pointer"
          @click="goToAdd"
        >
          Add
        </h1>
        <h1
          class="text-xl font-bold hover:text-blue-200 cursor-pointer"
          @click="goToMouseLight"
        >
          Mouse Light!
        </h1>
      </div>
      <ThemeSwitch />
    </div>
  </section>
</template>
<script setup>
import { ref, reactive } from "vue";
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import { useNavigation } from "@/hooks";
const { goToMouseLight, goToAdd } = useNavigation();
</script>
<style lang="less" scoped></style>
