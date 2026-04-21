import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAdForm } from '../../context/AdFormContext';
import './StepIndicator.css';

export const StepIndicator = () => {
  const { currentStep } = useAdForm();
  const totalSteps = 6;
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="step-indicator-wrapper">
      <div className="progress-bar-bg">
        <motion.div 
          className="progress-bar-fill" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      <div className="steps-container">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={stepNum} className="step-item">
              <motion.div
                className={`step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                initial={false}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  backgroundColor: isActive || isCompleted ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                  borderColor: isActive || isCompleted ? 'var(--accent-primary)' : 'var(--border-color)',
                }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? <Check size={14} color="#fff" strokeWidth={3} /> : <span className="step-number">{stepNum}</span>}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
