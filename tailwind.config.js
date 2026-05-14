/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F0FF',
        primary: '#7C3AED',
        secondary: '#DB2777',
        success: '#22C55E',
        warning: '#F97316',
        ink: '#251B3D',
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        soft: '0 20px 45px rgba(76, 29, 149, 0.10)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top left, rgba(124, 58, 237, 0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(219, 39, 119, 0.16), transparent 28%)',
      },
    },
  },
  plugins: [],
};
