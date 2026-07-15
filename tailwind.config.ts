import type { Config } from "tailwindcss";

export default {
  content: ["./client/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        "background-secondary": "#0A0F24",
        primary: "#3B82F6",
        "primary-light": "#00BFFF",
        "primary-dark": "#2563EB",
        accent: "#8B5CF6",
        "text-secondary": "#B0B8C4",
        "text-muted": "#7A8494",
        success: "#10B981",
      },
      boxShadow: {
        "glow-blue": "0 0 32px rgba(59, 130, 246, 0.25)",
        "glow-purple": "0 0 32px rgba(139, 92, 246, 0.2)",
        "glow-brand": "0 0 40px rgba(59, 130, 246, 0.2), 0 0 80px rgba(139, 92, 246, 0.12)",
      },
      backgroundImage: {
        "gradient-main":
          "linear-gradient(135deg, #00BFFF 0%, #3B82F6 50%, #8B5CF6 100%)",
        "gradient-hero-ambient":
          "radial-gradient(ellipse 80% 60% at 75% 45%, rgba(0,191,255,0.12) 0%, rgba(59,130,246,0.06) 40%, transparent 70%)",
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        mono: ['"Fira Code"', "monospace"],
      },
      borderRadius: {
        btn: "12px",
        card: "16px",
      },
      backdropBlur: {
        glass: "12px",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "100% center" },
        },
        "hero-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        "hero-float": "hero-float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
