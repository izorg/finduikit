/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  overrides: [
    {
      files: ["**/*.module.css"],
      rules: {
        "selector-class-pattern": [
          "^[a-z]+(?:[A-Z][a-z]*)*$|^rt-",
          {
            message: "Class selectors should be written in camelCase.",
            resolveNestedSelectors: true,
          },
        ],
      },
    },
  ],
  plugins: ["stylelint-no-unsupported-browser-features", "stylelint-order"],
  rules: {
    "order/properties-alphabetical-order": true,
    "plugin/no-unsupported-browser-features": true,
  },
};
