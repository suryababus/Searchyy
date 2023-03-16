const esbuild = require("esbuild");

// Automatically exclude all node_modules from the bundled version
// const { nodeExternalsPlugin } = require("esbuild-node-externals");

esbuild
  .build({
    entryPoints: ["./src/content/index.tsx"],
    outfile: "public/dist/content/index.js",
    bundle: true,
    minify: true,
    platform: "browser",
    sourcemap: true,
    target: "node14",
    plugins: [],
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ["./src/popup/index.tsx"],
    outfile: "public/dist/popup/index.js",
    bundle: true,
    minify: true,
    platform: "browser",
    sourcemap: true,
    target: "node14",
    plugins: [],
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ["./src/background/index.ts"],
    outfile: "public/dist/background/index.js",
    bundle: true,
    minify: true,
    platform: "browser",
    sourcemap: true,
    target: "node14",
    plugins: [],
  })
  .catch(() => process.exit(1));
