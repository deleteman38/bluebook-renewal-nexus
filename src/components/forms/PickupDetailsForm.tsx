import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Calendar, Clock, Send } from 'lucide-react';

interface PickupDetailsData {
  pickupAddress: string;
  pickupDate: string;
  timeSlot: string;
}

interface PickupDetailsFormProps {
  data: PickupDetailsData;
  onSubmit: (data: PickupDetailsData) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const PickupDetailsForm = ({ data, onSubmit, onBack, isSubmitting }: PickupDetailsFormProps) => {
  const [formData, setFormData] = useState<PickupDetailsData>(data);
  const [errors, setErrors] = useState<Partial<PickupDetailsData>>({});

  const timeSlots = [
    { value: 'Morning', label: 'Morning (9:00 AM - 12:00 PM)' },
    { value: 'Afternoon', label: 'Afternoon (12:00 PM - 4:00 PM)' },
    { value: 'Evening', label: 'Evening (4:00 PM - 7:00 PM)' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<PickupDetailsData> = {};

    // Pickup address validation
    if (!formData.pickupAddress.trim()) {
      newErrors.pickupAddress = 'Pickup address is required';
    } else if (formData.pickupAddress.trim().length < 10) {
      newErrors.pickupAddress = 'Please provide a detailed address (minimum 10 characters)';
    }

    // Pickup date validation
    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Pickup date is required';
    } else {
      const selectedDate = new Date(formData.pickupDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate <= today) {
        newErrors.pickupDate = 'Please select a future date';
      }
    }

    // Time slot validation
    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof PickupDetailsData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="card-step animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pickup Details</h2>
            <p className="text-gray-600">When and where should we collect your bluebook?</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pickup Address */}
            <div>
              <Label htmlFor="pickupAddress" className="text-sm font-medium text-gray-700 mb-2 block">
                Pickup Address *
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="pickupAddress"
                  placeholder="Enter your complete address including area, city, and landmarks"
                  value={formData.pickupAddress}
                  onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                  className={`form-input pl-11 min-h-[100px] resize-none ${errors.pickupAddress ? 'border-red-500 focus:ring-red-500' : ''}`}
                  rows={3}
                />
              </div>
              {errors.pickupAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupAddress}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Include area, ward number, and landmarks for easy location
              </p>
            </div>

            {/* Pickup Date */}
            <div>
              <Label htmlFor="pickupDate" className="text-sm font-medium text-gray-700 mb-2 block">
                Preferred Pickup Date *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  className={`form-input pl-11 ${errors.pickupDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                  min={minDate}
                />
              </div>
              {errors.pickupDate && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>
              )}
            </div>

            {/* Time Slot */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Preferred Time Slot *
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <Select value={formData.timeSlot} onValueChange={(value) => handleInputChange('timeSlot', value)}>
                  <SelectTrigger className={`form-input pl-11 ${errors.timeSlot ? 'border-red-500 focus:ring-red-500' : ''}`}>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.timeSlot && (
                <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              <Button 
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 py-4 flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-gray-400"
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Button>
              <Button 
                type="submit"
                className="flex-1 btn-hero py-4 flex items-center justify-center gap-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Info Note */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Our pickup team will contact you on the provided phone number 
              to confirm the pickup time and any additional details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupDetailsForm;