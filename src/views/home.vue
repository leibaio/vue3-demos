<template>
  <section class="index-container">
    home
    <h1 class="text-3xl font-bold underline" @click="goToMouseLight">
      Mouse Light!
    </h1>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useNavigation } from "@/hooks";

const { goToMouseLight } = useNavigation();

onMounted(() => {
  console.log("Component is mounted!");
});
</script>

<style scoped lang="less"></style>
