/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cc: {
          bg: "var(--cc-bg)",
          surface: "var(--cc-surface)",
          surface2: "var(--cc-surface-2)",
          border: "var(--cc-border)",
          text: "var(--cc-text)",
          muted: "var(--cc-muted)",
          accent: "var(--cc-accent)",
          accent2: "var(--cc-accent-2)",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(99, 102, 241, 0.25), 0 0 24px rgba(99, 102, 241, 0.14)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
