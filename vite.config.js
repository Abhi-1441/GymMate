// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// base: '/GymMate/',
//   define: {
//     'process.env': {},
//   },
//   build: {
//     rollupOptions: {
//       external: ['@react-oauth/google'],
//     },
//   },
// })

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/GymMate/',
  // build: {
  //   rollupOptions: {
  //     external: ['@react-oauth/google'], // Add the module to the external list
  //     output: {
  //       globals: {
  //         '@react-oauth/google': 'ReactOAuthGoogle',
  //       },
  //     },
  //   },
  // },
});
