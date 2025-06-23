<template>
  <h1>Some days you bloom, some days you grow roots. Both matter.</h1>

  <input type="text" v-model.lazy="lazyValue" />

  <div>{{ lazyValue }}</div>

  <div>x:{{ x }},y:{{ y }}</div>

  <div v-if="false">v-if false</div>
  <div v-show="false">v-show false</div>
  <div v-if="true">v-if true</div>
  <div v-show="true">v-show true</div>

  <div>msg:{{ msg }}</div>

  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="handleClickCount"
  >
    Button {{ count }}
  </button>

  <button
    class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="handleOpenDialog"
  >
    Dialog Btn
  </button>

  <MyDialog v-model:visible="showDialog" @close="onCloseDialog">
    <template #header>
      <div>自定义的标题</div>
    </template>

    <template #default>
      <div>zxczxczxczxc</div>
    </template>

    <template #footer>
      <div>自定义的dooter</div>
    </template>
  </MyDialog>
</template>
<script setup>
import { useMove } from "@/hooks/useMove";
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import MyDialog from "./components/MyDialog.vue";

const router = useRouter();
const route = useRoute();
const count = ref(0);
const showDialog = ref(false);
const msg = ref("0");
const lazyValue = ref("");
const { x, y } = useMove();

msg.value = "q";
msg.value = "a";
msg.value = "e";

const handleClickCount = () => {
  count.value++;
};

const handleOpenDialog = () => {
  showDialog.value = true;
};

const onCloseDialog = () => {
  showDialog.value = false;
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
