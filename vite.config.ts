import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // gzip 压缩 
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // br 压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        // 分包策略
        manualChunks(id) {
          // node_modules 依赖包
          if (id.includes('node_modules')) {
            // vue 相关打包到一起
            if (id.includes('vue') || id.includes('pinia')) {
              return 'vue-vendor'
            }
            // element-plus 相关打包到一起
            if (id.includes('element-plus')) {
              return 'element-plus'
            }
            // echarts 相关打包到一起
            if (id.includes('echarts')) {
              return 'echarts'
            }
            // 其他依赖打包到一起
            return 'vendor'
          }
          // 业务代码按模块拆分
          if (id.includes('src/')) {
            const dirs = id.split('src/')[1].split('/')
            if (dirs[0] === 'views') {
              // 页面级组件单独打包
              return `views/${dirs[1]}`
            }
            // 其他模块按目录打包
            return dirs[0]
          }
        },
        // 用于从入口点创建的块的打包输出格式
        entryFileNames: 'js/[name]-[hash].js',
        // 用于命名代码分割时创建的共享块的输出命名
        chunkFileNames: 'js/[name]-[hash].js',
        // 用于输出静态资源的命名
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || ''
          // 图片类资源
          if (/\.(png|jpe?g|gif|svg|ico|webp)$/.test(name)) {
            return 'images/[name]-[hash][extname]'
          }
          // 字体类资源
          if (/\.(woff2?|eot|ttf|otf)$/.test(name)) {
            return 'fonts/[name]-[hash][extname]'
          }
          // 媒体类资源
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(name)) {
            return 'media/[name]-[hash][extname]'
          }
          // CSS 资源
          if (/\.css$/.test(name)) {
            return 'css/[name]-[hash][extname]'
          }
          // 其他资源
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    // 设置块大小警告的限制为 2000KB
    chunkSizeWarningLimit: 2000,
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 启用 CSS 压缩
    cssMinify: true,
    // 禁用 source map
    sourcemap: false,
    // 启用混淆和压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境时移除 console 和 debugger
        drop_console: true,
        drop_debugger: true,
        // 移除无用代码
        dead_code: true,
        // 移除未使用的变量
        unused: true
      },
      mangle: true,
      format: {
        // 移除注释
        comments: false
      }
    }
  }
})
