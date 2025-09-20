// tailwind.config.js
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#d4af37",
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(270deg, #FFD700 0%, #FFA500 100%)",
        "section-dark":
          "linear-gradient(180deg, #0a1a2f 2.88%, rgba(10, 26, 47, 0.85) 91.01%)",
      },
      boxShadow: {
        "gold-hover": "0 0 8px rgba(212, 175, 55, 0.6)",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-gradient-gold": {
          background: "linear-gradient(270deg, #FFD700 0%, #FFA500 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
      });
    }),
  ],
};
