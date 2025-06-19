<template>
  <div>
    <div>
      num1:
      <input
        type="number"
        v-model.number="num1"
        class="w-100 border mb-5 mt-5"
      />
    </div>
    <div>
      num2:
      <input type="number" v-model.number="num2" class="w-100 border mb-5" />
    </div>
    <div>sum: {{ sum }}</div>

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="handleClickCount"
    >
      Button
    </button>
  </div>
</template>

<script setup>
import { ref, onActivated, onDeactivated } from "vue";
import { useAdd } from "@/hooks";

defineOptions({
  name: "Add",
});

const num1 = ref(0);
const num2 = ref(0);
const { sum } = useAdd(num1, num2);

const handleClickCount = () => {
  num1.value++;
};

onActivated(() => {
  console.log("Add 组件被激活");
});

onDeactivated(() => {
  console.log("Add 组件被缓存");
});
</script>

<style lang="less" scoped></style>
