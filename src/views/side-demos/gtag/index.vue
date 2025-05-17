<template>
  <h2>gtag</h2>
  <n-button @click="handleClick">Test</n-button>
  <n-button @click="rejectAll">Reject all</n-button>
  <n-button @click="acceptAll">Accept All</n-button>
</template>
<script setup>
import { addGtag, useConsent } from "vue-gtag";
const { acceptAll, rejectAll, hasConsent } = useConsent();

// https://matteo-gabriele.gitbook.io/vue-gtag

const handleClick = () => {
  addGtag();
};
</script>
<style lang="less" scoped></style>
