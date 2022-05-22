const plugin = require('tailwindcss/plugin')

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
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      )
    })
  ],
};
