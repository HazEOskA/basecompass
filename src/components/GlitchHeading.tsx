import React from 'react';
import { motion } from 'framer-motion';

interface GlitchHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  animate?: boolean;
}

const GlitchHeading: React.FC<GlitchHeadingProps> = ({
  text,
  as: Tag = 'h2',
  className = '',
  animate = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Tag
        className={`
          font-display relative select-none
          ${animate ? 'glitch' : ''}
          ${className}
        `}
        data-text={text}
      >
        {text}
      </Tag>
    </motion.div>
  );
};

export default GlitchHeading;
