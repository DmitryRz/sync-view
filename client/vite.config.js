import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8180', // Адрес Keycloak, когда вы на хосте
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:8080', // Адрес Бэкенда, когда вы на хосте
        changeOrigin: true,
      }
    }
  }
})