<template>
  <div class="avatar-chalk">
    <div
      v-for="w in words"
      :key="w.text"
      class="word"
      :style="{
        top: `${w.top}px`,
        left: `${w.left}px`,
        fontSize: `${w.size}px`,
        transform: `rotate(${w.rotate}deg)`,
      }"
    >
      {{ w.text }}
    </div>
  </div>
</template>

<script setup>
// 纯展示组件：零 props / 零 emits。
// 参考 Garmin 表盘 Chalk Watch 的视觉语言：手绘粉笔体、径向错位排版、
// 大字分置对角并冲出边缘、纯色满幅背景（无刻度 / 指针 / 图标装饰）。
//
// 几何必须写死，不能随机：<component :is> 没有 <KeepAlive>，每次切换都会卸载重挂，
// 若带 Math.random() 则「保存 → 切走 → 切回 → 保存」会得到两张不同的 PNG，
// 用户会当成 bug 报上来。
const words = [
  { text: "KEEP", top: -18, left: -34, rotate: -9, size: 118 },
  { text: "AND", top: 148, left: 244, rotate: 12, size: 62 },
  { text: "RISE", top: 176, left: -52, rotate: 7, size: 132 },
  { text: "ON", top: 306, left: 286, rotate: -14, size: 104 },
];
</script>

<style scoped>
/* 字体来自 index.html 的 Google Fonts <link>（Permanent Marker / Caveat）。
   这里刻意不写 @import —— 理由见 AvatarKeepCalm.vue 顶部注释。 */

/* 风格根元素契约，与 AvatarKeepCalm.vue 一致：
   position:relative（自己的包含块）、width/height:100%（铺满导出画布）、
   overflow:hidden（自己的裁剪面）、z-index < 10（低于 .preview-mask）。 */
.avatar-chalk {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000; /* 表盘是纯色满幅，不加噪点 */
  color: #fff;
  z-index: 0;
}

/* 用 HTML 文本 + CSS transform，绝不用 SVG <text>：
   html2canvas 是把内联 SVG 序列化成图片再光栅化的，而文档级 @font-face
   不作用于 SVG-as-image —— 导出会静默回落成 fallback 字形。
   overflow: hidden 的裁剪发生在裁剪祖先的 border box 上，与子元素是否 rotate 无关，
   所以旋转溢出会被切在 400 平面上，正是想要的（RISE 有意冲出边缘）。 */
.word {
  position: absolute;
  white-space: nowrap;
  font-family: "Permanent Marker", cursive;
  /* Permanent Marker 只有 400 一个字重，也没有斜体。
     加 font-synthesis: none 避免浏览器合成 faux-bold：屏幕上就是糊的，
     而 html2canvas 未必复现合成字重，会导致「屏幕 ≠ 导出」。 */
  font-weight: 400;
  font-synthesis: none;
  line-height: 1;
}
</style>