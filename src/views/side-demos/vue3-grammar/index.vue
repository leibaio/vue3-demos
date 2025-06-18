<template>
  <div v-if="false">v-if false</div>
  <div v-show="false">v-show false</div>
  <div v-if="true">v-if true</div>
  <div v-show="true">v-show true</div>

  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="handleClickCount"
  >
    Button {{ count }}
  </button>
</template>
<script setup>
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const count = ref(0);

const handleClickCount = () => {
  count.value++;
};

console.log("[ router ] >", router);
console.log("[ route ] >", route.params);
console.log("[ window.location ] >", window.location);

watch(
  () => route.path,
  (newVal, oldVal) => {
    console.log("[ newVal ] >", newVal);
    console.log("[ oldVal ] >", oldVal);
  },
  { immediate: true }
);

watch(count, (newVal, oldVal) => {
  console.log("[ new Count ] >", newVal);
  console.log("[ old Count ] >", oldVal);
});

watchEffect(() => {
  console.log("[ watchEffect count.value ] >", count.value);
});
</script>
<style lang="less" scoped></style>
