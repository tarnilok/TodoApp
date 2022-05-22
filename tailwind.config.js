module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontSize: {
      "xl": [
        "18px",
        {
          letterSpacing: "-0.015em",
          lineHeight: "22px",
        },
      ],
      "2xl": [
        "20px",
        {
          letterSpacing: "-0.015em",
          lineHeight: "24px",
        },
      ],
    },
  },
  plugins: [],
};
