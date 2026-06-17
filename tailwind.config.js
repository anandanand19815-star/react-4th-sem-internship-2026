export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 80px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d7e9ff',
          200: '#b6d5ff',
          300: '#7fb2ff',
          400: '#4a8cff',
          500: '#1f6cff',
          600: '#1a55e6',
          700: '#1645b4',
          800: '#143a85',
          900: '#122f67',
        },
      },
    },
  },
  plugins: [],
}
