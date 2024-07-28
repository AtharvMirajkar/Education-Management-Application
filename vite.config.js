import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },

      // "/api": " https://education-management-server.onrender.com",

      // "/api": "http://localhost:3000",
    },
  },

  plugins: [react()],
  // base: "/new-website/",
});
