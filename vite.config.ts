// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // API 요청을 '/v1/...' 경로로 보낼 경우, 이를 'https://api.clashofclans.com/v1/...'로 프록시합니다.
      '/v1': {
        target: 'https://api.clashofclans.com',
        changeOrigin: true, // 필요한 경우 호스트 헤더의 오리진을 target URL로 변경
        secure: false, // HTTPS 프록시 서버에 대한 검증을 비활성화합니다. (필요한 경우)
        rewrite: (path) => path
      }
    }
  }
});
