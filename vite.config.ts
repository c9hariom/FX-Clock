// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://fx-api.fxclock.com',
//         changeOrigin: true,
//         secure: true,
//         rewrite: (path) => path.replace(/^\/api/, ''), // Optional: removes '/api' prefix
//         configure: (proxy, options) => {
//           // Additional configuration for handling CORS
//           proxy.on('proxyReq', (proxyReq, req, res) => {
//             // Adding headers to allow cross-origin requests
//             proxyReq.setHeader('Access-Control-Allow-Origin', '*');
//           });
//         }
//       },
//     },
//   },
// });
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fx-api.fxclock.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // Only if the API uses a self-signed certificate
      },
    },
  },
});