// هذا ملف إعدادات Vite لتطبيق ريأكت يلي بيستخدم Tailwind CSS لتنسيق الواجهة
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
  ],
})
// https://vite.dev/config/
