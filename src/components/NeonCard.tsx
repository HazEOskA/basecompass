import React from 'react';
import { motion } from 'framer-motion';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  delay?: number;
}

const NeonCard: React.FC<NeonCardProps> = ({
  children,
  className = '',
  hoverable = true,
  onClick,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      whileHover={hoverable ? { y: -3 } : undefined}
      onClick={onClick}
      className={`
        neon-card relative overflow-hidden rounded-lg
        card-highlight
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-40"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.6) 30%, rgba(0,82,255,0.6) 70%, transparent 100%)',
        }}
      />
      {children}
    </motion.div>
  );
};

export default NeonCard;
