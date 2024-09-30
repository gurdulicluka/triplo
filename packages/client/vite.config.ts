import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@triplo/common": path.resolve(__dirname, "../common/src"), // Adjust this path
    },
  },
});
