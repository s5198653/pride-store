/// <reference types="vitest" />
import path from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import packageJson from "./package.json";

const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, char => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.iife.js`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

export default {
  base: "./",
  build: {
    outDir: "./build/dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: getPackageNameCamelCase(),
      formats,
      fileName: format => fileName[format],
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
      test: /\.(jpe?g|png|svg)$/i,
      includePublic: false,
      logStats: true,
      ansiColors: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                cleanupNumericValues: false,
                convertPathData: {
                  floatPrecision: 2,
                  forceAbsolutePath: false,
                  utilizeAbsolute: false,
                },
                removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                cleanupIds: false,
              },
            },
          },
          "removeDimensions",
        ],
      },
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
