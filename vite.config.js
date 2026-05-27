import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 백엔드 API 베이스 URL — 빌드 시 VITE_API_BASE_URL 로 변경 가능
const API_TARGET = process.env.VITE_API_TARGET || 'https://api.hanyahunya.com';

export default defineConfig({
  plugins: [react()],

  // 추가
  base: '/',

  server: {
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});