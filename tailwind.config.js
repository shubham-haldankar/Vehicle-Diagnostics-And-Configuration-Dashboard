/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,html}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "monospace"],
        sans: ["Inter", "sans-serif"],
        display: ["Rajdhani", "sans-serif"],
      },
      colors: {
        bg: "#0c0d10",
        card: "#111318",
        "muted-fg": "#6b7280",
        fg: "#e8eaf0",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(350%)" },
        },
      },
      animation: {
        slide: "slide 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
