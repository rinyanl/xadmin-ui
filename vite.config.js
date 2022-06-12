import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const { resolve } = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// 环境配置
let NODE_ENV = process.env.NODE_ENV || 'development';
let envFiles = [`.env.${NODE_ENV}`];

// 将配置添加到  process.env
for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    server: {
        host: '0.0.0.0',
        port: process.env.VITE_APP_PORT,
        proxy: {
            // 选项写法
            '/api': {
                target: 'http://192.168.31.167:3001/',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
    build: {
        target: 'modules',
        // outDir: 'dist', //指定输出路径
        // assetsDir: 'assets', // 指定生成静态资源的存放路径
        minify: 'terser', // 混淆器，terser构建后文件体积更小
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // 路径别名
        },
    },
});
