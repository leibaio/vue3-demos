<template>
  <section class="index-container">
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
    <button @click="handleMouseClick">btn</button>
  </section>
</template>

<script setup>
import { useMousePosition, useNavigation } from "@/hooks";

const { goToMouseLight, goToAdd } = useNavigation();
const { x, y } = useMousePosition();

const handleMouseClick = () => {
  console.log("[ x,y ] >", x.value, y.value);
};
</script>

<style scoped lang="less"></style>
