import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@', //指向的是src目录
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  base: './', // 打包路径
  server: {
    port: 8888, // 服务端口
    open: true, // 启动服务时是否自动打开浏览器
    cors: true, // 允许跨域
  }
})
