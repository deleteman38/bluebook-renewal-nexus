import { useEffect } from 'react';
import { FileText, Truck } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary flex items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full animate-pulse-slow delay-2000" />
      </div>

      <div className="text-center animate-slide-up">
        {/* Logo Icon */}
        <div className="relative mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-8 inline-block animate-float">
            <FileText className="w-20 h-20 text-white" />
            <Truck className="w-8 h-8 text-white/80 absolute -bottom-2 -right-2 bg-secondary rounded-full p-1" />
          </div>
        </div>

        {/* App Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
          Bluebook
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-6 animate-fade-in">
          Renewal Service
        </h2>

        {/* Tagline */}
        <p className="text-lg text-white/80 animate-fade-in delay-300">
          Quick • Easy • Reliable
        </p>

        {/* Loading Indicator */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce delay-150" />
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce delay-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;