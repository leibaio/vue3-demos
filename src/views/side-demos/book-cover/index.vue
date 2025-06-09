<template>
  <h2>book cover</h2>
  <div
    ref="coverContainer"
    class="rounded border border-spacing-2 border-blue-500 w-[300px] h-[300px] bg-fuchsia-200 relative"
  >
    <div
      ref="titleElement"
      class="absolute cursor-move select-none"
      :style="{ left: titlePosition.x + 'px', top: titlePosition.y + 'px' }"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      {{ title }}
    </div>
  </div>
  <button
    @click="captureImage"
    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
  >
    Capture Image
  </button>
</template>
<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import html2canvas from "html2canvas";

/**
 * 防抖
 * 原理：触发事件以后，延迟 n 秒后执行，如果在这 n 秒内再次触发事件，再推迟 n 秒执行
 * 输入框实时搜索，窗口调整完成后重新布局
 */
const myDebounce = (func, delay) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * 节流
 * 原理：触发时间以后，n 秒内只执行这一次，n 秒内再次触发事件，不执行
 * 滚动加载、按钮点击
 */
const myThrottle = (func, delay) => {
  let timer = null
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, delay);
  };

};

const title = ref("title xxx");
const coverContainer = ref(null);
const titleElement = ref(null);
const titlePosition = reactive({
  x: 0,
  y: 0,
});
let isDragging = false;
let startX, startY;

const startDrag = (e) => {
  isDragging = true;
  startX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
  startY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("touchend", stopDrag);
};

const drag = (e) => {
  if (!isDragging) return;

  console.log("[ e ] >", e);

  e.preventDefault();

  const currentX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
  const currentY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;

  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  const containerRect = coverContainer.value.getBoundingClientRect();
  const titleRect = titleElement.value.getBoundingClientRect();

  titlePosition.x = Math.max(
    0,
    Math.min(titlePosition.x + deltaX, containerRect.width - titleRect.width)
  );
  titlePosition.y = Math.max(
    0,
    Math.min(titlePosition.y + deltaY, containerRect.height - titleRect.height)
  );

  startX = currentX;
  startY = currentY;
};

const stopDrag = () => {
  console.log("[  ] >");
  isDragging = false;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("touchend", stopDrag);
};

const captureImage = async () => {
  if (coverContainer.value) {
    try {
      const element = coverContainer.value;
      const timeStart = performance.now();
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        ignoreElements: (node) => {
          if (
            node.contains(element) ||
            element.contains(node) ||
            element === node ||
            node.nodeName === "HEAD" ||
            node.nodeName === "STYLE" ||
            node.nodeName === "META" ||
            node.nodeName === "LINK"
          ) {
            return false;
          } else {
            return true;
          }
        },
      });
      const image = canvas.toDataURL("image/png");
      console.log(performance.now() - timeStart);
      const link = document.createElement("a");
      link.href = image;
      link.download = "book-cover.png";
      link.click();
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  }
};

onUnmounted(() => {
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("touchend", stopDrag);
});
</script>
<style lang="less" scoped></style>
