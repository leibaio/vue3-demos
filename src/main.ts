// @ts-nocheck
import naive from "naive-ui";
import { createApp } from "vue";
import { configure } from "vue-gtag";
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

// const gtag = createGtag({
//   tagId: "G-DFCNSRM90R",
// });

configure({
  tagId: "G-DFCNSRM90R",
  initMode: "manual",
  pageTracker: {
    router,
    useScreenview: true,
  },
});

app.use(router).use(store).use(naive);

app.mount("#app");
