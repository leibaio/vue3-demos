<template>
  <div class="text-truncate-container">
    <h2 class="text-2xl font-bold mb-4">多行文本溢出效果演示</h2>

    <h3 class="font-bold my-4">纯 css 方法 (-webkit-line-clamp)</h3>
    <div class="truncate-css">
      {{ longText }}
    </div>

    <h3 class="font-bold my-4">兼容性更好的 css 方法</h3>
    <div ref="jsElement" class="truncate-css-compatible">
      {{ longText }}
    </div>

    <h3 class="font-bold my-4">js 方法</h3>
    <a
      href="
    https://libin1991.github.io/2019/01/02/JS%E5%AE%9E%E7%8E%B0%E5%A4%9A%E8%A1%8C%E6%BA%A2%E5%87%BA%E7%9C%81%E7%95%A5%E5%8F%B7%E6%80%9D%E8%B7%AF/
    "
      >JS实现多行溢出省略号思路</a
    >
    <div ref="jsElement" class="truncate-js-compatible">
      {{ longText }}
    </div>
  </div>
</template>
<script setup>
/**
 用 css 或者 js 实现文本溢出省略号
*/
import { ref, reactive } from "vue";

const longText = ref(
  "这是一段很长的文本，用于演示多行文本溢出省略效果。我们将尝试使用不同的方法来实现这个效果，包括纯CSS方法和JavaScript方法。这个例子将展示如何在保持良好的用户体验的同时处理长文本。"
);
</script>
<style lang="less" scoped>
.text-truncate-container {
  width: 300px;
  height: 100%;
  border: blue 1px solid;

  .truncate-css {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .truncate-css-compatible {
    position: relative;
    max-height: 4.5em; /* 3 lines * 1.5 line-height */
    line-height: 1.5;
    overflow: hidden;
    max-width: 300px;
    padding-right: 1em;

    &::after {
      content: "...";
      position: absolute;
      bottom: 0;
      right: 0;
      padding-left: 40px;
      background: -webkit-linear-gradient(left, transparent, #fff 55%);
      background: -o-linear-gradient(right, transparent, #fff 55%);
      background: -moz-linear-gradient(right, transparent, #fff 55%);
      background: linear-gradient(to right, transparent, #fff 55%);
    }
  }
}
</style>
