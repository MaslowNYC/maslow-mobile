/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        maslow: {
          blue: '#3B5998',
          cream: '#F5F1E8',
          gold: '#C5A059',
        },
        primary: {
          DEFAULT: '#3B5998',
          foreground: '#F5F1E8',
        },
        secondary: {
          DEFAULT: '#F5F1E8',
          foreground: '#3B5998',
        },
        accent: {
          DEFAULT: '#C5A059',
          foreground: '#3B5998',
        },
        background: '#FFFFFF',
        foreground: '#3B5998',
        border: '#3B5998',
        input: '#3B5998',
        ring: '#C5A059',
      },
      borderRadius: {
        lg: '0.75rem',
        md: 'calc(0.75rem - 2px)',
        sm: 'calc(0.75rem - 4px)',
      },
    },
  },
  plugins: [],
};
