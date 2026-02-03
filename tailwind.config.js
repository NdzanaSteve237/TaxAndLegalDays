/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            100: '#E8F0FF',
            600: '#1557C0',
            700: '#0B3D91',
          },
          gold: {
            100: '#FFF4CC',
            500: '#E3B21A',
            600: '#D6A600',
          },
        },
        neutral: {
          page: '#F7F9FC',
          card: '#FFFFFF',
          border: '#E3E8F2',
        },
        text: {
          900: '#0F172A',
          700: '#334155',
          500: '#64748B',
        }
      },
      fontFamily: {
        title: ['Merriweather', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '10px',
        'md': '14px',
        'lg': '18px',
        'xl': '24px',
      },
      boxShadow: {
        'soft-sm': '0 6px 18px rgba(15, 23, 42, 0.08)',
        'soft-md': '0 12px 28px rgba(15, 23, 42, 0.12)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

