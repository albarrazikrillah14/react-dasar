import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        hello_world: "hello-world.html",
        todo_list: "todo-list.html",
        contact: "contact.html",
        task: "task.html",
        note: "note.html",
        profile: "profile.html",
        timer: "timer.html",
        product: "product.html"
      }
    }
  }
})
