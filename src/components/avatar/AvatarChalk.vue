<template>
  <div class="avatar-chalk">
    <CrownIcon class="chalk-crown" color="#ffffff" />

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

    <div class="binary-wrapper">
      <div v-for="row in binaryRows" :key="row" class="binary-row">
        {{ row }}
      </div>
    </div>
  </div>
</template>

<script setup>
import CrownIcon from "./CrownIcon.vue";

// 纯展示组件：零 props / 零 emits。
// 参考 Garmin 表盘 Chalk Watch 的视觉语言：手绘粉笔体、错位排版、
// 大字与皇冠/数据行散落分布、纯色满幅背景（无刻度 / 指针）。
//
// 几何必须写死，不能随机：<component :is> 没有 <KeepAlive>，每次切换都会卸载重挂，
// 若带 Math.random() 则「保存 → 切走 → 切回 → 保存」会得到两张不同的 PNG，
// 用户会当成 bug 报上来。
//
// ⚠️ 位置不是「看着差不多」调出来的，是按 Permanent Marker 的真实字体度量算出来的。
// 字体文件里 upem=1024，各字母 advance（em）：K .7764 / E .6270 / P .6396 /
// A .7021 / N .6846 / D .5889 / R .6465 / I .5156 / S .5762 / O .7441。
// 于是 KEEP=2.670em、RISE=2.365em、AND=1.976em、ON=1.429em。
// 配合 rotate 的 AABB 公式
//   halfW = (w·|cosθ| + h·|sinθ|)/2 , halfH = (w·|sinθ| + h·|cosθ|)/2
// （transform-origin 默认是 center），就能反解出每个词的 left/top。
// 上一版是估的，ON 在 left:286 / 104px 时右侧超框 45px、下方超 26px，
// KEEP 和 RISE 左上也各被切掉 40~59px —— 「显示不全」就是这么来的。
// 改数值请重跑这套算式，别肉眼估。
//
// 顺带一个坑：Permanent Marker 的 asc+desc = 1.427em，line-height 定为 1 时
// 半行距是负的（-0.2134em），基线落在盒子顶部下方 0.896em 处。
// 实测大写字母的墨迹范围是 0.151em ~ 0.938em，仍在盒子内，
// 所以上面的盒子级 AABB 计算是偏保守的，够用。
const words = [
  { text: "KEEP", top: 58, left: 39.9, rotate: -8, size: 84 },
  { text: "RISE", top: 184, left: 27.2, rotate: 6, size: 92 },
  { text: "AND", top: 151, left: 272.5, rotate: 11, size: 42 },
  { text: "ON", top: 280, left: 252.6, rotate: -12, size: 72 },
];

// 二进制行 —— 解出来正是 "calm"（01100011=c 01100001=a / 01101100=l 01101101=m）
const binaryRows = ["01100011 01100001", "01101100 01101101"];
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
   不作用于 SVG-as-image —— 导出会静默回落成 fallback 字形。 */
.word {
  position: absolute;
  white-space: nowrap; /* 绝对定位 + nowrap => 宽度就是 max-content，即文本实际宽度，
                          上面的 AABB 计算才成立 */
  font-family: "Permanent Marker", cursive;
  /* Permanent Marker 只有 400 一个字重，也没有斜体。
     加 font-synthesis: none 避免浏览器合成 faux-bold：屏幕上就是糊的，
     而 html2canvas 未必复现合成字重，会导致「屏幕 ≠ 导出」。 */
  font-weight: 400;
  font-synthesis: none;
  line-height: 1;
}

/* 皇冠比 Keep Calm 那版（100px）小得多，只作点缀。
   必须走 color 属性而不是 CSS fill 或 filter：html2canvas 序列化内联 SVG 时
   属性一定被带出去，靠级联的填充/滤镜则未必。
   Keep Calm 那边仍是「默认黑填充 + filter: invert(100%)」，不受这里影响 ——
   scoped 样式的 scope 属性按渲染它的父组件生成，两个风格互不串味。 */
.chalk-crown {
  position: absolute;
  top: 52px;
  left: 282px;
  width: 44px;
  height: 44px;
}

/* 数据行。用 translateX(-50%) 而不是把 left 写成 59.4px：
   那个值是按 Caveat 实测宽度 121.2px 反推的，字体一旦回落就会偏心；
   按中心点定位则与文本实际宽度无关。 */
.binary-wrapper {
  position: absolute;
  top: 318px;
  left: 120px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.binary-row {
  font-family: "Caveat", cursive;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  font-weight: 400;
  font-synthesis: none;
  letter-spacing: 1px;
  line-height: 1.3;
  white-space: nowrap;
}
</style>