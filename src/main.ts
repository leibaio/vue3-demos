// @ts-nocheck
import naive from "naive-ui";
import { createApp } from "vue";
import { createGtag } from "vue-gtag";
import "../tailwind.css";
import App from "./App.vue";
import "./theme/index.less";

// 引入路由文件
import router from "./router/index";
// 引入store文件
import store from "./store/index";

// 在开发环境中导入 mock 数据
if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === "true") {
  await import("./mock");
}

const app = createApp(App);

const gtagOptions = {
  config: { id: "G-DFCNSRM90R" },
  // enabled: true,
  // debug: true,
};

app.use(router).use(store).use(naive).use(createGtag(gtagOptions));

app.mount("#app");
