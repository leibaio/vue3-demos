<template>
  <div>
    <h1>图片懒加载示例</h1>

    <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer"
      >生成图片</a
    >

    <div v-for="image in images" :key="image.id" class="image-wrapper">
      <img :data-src="image.url" alt="Lazy loaded image" class="lazy-image" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const images = ref([
  { id: 1, url: "https://picsum.photos/id/49/800/600" },
  { id: 2, url: "https://picsum.photos/id/238/800/600" },
  { id: 3, url: "https://picsum.photos/id/239/800/600" },
  { id: 4, url: "https://picsum.photos/id/240/800/600" },
  { id: 5, url: "https://picsum.photos/id/241/800/600" },
  { id: 6, url: "https://picsum.photos/id/242/800/600" },
  { id: 7, url: "https://picsum.photos/id/243/800/600" },
  { id: 8, url: "https://picsum.photos/id/244/800/600" },
  { id: 9, url: "https://picsum.photos/id/245/800/600" },
  { id: 10, url: "https://picsum.photos/id/246/800/600" },
]);

// Intersection Observer 实例
let observer = null;

onMounted(() => {
  // 确保 DOM 已经渲染完毕
  nextTick(() => {
    // 获取所有需要懒加载的图片元素
    const lazyImages = document.querySelectorAll(".lazy-image");

    // 配置观察器选项 (可选)
    const options = {
      root: null, // 默认为浏览器视口
      rootMargin: "0px", // 交叉区域的边距
      threshold: 0.1, // 目标元素 10% 进入视口时触发
    };

    // 创建 Intersection Observer 实例
    observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        // 如果元素进入了视口
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          if (src) {
            img.src = src; // 设置真实图片地址
            img.onload = () => {
              // 图片加载完成后可以移除占位符样式等
              img.classList.add("loaded"); // 添加一个类名表示已加载
            };
            img.onerror = () => {
              // 图片加载失败的处理
              console.error("Image failed to load:", src);
              img.src = "https://picsum.photos/id/60/200/300"; // 可以显示一个错误图片
            };
            observerInstance.unobserve(img); // 停止观察已加载的图片
          }
        }
      });
    }, options);

    // 开始观察所有图片
    lazyImages.forEach((img) => {
      observer.observe(img);
    });
  });
});

// 组件卸载时停止观察
onUnmounted(() => {
  if (observer) {
    observer.disconnect(); // 停止所有观察
    observer = null;
  }
});
</script>

<style scoped>
.image-wrapper {
  margin-bottom: 20px;
  height: 400px; /* 模拟图片高度，让有些图片一开始在视口外 */
  background-color: #f0f0f0; /* 占位背景色 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  opacity: 0; /* 初始隐藏，加载后渐显 */
}

.lazy-image.loaded {
  opacity: 1; /* 加载完成显示 */
}
</style>
