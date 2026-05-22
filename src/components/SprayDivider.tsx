import React from 'react';

interface SprayDividerProps {
  label?: string;
  className?: string;
}

const SprayDivider: React.FC<SprayDividerProps> = ({ label, className = '' }) => {
  return (
    <div className={`relative flex items-center gap-4 my-2 ${className}`}>
      <div
        className="flex-1 h-px opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, #0052ff 40%, #00d4ff 60%, transparent)',
        }}
      />
      {label && (
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-txt-muted shrink-0 px-2">
          {label}
        </span>
      )}
      <div
        className="flex-1 h-px opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, #0052ff 40%, #00d4ff 60%, transparent)',
        }}
      />
    </div>
  );
};

export default SprayDivider;
