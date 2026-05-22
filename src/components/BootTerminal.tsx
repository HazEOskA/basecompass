import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Wifi } from 'lucide-react';

const BOOT_LINES = [
  { text: '> initializing BaseCompass v1.0...', type: 'cmd' },
  { text: '> scanning Base ecosystem [8453]...', type: 'cmd' },
  { text: '> indexing 56 dApps across 8 districts...', type: 'cmd' },
  { text: '> loading safety routes...', type: 'cmd' },
  { text: '> calibrating beginner scores...', type: 'cmd' },
  { text: '> mapping DeFi → Social → NFT → Games...', type: 'cmd' },
  { text: '', type: 'gap' },
  { text: '[OK] all systems online.', type: 'success' },
  { text: '[OK] beginner path ready.', type: 'success' },
  { text: '', type: 'gap' },
  { text: '> welcome, explorer. your map awaits.', type: 'accent' },
];

const BootTerminal: React.FC = () => {
  const [count, setCount] = useState(0);
  const [done, setDone]   = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setCount(i);
      if (i >= BOOT_LINES.length) {
        clearInterval(t);
        setDone(true);
      }
    }, 360);
    return () => clearInterval(t);
  }, []);

  const colorFor = (type: string) => {
    if (type === 'success') return 'text-street-green';
    if (type === 'accent')  return 'text-neon-cyan';
    if (type === 'gap')     return '';
    return 'text-txt-secondary';
  };

  return (
    <div className="relative">
      {/* Outer glow */}
      <div
        className="absolute -inset-4 rounded-2xl pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,82,255,0.18) 0%, rgba(0,212,255,0.05) 50%, transparent 80%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Panel */}
      <div
        className="neon-card relative rounded-xl border overflow-hidden"
        style={{ borderColor: 'rgba(0,82,255,0.4)' }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-3 border-b border-base-blue/20">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-street-red/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-street-amber/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-street-green/60" />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Terminal size={11} className="text-neon-cyan opacity-60" />
            <span className="font-mono text-[11px] text-txt-muted tracking-wider">
              basecompass://sys/boot.sh
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Wifi size={10} className="text-street-green opacity-70" />
            <span className="font-mono text-[9px] text-street-green/60">BASE 8453</span>
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-5 min-h-[320px] font-mono text-[13px] leading-7 bg-cyber-navy/70">
          {BOOT_LINES.slice(0, count).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={line.type === 'gap' ? 'h-2' : colorFor(line.type)}
            >
              {line.type !== 'gap' ? line.text : null}
            </motion.div>
          ))}

          {/* Cursor */}
          {!done && count < BOOT_LINES.length && (
            <span className="text-neon-cyan animate-blink">█</span>
          )}

          {/* Post-boot prompt */}
          {done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 flex items-center gap-2"
            >
              <span className="text-base-blue-lt">$</span>
              <span className="text-txt-secondary">explore --district</span>
              <span className="text-neon-cyan font-bold">all</span>
              <span className="text-neon-cyan animate-blink ml-1">█</span>
            </motion.div>
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-surface-3 border-t border-base-blue/15">
          <span className="font-mono text-[10px] text-txt-muted">
            56 dApps · 8 districts · Base Chain 8453
          </span>
          <span className={`font-mono text-[10px] ${done ? 'text-street-green' : 'text-street-amber'}`}>
            {done ? '● online' : '○ booting...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BootTerminal;
