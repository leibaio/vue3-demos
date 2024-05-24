<template>
  <div class="container">
    <div class="item" ref="cardRef">
      <div class="light" ref="lightRef" v-if="showLight"></div>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <!-- <div class="item" ref="cardRef1">
      <div class="light" ref="lightRef1" v-if="showLight1"></div>
    </div>
    <div class="item" ref="cardRef2">
      <div class="light" ref="lightRef2" v-if="showLight2"></div>
    </div>
    <div class="item" ref="cardRef3">
      <div class="light" ref="lightRef3" v-if="showLight3"></div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useLightCard } from "@/hooks";

const { cardRef, lightRef, showLight } = useLightCard();
// const {
//   cardRef1: cardRef1,
//   lightRef1: lightRef1,
//   showLight1: showLight1,
// } = useLightCard();
// const {
//   cardRef2: cardRef2,
//   lightRef2: lightRef2,
//   showLight2: showLight2,
// } = useLightCard();
// const {
//   cardRef3: cardRef3,
//   lightRef3: lightRef3,
//   showLight3: showLight3,
// } = useLightCard();
</script>

<style scoped lang="less">
.container {
  background: black;
  width: 100%;
  height: 100%;
  padding: 200px;
  display: flex;
  justify-content: space-between;

  .item {
    position: relative;
    width: 125px;
    height: 125px;
    background: #1c1c1f;
    border: 1px solid rgba(255, 255, 255, 0.1);

    .light {
      width: 60px;
      height: 60px;
      background: #ff4132;
      filter: blur(40px);
      position: absolute;
    }
  }
}
</style>
