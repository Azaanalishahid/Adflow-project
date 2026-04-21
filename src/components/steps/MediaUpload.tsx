import React, { useState } from 'react';
import { useAdForm } from '../../context/AdFormContext';
import { Input } from '../ui/Input';
import { FadeContent } from '../animations/FadeContent';
import { Link, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { ElectricBorder } from '../animations/ElectricBorder';

export const MediaUpload = () => {
  const { adData, setAdData, errors } = useAdForm();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FadeContent direction="up">
      <div className="step-content">
        <h2 style={{ marginBottom: '8px' }}>Add Media</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          An image is crucial for a great listing. Provide an image URL.
        </p>

        <Input
          label="Image URL"
          value={adData.image}
          onChange={(e) => setAdData({ ...adData, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
          error={errors.image}
          leftIcon={<Link size={20} />}
        />

        <div style={{ marginTop: '32px' }}>
          {adData.image && !errors.image ? (
            <ElectricBorder active={true}>
              <div style={{ 
                height: '240px', 
                borderRadius: 'inherit',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src={adData.image} 
                  alt="Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                  }}
                />
              </div>
            </ElectricBorder>
          ) : (
            <div 
              style={{
                height: '240px',
                border: `2px dashed ${isHovered ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: isHovered ? 'var(--accent-primary)' : 'var(--text-muted)',
                transition: 'all 0.3s ease',
                background: isHovered ? 'var(--bg-surface)' : 'transparent',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <UploadCloud size={48} style={{ marginBottom: '16px' }} />
              <p>Image preview will appear here</p>
            </div>
          )}
        </div>
      </div>
    </FadeContent>
  );
};
