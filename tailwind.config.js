/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A5E3D",
        secondary: "#7A9A6D",
        dark: "#020713",
        light: "#B7C9A8",
        teks: "#D1E8D2",
      },
    },
  },
  plugins: [require("daisyui")],
};
