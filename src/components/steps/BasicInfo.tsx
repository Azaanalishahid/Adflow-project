import React from 'react';
import { useAdForm } from '../../context/AdFormContext';
import { Input } from '../ui/Input';
import { FadeContent } from '../animations/FadeContent';
import { MapPin, Type, List } from 'lucide-react';

export const BasicInfo = () => {
  const { adData, setAdData, errors } = useAdForm();

  return (
    <FadeContent direction="up">
      <div className="step-content">
        <h2 style={{ marginBottom: '8px' }}>Let's get started</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Provide the basic information for your advertisement.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Input
            label="Ad Title"
            value={adData.title}
            onChange={(e) => setAdData({ ...adData, title: e.target.value })}
            placeholder="e.g. Vintage Leather Sofa"
            error={errors.title}
            leftIcon={<Type size={20} />}
          />

          <div className={`input-wrapper`}>
            <div className={`input-container ${errors.category ? 'has-error' : ''}`}>
              <div className="input-icon"><List size={20} /></div>
              <div className="input-content">
                <label className={`floating-label floating with-icon`}>Category</label>
                <select
                  className="modern-input with-icon"
                  value={adData.category}
                  onChange={(e) => setAdData({ ...adData, category: e.target.value as any })}
                  style={{ appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Services">Services</option>
                  <option value="Jobs">Jobs</option>
                </select>
              </div>
            </div>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <Input
            label="City"
            value={adData.city}
            onChange={(e) => setAdData({ ...adData, city: e.target.value })}
            placeholder="e.g. New York, NY"
            error={errors.city}
            leftIcon={<MapPin size={20} />}
          />
        </div>
      </div>
    </FadeContent>
  );
};
