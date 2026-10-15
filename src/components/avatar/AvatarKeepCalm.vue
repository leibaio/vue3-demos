<template>
  <div class="avatar-keepcalm">
    <div class="content-wrapper">
      <CrownIcon />

      <div class="text keep">KEEP</div>

      <div class="binary-wrapper">
        <div class="binary-row">01100011 01100001</div>
        <div class="binary-row">01101100 01101101</div>
      </div>

      <div class="text and">AND</div>
      <div class="text rise">RISE</div>
      <div class="text on">ON</div>
    </div>
  </div>
</template>

<script setup>
import CrownIcon from "./CrownIcon.vue";
// 纯展示组件：零 props / 零 emits。
// 文案与几何全部写死在模板里，保证「保存」导出的 PNG 每次完全一致。
</script>

<style scoped>
/* 字体来自 index.html 的 Google Fonts <link>（Montserrat / Inconsolata）。
   这里刻意不写 @import：SFC 内的 @import 只在本组件挂载后才生效，
   会让「字体是否可用」耦合到「用户是否点过这个风格」。 */

/* 风格根元素契约（src/components/avatar/ 下每个风格都必须满足）：
   position:relative  -> 自己做包含块，给内部溢出元素用（不是外层 .capture-frame 的）
   width/height:100%  -> 等于 .capture-frame 的内容盒；背景才能铺满导出画布
   overflow:hidden    -> 自己的裁剪面
   z-index < 10       -> 必须低于 .preview-mask 的 z-index: 10 —— 别动这个值 */
.avatar-keepcalm {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;

  /* 以下背景逐字节搬自原 Avatar.vue 的 .capture-container */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E"),
    linear-gradient(to bottom, #f2e9e0, #e8ded5, #d1baaa, #a68573);
  /* #E8DED5 → #D1BAAA → #C77E5E #DCAB88  */
  /* #F2E9E0 → #E8DED5 → #D1BAAA → #A68573 */
  display: flex;
  align-items: center;
  justify-content: center;
  /* box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); */
}

/* ===== 以下样式逐字节搬自原 Avatar.vue，未做任何视觉改动 ===== */
/* 内容垂直排列 */
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 关键点：使用 gap 控制垂直韵律，比 margin 更精准 */
  /* gap: 6px; */
  /* 视觉中心微调：稍微向上提一点，符合人眼对构图的感知 */
  /* padding-bottom: 20px; */
  z-index: 1;
}

/* 皇冠样式 */
.crown-icon {
  /* 皇冠是视觉锚点，保持 100px 宽度 (占比 25%) */
  width: 100px;
  height: 100px;
  margin-bottom: 5px; /* 皇冠与下方文字稍微拉开 */
  filter: invert(100%); /* 纯白 */
  drop-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 字体通用样式 */
.text {
  color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  line-height: 0.95;
  /* 优化文字阴影，更细腻的立体感 */
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05), 0 2px 3px rgba(0, 0, 0, 0.1);
  /* 添加极轻微的描边，增强在复杂背景上的辨识度 */
  -webkit-text-stroke: 0.3px rgba(0, 0, 0, 0.1);
  paint-order: stroke fill;
}

/* 核心大字 */
.keep,
.rise,
.on {
  font-size: 64px; /* 足够大，确保头像缩略图也能看清 */
}

/* 连接词 */
.and {
  font-size: 24px;
  font-weight: 700;
  margin: 6px 0;
  opacity: 0.9;
}

/* 二进制区域 - 模拟块状感 */
.binary-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px 0;
}

.binary-row {
  font-family: "Inconsolata", monospace;
  color: rgba(255, 255, 255, 0.9); /* 稍微降低不透明度，增加层次 */
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px; /* 拉开字距，模拟长方形块 */
  line-height: 1.2;
}
</style>
