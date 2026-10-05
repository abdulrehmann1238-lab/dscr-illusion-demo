/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        navy: {
          900: 'var(--navy-900)',
          700: 'var(--navy-700)',
          500: 'var(--navy-500)',
        },
        charcoal: {
          800: 'var(--charcoal-800)',
        },
        gold: {
          100: 'var(--gold-100)',
          300: 'var(--gold-300)',
          500: 'var(--gold-500)',
          700: 'var(--gold-700)',
        },
        cream: {
          50: 'var(--cream-50)',
          100: 'var(--cream-100)',
          400: 'var(--cream-400)',
        },
        paper: 'var(--paper)',
        ink: {
          900: 'var(--ink-900)',
          600: 'var(--ink-600)',
          400: 'var(--ink-400)',
        },
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
          dark: 'var(--line-dark)',
        },
        ok: 'var(--ok)',
        warn: 'var(--warn)',
        err: 'var(--err)',
        info: 'var(--info)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Newsreader', 'Georgia', 'serif'],
        ui: ['var(--font-ui)', 'Hanken Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': 'var(--r-sm)',
        'md': 'var(--r-md)',
        'lg': 'var(--r-lg)',
        'pill': 'var(--r-pill)',
      },
      boxShadow: {
        '1': 'var(--shadow-1)',
        '2': 'var(--shadow-2)',
      },
      transitionTimingFunction: {
        'out': 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        'editorial': 'var(--ease-editorial)',
      },
      transitionDuration: {
        'fast': 'var(--t-fast)',
        'med': 'var(--t-med)',
        'slow': 'var(--t-slow)',
        'xslow': 'var(--t-xslow)',
      },
      zIndex: {
        'base': 'var(--z-base)',
        'sticky': 'var(--z-sticky)',
        'nav': 'var(--z-nav)',
        'drawer': 'var(--z-drawer)',
        'modal': 'var(--z-modal)',
        'toast': 'var(--z-toast)',
        'loader': 'var(--z-loader)',
      }
    },
  },
  plugins: [],
}
