import React from 'react';

interface StreetBadgeProps {
  label: string;
  className?: string;
  size?: 'xs' | 'sm';
}

const StreetBadge: React.FC<StreetBadgeProps> = ({
  label,
  className = '',
  size = 'xs',
}) => {
  const sizeClass = size === 'xs'
    ? 'text-[10px] px-1.5 py-0.5'
    : 'text-xs px-2 py-0.5';

  return (
    <span
      className={`
        inline-block font-mono uppercase tracking-widest rounded-sm
        border font-bold leading-none
        ${sizeClass} ${className}
      `}
    >
      {label}
    </span>
  );
};

export default StreetBadge;
