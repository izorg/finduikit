// @ts-check

/**
 * @type {import('tailwindcss').Config}
 */
const tailwindConfig = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx,mdx}"],
  theme: {
    boxShadow: {
      1: "var(--elevation-1)",
      2: "var(--elevation-2)",
      3: "var(--elevation-3)",
      4: "var(--elevation-4)",
      5: "var(--elevation-5)",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        current: "currentColor",
        error: "rgb(var(--error) / <alpha-value>)",
        "error-container": "rgb(var(--error-container) / <alpha-value>)",
        inherit: "inherit",
        "inverse-on-surface": "rgb(var(--inverse-on-surface) / <alpha-value>)",
        "inverse-primary": "rgb(var(--inverse-primary) / <alpha-value>)",
        "inverse-surface": "rgb(var(--inverse-surface) / <alpha-value>)",
        "on-background": "rgb(var(--on-background) / <alpha-value>)",
        "on-error": "rgb(var(--on-error) / <alpha-value>)",
        "on-error-container": "rgb(var(--on-error-container) / <alpha-value>)",
        "on-primary": "rgb(var(--on-primary) / <alpha-value>)",
        "on-primary-container":
          "rgb(var(--on-primary-container) / <alpha-value>)",
        "on-primary-fixed": "rgb(var(--on-primary-fixed) / <alpha-value>)",
        "on-primary-fixed-variant":
          "rgb(var(--on-primary-fixed-variant) / <alpha-value>)",
        "on-secondary": "rgb(var(--on-secondary) / <alpha-value>)",
        "on-secondary-container":
          "rgb(var(--on-secondary-container) / <alpha-value>)",
        "on-secondary-fixed": "rgb(var(--on-secondary-fixed) / <alpha-value>)",
        "on-secondary-fixed-variant":
          "rgb(var(--on-secondary-fixed-variant) / <alpha-value>)",
        "on-surface": "rgb(var(--on-surface) / <alpha-value>)",
        "on-surface-variant": "rgb(var(--on-surface-variant) / <alpha-value>)",
        "on-tertiary": "rgb(var(--on-tertiary) / <alpha-value>)",
        "on-tertiary-container":
          "rgb(var(--on-tertiary-container) / <alpha-value>)",
        "on-tertiary-fixed": "rgb(var(--on-tertiary-fixed) / <alpha-value>)",
        "on-tertiary-fixed-variant":
          "rgb(var(--on-tertiary-fixed-variant) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
        "outline-variant": "rgb(var(--outline-variant) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-container": "rgb(var(--primary-container) / <alpha-value>)",
        "primary-fixed": "rgb(var(--primary-fixed) / <alpha-value>)",
        "primary-fixed-dim": "rgb(var(--primary-fixed-dim) / <alpha-value>)",
        scrim: "rgb(var(--scrim) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "secondary-container":
          "rgb(var(--secondary-container) / <alpha-value>)",
        "secondary-fixed": "rgb(var(--secondary-fixed) / <alpha-value>)",
        "secondary-fixed-dim":
          "rgb(var(--secondary-fixed-dim) / <alpha-value>)",
        shadow: "rgb(var(--shadow) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-bright": "rgb(var(--surface-bright) / <alpha-value>)",
        "surface-container": "rgb(var(--surface-container) / <alpha-value>)",
        "surface-container-high":
          "rgb(var(--surface-container-high) / <alpha-value>)",
        "surface-container-highest":
          "rgb(var(--surface-container-highest) / <alpha-value>)",
        "surface-container-low":
          "rgb(var(--surface-container-low) / <alpha-value>)",
        "surface-container-lowest":
          "rgb(var(--surface-container-lowest) / <alpha-value>)",
        "surface-dim": "rgb(var(--surface-dim) / <alpha-value>)",
        "surface-tint": "rgb(var(--surface-tint) / <alpha-value>)",
        "surface-variant": "rgb(var(--surface-variant) / <alpha-value>)",
        tertiary: "rgb(var(--tertiary) / <alpha-value>)",
        "tertiary-container": "rgb(var(--tertiary-container) / <alpha-value>)",
        "tertiary-fixed": "rgb(var(--tertiary-fixed) / <alpha-value>)",
        "tertiary-fixed-dim": "rgb(var(--tertiary-fixed-dim) / <alpha-value>)",
        transparent: "transparent",
      },
    },
    fontSize: {
      "body-large": [
        "1rem",
        {
          fontWeight: 400,
          letterSpacing: "0.03125rem",
          lineHeight: "1.5rem",
        },
      ],
      "body-medium": [
        "0.875rem",
        {
          fontWeight: 400,
          letterSpacing: "0.015625rem",
          lineHeight: "1.25rem",
        },
      ],
      "body-small": [
        "0.75rem",
        {
          fontWeight: 400,
          letterSpacing: "0.025rem",
          lineHeight: "1rem",
        },
      ],
      "display-large": [
        "3.5625rem",
        {
          fontWeight: 400,
          letterSpacing: "-0.015625rem",
          lineHeight: "4rem",
        },
      ],
      "display-medium": [
        "2.8125rem",
        {
          fontWeight: 400,
          lineHeight: "3.25rem",
        },
      ],
      "display-small": [
        "2.25rem",
        {
          fontWeight: 400,
          lineHeight: "2.75rem",
        },
      ],
      "headline-large": [
        "2rem",
        {
          fontWeight: 400,
          lineHeight: "2.5rem",
        },
      ],
      "headline-medium": [
        "1.75rem",
        {
          fontWeight: 400,
          lineHeight: "2.25rem",
        },
      ],
      "headline-small": [
        "1.5rem",
        {
          fontWeight: 400,
          lineHeight: "2rem",
        },
      ],
      "label-large": [
        "0.875rem",
        {
          fontWeight: 500,
          letterSpacing: "0.00625rem",
          lineHeight: "1.25rem",
        },
      ],
      "label-medium": [
        "0.75rem",
        {
          fontWeight: 500,
          letterSpacing: "0.03125rem",
          lineHeight: "1rem",
        },
      ],
      "label-small": [
        "0.6875rem",
        {
          fontWeight: 500,
          letterSpacing: "0.03125rem",
          lineHeight: "1rem",
        },
      ],
      "title-large": [
        "1.375rem",
        {
          fontWeight: 400,
          lineHeight: "1.75rem",
        },
      ],
      "title-medium": [
        "1rem",
        {
          fontWeight: 500,
          letterSpacing: "0.00625rem",
          lineHeight: "1.5rem",
        },
      ],
      "title-small": [
        "0.875rem",
        {
          fontWeight: 500,
          letterSpacing: "0.00625rem",
          lineHeight: "1.25rem",
        },
      ],
    },
    opacity: {
      12: ".12",
      32: ".32",
      38: ".38",
      8: ".08",
    },
    screens: {
      expanded: "52.5rem", // 840px
      medium: "37.5rem", // 600px
    },
  },
};

export default tailwindConfig;
