<template>
  <div class="mouse-light-container">
    <!-- 方块盒子 -->
    <div class="item" ref="cardRef1"></div>
    <!-- 方块盒子 -->
    <div class="item" ref="cardRef2"></div>
    <!-- 方块盒子 -->
    <div class="item" ref="cardRef3"></div>
  </div>
</template>

<script setup lang="ts">
import { useLightCard } from "@/hooks";

const { cardRef: cardRef1 } = useLightCard();
const { cardRef: cardRef2 } = useLightCard({
  light: {
    color: "#ffffff",
    width: 100,
  },
});
const { cardRef: cardRef3 } = useLightCard({
  light: {
    color: "yellow",
  },
});
</script>

<style scoped lang="less">
.mouse-light-container {
  background: var(--color-bg);
  width: 1024px;
  height: 100%;
  padding: 200px;
  display: flex;
  justify-content: space-between;

  .item {
    position: relative;
    width: 125px;
    height: 125px;
    background: #1c1c1f;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
