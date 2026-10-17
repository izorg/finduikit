const dev = process.env.NODE_ENV !== "production";

export default {
  plugins: [
    [
      "@stylexjs/babel-plugin",
      {
        dev,
        enableInlinedConditionalMerge: true,
        runtimeInjection: false,
        treeshakeCompensation: true,
        unstable_moduleResolution: { type: "commonJS" },
      },
    ],
  ],
  presets: ["next/babel"],
};
