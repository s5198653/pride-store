/// <reference types="vitest" />
import path from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { resolve } from "path";

export default {
  base: "./",
  build: {
    outDir: "./build",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        bedrooms: resolve(__dirname, "bedrooms.html"),
        cabinet: resolve(__dirname, "cabinet.html"),
        chairs: resolve(__dirname, "chairs.html"),
        "coffee-tables": resolve(__dirname, "coffee-tables.html"),
        contacts: resolve(__dirname, "contacts.html"),
        dressers: resolve(__dirname, "dressers.html"),
        kitchen: resolve(__dirname, "kitchen.html"),
        mirrors: resolve(__dirname, "mirrors.html"),
        others: resolve(__dirname, "others.html"),
        "pc-tables": resolve(__dirname, "pc-tables.html"),
        "table-dressings": resolve(__dirname, "table-dressings.html"),
        tv: resolve(__dirname, "tv.html"),
        wardrobes: resolve(__dirname, "wardrobes.html"),
      },
    },
  },
  test: {},
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@@", replacement: path.resolve(__dirname) },
    ],
  },
  plugins: [
    ViteMinifyPlugin({}),
    ViteImageOptimizer({
      test: /\.(jpe?g|png)$/i,
      includePublic: false,
      logStats: true,
      ansiColors: true,
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 80,
        palette: true,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true,
      },
      webp: {
        // https://sharp.pixelplumbing.com/api-output#webp
        lossless: true,
      },
      // Cache assets in cacheLocation. When enabled, reads and writes asset files with their hash suffix from the specified path.
      cache: false,
      cacheLocation: undefined,
    }),
  ],
};
