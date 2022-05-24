module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-blue": "var(--brand-blue)",
        "brand-marine": "var(--brand-marine)",
        "brand-orange": "var(--brand-orange)",
        "brand-blue-grey": "var(--brand-blue-grey)",
        "brand-gray": "var(--brand-gray)",
        "brand-gray-dark": "var(--brand-gray-dark)",
        "brand-gray-light": "var(--brand-gray-light)",
      },
      fontSize: {
        '6xl': '4rem',
        'huge': '7rem',
      },
      spacing: {
        '7': '1.75rem',
      },
    },
    inset: {
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      'center': '50%',
    },
    fontFamily: {
      "poppins": ['Poppins', 'Menlo', 'Monaco', 'sans-serif'],
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  }
}
