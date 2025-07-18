import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, Car, Gauge, FileText, Calendar } from 'lucide-react';

interface VehicleDetailsData {
  vehicleName: string;
  engineCapacity: string;
  vehicleRegistration: string;
  lastRenewalYear: string;
}

interface VehicleDetailsFormProps {
  data: VehicleDetailsData;
  onNext: (data: VehicleDetailsData) => void;
  onBack: () => void;
}

const VehicleDetailsForm = ({ data, onNext, onBack }: VehicleDetailsFormProps) => {
  const [formData, setFormData] = useState<VehicleDetailsData>(data);
  const [errors, setErrors] = useState<Partial<VehicleDetailsData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<VehicleDetailsData> = {};

    // Vehicle name validation
    if (!formData.vehicleName.trim()) {
      newErrors.vehicleName = 'Vehicle name is required';
    }

    // Engine capacity validation
    if (!formData.engineCapacity.trim()) {
      newErrors.engineCapacity = 'Engine capacity is required';
    } else if (isNaN(Number(formData.engineCapacity)) || Number(formData.engineCapacity) <= 0) {
      newErrors.engineCapacity = 'Engine capacity must be a positive number';
    }

    // Vehicle registration validation (Nepal format)
    if (!formData.vehicleRegistration.trim()) {
      newErrors.vehicleRegistration = 'Vehicle registration number is required';
    } else {
      const registration = formData.vehicleRegistration.trim();
      // Nepal vehicle number patterns:
      // Old format: "Ba 12 Pa 1234" 
      // New format: "Province-2-03-001 Cha 1234"
      const oldFormat = /^[A-Za-z]{1,2}\s*\d{1,2}\s*[A-Za-z]{1,3}\s*\d{1,4}$/;
      const newFormat = /^Province-\d{1,2}-\d{2}-\d{3}\s*[A-Za-z]{1,3}\s*\d{1,4}$/i;
      
      if (!oldFormat.test(registration) && !newFormat.test(registration)) {
        newErrors.vehicleRegistration = 'Invalid registration format. Use: "Ba 12 Pa 1234" or "Province-2-03-001 Cha 1234"';
      }
    }

    // Last renewal year validation (optional)
    if (formData.lastRenewalYear.trim()) {
      const year = Number(formData.lastRenewalYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 2000 || year > currentYear) {
        newErrors.lastRenewalYear = `Year must be between 2000 and ${currentYear}`;
      }
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

  const handleInputChange = (field: keyof VehicleDetailsData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="card-step animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Vehicle Details</h2>
            <p className="text-gray-600">Tell us about your vehicle</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Name */}
            <div>
              <Label htmlFor="vehicleName" className="text-sm font-medium text-gray-700 mb-2 block">
                Vehicle Name *
              </Label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="vehicleName"
                  type="text"
                  placeholder="e.g., Honda City, Toyota Vitz"
                  value={formData.vehicleName}
                  onChange={(e) => handleInputChange('vehicleName', e.target.value)}
                  className={`form-input pl-11 ${errors.vehicleName ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
              </div>
              {errors.vehicleName && (
                <p className="text-red-500 text-sm mt-1">{errors.vehicleName}</p>
              )}
            </div>

            {/* Engine Capacity */}
            <div>
              <Label htmlFor="engineCapacity" className="text-sm font-medium text-gray-700 mb-2 block">
                Engine Capacity (cc) *
              </Label>
              <div className="relative">
                <Gauge className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="engineCapacity"
                  type="number"
                  placeholder="e.g., 1500"
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange('engineCapacity', e.target.value)}
                  className={`form-input pl-11 ${errors.engineCapacity ? 'border-red-500 focus:ring-red-500' : ''}`}
                  min="1"
                />
              </div>
              {errors.engineCapacity && (
                <p className="text-red-500 text-sm mt-1">{errors.engineCapacity}</p>
              )}
            </div>

            {/* Vehicle Registration */}
            <div>
              <Label htmlFor="vehicleRegistration" className="text-sm font-medium text-gray-700 mb-2 block">
                Vehicle Registration Number *
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="vehicleRegistration"
                  type="text"
                  placeholder="Ba 12 Pa 1234 or Province-2-03-001 Cha 1234"
                  value={formData.vehicleRegistration}
                  onChange={(e) => handleInputChange('vehicleRegistration', e.target.value.toUpperCase())}
                  className={`form-input pl-11 ${errors.vehicleRegistration ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
              </div>
              {errors.vehicleRegistration && (
                <p className="text-red-500 text-sm mt-1">{errors.vehicleRegistration}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Enter as per Nepal government vehicle number standards
              </p>
            </div>

            {/* Last Renewal Year */}
            <div>
              <Label htmlFor="lastRenewalYear" className="text-sm font-medium text-gray-700 mb-2 block">
                Last Bluebook Renewal Year (Optional)
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="lastRenewalYear"
                  type="number"
                  placeholder="e.g., 2022"
                  value={formData.lastRenewalYear}
                  onChange={(e) => handleInputChange('lastRenewalYear', e.target.value)}
                  className={`form-input pl-11 ${errors.lastRenewalYear ? 'border-red-500 focus:ring-red-500' : ''}`}
                  min="2000"
                  max={new Date().getFullYear()}
                />
              </div>
              {errors.lastRenewalYear && (
                <p className="text-red-500 text-sm mt-1">{errors.lastRenewalYear}</p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              <Button 
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 py-4 flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-gray-400"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Button>
              <Button 
                type="submit"
                className="flex-1 btn-hero py-4 flex items-center justify-center gap-3"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsForm;