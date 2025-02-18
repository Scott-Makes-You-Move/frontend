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
        primary: "#145da0", // For text, bars, and buttons
        secondary: "#00a650", // Hover effect and secondary accents
        accent: "#ffd202", // Additional secondary color
        background: "#ffffff", // For background and text on buttons and bars
      },
      fontFamily: {
        title: ["Open Sans", "sans-serif"],
        body: ["Poppins", "sans-serif"],
        alternative: ["Raleway", "Montserrat", "sans-serif"],
      },
      borderRadius: {
        button: "0.375rem", // Rounded corners for buttons
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
