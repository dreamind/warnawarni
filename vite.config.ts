import { defineConfig } from 'vite'
// import { svelte } from '@sveltejs/vite-plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
      '@components': path.resolve("./src/components"),
    },
  },
  plugins: [
    // svelte(),
    sveltekit()
  ],
})
