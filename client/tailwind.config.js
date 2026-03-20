/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'pulse-wave': 'pulse-wave 3s infinite',
      },
      keyframes: {
        'pulse-wave': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      colors: {
        whatsapp: {
          'bg-primary': 'var(--wa-bg-primary)',
          'bg-secondary': 'var(--wa-bg-secondary)',
          'bg-chat': 'var(--wa-bg-chat)',
          'bg-input': 'var(--wa-bg-input)',
          'green-primary': 'var(--wa-green-primary)',
          'green-light': 'var(--wa-green-light)',
          'text-primary': 'var(--wa-text-primary)',
          'text-secondary': 'var(--wa-text-secondary)',
          'text-muted': 'var(--wa-text-muted)',
          border: 'var(--wa-border)',
          'border-light': 'var(--wa-border-light)',
        },
        facebook: {
          primary: '#1877F2',
          primaryDark: '#166FE5',
          lightBg: '#F0F2F5',
          sidebar: '#FAFBFC',
          card: '#FFFFFF',
          textPrimary: '#1C1E21',
          textSecondary: '#65676B',
          border: '#DCDCDC',
          borderLight: '#E4E6EA',
          online: '#42B883'
        }
      },
      boxShadow: {
        'facebook': '0 0 15px rgba(24, 119, 242, 0.3)',
      }
    },
  },
  plugins: [],
}
