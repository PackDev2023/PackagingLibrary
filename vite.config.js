import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  server: {
    port: 2468,
    reload: true,
    proxy: {
      '/': {
        target: 'http://127.0.0.1:2368',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    origin: 'http://127.0.0.1:2368',
    open: '/',
  },
  build: {
    // target: 'es2022',
    minify: 'esbuild',
    manifest: true,
    outDir: 'assets/built',
    assetsDir: 'assets/src',
    rollupOptions: {
      input: 'assets/src/js/index.js',
      output: {
        assetFileNames: "app.[ext]",
        chunkFileNames: "app.[ext]",
        entryFileNames: "app.js"
      },
    },
  },
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
  shared: {
    css: {
      postcss: 'postcss.config.js'
    }
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
      // renderModernChunks: false
      renderLegacyChunks: false
    }),
  ]
})