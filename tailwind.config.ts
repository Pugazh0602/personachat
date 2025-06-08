import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#121212",
        foreground: "#E0E0E0",
        primary: {
          DEFAULT: "#00FFF7",
          foreground: "#121212",
        },
        secondary: {
          DEFAULT: "#1E1E1E",
          foreground: "#E0E0E0",
        },
        destructive: {
          DEFAULT: "#FF00D4",
          foreground: "#E0E0E0",
        },
        muted: {
          DEFAULT: "#1E1E1E",
          foreground: "#A0A0A0",
        },
        accent: {
          DEFAULT: "#9B59B6",
          foreground: "#E0E0E0",
        },
        popover: {
          DEFAULT: "#1E1E1E",
          foreground: "#E0E0E0",
        },
        card: {
          DEFAULT: "#1A1A1A",
          foreground: "#E0E0E0",
        },
        // Custom cyberpunk colors
        cyber: {
          cyan: "#00FFF7",
          magenta: "#FF00D4",
          purple: "#9B59B6",
          dark: "#121212",
          grey: "#E0E0E0",
          "dark-grey": "#1E1E1E",
        },
        sidebar: {
          DEFAULT: "#1A1A1A",
          foreground: "#E0E0E0",
          primary: "#00FFF7",
          "primary-foreground": "#121212",
          accent: "#1E1E1E",
          "accent-foreground": "#E0E0E0",
          border: "#2A2A2A",
          ring: "#00FFF7",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px #00FFF7, 0 0 10px #00FFF7, 0 0 15px #00FFF7" },
          "50%": { boxShadow: "0 0 10px #00FFF7, 0 0 20px #00FFF7, 0 0 30px #00FFF7" },
        },
        "glow-magenta": {
          "0%, 100%": { boxShadow: "0 0 5px #FF00D4, 0 0 10px #FF00D4, 0 0 15px #FF00D4" },
          "50%": { boxShadow: "0 0 10px #FF00D4, 0 0 20px #FF00D4, 0 0 30px #FF00D4" },
        },
        "glow-purple": {
          "0%, 100%": { boxShadow: "0 0 5px #9B59B6, 0 0 10px #9B59B6, 0 0 15px #9B59B6" },
          "50%": { boxShadow: "0 0 10px #9B59B6, 0 0 20px #9B59B6, 0 0 30px #9B59B6" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
        "glow-magenta": "glow-magenta 2s ease-in-out infinite alternate",
        "glow-purple": "glow-purple 2s ease-in-out infinite alternate",
      },
      backgroundImage: {
        "gradient-cyber": "linear-gradient(135deg, #00FFF7 0%, #FF00D4 50%, #9B59B6 100%)",
        "gradient-chat-user": "linear-gradient(135deg, #00FFF7 0%, #9B59B6 100%)",
        "gradient-chat-ai": "linear-gradient(135deg, #FF00D4 0%, #9B59B6 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
