<template>
  <div
    class="w-screen h-[200px] flex"
    style="
      background: linear-gradient(-90deg, #6d6d6d10 1px, transparent 0),
        linear-gradient(#6d6d6d10 1px, transparent 0),
        linear-gradient(-90deg, #6d6d6d10 1px, transparent 0),
        linear-gradient(#6d6d6d10 1px, transparent 0),
        linear-gradient(
          transparent 6px,
          transparent 0,
          transparent 156px,
          transparent 0
        ),
        linear-gradient(-90deg, #6d6d6d10 1px, transparent 0),
        linear-gradient(
          -90deg,
          transparent 6px,
          transparent 0,
          transparent 156px,
          transparent 0
        ),
        linear-gradient(#6d6d6d10 1px, transparent 0), 0 0;
      background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px,
        100px 100px, 100px 100px, 100px 100px, 100px 100px;
    "
  >
    <div
      class="flex transition-transform duration-0 ease-linear"
      :style="{ transform: `translateX(${-scrollPosition}px)` }"
    >
      <div
        v-for="item in displayItems"
        :key="item.id"
        class="min-w-[300px] h-[200px] mr-[20px] border-solid border-2 border-indigo-600 flex justify-center"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
const scrollPosition = ref(0);
const scrollSpeed = ref(1);
const itemWidth = ref(320);

const carouselItems = reactive([
  {
    id: 1,
    title: "Item 1",
  },
  {
    id: 2,
    title: "Item 2",
  },
  {
    id: 3,
    title: "Item 3",
  },
  {
    id: 4,
    title: "Item 4",
  },
]);

const displayItems = computed(() => {
  return [...carouselItems, ...carouselItems];
});

const totalWidth = computed(() => {
  return carouselItems.length * itemWidth.value;
});

setInterval(() => {
  scrollPosition.value += scrollSpeed.value;
  if (scrollPosition.value > totalWidth.value) {
    scrollPosition.value = 0;
  }
}, 10);
</script>

<style lang="less" scoped></style>
