import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    svgr(),
    EnvironmentPlugin("all"),
  ],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      external: [
        new RegExp("/*.stories.*"),
        new RegExp("/test/*.*"),
        new RegExp("/mocks"),
      ],
    },
  },
});
