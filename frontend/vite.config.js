import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@arcgis/core'], // <- NÃO pré-processar ArcGIS
  },
  build: {
    target: 'esnext', // <- permite BigInt
  },
});
