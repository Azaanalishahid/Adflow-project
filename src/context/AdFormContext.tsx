import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type AdCategory = 'Real Estate' | 'Vehicles' | 'Electronics' | 'Services' | 'Jobs' | '';
export type AdPackage = 'Basic' | 'Standard' | 'Premium' | '';

export interface AdData {
  title: string;
  category: AdCategory;
  city: string;
  price: number | '';
  description: string;
  image: string; // URL
  packageType: AdPackage;
  status: 'Draft' | 'Pending' | 'Active';
}

interface FormErrors {
  [key: string]: string;
}

interface AdFormContextType {
  adData: AdData;
  setAdData: React.Dispatch<React.SetStateAction<AdData>>;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  errors: FormErrors;
  validateCurrentStep: () => boolean;
}

const defaultAdData: AdData = {
  title: '',
  category: '',
  city: '',
  price: '',
  description: '',
  image: '',
  packageType: '',
  status: 'Draft',
};

const AdFormContext = createContext<AdFormContextType | undefined>(undefined);

export const AdFormProvider = ({ children }: { children: ReactNode }) => {
  const [adData, setAdData] = useState<AdData>(defaultAdData);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateCurrentStep = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!adData.title.trim()) {
        newErrors.title = 'Title is required';
        isValid = false;
      }
      if (!adData.category) {
        newErrors.category = 'Category is required';
        isValid = false;
      }
      if (!adData.city.trim()) {
        newErrors.city = 'City is required';
        isValid = false;
      }
    }

    if (currentStep === 2) {
      if (!adData.image.trim()) {
        newErrors.image = 'Image is required';
        isValid = false;
      } else {
        try {
          new URL(adData.image);
        } catch {
          newErrors.image = 'Must be a valid URL';
          isValid = false;
        }
      }
    }

    if (currentStep === 3) {
      if (adData.price === '') {
        newErrors.price = 'Price is required';
        isValid = false;
      } else if (Number(adData.price) < 0) {
        newErrors.price = 'Price must be non-negative';
        isValid = false;
      }
      if (!adData.description.trim() || adData.description.length < 20) {
        newErrors.description = 'Description must be at least 20 characters';
        isValid = false;
      }
    }

    if (currentStep === 5) {
      if (!adData.packageType) {
        newErrors.packageType = 'Please select a package';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const setStep = (step: number) => {
    // Only allow jumping back, not forward past validation
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <AdFormContext.Provider value={{ adData, setAdData, currentStep, nextStep, prevStep, setStep, errors, validateCurrentStep }}>
      {children}
    </AdFormContext.Provider>
  );
};

export const useAdForm = () => {
  const context = useContext(AdFormContext);
  if (context === undefined) {
    throw new Error('useAdForm must be used within an AdFormProvider');
  }
  return context;
};
