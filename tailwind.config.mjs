/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ["Helvetica"],
      },
      colors: {
        gold: "#FFD700", // Primary gold accent
        honey: "#FFB400", // Honey-inspired yellow
        darkBg: "#121212", // Dark background
        chatBubbleUser: "#FFC107", // User chat bubble color (golden yellow)
        chatBubbleBot: "#FFA500", // Bot chat bubble color (honey orange)
        borderGlow: "#FFD700", // Glowing border color (gold)
        goldHover: "#FFC107", // Hover variant for gold
        honeyHover: "#FFA500", // Hover variant for honey
      },
      borderRadius: {
        'extra-large': '1.5rem', // For larger rounded corners
      },
      animation: {
        buzz: 'buzz 0.2s infinite', // Custom buzzing animation
      },
      keyframes: {
        buzz: {
          '0%': { transform: 'translateX(0px)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '75%': { transform: 'translateX(-2px)' },
          '100%': { transform: 'translateX(0px)' },
        },
      },
    },
  },
  plugins: [],
};
