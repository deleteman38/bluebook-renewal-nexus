import { Button } from '@/components/ui/button';
import { CheckCircle, Home, FileText, Phone, Calendar } from 'lucide-react';

interface ConfirmationScreenProps {
  onStartOver: () => void;
}

const ConfirmationScreen = ({ onStartOver }: ConfirmationScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="card-step text-center animate-slide-up">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div className="relative">
              <h1 className="text-4xl font-bold text-gradient mb-4">
                Request Submitted Successfully!
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Thank you! Your bluebook will be collected by our pickup team soon.
              </p>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">What happens next?</h3>
            
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  title: "We'll call you",
                  description: "Our team will contact you within 24 hours to confirm pickup details"
                },
                {
                  icon: Calendar,
                  title: "Schedule confirmation",
                  description: "We'll confirm the pickup date and time slot you selected"
                },
                {
                  icon: FileText,
                  title: "Document collection",
                  description: "Our pickup team will collect your bluebook and required documents"
                },
                {
                  icon: CheckCircle,
                  title: "Renewal process",
                  description: "We'll handle the renewal process and return your updated bluebook"
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4 text-left">
                  <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md flex-shrink-0">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{step.title}</h4>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-amber-800 mb-3">Important Notes:</h4>
            <ul className="text-sm text-amber-800 space-y-2 text-left">
              <li>• Please keep your original bluebook ready for pickup</li>
              <li>• Have a copy of your citizenship or driving license available</li>
              <li>• Renewal fee will be collected during pickup</li>
              <li>• You'll receive a receipt for all documents collected</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onStartOver}
              variant="outline"
              className="flex-1 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <Button 
              onClick={onStartOver}
              className="flex-1 btn-hero py-3"
            >
              Submit Another Request
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Need help? Contact us at{' '}
              <a href="tel:+977-1-4000000" className="text-primary font-semibold hover:underline">
                01-4000000
              </a>
              {' '}or email{' '}
              <a href="mailto:support@bluebookrenewal.com" className="text-primary font-semibold hover:underline">
                support@bluebookrenewal.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;