/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'base-blue':      '#0052ff',
        'base-blue-lt':   '#3374ff',
        'base-blue-dk':   '#003acc',
        'neon-cyan':      '#00d4ff',
        'neon-cyan-dim':  '#00a8c8',
        'cyber-navy':     '#060d1f',
        'surface':        '#0a1628',
        'surface-2':      '#0f1e38',
        'surface-3':      '#1a2d52',
        'street-green':   '#00ff88',
        'street-red':     '#ff3366',
        'street-amber':   '#ffaa00',
        'txt-primary':    '#e8edf5',
        'txt-secondary':  '#8a96b0',
        'txt-muted':      '#4a5878',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        ui:      ['Rajdhani', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-subtle': `linear-gradient(rgba(0,82,255,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,82,255,0.04) 1px, transparent 1px)`,
        'grid-strong': `linear-gradient(rgba(0,82,255,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,82,255,0.08) 1px, transparent 1px)`,
        'gradient-hero': 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,82,255,0.12) 0%, transparent 70%)',
        'gradient-card': 'linear-gradient(135deg, rgba(10,22,40,0.9) 0%, rgba(6,13,31,0.95) 100%)',
        'gradient-cyan':  'linear-gradient(135deg, #0052ff 0%, #00d4ff 100%)',
        'gradient-blue':  'linear-gradient(135deg, #003acc 0%, #0052ff 100%)',
      },
      backgroundSize: {
        'grid-60': '60px 60px',
      },
      boxShadow: {
        'neon-blue':  '0 0 20px rgba(0,82,255,0.4), 0 0 60px rgba(0,82,255,0.15)',
        'neon-cyan':  '0 0 20px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.15)',
        'neon-sm':    '0 0 10px rgba(0,82,255,0.3)',
        'card':       '0 4px 30px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 60px rgba(0,82,255,0.2), 0 0 80px rgba(0,212,255,0.08)',
      },
      animation: {
        'radar-spin':   'radarSpin 5s linear infinite',
        'radar-pulse':  'radarPulse 2.5s ease-in-out infinite',
        'float':        'float 7s ease-in-out infinite',
        'glow-pulse':   'glowPulse 3s ease-in-out infinite',
        'scan':         'scanLine 8s linear infinite',
        'blink':        'blink 1.2s step-end infinite',
        'slide-up':     'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        radarSpin: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        radarPulse: {
          '0%,100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':     { opacity: '0.25', transform: 'scale(1.04)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(0,82,255,0.3)' },
          '50%':     { boxShadow: '0 0 50px rgba(0,82,255,0.7), 0 0 100px rgba(0,212,255,0.2)' },
        },
        scanLine: {
          from: { transform: 'translateY(-100%)' },
          to:   { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
