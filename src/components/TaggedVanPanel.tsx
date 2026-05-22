import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Map, Zap, Shield, BookOpen, Cpu } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  icon: React.ElementType;
}

const STATS: StatItem[] = [
  { value: '56+', label: 'dApps', icon: Map },
  { value: '8',   label: 'Districts', icon: Layers },
  { value: '7',   label: 'Day Roadmap', icon: BookOpen },
  { value: '3',   label: 'Risk Levels', icon: Shield },
  { value: '100', label: '% Free', icon: Zap },
  { value: '∞',   label: 'Routes', icon: Cpu },
];

const STICKERS: Array<{ text: string; cls: string; style: React.CSSProperties }> = [
  { text: 'ONCHAIN', cls: 'text-neon-cyan border-neon-cyan/50 bg-neon-cyan/5',
    style: { top: '12%', left: '-18px', transform: 'rotate(-8deg)' } },
  { text: 'BASED',   cls: 'text-base-blue-lt border-base-blue/50 bg-base-blue/5',
    style: { bottom: '28%', left: '-14px', transform: 'rotate(6deg)' } },
  { text: 'GM',      cls: 'text-street-green border-street-green/50 bg-street-green/5',
    style: { top: '8%', right: '-14px', transform: 'rotate(5deg)' } },
  { text: 'SAFE',    cls: 'text-street-amber border-street-amber/50 bg-street-amber/5',
    style: { bottom: '20%', right: '-16px', transform: 'rotate(-4deg)' } },
];

const Wheel: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
    className={`rounded-full bg-surface-3 border-2 border-base-blue/50 flex items-center justify-center ${className}`}
    style={{ boxShadow: '0 0 14px rgba(0,82,255,0.45)', ...style }}
  >
    <div className="w-1/2 h-1/2 rounded-full bg-base-blue/40 border border-base-blue/60" />
    {/* Spokes */}
    {[0, 60, 120].map(deg => (
      <div
        key={deg}
        className="absolute h-px bg-base-blue/30"
        style={{
          width: '38%',
          left: '31%',
          top: '50%',
          transform: `translateY(-50%) rotate(${deg}deg)`,
          transformOrigin: '0 50%',
        }}
      />
    ))}
  </motion.div>
);

const TaggedVanPanel: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative py-12 px-4"
    >
      {/* Section label */}
      <div className="text-center mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-txt-muted">
          // system intel
        </span>
        <h2 className="font-display text-5xl md:text-6xl text-txt-primary mt-2">
          THE MAP AT A GLANCE
        </h2>
      </div>

      {/* Van assembly */}
      <div className="relative max-w-3xl mx-auto" style={{ height: '260px' }}>

        {/* Road */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-surface-2/60 border-t border-base-blue/10 overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 flex gap-6 -translate-y-1/2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-6 h-px bg-base-blue/15" />
            ))}
          </div>
        </div>

        {/* Underglow */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '70%',
            height: '30px',
            background:
              'radial-gradient(ellipse 80% 100% at center, rgba(0,82,255,0.5) 0%, transparent 80%)',
            filter: 'blur(10px)',
          }}
        />

        {/* Left wheel */}
        <Wheel className="absolute bottom-6 z-20 w-16 h-16" style={{ left: '16%' } as React.CSSProperties} />

        {/* Right wheel */}
        <Wheel className="absolute bottom-6 z-20 w-16 h-16" style={{ right: '16%' } as React.CSSProperties} />

        {/* Van body */}
        <div
          className="absolute top-0 left-0 right-0 bottom-12 neon-card rounded-xl flex overflow-hidden z-10"
          style={{
            borderColor: 'rgba(0,82,255,0.35)',
            boxShadow:
              '0 0 40px rgba(0,82,255,0.15), 0 0 0 1px rgba(0,82,255,0.1), inset 0 0 40px rgba(0,82,255,0.03)',
          }}
        >
          {/* Cab section */}
          <div className="w-[28%] flex-shrink-0 bg-surface-3 border-r border-base-blue/20 flex flex-col p-3 gap-2">
            {/* Windshield */}
            <div
              className="flex-1 rounded-md border border-neon-cyan/25 overflow-hidden relative"
              style={{ background: 'rgba(0,212,255,0.04)' }}
            >
              <div className="absolute top-2 right-2 h-px w-8 bg-neon-cyan/30" />
              <div className="absolute top-4 right-2 h-px w-5 bg-neon-cyan/15" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <span className="font-mono text-[8px] text-neon-cyan/55 uppercase tracking-[0.25em]">BASE</span>
                <span className="font-mono text-[7px] text-txt-muted tracking-wider">8453</span>
              </div>
            </div>
            {/* Side window */}
            <div
              className="h-10 rounded-sm border border-base-blue/20"
              style={{ background: 'rgba(0,82,255,0.03)' }}
            />
            {/* Headlight */}
            <div
              className="h-3 rounded-sm bg-neon-cyan/25 border border-neon-cyan/30"
              style={{ boxShadow: '0 0 10px rgba(0,212,255,0.4)' }}
            />
          </div>

          {/* Cargo panel */}
          <div className="flex-1 relative p-4 overflow-hidden">
            {/* Graffiti background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
              <span
                className="absolute font-display text-[56px] text-base-blue/10 leading-none"
                style={{ top: '-4px', right: '8px', transform: 'rotate(-2deg)' }}
              >
                BASE
              </span>
              <span
                className="absolute font-display text-4xl text-neon-cyan/8 leading-none"
                style={{ bottom: '4px', left: '8px', transform: 'rotate(1deg)' }}
              >
                ONCHAIN
              </span>
              <span
                className="absolute font-display text-2xl text-street-green/8 leading-none"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-1deg)' }}
              >
                DAPP MAP
              </span>
            </div>

            {/* Stats */}
            <div className="relative z-10 grid grid-cols-3 gap-2 h-full content-center">
              {STATS.map(({ value, label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, duration: 0.3 }}
                  className="flex flex-col items-center justify-center p-2 rounded border border-base-blue/12 bg-surface/40 text-center"
                >
                  <Icon size={13} className="text-base-blue mb-1 opacity-60" />
                  <span className="font-mono text-lg font-bold text-txt-primary leading-none">{value}</span>
                  <span className="font-mono text-[8px] text-txt-muted uppercase tracking-wider mt-0.5 leading-tight">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating stickers */}
        {STICKERS.map((s, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className={`absolute z-30 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border rounded-sm ${s.cls}`}
            style={s.style}
          >
            {s.text}
          </motion.span>
        ))}
      </div>
    </motion.section>
  );
};

export default TaggedVanPanel;
