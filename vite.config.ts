import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

function pathResolve(dir: string) {
  return resolve(__dirname, "./", dir);
}

module.exports = {
  plugins: [vue()],
  // 路径别名
  alias: {
    "/@": pathResolve("src"),
  },
  // 依赖优化项
  optimizeDeps: {
    include: ["@ant-design/icons-vue"],
  }
  // 开发服务器
  // server: {
  //   host:'', // 主机
  //   prot: 3000, // 端口
  //   https: true, // 是否开启 https
  //   open: false, // 是否在浏览器自动打开
  //   proxy: {
  //     '/api': {
  //       target: 'http://jsonplaceholder.typicode.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     },
  //   }
  // }
}
