import React, { useState } from 'react';
import { useAdForm } from '../../context/AdFormContext';
import { FadeContent } from '../animations/FadeContent';
import { MagnetButton } from '../animations/MagnetButton';
import { Sparkles, Check, RefreshCw, PenTool } from 'lucide-react';
import { ElectricBorder } from '../animations/ElectricBorder';
import { motion } from 'framer-motion';

export const AIGenerate = () => {
  const { adData, setAdData, nextStep } = useAdForm();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  
  // Local state to hold the AI suggestion before accepting
  const [suggestion, setSuggestion] = useState({ title: '', description: '' });

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerated(false);
    
    // Simulate AI API call
    setTimeout(() => {
      const generatedTitle = `Premium ${adData.category || 'Item'} in ${adData.city || 'Your Area'}`;
      const generatedDesc = `This is a high-quality, professionally maintained ${adData.category?.toLowerCase() || 'item'}. Perfect for anyone looking for reliability and excellence. Contact now for more details!\n\nTags: #Premium #${adData.category} #${adData.city}`;
      
      setSuggestion({ title: generatedTitle, description: generatedDesc });
      setIsGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const handleAccept = () => {
    setAdData(prev => ({
      ...prev,
      title: suggestion.title,
      description: suggestion.description
    }));
    nextStep();
  };

  const handleEdit = () => {
    setAdData(prev => ({
      ...prev,
      title: suggestion.title,
      description: suggestion.description
    }));
    // User edits it in earlier steps by going back, or we can just accept it and let them navigate
    alert("Copied to form! You can go back to edit them.");
  };

  return (
    <FadeContent direction="up">
      <div className="step-content" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '8px' }}>AI Enhancement</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Let our advanced AI write the perfect title and description for your ad to maximize reach.
        </p>

        {!generated && !isGenerating ? (
          <div style={{ padding: '40px 0' }}>
            <MagnetButton onClick={handleGenerate} className="ai-btn" style={{ fontSize: '18px', padding: '16px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={24} /> Generate with AI
              </div>
            </MagnetButton>
          </div>
        ) : isGenerating ? (
          <div style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              <RefreshCw size={40} color="var(--accent-primary)" />
            </motion.div>
            <p style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>AI is thinking...</p>
          </div>
        ) : (
          <FadeContent direction="up">
            <div style={{ textAlign: 'left', marginBottom: '32px' }}>
              <ElectricBorder active={true}>
                <div style={{ padding: '24px', background: 'var(--bg-tertiary)', borderRadius: 'inherit' }}>
                  <h3 style={{ marginBottom: '12px', color: 'var(--accent-primary)' }}>Suggested Title</h3>
                  <p style={{ marginBottom: '24px', fontSize: '18px', fontWeight: 600 }}>{suggestion.title}</p>
                  
                  <h3 style={{ marginBottom: '12px', color: 'var(--accent-primary)' }}>Suggested Description</h3>
                  <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{suggestion.description}</p>
                </div>
              </ElectricBorder>
            </div>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button 
                onClick={handleGenerate}
                style={{ 
                  padding: '12px 24px', background: 'transparent', border: '1px solid var(--border-color)', 
                  color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' 
                }}
              >
                <RefreshCw size={18} /> Regenerate
              </button>
              <button 
                onClick={handleEdit}
                style={{ 
                  padding: '12px 24px', background: 'rgba(255,255,255,0.05)', border: 'none', 
                  color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' 
                }}
              >
                <PenTool size={18} /> Edit
              </button>
              <MagnetButton onClick={handleAccept}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Check size={18} /> Accept & Continue
                </div>
              </MagnetButton>
            </div>
          </FadeContent>
        )}
      </div>
    </FadeContent>
  );
};
