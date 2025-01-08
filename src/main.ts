// @ts-nocheck
import { createApp } from "vue";
import "../tailwind.css";
import App from "./App.vue";
import "./theme/index.less";
import naive from "naive-ui";

// 引入路由文件
import router from "./router/index";
// 引入store文件
import store from "./store/index";

createApp(App).use(router).use(store).use(naive).mount("#app");
