import React, { ReactNode } from 'react';
import './ElectricBorder.css'; // Let's create an accompanying CSS module or simple CSS file

interface ElectricBorderProps {
  children: ReactNode;
  active?: boolean;
}

export const ElectricBorder = ({ children, active = true }: ElectricBorderProps) => {
  return (
    <div className={`electric-border-container ${active ? 'active' : ''}`}>
      <div className="electric-border-inner">
        {children}
      </div>
    </div>
  );
};
