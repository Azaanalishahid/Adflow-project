import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdFormProvider, useAdForm } from './context/AdFormContext';
import { AuthProvider } from './context/AuthContext';
import { StepIndicator } from './components/ui/StepIndicator';
import { BasicInfo } from './components/steps/BasicInfo';
import { MediaUpload } from './components/steps/MediaUpload';
import { DetailsSetup } from './components/steps/DetailsSetup';
import { AIGenerate } from './components/steps/AIGenerate';
import { PackageSelection } from './components/steps/PackageSelection';
import { ReviewSubmit } from './components/steps/ReviewSubmit';
import { MagnetButton } from './components/animations/MagnetButton';
import { Navbar } from './components/layout/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Marketplace } from './pages/Marketplace';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const CreateAdFlow = () => {
  const { currentStep, nextStep, prevStep } = useAdForm();
  const { adData } = useAdForm();
  const isPending = adData.status === 'Pending';

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', width: '100%', padding: '0 20px' }}>
      {!isPending && (
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', background: 'linear-gradient(90deg, #fff, var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Post a New Ad
          </h1>
        </div>
      )}

      {/* Main glassmorphism container */}
      <div className="glass-panel" style={{ padding: '40px' }}>
        
        {!isPending && <StepIndicator />}

        {/* Form Content Rendering */}
        <div style={{ position: 'relative', minHeight: '350px' }}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && <BasicInfo key="step1" />}
            {currentStep === 2 && <MediaUpload key="step2" />}
            {currentStep === 3 && <DetailsSetup key="step3" />}
            {currentStep === 4 && <AIGenerate key="step4" />}
            {currentStep === 5 && <PackageSelection key="step5" />}
            {currentStep === 6 && <ReviewSubmit key="step6" />}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {!isPending && currentStep < 6 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
            <button 
              onClick={prevStep} 
              disabled={currentStep === 1}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', background: 'transparent', border: 'none',
                color: currentStep === 1 ? 'var(--text-muted)' : '#fff',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                opacity: currentStep === 1 ? 0.5 : 1
              }}
            >
              <ArrowLeft size={18} /> Back
            </button>
            <MagnetButton onClick={nextStep}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Next Step <ArrowRight size={18} />
              </div>
            </MagnetButton>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/marketplace" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/create" element={
            <AdFormProvider>
              <CreateAdFlow />
            </AdFormProvider>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
