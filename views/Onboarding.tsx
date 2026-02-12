
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: "A Ritual of Presence",
    description: "Your fragrance is not something you apply. It’s something you live with.",
    image: "https://picsum.photos/seed/lux1/800/1200"
  },
  {
    title: "A Gentle Companion",
    description: "The L'Essence bracelet is designed as a ritual object—a long-term witness to your story.",
    image: "https://picsum.photos/seed/lux2/800/1200"
  },
  {
    title: "One Journey, One Identity",
    description: "Every cartridge preserves the soul of a single perfume, guiding its expression through time.",
    image: "https://picsum.photos/seed/lux3/800/1200"
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="relative h-full w-full bg-black flex flex-col justify-end text-white p-8">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-60"
        style={{ backgroundImage: `url(${steps[step].image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Content Layer */}
      <div className="relative z-10 fade-in">
        <h2 className="text-4xl mb-4 leading-tight">{steps[step].title}</h2>
        <p className="text-lg text-white/80 font-light mb-12 leading-relaxed">
          {steps[step].description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 rounded-full ${i === step ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} 
              />
            ))}
          </div>
          <button 
            onClick={next}
            className="bg-white text-black px-8 py-3 rounded-full text-sm tracking-widest font-medium hover:bg-[#F9F7F2] transition-colors"
          >
            {step === steps.length - 1 ? "BEGIN RITUAL" : "NEXT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
