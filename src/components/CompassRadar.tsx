import React from 'react';
import { motion } from 'framer-motion';

const CompassRadar: React.FC = () => {
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;

  const rings = [30, 60, 90, 120, 150, 170];

  // Cardinal directions
  const cardinals = [
    { label: 'N', angle: -90 },
    { label: 'E', angle: 0 },
    { label: 'S', angle: 90 },
    { label: 'W', angle: 180 },
  ];

  // Route lines connecting ecosystem "zones"
  const routes = [
    { x1: cx, y1: cy, x2: cx + 110, y2: cy - 70 },
    { x1: cx, y1: cy, x2: cx - 80,  y2: cy - 90 },
    { x1: cx, y1: cy, x2: cx - 100, y2: cy + 60 },
    { x1: cx, y1: cy, x2: cx + 70,  y2: cy + 100 },
    { x1: cx, y1: cy, x2: cx + 130, y2: cy + 20 },
  ];

  // Floating category dots
  const dots = [
    { x: cx + 118, y: cy - 72,  label: 'DeFi',    color: '#0052ff' },
    { x: cx - 85,  y: cy - 95,  label: 'Social',  color: '#00d4ff' },
    { x: cx - 108, y: cy + 65,  label: 'NFT',     color: '#ec4899' },
    { x: cx + 72,  y: cy + 108, label: 'Games',   color: '#00ff88' },
    { x: cx + 138, y: cy + 22,  label: 'Tools',   color: '#ffaa00' },
  ];

  return (
    <div className="relative select-none" style={{ width: size, height: size }}>
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,82,255,0.12) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)',
          filter: 'blur(24px)',
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative z-10"
      >
        <defs>
          <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0052ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0052ff" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background fill */}
        <circle cx={cx} cy={cy} r={170} fill="url(#ringGrad)" />

        {/* Concentric rings */}
        {rings.map((r, i) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={i % 2 === 0 ? '#0052ff' : '#00d4ff'}
            strokeWidth={i === rings.length - 1 ? 1.2 : 0.5}
            strokeOpacity={i === rings.length - 1 ? 0.55 : 0.2}
            strokeDasharray={i % 3 === 1 ? '4 8' : 'none'}
          />
        ))}

        {/* Cross-hair lines */}
        <line x1={cx} y1={cy - 170} x2={cx} y2={cy + 170}
          stroke="#0052ff" strokeWidth={0.4} strokeOpacity={0.25} />
        <line x1={cx - 170} y1={cy} x2={cx + 170} y2={cy}
          stroke="#0052ff" strokeWidth={0.4} strokeOpacity={0.25} />
        <line x1={cx - 120} y1={cy - 120} x2={cx + 120} y2={cy + 120}
          stroke="#0052ff" strokeWidth={0.3} strokeOpacity={0.15} />
        <line x1={cx + 120} y1={cy - 120} x2={cx - 120} y2={cy + 120}
          stroke="#0052ff" strokeWidth={0.3} strokeOpacity={0.15} />

        {/* Route lines with draw animation */}
        {routes.map((r, i) => (
          <motion.line
            key={i}
            x1={r.x1} y1={r.y1}
            x2={r.x1} y2={r.y1}
            animate={{ x2: r.x2, y2: r.y2 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
            stroke="#00d4ff"
            strokeWidth={1}
            strokeOpacity={0.5}
            filter="url(#glow)"
          />
        ))}

        {/* Cardinal direction ticks */}
        {cardinals.map(({ label, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const tx = cx + Math.cos(rad) * 158;
          const ty = cy + Math.sin(rad) * 158;
          return (
            <g key={label}>
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0052ff"
                fontSize="11"
                fontFamily="Space Mono"
                fontWeight="700"
                fillOpacity={0.8}
                filter="url(#glow)"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Rotating scan line group */}
        <motion.g
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        >
          {/* Sweep gradient cone */}
          <defs>
            <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#00d4ff" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            d={`M ${cx} ${cy} L ${cx} ${cy - 170} A 170 170 0 0 1 ${cx + 50} ${cy - 162} Z`}
            fill="url(#sweepGrad)"
          />
          <line
            x1={cx} y1={cy}
            x2={cx} y2={cy - 170}
            stroke="#00d4ff"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            filter="url(#glow)"
          />
        </motion.g>

        {/* Eco-system dot nodes */}
        {dots.map((d, i) => (
          <motion.g
            key={d.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * 0.2, duration: 0.4 }}
          >
            <circle cx={d.x} cy={d.y} r={14} fill={d.color} fillOpacity={0.12}
              stroke={d.color} strokeWidth={1} strokeOpacity={0.5} />
            <circle cx={d.x} cy={d.y} r={4} fill={d.color} filter="url(#glowStrong)" />
            <text
              x={d.x}
              y={d.y + 22}
              textAnchor="middle"
              fill={d.color}
              fontSize="8"
              fontFamily="Space Mono"
              fillOpacity={0.85}
            >
              {d.label}
            </text>
          </motion.g>
        ))}

        {/* Pulsing center */}
        <motion.circle
          cx={cx} cy={cy} r={6}
          fill="#0052ff"
          filter="url(#glowStrong)"
          animate={{ r: [6, 9, 6], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx={cx} cy={cy} r={3} fill="#00d4ff" />

        {/* "BASECOMPASS" label in center */}
        <text
          x={cx} y={cy + 20}
          textAnchor="middle"
          fill="#e8edf5"
          fontSize="7"
          fontFamily="Space Mono"
          letterSpacing="3"
          fillOpacity={0.45}
        >
          BASECOMPASS
        </text>
      </svg>
    </div>
  );
};

export default CompassRadar;
