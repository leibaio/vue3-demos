<template>
  <canvas id="tutorial" width="150" height="150"></canvas>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  let canvas = document.getElementById("tutorial");

  if (canvas instanceof HTMLCanvasElement) {
    let ctx = canvas.getContext("2d");

    if (ctx) {
      // 二次贝塞尔曲线
      ctx.beginPath();
      ctx.moveTo(75, 25);
      ctx.quadraticCurveTo(25, 25, 25, 62.5);
      ctx.quadraticCurveTo(25, 100, 50, 100);
      ctx.quadraticCurveTo(50, 120, 30, 125);
      ctx.quadraticCurveTo(60, 120, 65, 100);
      ctx.quadraticCurveTo(125, 100, 125, 62.5);
      ctx.quadraticCurveTo(125, 25, 75, 25);
      ctx.stroke();
    }
  }
});
</script>

<style lang="less" scoped></style>
