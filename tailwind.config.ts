import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        olive: {
          50:  "#F5F4EE",
          100: "#E6E4CC",
          200: "#CCCAA0",
          600: "#6B6838",
          700: "#5A5730",
          800: "#4A4828",
          900: "#3A3820",
          950: "#2A2818",
        },
        warm: {
          50:  "#F5F3EE",
          100: "#E8E4D8",
          500: "#8A8270",
          700: "#5E5848",
        },
      },
    },
  },
  plugins: [],
};
export default config;
