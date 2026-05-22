import React from 'react';
import { getScoreColor, getScoreLabel } from '../utils/scoring';

interface SignalMeterProps {
  score: number;
  label?: boolean;
  size?: 'sm' | 'md';
}

const SignalMeter: React.FC<SignalMeterProps> = ({ score, label = true, size = 'sm' }) => {
  const bars    = 5;
  const filled  = Math.ceil((score / 100) * bars);
  const color   = getScoreColor(score);
  const lbl     = getScoreLabel(score);

  const barH = size === 'sm' ? 'h-2' : 'h-3';
  const barW = size === 'sm' ? 'w-1.5' : 'w-2';

  return (
    <div className="flex items-center gap-2">
      {/* Bars */}
      <div className="flex items-end gap-0.5">
        {Array.from({ length: bars }).map((_, i) => {
          const heightScale = 0.5 + (i / (bars - 1)) * 0.5;
          const isActive    = i < filled;
          return (
            <div
              key={i}
              className={`${barW} rounded-sm ${isActive ? color.replace('text-', 'bg-') : 'bg-surface-3'}`}
              style={{
                height: `${Math.round(6 * heightScale + (size === 'md' ? 4 : 0))}px`,
                opacity: isActive ? 1 : 0.3,
                boxShadow: isActive ? `0 0 4px currentColor` : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Score + label */}
      <div className="flex items-baseline gap-1">
        <span className={`font-mono text-xs font-bold ${color}`}>{score}</span>
        {label && (
          <span className="font-mono text-[10px] text-txt-muted uppercase tracking-wider">{lbl}</span>
        )}
      </div>
    </div>
  );
};

export default SignalMeter;
