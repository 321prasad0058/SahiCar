import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { LOADER_CSS, LOADER_HTML } from './src/loader.ts'

// the SahiCar loader goes straight into index.html, so even the very first paint is never a blank page
const loader = (): Plugin => ({
  name: 'sahicar-loader',
  transformIndexHtml: {
    order: 'pre', // before Vite reads the inline <style>
    handler: (html) => html.replace('<!--scl-css-->', LOADER_CSS.replace(/\n/g, '')).replace('<!--scl-html-->', LOADER_HTML),
  },
})

export default defineConfig({
  plugins: [react(), loader()],
  build: {
    target: 'es2022',
    // read by scripts/prerender.mjs to preload the homepage 3D, then deleted
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) return 'motion'
          if (id.includes('node_modules/firebase') || id.includes('node_modules/@firebase')) return 'firebase'
          if (id.includes('node_modules/react')) return 'react'
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
