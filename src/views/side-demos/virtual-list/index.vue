<template>
  <h2>Virtual List</h2>
  <div
    ref="wrapper"
    class="wrapper w-[300px] h-[300px] p-2 rounded-md border-indigo-400 border-2 overflow-auto"
    @scroll="handleScroll"
  >
    <div :style="{ height: totalHeight + 'px' }">
      <div
        v-for="item in visibleItems"
        :key="item.index"
        class="item w-full mx-auto mb-2 p-2 bg-blue-200 text-center rounded-md absolute"
        :style="{ transform: `translateY(${item.top}px)` }"
      >
        Item {{ item.index }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const wrapper = ref(null);
const itemHeight = 50; // 假设每个项目的高度为50px
const totalItems = 100000;
const visibleItems = ref([]);
const scrollTop = ref(0);

const wrapperHeight = ref(0);
const showItemNum = computed(
  () => Math.ceil(wrapperHeight.value / itemHeight) + 2
);
const totalHeight = computed(() => totalItems * itemHeight);

const updateVisibleItems = () => {
  const start = Math.floor(scrollTop.value / itemHeight);
  const end = start + showItemNum.value;

  visibleItems.value = Array.from({ length: showItemNum.value }, (_, i) => ({
    index: start + i + 1,
    top: (start + i) * itemHeight,
  })).filter((item) => item.index <= totalItems);
};

const handleScroll = (e) => {
  scrollTop.value = e.target.scrollTop;
  updateVisibleItems();
};

onMounted(() => {
  wrapperHeight.value = wrapper.value.clientHeight;
  updateVisibleItems();
});
</script>

<style scoped>
.wrapper {
  position: relative;
}
.item {
  width: calc(100% - 1rem);
  box-sizing: border-box;
}
</style>
