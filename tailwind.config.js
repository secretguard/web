/** @type {import('tailwindcss').Config} */
module.exports = {
  // Only the pages that actually load Tailwind (index.html, start.html) — plus any
  // partial/section files under services/, scanned defensively in case they start
  // using Tailwind classes in the future. Scanning the .html files is what lets the
  // JIT compiler know which utility classes to generate.
  content: [
    "./index.html",
    "./start.html",
    "./services/*.html",
    "./navbar.js",
    "./footer.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        red: { 500: "#ef4444", 600: "#dc2626", 900: "#7f1d1d" },
        neutral: { 900: "#171717" },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
