import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/FCC-Pomodoro-Clock/", // Has to be the same name as GitHub repo!!!
})
