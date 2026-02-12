
import React, { useState, useEffect } from 'react';
import { Fragrance, FragranceGuidance, DiffusionIntensity, FragranceNote } from '../types';
import { getFragranceGuidance } from '../services/gemini';
import { DiffusionControl } from '../components/DiffusionControl';

interface DashboardProps {
  activeFragrance: Fragrance | null;
}

const Dashboard: React.FC<DashboardProps> = ({ activeFragrance }) => {
  const [guidance, setGuidance] = useState<FragranceGuidance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showIntensityMenu, setShowIntensityMenu] = useState(false);
  const [activeStage, setActiveStage] = useState<'Top' | 'Heart' | 'Base'>('Heart');

  useEffect(() => {
    const fetchGuidance = async () => {
      if (!activeFragrance) return;
      setIsLoading(true);
      const data = await getFragranceGuidance(activeFragrance.name, "early evening");
      setGuidance(data);
      setIsLoading(false);
    };

    fetchGuidance();
  }, [activeFragrance]);

  if (!activeFragrance) return null;

  const getNoteForLevel = (level: string): FragranceNote | undefined => {
    return activeFragrance.notes.find(n => n.level === level);
  };

  return (
    <div className="p-8 pb-32 animate-fade-in flex flex-col items-center min-h-full">
      <header className="w-full mb-10 flex justify-between items-start">
        <div className="fade-in">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#AFAFA8] mb-1">Paris • 22°C</p>
          <h1 className="text-3xl text-[#2D2926]">{activeFragrance.name}</h1>
          <p className="text-xs italic text-[#8E795B] mt-1">{activeFragrance.brand}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="w-10 h-10 rounded-full border border-[#D1CEC5] flex items-center justify-center text-[10px] font-medium text-[#8E795B]">
            {activeFragrance.remainingPercentage}%
          </div>
          <span className="text-[8px] uppercase tracking-widest text-[#AFAFA8]">Refill</span>
        </div>
      </header>

      {/* Fragrance Journey Timeline */}
      <section className="w-full mb-12 fade-in">
        <div className="flex items-center justify-between mb-8 px-2">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#8E795B] font-semibold">The Journey</h3>
          <p className="text-[10px] uppercase tracking-widest text-[#AFAFA8]">8 Hours Remaining</p>
        </div>
        
        <div className="relative flex justify-between items-start px-4">
          {/* Horizontal Progress Line */}
          <div className="absolute top-4 left-4 right-4 h-[1px] bg-[#EAE6D8] z-0" />
          
          {['Top', 'Heart', 'Base'].map((level) => {
            const isActive = activeStage === level;
            const note = getNoteForLevel(level);
            return (
              <button 
                key={level}
                onClick={() => setActiveStage(level as any)}
                className="relative z-10 flex flex-col items-center group"
              >
                <div className={`w-8 h-8 rounded-full border transition-all duration-700 flex items-center justify-center bg-[#F9F7F2] ${isActive ? 'border-[#8E795B] scale-125 luxury-shadow' : 'border-[#D1CEC5] group-hover:border-[#AFAFA8]'}`}>
                   <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? 'bg-[#8E795B]' : 'bg-[#D1CEC5]'}`} />
                </div>
                <p className={`mt-3 text-[9px] uppercase tracking-widest transition-colors ${isActive ? 'text-[#2D2926] font-semibold' : 'text-[#AFAFA8]'}`}>
                  {level === 'Top' ? 'Opening' : level === 'Heart' ? 'Heart' : 'Depth'}
                </p>
                <p className={`mt-1 text-[8px] italic transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {note?.name}
                </p>
              </button>
            )
          })}
        </div>

        {/* Dynamic Journey Guidance Card */}
        <div className="mt-10 bg-white/50 backdrop-blur-sm border border-[#EAE6D8] p-6 rounded-[2rem] luxury-shadow transition-all duration-700">
          {isLoading ? (
             <div className="h-24 flex items-center justify-center">
               <div className="w-4 h-4 border-2 border-[#8E795B]/30 border-t-[#8E795B] rounded-full animate-spin" />
             </div>
          ) : guidance && (
            <div className="fade-in" key={activeStage}>
              <div className="flex items-center gap-3 mb-3">
                 <span className="text-[9px] uppercase tracking-widest text-[#8E795B] bg-[#8E795B]/5 px-3 py-1 rounded-full border border-[#8E795B]/10">
                   {guidance.journey[activeStage.toLowerCase() as keyof typeof guidance.journey].feeling}
                 </span>
              </div>
              <p className="serif text-xl mb-4 italic text-[#2D2926]">
                &ldquo;{guidance.journey[activeStage.toLowerCase() as keyof typeof guidance.journey].guidance}&rdquo;
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-[#AFAFA8] leading-relaxed">
                  <span className="font-semibold text-[#8E795B]">{getNoteForLevel(activeStage)?.name}:</span> {getNoteForLevel(activeStage)?.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Current Mood Highlight */}
      <section className="w-full text-center max-w-sm mb-12 px-4">
        {!isLoading && guidance && (
          <div className="fade-in pt-4 border-t border-[#EAE6D8]">
            <h2 className="text-sm font-light leading-relaxed text-[#6B6658] mb-4">
              {guidance.poeticSuggestion}
            </h2>
            <p className="text-[9px] text-[#AFAFA8] uppercase tracking-[0.2em] leading-loose">
              {guidance.why}
            </p>
          </div>
        )}
      </section>

      {/* Interaction Controls */}
      <div className="w-full flex flex-col items-center gap-4 mt-auto">
        <button 
          onClick={() => setShowIntensityMenu(true)}
          className="w-full py-4 px-8 rounded-full bg-[#2D2926] text-white text-[10px] tracking-[0.3em] font-medium shadow-lg hover:bg-black transition-all"
        >
          ADJUST DIFFUSION
        </button>
        <p className="text-[9px] text-[#AFAFA8] uppercase tracking-widest">
          Currently in {activeFragrance.intensity} mode
        </p>
      </div>

      {showIntensityMenu && (
        <DiffusionControl 
          current={activeFragrance.intensity} 
          onClose={() => setShowIntensityMenu(false)}
          onSelect={(i) => {
            console.log("Intensity updated:", i);
            setShowIntensityMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
