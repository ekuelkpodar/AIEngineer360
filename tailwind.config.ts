import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", ...fontFamily.sans],
        sans: ["'Inter'", ...fontFamily.sans],
      },
      colors: {
        background: "#0b1021",
        surface: "#0f172a",
        accent: "#8ef0c3",
        muted: "#94a3b8",
        border: "#1e293b",
      },
      boxShadow: {
        glow: "0 20px 60px -15px rgba(142, 240, 195, 0.35)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
