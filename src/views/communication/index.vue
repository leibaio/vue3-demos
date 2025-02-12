<template>
  <div class="">
    Father

    <Child ref="childRef" />

    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button @click="handleClickInvokeChildFun" type="info">test</n-button>
      </template>
      父组件调用子组件方法
    </n-tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Child from "./components/Child.vue";

interface ChildExpose {
  childFun: () => void;
}

const childRef = ref<ChildExpose | null>(null);

const handleClickInvokeChildFun = () => {
  if (childRef.value) {
    childRef.value.childFun();
  }
};
</script>
<style lang="less" scoped></style>
