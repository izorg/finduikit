export default {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  plugins: ["stylelint-no-unsupported-browser-features", "stylelint-order"],
  rules: {
    "order/properties-alphabetical-order": true,

    "plugin/no-unsupported-browser-features": [
      true,
      {
        ignore: ["css-logical-props"],
      },
    ],

    "selector-class-pattern": null,
  },
};
