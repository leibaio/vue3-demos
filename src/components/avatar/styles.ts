import { markRaw, type Component } from "vue";

import AvatarKeepCalm from "./AvatarKeepCalm.vue";

export interface AvatarStyle {
  /** 稳定标识，切换器的 v-model 值。收成字面量联合 —— 写错 key 即编译错误 */
  key: "keepcalm";
  /** 切换器上的显示名 */
  label: string;
  /** 导出 PNG 的文件名 */
  fileName: string;
  /**
   * 风格组件。必须 markRaw：Vue 会把组件定义也代理掉，
   * 代理后 `<component :is>` 的同一性判断失效并告警。
   */
  component: Component;
  /**
   * 该风格用到的字体 shorthand，交给 document.fonts.load() 预热。
   * 只能加载文档里已存在的 @font-face —— 字体由 index.html 的 <link> 提供，
   * 不依赖某个风格组件是否被挂载过。
   */
  fonts: string[];
}

export const avatarStyles: readonly AvatarStyle[] = Object.freeze([
  {
    key: "keepcalm",
    label: "Keep Calm",
    fileName: "KeepCalm_RiseOn_Avatar.png",
    component: markRaw(AvatarKeepCalm),
    fonts: ["900 64px Montserrat", "700 24px Montserrat", "700 18px Inconsolata"],
  },
]);

export type AvatarStyleKey = AvatarStyle["key"];