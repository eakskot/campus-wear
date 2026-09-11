import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101012",
        cream: "#F5F1E8",
        paper: "#FBF9F4",
        lime: "#CBFF4D",
        limedark: "#9FDA1E",
        forest: "#16352A",
        clay: "#FF5A36",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      boxShadow: {
        hard: "6px 6px 0 0 rgba(16,16,18,1)",
        "hard-sm": "4px 4px 0 0 rgba(16,16,18,1)",
        "hard-inv": "6px 6px 0 0 rgba(245,241,232,1)",
      },
      backgroundImage: {
        grain: "url('/grain.svg')",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
