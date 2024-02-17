import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        blinkingCursor: {
          "0%, 100%": { color: "#000000" },
          "50%": { color: "#FFFFFF" },
        },
      },
      animation: {
        blinkingCursor: "blinkingCursor 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
