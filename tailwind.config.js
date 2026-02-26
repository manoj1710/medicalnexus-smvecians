module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F766E', // Deep Teal
        accent: '#22D3EE',  // Soft Cyan
        background: '#F8FAFC',
        panel: '#F1F5F9',
        urgent: '#DC2626',
        warning: '#F59E0B',
        safe: '#16A34A',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
