import { terser } from "rollup-plugin-terser";
export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/wing-post-message.js",
      name: "wing-post-message",
      format: "umd",
    },
    {
      file: "dist/wing-post-message.es.js",
      format: "es",
    },
    {
      file: "dist/wing-post-message.amd.js",
      format: "amd",
    },
    {
      file: "dist/wing-post-message.cjs.js",
      format: "cjs",
    },
  ],
  plugins: [terser()],
};
