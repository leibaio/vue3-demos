<template>
  <div class="gsap-container">
    <div class="box a mb-[500px]" ref="boxRefA"></div>
    <div class="box b mb-[500px]" ref="boxRefB"></div>
    <div class="box c mb-[500px]" ref="boxRefC"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, ref } from "vue";

gsap.registerPlugin(ScrollTrigger);

const boxRefA = ref<HTMLElement | null>(null);
const boxRefB = ref<HTMLElement | null>(null);
const boxRefC = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.to(".c", {
    scrollTrigger: {
      trigger: ".c",
      toggleActions: "restart none none none",
    },
    x: 400,
    rotation: 360,
    duration: 3,
  });
});
</script>

<style scoped lang="less">
.box {
  display: block;
  width: 75px;
  height: 75px;
  border-radius: 12px;

  &.a {
    background-color: #ff0000;
  }
  &.b {
    background-color: #00ff00;
  }
  &.c {
    background-color: #0000ff;
  }
}
</style>
