// @ts-check

/**
 * @type {import('tailwindcss').Config}
 */
const tailwindConfig = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        "on-surface": "rgb(var(--on-surface) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
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
    screens: {
      expanded: "52.5rem", // 840px
      medium: "37.5rem", // 600px
    },
  },
};

export default tailwindConfig;
