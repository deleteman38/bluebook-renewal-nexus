import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import HomePage from '@/components/HomePage';
import ProgressBar from '@/components/ProgressBar';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import VehicleDetailsForm from '@/components/forms/VehicleDetailsForm';
import PickupDetailsForm from '@/components/forms/PickupDetailsForm';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import { useToast } from '@/hooks/use-toast';

type Screen = 'splash' | 'home' | 'form' | 'confirmation';
type FormStep = 1 | 2 | 3;

interface FormData {
  personalInfo: {
    fullName: string;
    phoneNumber: string;
  };
  vehicleDetails: {
    vehicleName: string;
    engineCapacity: string;
    vehicleRegistration: string;
    lastRenewalYear: string;
  };
  pickupDetails: {
    pickupAddress: string;
    pickupDate: string;
    timeSlot: string;
  };
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [formStep, setFormStep] = useState<FormStep>(1);
  const [previousStep, setPreviousStep] = useState<FormStep>(1);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '',
      phoneNumber: ''
    },
    vehicleDetails: {
      vehicleName: '',
      engineCapacity: '',
      vehicleRegistration: '',
      lastRenewalYear: ''
    },
    pickupDetails: {
      pickupAddress: '',
      pickupDate: '',
      timeSlot: ''
    }
  });

  const handleSplashFinish = () => {
    setCurrentScreen('home');
  };

  const handleStartRenewal = () => {
    setCurrentScreen('form');
    setFormStep(1);
  };

  const handlePersonalInfoNext = (data: typeof formData.personalInfo) => {
    setFormData(prev => ({ ...prev, personalInfo: data }));
    setPreviousStep(1);
    setSlideDirection('right');
    setFormStep(2);
  };

  const handleVehicleDetailsNext = (data: typeof formData.vehicleDetails) => {
    setFormData(prev => ({ ...prev, vehicleDetails: data }));
    setPreviousStep(2);
    setSlideDirection('right');
    setFormStep(3);
  };

  const handleVehicleDetailsBack = () => {
    setPreviousStep(2);
    setSlideDirection('left');
    setFormStep(1);
  };

  const handlePickupDetailsBack = () => {
    setPreviousStep(3);
    setSlideDirection('left');
    setFormStep(2);
  };

  const handleFinalSubmit = async (data: typeof formData.pickupDetails) => {
    setIsSubmitting(true);
    
    try {
      // Update form data with final step
      const finalData = { ...formData, pickupDetails: data };
      
      // Simulate API call to Supabase (you'll implement this later)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, just log the data
      console.log('Bluebook renewal request submitted:', finalData);
      
      toast({
        title: "Request Submitted Successfully!",
        description: "Our pickup team will contact you soon.",
      });

      setCurrentScreen('confirmation');
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again. If the problem persists, contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartOver = () => {
    setCurrentScreen('home');
    setFormStep(1);
    setFormData({
      personalInfo: {
        fullName: '',
        phoneNumber: ''
      },
      vehicleDetails: {
        vehicleName: '',
        engineCapacity: '',
        vehicleRegistration: '',
        lastRenewalYear: ''
      },
      pickupDetails: {
        pickupAddress: '',
        pickupDate: '',
        timeSlot: ''
      }
    });
  };

  // Show splash screen
  if (currentScreen === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Show home page
  if (currentScreen === 'home') {
    return <HomePage onStartRenewal={handleStartRenewal} />;
  }

  // Show confirmation screen
  if (currentScreen === 'confirmation') {
    return <ConfirmationScreen onStartOver={handleStartOver} />;
  }

  // Show form steps
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 mobile-safe-area">
      {/* Progress Bar */}
      <div className="pt-8 mobile-container">
        <ProgressBar currentStep={formStep} totalSteps={3} />
      </div>

      {/* Form Steps */}
      <div className="relative overflow-hidden">
        {formStep === 1 && (
          <div 
            key="step-1"
            className={`mobile-container ${slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
          >
            <PersonalInfoForm
              data={formData.personalInfo}
              onNext={handlePersonalInfoNext}
            />
          </div>
        )}

        {formStep === 2 && (
          <div 
            key="step-2"
            className={`mobile-container ${slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
          >
            <VehicleDetailsForm
              data={formData.vehicleDetails}
              onNext={handleVehicleDetailsNext}
              onBack={handleVehicleDetailsBack}
            />
          </div>
        )}

        {formStep === 3 && (
          <div 
            key="step-3"
            className={`mobile-container ${slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
          >
            <PickupDetailsForm
              data={formData.pickupDetails}
              onSubmit={handleFinalSubmit}
              onBack={handlePickupDetailsBack}
              isSubmitting={isSubmitting}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
