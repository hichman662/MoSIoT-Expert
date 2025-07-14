import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['ion-range']  
  }
});
