import React from 'react';
import { getScoreBg, getScoreLabel } from '../utils/scoring';

interface ScoreBadgeProps {
  score: number;
  showLabel?: boolean;
  showBar?: boolean;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  showLabel = false,
  showBar = false,
}) => {
  const colorClass = getScoreBg(score);
  const label = getScoreLabel(score);

  return (
    <div className="flex flex-col gap-1">
      <div className={`inline-flex items-center gap-1.5 border rounded-sm px-2 py-0.5 ${colorClass}`}>
        <span className="font-mono text-xs font-bold">{score}</span>
        {showLabel && (
          <span className="font-ui text-[10px] uppercase tracking-wider opacity-80">{label}</span>
        )}
      </div>
      {showBar && (
        <div className="score-bar h-1 w-full">
          <div
            className="score-bar-fill h-full"
            style={{ width: `${score}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default ScoreBadge;
