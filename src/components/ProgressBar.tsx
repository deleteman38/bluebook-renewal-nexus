import { User, Car, MapPin, Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const steps = [
    { icon: User, label: "Personal Information" },
    { icon: Car, label: "Vehicle Details" }, 
    { icon: MapPin, label: "Pickup Details" }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full -z-10">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <div className={`
                progress-step mb-2
                ${isActive ? 'active animate-pulse' : ''}
                ${isCompleted ? 'completed' : ''}
                ${!isActive && !isCompleted ? 'inactive' : ''}
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>

              {/* Step Label */}
              <span className={`
                text-sm font-medium text-center max-w-24 leading-tight
                ${isActive ? 'text-primary' : ''}
                ${isCompleted ? 'text-green-600' : ''}
                ${!isActive && !isCompleted ? 'text-gray-400' : ''}
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Counter */}
      <div className="text-center mt-6">
        <span className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;