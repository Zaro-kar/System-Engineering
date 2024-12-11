import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
   base: '/',
   plugins: [react(), viteTsconfigPaths()],
   server: {
      port: 5178,
   },
   optimizeDeps: { exclude: ['fsevents'] },
});
