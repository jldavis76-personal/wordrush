/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        primary: '#3B82F6',
        secondary: '#F59E0B',
        success: '#10B981',
        error: '#EF4444',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        textPrimary: '#171717',
        textSecondary: '#737373',
        border: '#E5E5E5',
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      keyframes: {
        "bounce-small": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "bounce-small": "bounce-small 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
