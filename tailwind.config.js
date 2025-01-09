import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "#ece3ca",
        charcoal: "#282a36",
        linen: "#fcebea",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dracula", "retro"],
  },
};
