/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0B",
          raised: "#141415",
          surface: "#1B1B1D",
          border: "#2A2A2D",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8CD6E",
          dim: "#9A7E2B",
          foil: "#C9A227",
        },
        bone: {
          DEFAULT: "#F5F1E8",
          dim: "#C9C5BA",
        },
        ember: {
          DEFAULT: "#8A1F1F",
          light: "#A93232",
        },
        graphite: "#6B6B6E",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "foil-sheen":
          "linear-gradient(115deg, transparent 20%, rgba(212,175,55,0.35) 40%, rgba(232,205,110,0.55) 50%, rgba(212,175,55,0.35) 60%, transparent 80%)",
        "vignette":
          "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        "noise-grid":
          "repeating-linear-gradient(0deg, rgba(212,175,55,0.04) 0px, rgba(212,175,55,0.04) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(212,175,55,0.04) 0px, rgba(212,175,55,0.04) 1px, transparent 1px, transparent 64px)",
      },
      boxShadow: {
        "gold-glow": "0 0 40px -8px rgba(212,175,55,0.55)",
        "gold-glow-lg": "0 0 80px -10px rgba(212,175,55,0.45)",
        "card": "0 8px 30px -10px rgba(0,0,0,0.6)",
        "card-hover": "0 20px 50px -15px rgba(0,0,0,0.75)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 1.5s infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 14s linear infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(1.5deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};
