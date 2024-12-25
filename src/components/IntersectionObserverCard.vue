<template>
  <h3>
    IntersectionObserver API
    <a
      href="https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html"
      target="_blank"
      class="text-blue-500 mx-2"
      >阮一峰教程</a
    >
    <a
      href="https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver"
      class="text-blue-500"
      >MDN</a
    >
  </h3>
  <div>
    传统使用 scroll 方法监听，调用目标元素的 getBoundingClientRect()
    方法，再判断是否在视口内。缺点是 scroll 事件密集，计算量大，容易造成性能问题
  </div>

  <h2 class="font-bold">
    Enter <span :style="{ color: nowColor }">{{ nowName }}</span>
  </h2>
  <div class="w-[500px] h-[500px] overflow-auto border border-blue-500">
    <div v-for="item in cardInfo" :key="item.name">
      <div>{{ item.name }}</div>
      <p
        :ref="
          (el) => {
            if (el) cardRefs.push({ el, name: item.name });
          }
        "
        class="w-full h-[600px]"
        :style="{ backgroundColor: item.color }"
      ></p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";

const nowName = ref("");
const nowColor = ref("");
const cardRefs = ref([]);

const cardInfo = reactive([
  { name: "card1", color: "purple" },
  { name: "card2", color: "blue" },
  { name: "card3", color: "yellow" },
  { name: "card4", color: "cyan" },
]);

let observer = null;

onMounted(() => {
  // let io = new IntersectionObserver(callback, option)
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nowName.value = entry.target._name;
          nowColor.value = cardInfo.find(
            (item) => item.name === entry.target._name
          ).color;
        }
      });
    },
    { threshold: 0.1 }
  );

  // 将所有卡片元素添加到观察器中
  cardRefs.value.forEach(({ el, name }) => {
    el._name = name; // 将名称存储在元素上
    observer.observe(el);
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style lang="less" scoped></style>
