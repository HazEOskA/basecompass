import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Map } from 'lucide-react';
import BootTerminal from './BootTerminal';

const GRAFFITI_TAGS = [
  { text: 'ONCHAIN',   style: { top: '12%',  left: '5%',  fontSize: '80px', opacity: 0.028, transform: 'rotate(-3deg)' } },
  { text: 'BUILD',     style: { top: '45%',  left: '2%',  fontSize: '60px', opacity: 0.022, transform: 'rotate(2deg)'  } },
  { text: 'EXPLORE',   style: { bottom: '18%',right: '3%', fontSize: '72px', opacity: 0.025, transform: 'rotate(-1deg)' } },
  { text: 'STAY SAFE', style: { top: '8%',   right: '6%', fontSize: '50px', opacity: 0.02,  transform: 'rotate(4deg)'  } },
  { text: 'BASE',      style: { bottom: '40%',left: '38%', fontSize: '100px',opacity: 0.018, transform: 'rotate(-2deg)' } },
];

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden">

      {/* Animated background grid */}
      <div
        className="absolute inset-0 bg-grid"
        style={{ backgroundSize: '60px 60px' }}
      />

      {/* Radial hero glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 65% 45%, rgba(0,82,255,0.13) 0%, rgba(0,212,255,0.05) 40%, transparent 70%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, #060d1f 0%, transparent 100%)',
        }}
      />

      {/* Graffiti background text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {GRAFFITI_TAGS.map((tag, i) => (
          <span
            key={i}
            className="absolute font-display text-txt-primary leading-none whitespace-nowrap"
            style={tag.style as React.CSSProperties}
          >
            {tag.text}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left column */}
          <div>
            {/* Pre-label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-6"
            >
              <div
                className="w-2 h-2 rounded-full bg-street-green"
                style={{ boxShadow: '0 0 8px rgba(0,255,136,0.6)' }}
              />
              <span className="font-mono text-[11px] text-txt-muted uppercase tracking-[0.25em]">
                // Base Ecosystem Navigator · v1.0
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display leading-none mb-6"
              style={{ fontSize: 'clamp(56px, 8vw, 96px)' }}
            >
              <span
                className="glitch block text-txt-primary"
                data-text="FIND YOUR"
              >
                FIND YOUR
              </span>
              <span
                className="block"
                style={{
                  color: '#0052ff',
                  textShadow: '0 0 40px rgba(0,82,255,0.5), 0 0 80px rgba(0,212,255,0.2)',
                }}
              >
                WAY THROUGH
              </span>
              <span className="block text-txt-primary">BASE.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-ui text-txt-secondary text-lg leading-relaxed mb-8 max-w-lg"
            >
              A cyber street map for exploring Base — dApps, tools, safety routes
              and beginner missions without the noise.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/apps" className="btn-primary flex items-center gap-2">
                <Map size={14} />
                Enter the Map
              </Link>
              <Link to="/roadmap" className="btn-ghost flex items-center gap-2">
                Start Roadmap
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Mini stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="flex flex-wrap gap-6 mt-10"
            >
              {[
                { val: '56+', lbl: 'dApps' },
                { val: '8',   lbl: 'Districts' },
                { val: '7',   lbl: 'Day Roadmap' },
                { val: '0',   lbl: 'Backend' },
              ].map(({ val, lbl }) => (
                <div key={lbl}>
                  <div className="font-mono text-xl font-bold text-txt-primary">{val}</div>
                  <div className="font-mono text-[10px] text-txt-muted uppercase tracking-wider">{lbl}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — BootTerminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            <BootTerminal />
          </motion.div>
        </div>
      </div>

      {/* Bottom route indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="font-mono text-[9px] text-txt-muted uppercase tracking-[0.25em]">scroll to explore</span>
          <div className="w-px h-6 bg-gradient-to-b from-base-blue/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
