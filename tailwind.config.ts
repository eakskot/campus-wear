import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#232F42",
        cream: "#F7F4EC",
        paper: "#FCFBF7",
        sand: "#E7E0D0",
        rust: "#AC4F24",
        rustdark: "#8A3E1B",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
      animation: {
        fade: "fade 0.6s ease-out both",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
