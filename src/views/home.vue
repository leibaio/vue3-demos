<template>
  <section class="index-container">home</section>
</template>

<script setup>
import { onMounted, getCurrentInstance } from "vue";

// 组件名称由文件名决定, 在<script setup>标签中不需要声明
// DefineComponent，props，emits，components 在此也不需要声明

// setup() 函数中的逻辑现在可以直接在 <script setup> 中实现

// 你可以按需要导入使用其他组合式 API 的功能
// 如reactive, ref, toRefs, nextTick, computed, watch 等

// 获取当前组件实例，如果需要的话
const { proxy } = getCurrentInstance();

onMounted(() => {
  console.log("Component is mounted!");
});

// 如果需要 return 东西给模板使用，可以直接声明响应式状态或计算属性
</script>

<style scoped lang="less">
/* 你的样式 */
</style>
