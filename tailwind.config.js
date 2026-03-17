/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        creo: {
          bg: "#0A0A0A",
          surface: "#141414",
          elevated: "#1A1A1A",
          border: "#27272A",
          "border-active": "#3F3F46",
          text: "#FAFAFA",
          muted: "#A1A1AA",
          "muted-2": "#71717A",
          accent: "#E8FF47",
          "accent-dim": "rgba(232, 255, 71, 0.15)",
          "score-low": "#EF4444",
          "score-mid-low": "#F97316",
          "score-mid": "#EAB308",
          "score-high": "#22C55E",
          "score-perfect": "#E8FF47",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "score-fill": {
          from: { strokeDashoffset: "283" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "pulse-ring": "pulse-ring 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
