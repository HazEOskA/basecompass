import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight, Navigation } from 'lucide-react';
import { App } from '../data/apps';
import { getCategoryStyle } from '../data/categories';
import { getLevelColor, getRiskColor } from '../utils/scoring';
import SignalMeter from './SignalMeter';

interface StreetIntelCardProps {
  app: App;
  index?: number;
}

const StreetIntelCard: React.FC<StreetIntelCardProps> = ({ app, index = 0 }) => {
  const cat = getCategoryStyle(app.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -3 }}
      className="group neon-card relative rounded-xl overflow-hidden flex flex-col h-full"
      style={{ borderColor: 'rgba(0,82,255,0.18)' }}
    >
      {/* Top shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #00d4ff 40%, #0052ff 60%, transparent 100%)',
        }}
      />

      {/* Scanline hover effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-xl"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,82,255,0.04) 0%, transparent 30%, transparent 70%, rgba(0,82,255,0.04) 100%)',
        }}
      />

      {/* Card header */}
      <div className="px-4 pt-4 pb-3 flex-1 flex flex-col">

        {/* Badge row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {/* Category */}
          <span className={`sticker text-[9px] ${cat.color}`}>
            {cat.emoji} {app.category}
          </span>
          {/* Level */}
          <span className={`sticker text-[9px] ${getLevelColor(app.beginnerLevel)}`}>
            {app.beginnerLevel}
          </span>
          {/* Risk */}
          <span className={`sticker text-[9px] ${getRiskColor(app.riskLevel)}`}>
            {app.riskLevel} Risk
          </span>
        </div>

        {/* Name */}
        <h3 className="font-ui font-bold text-lg text-txt-primary leading-tight mb-1 group-hover:text-neon-cyan transition-colors duration-200">
          {app.name}
        </h3>

        {/* Description */}
        <p className="font-ui text-txt-secondary text-sm leading-snug mb-3 flex-1">
          {app.description}
        </p>

        {/* Signal meter */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-txt-muted uppercase tracking-wider">Signal</span>
          </div>
          <SignalMeter score={app.beginnerScore} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {app.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="font-mono text-[9px] text-txt-muted border border-txt-muted/20 bg-surface/40 px-1.5 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Mission instruction */}
        <div
          className="rounded-md p-3 border mb-3"
          style={{
            background: 'rgba(0,82,255,0.06)',
            borderColor: 'rgba(0,82,255,0.2)',
          }}
        >
          <div className="flex items-start gap-2">
            <Navigation size={11} className="text-neon-cyan mt-0.5 shrink-0" />
            <div>
              <span className="font-mono text-[9px] text-neon-cyan/60 uppercase tracking-wider block mb-0.5">
                mission instruction
              </span>
              <span className="font-ui text-xs text-txt-secondary leading-snug">
                {app.firstAction}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer action */}
      <div className="px-4 pb-4">
        <a
          href={app.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all duration-200 group/btn"
          style={{
            background: 'rgba(0,82,255,0.12)',
            border: '1px solid rgba(0,82,255,0.3)',
            color: '#3374ff',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(0,82,255,0.22)';
            el.style.borderColor = 'rgba(0,212,255,0.5)';
            el.style.color = '#00d4ff';
            el.style.boxShadow = '0 0 16px rgba(0,82,255,0.25)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(0,82,255,0.12)';
            el.style.borderColor = 'rgba(0,82,255,0.3)';
            el.style.color = '#3374ff';
            el.style.boxShadow = '';
          }}
        >
          <span className="flex items-center gap-1.5">
            <ExternalLink size={11} />
            Open Route
          </span>
          <ChevronRight size={12} className="opacity-60" />
        </a>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-base-blue/25 group-hover:border-neon-cyan/40 transition-colors duration-200" />
    </motion.div>
  );
};

export default StreetIntelCard;
