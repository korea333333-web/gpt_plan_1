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
        deep: "var(--bg-deep)",
        card: "var(--bg-card)",
        surface: "var(--bg-surface)",
        gold: "var(--accent-gold)",
        lunar: "var(--accent-lunar)",
        solar: "var(--accent-solar)",
      },
      borderRadius: {
        soft: "8px",
      },
    },
  },
  plugins: [],
};
export default config;
