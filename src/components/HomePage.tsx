import { Button } from '@/components/ui/button';
import { FileText, User, Car, MapPin, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onStartRenewal: () => void;
}

const HomePage = ({ onStartRenewal }: HomePageProps) => {
  const steps = [
    {
      icon: User,
      title: "Personal Information",
      description: "Enter your name and phone number"
    },
    {
      icon: Car,
      title: "Vehicle Details", 
      description: "Provide vehicle information and registration"
    },
    {
      icon: MapPin,
      title: "Pickup Details",
      description: "Choose pickup address and preferred time"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo and Branding */}
          <div className="mb-8 animate-slide-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mb-6 shadow-lg animate-float">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
              Renew Your Bluebook Now!!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Fast, convenient bluebook renewal service. Our pickup team will collect your bluebook 
              and handle the renewal process for you.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mb-16 animate-fade-in">
            <Button 
              onClick={onStartRenewal}
              className="btn-hero text-xl px-12 py-6 inline-flex items-center gap-3"
            >
              <FileText className="w-6 h-6" />
              Start Renewal
            </Button>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: CheckCircle, title: "Quick Process", desc: "Complete in 3 simple steps" },
              { icon: FileText, title: "Expert Handling", desc: "Professional renewal service" },
              { icon: MapPin, title: "Doorstep Pickup", desc: "We collect from your location" }
            ].map((benefit, index) => (
              <div key={index} className="card-step animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-white/50 to-blue-50/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gradient">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Three simple steps to renew your bluebook from the comfort of your home
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="card-step text-center group hover:scale-105 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-1 bg-gradient-to-r from-primary to-secondary opacity-30 rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 mb-6">
              Ready to get started? Complete the process in just a few minutes!
            </p>
            <Button 
              onClick={onStartRenewal}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 font-semibold transition-all duration-300"
            >
              Begin Renewal Process
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;