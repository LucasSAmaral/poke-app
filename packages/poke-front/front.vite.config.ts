import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    base: '/pokeapp/',
    port: 3000,
    cors: false,
    host: true,
  },
});
