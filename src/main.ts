import { createApp } from 'vue'
import '../tailwind.css'
import App from './App.vue'

// 引入路由文件
import router from './router/index'
// 引入store文件
import store from './store/index'

createApp(App).use(router).use(store).mount('#app')
