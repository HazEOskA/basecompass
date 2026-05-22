import React from 'react';
import { Shield, ShieldAlert, ShieldX } from 'lucide-react';
import { getRiskColor } from '../utils/scoring';

interface SafetyBadgeProps {
  risk: 'Low' | 'Medium' | 'High';
  showIcon?: boolean;
  size?: 'xs' | 'sm';
}

const ICONS = {
  Low:    Shield,
  Medium: ShieldAlert,
  High:   ShieldX,
};

const SafetyBadge: React.FC<SafetyBadgeProps> = ({
  risk,
  showIcon = true,
  size = 'xs',
}) => {
  const colorClass = getRiskColor(risk);
  const Icon = ICONS[risk];
  const iconSize = size === 'xs' ? 10 : 12;
  const textClass = size === 'xs' ? 'text-[10px]' : 'text-xs';

  return (
    <span
      className={`
        inline-flex items-center gap-1 border rounded-sm px-2 py-0.5
        font-mono uppercase tracking-wider font-bold leading-none
        ${textClass} ${colorClass}
      `}
    >
      {showIcon && <Icon size={iconSize} />}
      {risk} Risk
    </span>
  );
};

export default SafetyBadge;
