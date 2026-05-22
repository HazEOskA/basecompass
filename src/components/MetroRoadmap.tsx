import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronDown, Wrench } from 'lucide-react';
import { roadmap, RoadmapDay } from '../data/roadmap';

const StationDot: React.FC<{ day: number; active: boolean; done: boolean; onClick: () => void }> = ({
  day, active, done, onClick,
}) => (
  <button
    onClick={onClick}
    className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-250 shrink-0 z-10"
    style={{
      background: active
        ? 'rgba(0,82,255,0.3)'
        : done
        ? 'rgba(0,255,136,0.15)'
        : 'rgba(10,22,40,0.9)',
      borderColor: active
        ? '#0052ff'
        : done
        ? '#00ff88'
        : 'rgba(0,82,255,0.25)',
      boxShadow: active ? '0 0 20px rgba(0,82,255,0.5), 0 0 40px rgba(0,82,255,0.2)' : '',
    }}
  >
    {done && !active ? (
      <span className="text-street-green font-mono text-xs font-bold">✓</span>
    ) : (
      <span
        className="font-mono text-xs font-bold"
        style={{ color: active ? '#00d4ff' : 'rgba(138,150,176,0.6)' }}
      >
        {String(day).padStart(2, '0')}
      </span>
    )}
    {active && (
      <motion.div
        className="absolute -inset-1 rounded-full border border-base-blue/30"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}
  </button>
);

const MissionCard: React.FC<{ day: RoadmapDay }> = ({ day }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="neon-card rounded-xl overflow-hidden"
    style={{ borderColor: 'rgba(0,82,255,0.3)' }}
  >
    {/* Mission header */}
    <div
      className="px-5 py-4 border-b border-base-blue/15 flex items-start justify-between"
      style={{ background: 'rgba(0,82,255,0.06)' }}
    >
      <div>
        <span className="font-mono text-[10px] text-base-blue/60 uppercase tracking-[0.25em] block mb-1">
          {day.missionCode}
        </span>
        <h3 className="font-display text-3xl text-txt-primary">
          {day.title}
        </h3>
        <p className="font-ui text-txt-secondary text-sm mt-0.5">{day.subtitle}</p>
      </div>
      <span className="font-mono text-3xl font-bold text-base-blue/20">
        D{String(day.day).padStart(2, '0')}
      </span>
    </div>

    <div className="p-5 space-y-4">
      {/* Goal */}
      <div>
        <p className="font-mono text-[10px] text-txt-muted uppercase tracking-wider mb-1.5">Mission Goal</p>
        <p className="font-ui text-txt-secondary text-sm leading-relaxed">{day.goal}</p>
      </div>

      {/* Tasks */}
      <div>
        <p className="font-mono text-[10px] text-txt-muted uppercase tracking-wider mb-2">Tasks</p>
        <ul className="space-y-2">
          {day.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="font-mono text-[10px] text-base-blue mt-0.5 shrink-0">
                {String(i + 1).padStart(2, '0')}.
              </span>
              <span className="font-ui text-txt-secondary text-sm leading-snug">{task}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Warning */}
      <div
        className="rounded-md p-3 border flex items-start gap-2.5"
        style={{ background: 'rgba(255,51,102,0.06)', borderColor: 'rgba(255,51,102,0.25)' }}
      >
        <AlertTriangle size={13} className="text-street-red shrink-0 mt-0.5" />
        <p className="font-ui text-xs text-street-red/80 leading-snug">{day.warning}</p>
      </div>

      {/* Tools */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Wrench size={11} className="text-txt-muted" />
          <p className="font-mono text-[10px] text-txt-muted uppercase tracking-wider">Recommended Tools</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {day.tools.map(tool => (
            <span
              key={tool}
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm border"
              style={{
                background: 'rgba(0,82,255,0.08)',
                borderColor: 'rgba(0,82,255,0.25)',
                color: '#3374ff',
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const MetroRoadmap: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Route line + stations */}
      <div className="relative">
        {/* Vertical route line */}
        <div className="absolute left-5 top-5 bottom-5 w-px"
          style={{
            background:
              'linear-gradient(180deg, #0052ff 0%, #00d4ff 50%, #0052ff 100%)',
            opacity: 0.3,
          }}
        />

        <div className="space-y-3 pl-0">
          {roadmap.map((day, i) => (
            <div key={day.day}>
              {/* Station row */}
              <div className="flex items-center gap-4">
                <StationDot
                  day={day.day}
                  active={active === i}
                  done={false}
                  onClick={() => setActive(active === i ? null : i)}
                />
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  className="flex-1 flex items-center justify-between py-3 px-4 rounded-lg text-left transition-all duration-200 group"
                  style={{
                    background:
                      active === i
                        ? 'rgba(0,82,255,0.1)'
                        : 'rgba(10,22,40,0.6)',
                    border: `1px solid ${active === i ? 'rgba(0,82,255,0.4)' : 'rgba(0,82,255,0.12)'}`,
                  }}
                >
                  <div>
                    <span className="font-mono text-[10px] text-base-blue/50 uppercase tracking-[0.2em] block">
                      {day.missionCode}
                    </span>
                    <span
                      className="font-ui font-bold text-base transition-colors duration-200"
                      style={{ color: active === i ? '#00d4ff' : '#e8edf5' }}
                    >
                      {day.title}
                    </span>
                    <span className="font-ui text-txt-muted text-sm ml-2 hidden sm:inline">
                      — {day.subtitle}
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    className="text-txt-muted transition-transform duration-200 shrink-0"
                    style={{ transform: active === i ? 'rotate(180deg)' : 'none' }}
                  />
                </button>
              </div>

              {/* Expanded mission card */}
              <AnimatePresence>
                {active === i && (
                  <div className="ml-14 mt-3 mb-2">
                    <MissionCard day={day} />
                  </div>
                )}
              </AnimatePresence>

              {/* Connector segment */}
              {i < roadmap.length - 1 && (
                <div className="ml-5 w-px h-3 bg-base-blue/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetroRoadmap;
