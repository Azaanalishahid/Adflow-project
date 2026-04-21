import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickSparkProps {
  children: React.ReactNode;
}

export const ClickSpark = ({ children }: ClickSparkProps) => {
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSpark = { id: Date.now(), x, y };
    setSparks((prev) => [...prev, newSpark]);

    setTimeout(() => {
      setSparks((prev) => prev.filter((spark) => spark.id !== newSpark.id));
    }, 600);
  };

  return (
    <div onClick={handleClick} style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ scale: 0, opacity: 1, x: '-50%', y: '-50%' }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: spark.x,
              top: spark.y,
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '2px solid var(--accent-primary)',
              pointerEvents: 'none',
              zIndex: 50,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
