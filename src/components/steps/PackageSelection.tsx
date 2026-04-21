import React from 'react';
import { useAdForm, AdPackage } from '../../context/AdFormContext';
import { FadeContent } from '../animations/FadeContent';
import { Check } from 'lucide-react';

export const PackageSelection = () => {
  const { adData, setAdData, errors } = useAdForm();

  const packages: { id: AdPackage; title: string; price: string; features: string[] }[] = [
    {
      id: 'Basic',
      title: 'Basic',
      price: 'Free',
      features: ['Standard listing', 'Visible for 7 days', 'Up to 3 images']
    },
    {
      id: 'Standard',
      title: 'Standard',
      price: '$9.99',
      features: ['Highlighted listing', 'Visible for 30 days', 'Up to 10 images', 'Priority support']
    },
    {
      id: 'Premium',
      title: 'Premium',
      price: '$19.99',
      features: ['Homepage placement', 'Visible for 60 days', 'Unlimited images', 'Dedicated account manager']
    }
  ];

  return (
    <FadeContent direction="up">
      <div className="step-content">
        <h2 style={{ marginBottom: '8px' }}>Select Package</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Choose a visibility package to boost your ad.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '20px', '@media (min-width: 640px)': { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' } } as any}>
          {packages.map((pkg) => {
            const isSelected = adData.packageType === pkg.id;
            return (
              <div 
                key={pkg.id}
                onClick={() => setAdData({ ...adData, packageType: pkg.id })}
                className={`glass-card`}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: isSelected ? 'rgba(99, 102, 241, 0.05)' : 'var(--bg-tertiary)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isSelected && (
                  <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-primary)', padding: '4px 12px', borderBottomLeftRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 'bold' }}>
                    SELECTED
                  </div>
                )}
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{pkg.title}</h3>
                <div style={{ fontSize: '28px', fontWeight: 700, margin: '16px 0', color: isSelected ? 'var(--accent-primary)' : '#fff' }}>
                  {pkg.price}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {pkg.features.map((feature, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      <Check size={16} color="var(--success)" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        {errors.packageType && <div className="error-message" style={{ textAlign: 'center', marginTop: '16px' }}>{errors.packageType}</div>}
      </div>
    </FadeContent>
  );
};
