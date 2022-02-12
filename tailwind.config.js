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
      "poppins": ['Poppins', 'Menlo', 'Monaco', 'monospace'],
      "poppins-black": ['Poppins Black', 'Poppins', 'Monaco', 'monospace'],
    },
    minHeight: {
      'parent': 'inherit',
    }
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
