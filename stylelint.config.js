export default {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  plugins: ["stylelint-no-unsupported-browser-features", "stylelint-order"],
  rules: {
    "custom-property-empty-line-before": null,

    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme"],
      },
    ],

    "order/properties-alphabetical-order": true,

    "plugin/no-unsupported-browser-features": true,

    "selector-class-pattern": null,
  },
};
