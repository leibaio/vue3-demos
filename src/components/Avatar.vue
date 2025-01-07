<template>
  <div
    class="w-80 h-80 bg-gradient-to-b from-blue-600 to-blue-300 flex items-center justify-center"
  >
    <div class="flex flex-col items-center justify-center text-white">
      <div class="mb-1">
        <img :src="KeepCalmCrown" alt="Crown" class="w-16 h-16 crown-icon" />
      </div>
      <div class="text-4xl font-bold mb-1">KEEP</div>
      <div class="flex flex-col items-center mb-1">
        <div class="text-2xl font-extrabold mb-1 binary-text">
          01100011&nbsp;&nbsp;&nbsp;01100001
        </div>
        <div class="text-2xl font-extrabold binary-text">
          01101100&nbsp;&nbsp;&nbsp;01101101
        </div>
      </div>
      <div class="text-2xl font-bold mb-1">AND</div>
      <div class="text-4xl font-bold mb-1">CODE</div>
      <div class="text-4xl font-bold">ON</div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import KeepCalmCrown from "@/assets/keep-calm-crown.svg";

// 字体网站 https://www.cdnfonts.com/
</script>
<style lang="less" scoped>
.crown-icon {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%)
    contrast(103%);
}

.binary-text {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
  // letter-spacing: 0.02em; // 可选：增加一点字母间距以提高可读性
}
</style>
