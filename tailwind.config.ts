import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        pitch: "#050505",
        carbon: "#0A0F0C",
        line: "rgba(57, 255, 136, 0.18)",
        neon: "#39FF88",
        mint: "#B9FFD6",
        ash: "#98A7A0"
      },
      boxShadow: {
        glow: "0 0 34px rgba(57, 255, 136, 0.22)",
        soft: "0 28px 90px rgba(0, 0, 0, 0.48)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
