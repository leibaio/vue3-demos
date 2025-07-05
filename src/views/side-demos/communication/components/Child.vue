<template>
  <div class="">
    Child

    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button @click="handleClickEmit" type="info">childTest</n-button>
      </template>
      父组件给子组件传参方法
    </n-tooltip>
    {{ props }}
  </div>
</template>
<script setup lang="ts">
import { ref, reactive  } from "vue";

const props = defineProps(["person"]);
const emit = defineEmits(["childTest"]);

const childFun = () => {
  console.log("testFun");
};

const handleClickEmit = () => {
  emit("childTest", "childTest asd zxc qwe");
};

// 使用 defineExpose 暴露方法
defineExpose({
  childFun,
});
</script>
<style lang="less" scoped></style>
