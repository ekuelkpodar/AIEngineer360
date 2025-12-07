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
        background: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        border: "var(--border)",
        success: "var(--success)",
        warn: "var(--warn)",
        info: "var(--info)",
        text: "var(--text)",
      },
      boxShadow: {
        glow: "0 20px 60px -15px rgba(142, 240, 195, 0.35)",
      },
      borderRadius: {
        xl: "var(--radius)",
        "2xl": "calc(var(--radius) + 6px)",
      },
      spacing: {
        4.5: "1.125rem",
      },
      transitionDuration: {
        160: "160ms",
        220: "220ms",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
