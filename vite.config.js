import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/results": "http://127.0.0.1:5000",
      "/export_results": "http://127.0.0.1:5000",
      "/export_results_pdf": "http://127.0.0.1:5000",

      "/capability_analysis": "http://127.0.0.1:5000",
      "/export_capability_pdf": "http://127.0.0.1:5000",

      "/models": "http://127.0.0.1:5000",
      "/models/update": "http://127.0.0.1:5000",
    },
  },
});
