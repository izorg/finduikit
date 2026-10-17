import babelConfig from "./babel.config.js";

const postcssConfig = {
  plugins: [
    [
      "@stylexjs/postcss-plugin",
      {
        babelConfig: {
          babelrc: false,
          parserOpts: { plugins: ["typescript", "jsx"] },
          plugins: babelConfig.plugins,
        },
        include: ["app/**/*.{ts,tsx}", "domains/**/*.{ts,tsx}"],
        unstable_moduleResolution: {
          type: "commonJS",
        },
        useCSSLayers: true,
      },
    ],
  ],
};

export default postcssConfig;
