import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase", // CSS 모듈을 camelCase로 사용
    },
  },
  server: {
    port: 5173, // 원하는 포트 번호로 설정
    host: "localhost",
  },
});
