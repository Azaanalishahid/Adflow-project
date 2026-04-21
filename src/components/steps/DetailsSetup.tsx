import React from 'react';
import { useAdForm } from '../../context/AdFormContext';
import { Input } from '../ui/Input';
import { FadeContent } from '../animations/FadeContent';
import { DollarSign, AlignLeft } from 'lucide-react';

export const DetailsSetup = () => {
  const { adData, setAdData, errors } = useAdForm();
  
  const charCount = adData.description.length;

  return (
    <FadeContent direction="up">
      <div className="step-content">
        <h2 style={{ marginBottom: '8px' }}>Add Details</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Be descriptive to attract more views.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Input
            label="Price"
            type="number"
            value={adData.price}
            onChange={(e) => setAdData({ ...adData, price: e.target.value === '' ? '' : Number(e.target.value) })}
            placeholder="0.00"
            error={errors.price}
            leftIcon={<DollarSign size={20} />}
          />

          <div className="input-wrapper">
            <div className={`input-container ${errors.description ? 'has-error' : ''}`} style={{ height: 'auto', alignItems: 'flex-start', paddingTop: '12px' }}>
              <div className="input-icon" style={{ marginTop: '12px' }}><AlignLeft size={20} /></div>
              <div className="input-content" style={{ paddingBottom: '12px' }}>
                <label className={`floating-label floating with-icon`}>Description</label>
                <textarea
                  className="modern-input with-icon"
                  value={adData.description}
                  onChange={(e) => setAdData({ ...adData, description: e.target.value })}
                  placeholder="Describe your item or service..."
                  rows={5}
                  style={{ resize: 'none', minHeight: '120px' }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {errors.description ? (
                <span className="error-message">{errors.description}</span>
              ) : (
                <span />
              )}
              <span style={{ 
                fontSize: '12px', 
                color: charCount < 20 ? 'var(--error)' : 'var(--text-muted)' 
              }}>
                {charCount} characters (min 20)
              </span>
            </div>
          </div>
        </div>
      </div>
    </FadeContent>
  );
};
