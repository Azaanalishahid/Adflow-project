import React, { forwardRef, useState, type InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className = '', ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    
    // We want the label to float if focused OR if there is a value
    const isFloating = focused || (props.value && String(props.value).length > 0);

    return (
      <div className={`input-wrapper ${className}`}>
        <div className={`input-container ${error ? 'has-error' : ''} ${focused ? 'is-focused' : ''}`}>
          {leftIcon && <div className="input-icon">{leftIcon}</div>}
          <div className="input-content">
            <label className={`floating-label ${isFloating ? 'floating' : ''} ${leftIcon ? 'with-icon' : ''}`}>
              {label}
            </label>
            <input
              ref={ref}
              {...props}
              className={`modern-input ${leftIcon ? 'with-icon' : ''}`}
              onFocus={(e) => {
                setFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setFocused(false);
                props.onBlur?.(e);
              }}
              placeholder={focused ? props.placeholder : ''} // Only show placeholder when focused
            />
          </div>
        </div>
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
