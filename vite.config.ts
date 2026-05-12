import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 60528,   // 随机端口（由脚本生成）
    strictPort: false,     // 若被占用，Vite 会继续找下一个可用端口
    open: false
  },
  preview: {
    port: 60528,            // 预览端口保持默认，可按需改为随机
    strictPort: false
  }
})