import React, { useState } from 'react';
import { useAdForm } from '../../context/AdFormContext';
import { FadeContent } from '../animations/FadeContent';
import { MagnetButton } from '../animations/MagnetButton';
import { ClickSpark } from '../animations/ClickSpark';
import { CheckCircle, Edit2, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ReviewSubmit = () => {
  const { adData, setStep, setAdData } = useAdForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to post an ad.");
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.createAd({
        user_id: user.id,
        title: adData.title,
        category: adData.category,
        city: adData.city,
        price: Number(adData.price),
        description: adData.description,
        image: adData.image,
        status: 'pending',
        package: (adData.packageType?.toLowerCase() || 'basic') as any
      });
      setAdData({ ...adData, status: 'Pending' });
      setIsSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/marketplace');
      }, 3000);
    } catch (e: any) {
      alert('Error submitting ad: ' + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <FadeContent direction="up">
        <div style={{ textAlign: 'center', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          >
            <CheckCircle size={80} color="var(--success)" style={{ marginBottom: '24px' }} />
          </motion.div>
          <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Ad Submitted Successfully!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '400px', margin: '0 auto' }}>
            Your ad "{adData.title}" is now pending review. You'll be notified once it's active.
          </p>
        </div>
      </FadeContent>
    );
  }

  return (
    <FadeContent direction="up">
      <div className="step-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ marginBottom: '8px' }}>Review & Submit</h2>
            <p style={{ color: 'var(--text-muted)' }}>Make sure everything looks good before publishing.</p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
          {adData.image && (
            <div style={{ height: '300px', width: '100%', position: 'relative' }}>
              <img src={adData.image} alt={adData.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 24px 24px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
                <h3 style={{ fontSize: '28px', color: '#fff', marginBottom: '8px' }}>{adData.title}</h3>
                <div style={{ display: 'flex', gap: '16px', color: 'rgba(255,255,255,0.8)' }}>
                  <span>{adData.city}</span>
                  <span>•</span>
                  <span>{adData.category}</span>
                </div>
              </div>
            </div>
          )}
          
          <div style={{ padding: '32px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Price</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>${adData.price}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Package</span>
                <span style={{ background: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '100px', fontSize: '14px', fontWeight: 'bold' }}>{adData.packageType}</span>
              </div>
            </div>
            
            <div>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Description</span>
              <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{adData.description}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '32px' }}>
          <button 
            onClick={() => setStep(1)}
            style={{ 
              padding: '12px 24px', background: 'transparent', border: '1px solid var(--border-color)', 
              color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' 
            }}
            disabled={isSubmitting}
          >
            <Edit2 size={18} /> Edit Ad
          </button>
          
          <ClickSpark>
            <MagnetButton onClick={handleSubmit} disabled={isSubmitting}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                    <Rocket size={18} />
                  </motion.div>
                ) : (
                  <Rocket size={18} />
                )}
                {isSubmitting ? 'Submitting...' : 'Launch Ad'}
              </div>
            </MagnetButton>
          </ClickSpark>
        </div>
      </div>
    </FadeContent>
  );
};
