import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 使用環境變數 VITE_BASE_PATH 來支援 PR preview 部署
  // 預設為 /iris-test-99/ (production)
  base: process.env.VITE_BASE_PATH || '/iris-test-99/',
})
