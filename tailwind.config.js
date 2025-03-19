/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF3B30",
        secondary: "#34C759",
        background: "#F2F2F7",
        card: "#FFFFFF",
        text: "#000000",
        border: "#C7C7CC",
        notification: "#FF3B30",
      },
    },
  },
  plugins: [],
}