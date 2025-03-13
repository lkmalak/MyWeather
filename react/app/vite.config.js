import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
        proxy: {
            '/api/post': 'http://127.0.0.1:8000', // Remplacez '/api' par le préfixe de vos endpoints Django
        },
    },
   assetsInclude: ["**/*.png", "**/*.jpg", "**/*.svg"],
})
//change /api => /api/post