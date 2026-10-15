<template>
  <div class="page-wrapper">
    <div class="controls">
      <div class="toggle-wrapper">
        <label>
          <input type="checkbox" v-model="showPreviewMask" />
          开启圆形头像预览
        </label>
      </div>
      <button class="action-btn" :disabled="isCapturing" @click="captureImage">
        💾 保存高清头像
      </button>
    </div>

    <div class="canvas-wrapper">
      <!-- role="img" 让这是叶子节点：内部的装饰性文字被移出无障碍树，
           读屏只念 aria-label，不会把 KEEP / AND / RISE / ON 逐字念一遍 -->
      <div
        ref="captureDiv"
        class="capture-frame"
        role="img"
        :aria-label="`头像预览：${current.label}`"
      >
        <component :is="current.component" />
        <div v-if="showPreviewMask" class="preview-mask"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import html2canvas from "html2canvas";
import { computed, nextTick, ref } from "vue";

import { avatarStyles } from "./avatar/styles";

// 捕获的是 .capture-frame（外壳的节点），所以导出逻辑留在外壳；
// 唯一真正属于单个风格的是元数据（文件名、字体清单）—— 那些在注册表里。
const captureDiv = ref(null);
const showPreviewMask = ref(false);
const isCapturing = ref(false);

// 风格由注册表决定；切换器接上来之前先固定用第一条
const currentKey = ref(avatarStyles[0].key);
const current = computed(
  () => avatarStyles.find((s) => s.key === currentKey.value) ?? avatarStyles[0]
);

const captureImage = async () => {
  if (!captureDiv.value || isCapturing.value) return;
  isCapturing.value = true;

  const originalMaskState = showPreviewMask.value;
  try {
    // 只是把 v-if 置 false 不会立刻改 DOM，遮罩仍会被栅格化进导出图
    showPreviewMask.value = false;
    await nextTick();

    await document.fonts.ready;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(captureDiv.value, {
      scale: 3, // 400 × 3 = 1200
      useCORS: true,
      backgroundColor: null, // 底色由风格根自己铺满，这里不额外画
    });

    const link = document.createElement("a");
    link.download = current.value.fileName;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link); // Firefox 要求锚点已在文档内才触发下载
    link.click();
    link.remove();
  } finally {
    // 放在 finally：html2canvas 抛错时遮罩不能就此永久消失
    showPreviewMask.value = originalMaskState;
    isCapturing.value = false;
  }
};
</script>

<style scoped>
/* 页面布局 */
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  gap: 20px;
}

/* 控制栏样式 */
.controls {
  display: flex;
  gap: 20px;
  align-items: center;
  background: white;
  padding: 10px 20px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.toggle-wrapper label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #555;
  user-select: none;
}

.action-btn {
  background: #333;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s;
}

.action-btn:active {
  transform: scale(0.95);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: progress;
}

/* ===== 捕获框 =====
   外壳的承重结构。这三条都是必需的，改动前请先读懂每条的后果。 */
.capture-frame {
  /* 必须：.preview-mask 的定位锚点。
     没有定位祖先时遮罩按「初始包含块」解析，width/height: 100% 会变成视口尺寸 ——
     那就是之前出现过的、盖满整页的巨型白椭圆。 */
  position: relative;
  /* 必须：box-shadow 不被元素自身裁剪，只被祖先裁剪，而 frame 是唯一祖先。
     删掉它，遮罩那条 200px 的白色 box-shadow 溢散会铺满整个页面。 */
  overflow: hidden;
  /* 固定 400×400，不要改成 auto：
     ① html2canvas 按 border-box 栅格化，自动尺寸会让导出 PNG 的尺寸随风格内容浮动；
     ② 遮罩的 border-radius: 50% 只有 1:1 时才是正圆，非方形会变成椭圆。
     所以尺寸属于外壳，不属于风格。 */
  width: 400px;
  height: 400px;
  /* 把遮罩的 z-index 关在本框内，不和页面其它层叠上下文（如 naive-ui 弹层）比大小 */
  isolation: isolate;
  /* 刻意不加 background：frame 自己不画任何东西，背景归各风格根。
     也刻意不加 border / padding / border-radius：会让上面两条的裁剪面偏离 400 平面。 */
}

/* ⚠️ frame 上绝对不能加 display: flex ——
   flex 子项的 min-width 默认 auto，会被内容撑到 min-content。一个含 nowrap 宽文本的
   风格会把风格根的盒子撑到 400 以外（比如 -60…460），而风格根自带 overflow: hidden，
   它的裁剪面就跟着挪到 -60/460 而不是 0/400，渗出会被切在错误的位置。
   正确做法：frame 保持 block，flex 放在风格根上（见 avatar/AvatarKeepCalm.vue）。 */

/* 圆形预览遮罩层 —— 与风格根平级，禁止挪进任何风格 SFC：
   一旦它是风格根的后代，定位锚点就不再是 frame，上面两条契约同时失效。 */
.preview-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  /* 使用超大边框模拟镂空效果 */
  box-shadow: 0 0 0 200px rgba(255, 255, 255, 0.9);
  pointer-events: none; /* 让点击穿透 */
  /* 必须高于每个风格根的 z-index（契约要求它们 < 10） */
  z-index: 10;
}
</style>