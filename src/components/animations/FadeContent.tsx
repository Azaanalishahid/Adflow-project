import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeContentProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const FadeContent = ({ children, delay = 0, direction = 'up' }: FadeContentProps) => {
  const directionMap = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, ...directionMap[direction] }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
