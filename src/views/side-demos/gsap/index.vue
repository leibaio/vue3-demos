<template>
  <div class="gsap-container">
    <div ref="boxRef" class="box"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

const boxRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (boxRef.value) {
    gsap.to(boxRef.value, {
      x: 200,
      duration: 1, // 动画持续时间（秒）
      ease: "power2.out", // 缓动函数
    });
  }
});
</script>

<style scoped lang="less">
.box {
  display: block;
  width: 75px;
  height: 75px;
  border-radius: 12px;
  background-color: green;
}
</style>
