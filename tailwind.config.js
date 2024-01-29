/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,ts}"];
export const theme = {
  screens: {
    sm: "480px",
    md: "768px",
    lg: "976px",
    cXl: "1200px",
    xl: "1440px",
  },
  extend: {
    colors: {
      primary: "var(--primary-color)",
      secondary: "var(--secondary-color)",
      accent: "var(--accent-color)",
      textp: "var(--textP-color)",
      texts: "var(--textS-color)",
      textg: "var(--textG-color)",
      bgclr: "var(--bg-color)",
      "disabled-color": "#ff0000",
    },
  },
};
export const daisyui = {
  themes: [
    {
      light: {
        primary: "#ff0000", //primary
        secondary: "#ffffff", //secondary
        accent: "#ff4500", //accent
        "base-100": "#f4f4f4", //bg-color
        neutral: "#555555", //textS
        info: "#6c757d", //textG
        success: "#333333", //textP
      },
    },
  ],
};
export const plugins = [require("daisyui")];
