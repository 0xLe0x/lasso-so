import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 8080,
    host: "0.0.0.0",
    strictPort: true,
    secure: false,
    https: false,
    hmr: {
      clientPort: 80,
      // host: "localhost",
      path: "/ws",
    },
  },
});
