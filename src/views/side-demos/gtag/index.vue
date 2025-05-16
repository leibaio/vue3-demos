<template>
  <h2>gtag</h2>
  <n-button @click="handleClick">Test</n-button>
</template>
<script setup>
import { ref, reactive } from "vue";
import { event } from "vue-gtag";

// https://matteo-gabriele.gitbook.io/vue-gtag

const handleClick = () => {
  event(
    "button_click",
    { button_name: "test_button" },
    {
      callback: () => {
        console.log("Event sent successfully");
      },
    }
  );
};
</script>
<style lang="less" scoped></style>
