import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, User, Phone } from 'lucide-react';

interface PersonalInfoData {
  fullName: string;
  phoneNumber: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfoData;
  onNext: (data: PersonalInfoData) => void;
}

const PersonalInfoForm = ({ data, onNext }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState<PersonalInfoData>(data);
  const [errors, setErrors] = useState<Partial<PersonalInfoData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<PersonalInfoData> = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Phone number validation (Nepali format: starts with 97 or 98, 10 digits total)
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^(97|98)\d{8}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Phone number must be 10 digits starting with 97 or 98';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  const handleInputChange = (field: keyof PersonalInfoData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-lg">
        <div className="card-step animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
            <p className="text-gray-600">Let's start with your basic details</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-2 block">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`form-input pl-11 ${errors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 mb-2 block">
                Phone Number *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="97XXXXXXXX or 98XXXXXXXX"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={`form-input pl-11 ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
                  maxLength={10}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Enter Nepali mobile number (10 digits starting with 97 or 98)
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit"
                className="w-full btn-hero py-4 flex items-center justify-center gap-3"
              >
                Continue to Vehicle Details
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;