<template>
  <div class="">Child</div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";

const childFun = () => {
  console.log("testFun");
};

// 使用 defineExpose 暴露方法
defineExpose({
  childFun,
});
</script>
<style lang="less" scoped></style>
