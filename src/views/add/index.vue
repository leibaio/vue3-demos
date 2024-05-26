<template>
  <div>
    <div>
      num1:
      <input type="" v-model.number="num1" class="w-100 border mb-5 mt-5" />
    </div>
    <div>
      num2:
      <input type="text" v-model.number="num2" class="w-100 border mb-5" />
    </div>
    <div>sum: {{ sum }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAdd } from "@/hooks";

const num1 = ref(0);
const num2 = ref(0);
const { sum } = useAdd(num1, num2);
</script>

<style lang="less" scoped></style>
