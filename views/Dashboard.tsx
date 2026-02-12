
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
  const [showProvenance, setShowProvenance] = useState(false);
  const [activeStage, setActiveStage] = useState<'Top' | 'Heart' | 'Base'>('Heart');
  const [currentTimeProgress] = useState(62); // 62% represents the 'Heart' phase

  useEffect(() => {
    const fetchGuidance = async () => {
      if (!activeFragrance) return;
      setIsLoading(true);
      const data = await getFragranceGuidance(activeFragrance.name, "golden hour");
      setGuidance(data);
      setIsLoading(false);
    };
    fetchGuidance();
  }, [activeFragrance]);

  // Determine the "True" current note based on time progress
  const getCurrentSensedStage = (): 'Top' | 'Heart' | 'Base' => {
    if (currentTimeProgress < 33) return 'Top';
    if (currentTimeProgress < 66) return 'Heart';
    return 'Base';
  };

  const currentSensedStage = getCurrentSensedStage();

  if (!activeFragrance) return null;

  const getNoteForLevel = (level: string): FragranceNote | undefined => {
    return activeFragrance.notes.find(n => n.level === level);
  };

  const getStageData = (level: string) => {
    if (!guidance) return null;
    return guidance.journey[level.toLowerCase() as keyof typeof guidance.journey];
  };

  return (
    <div className="p-8 pb-32 animate-fade-in flex flex-col items-center min-h-full relative">
      <header className="w-full mb-8 flex justify-between items-start">
        <div className="fade-in">
          <p className="text-[9px] uppercase tracking-[0.4em] text-[#AFAFA8] mb-1">Paris • Place Vendôme</p>
          <h1 className="text-3xl text-[#2D2926] leading-none tracking-tight font-bold">{activeFragrance.name}</h1>
          <p className="text-[10px] italic text-[#8E795B] mt-2 tracking-[0.2em] font-medium uppercase">{activeFragrance.brand}</p>
        </div>
        <button 
          onClick={() => setShowProvenance(true)}
          className="flex flex-col items-end group"
        >
          <div className="w-12 h-12 rounded-full border border-[#D1CEC5] flex flex-col items-center justify-center bg-white luxury-shadow group-hover:border-[#8E795B] transition-colors">
            <span className="text-[9px] font-bold text-[#8E795B]">TRACE</span>
          </div>
          <span className="text-[7px] uppercase tracking-widest text-[#AFAFA8] mt-1">Provenance</span>
        </button>
      </header>

      {/* Live Sensation Indicator */}
      <section className="w-full mb-10 fade-in">
        <div className="bg-[#2D2926] text-white p-6 rounded-[2rem] luxury-shadow relative overflow-hidden group">
           {/* Pulsing Aura Background */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#8E795B]/20 rounded-full blur-3xl animate-pulse" />
           
           <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-[8px] uppercase tracking-[0.5em] text-[#8E795B] font-bold mb-4">Currently Sensing</span>
              <h2 className="text-2xl serif italic mb-2 tracking-wide">
                {getNoteForLevel(currentSensedStage)?.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-medium">
                  The {currentSensedStage} Note is in full bloom
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* Journey Dial Section */}
      <section className="w-full mb-10 fade-in relative">
        <div className="flex items-center justify-between mb-8 px-1">
           <h3 className="text-[9px] uppercase tracking-[0.5em] text-[#8E795B] font-bold">Olfactive Evolution</h3>
           <span className="text-[8px] uppercase tracking-widest text-[#AFAFA8]">Golden Hour Phase</span>
        </div>

        <div className="relative h-24 mb-6">
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D1CEC5] to-transparent" />
          
          {/* Progress marker with explicit "Live" label */}
          <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-all duration-1000" style={{ left: `${currentTimeProgress}%` }}>
            <div className="w-px h-8 bg-[#8E795B]" />
            <span className="text-[6px] uppercase tracking-tighter text-[#8E795B] font-bold">Live</span>
          </div>

          <div className="relative flex justify-between items-center h-full px-2">
            {['Top', 'Heart', 'Base'].map((level) => {
              const isActive = activeStage === level;
              const isCurrentlySensed = currentSensedStage === level;
              return (
                <button key={level} onClick={() => setActiveStage(level as any)} className="relative z-10 flex flex-col items-center group">
                  <div className={`w-10 h-10 rounded-full border transition-all duration-700 flex items-center justify-center bg-white ${isActive ? 'border-[#8E795B] scale-110 shadow-xl' : 'border-[#EAE6D8]'} ${isCurrentlySensed && !isActive ? 'ring-2 ring-[#8E795B]/20' : ''}`}>
                     <div className={`transition-all duration-500 rounded-full ${isActive ? 'w-2 h-2 bg-[#8E795B]' : 'w-1.5 h-1.5 bg-[#D1CEC5]'}`} />
                  </div>
                  <div className={`absolute top-12 whitespace-nowrap text-center transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#2D2926]">{level}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Narrative Card */}
        <div className="mt-14 bg-white border border-[#EAE6D8] p-7 rounded-[2.5rem] luxury-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <span className="text-6xl serif italic">YSL</span>
          </div>
          {isLoading ? (
            <div className="h-32 flex items-center justify-center"><div className="w-4 h-4 border-2 border-[#8E795B] border-t-transparent rounded-full animate-spin" /></div>
          ) : guidance && (
            <div className="fade-in" key={activeStage}>
              <div className="flex justify-between items-start mb-4">
                 <h4 className="serif text-2xl text-[#2D2926] italic">{getStageData(activeStage)?.feeling}</h4>
                 <div className="text-right"><span className="text-[8px] uppercase tracking-widest text-[#AFAFA8]">Ritual</span><p className="text-[9px] font-medium text-[#8E795B] italic">&mdash; {getStageData(activeStage)?.ritual}</p></div>
              </div>
              <p className="text-[13px] font-light leading-relaxed text-[#6B6658] mb-6 italic border-l-2 border-[#8E795B]/20 pl-4">&ldquo;{getStageData(activeStage)?.guidance}&rdquo;</p>
              <div className="flex justify-between items-end pt-4 border-t border-[#F9F7F2]">
                <div><p className="text-[8px] uppercase tracking-[0.2em] text-[#AFAFA8] mb-1">Key Note</p><p className="text-[10px] text-[#2D2926] font-medium">{getNoteForLevel(activeStage)?.name}</p></div>
                <div className="text-right"><span className="text-[8px] uppercase tracking-widest text-[#AFAFA8]">Source</span><p className="text-[9px] text-[#8E795B] font-bold">{getNoteForLevel(activeStage)?.sourcing?.origin}</p></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Intensity Toggle */}
      <div className="w-full mt-auto flex flex-col gap-4">
        <button onClick={() => setShowIntensityMenu(true)} className="w-full py-5 rounded-full bg-[#2D2926] text-white text-[9px] tracking-[0.4em] font-bold shadow-2xl hover:bg-black transition-all">
          ADJUST DIFFUSION
        </button>
      </div>

      {/* Global Provenance Modal (All Notes) */}
      {showProvenance && (
        <div className="fixed inset-0 z-50 bg-[#F9F7F2] p-8 flex flex-col fade-in overflow-y-auto pb-24">
           <header className="flex justify-between items-start mb-10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#8E795B] font-bold">Olfactive Origin</span>
                <h2 className="text-3xl serif mt-2 italic">Provenance Journey</h2>
              </div>
              <button onClick={() => setShowProvenance(false)} className="p-2 border border-[#D1CEC5] rounded-full hover:bg-[#8E795B]/5 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
           </header>

           <div className="space-y-16">
              {activeFragrance.notes.map((note) => (
                <div key={note.name} className="fade-in space-y-8">
                  {/* Ingredient Section Header */}
                  <div className="flex items-center gap-4">
                     <div className="h-[1px] flex-1 bg-[#EAE6D8]" />
                     <span className="text-[10px] uppercase tracking-[0.5em] text-[#8E795B] font-bold">{note.level}</span>
                     <div className="h-[1px] flex-1 bg-[#EAE6D8]" />
                  </div>

                  {/* Hero Sourcing Card for this Note */}
                  <div className="bg-white p-7 rounded-[2rem] border border-[#EAE6D8] luxury-shadow">
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 bg-[#F9F7F2] rounded-2xl flex items-center justify-center border border-[#EAE6D8]">
                          <div className="w-8 h-8 rounded-full bg-[#8E795B]/10 border border-[#8E795B]/20 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-[#8E795B]">{note.name.charAt(0)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] uppercase tracking-widest text-[#AFAFA8]">Sourcing Score</span>
                          <p className="text-2xl font-bold text-[#8E795B]">{note.sourcing?.sustainabilityScore}%</p>
                        </div>
                     </div>
                     <h3 className="text-xl serif italic mb-2">{note.name}</h3>
                     <p className="text-[10px] uppercase tracking-widest text-[#AFAFA8] mb-4 font-bold">{note.sourcing?.origin}</p>
                     <p className="text-xs font-light text-[#6B6658] leading-relaxed italic border-l-2 border-[#8E795B]/10 pl-4">{note.sourcing?.story}</p>
                  </div>

                  {/* Supply Chain Narrative Steps */}
                  <div className="px-2">
                     <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#8E795B] mb-8">Olfactive Supply Chain</h4>
                     <div className="space-y-8 relative">
                        <div className="absolute top-0 bottom-0 left-[11px] w-[1px] bg-[#EAE6D8]" />
                        {note.sourcing?.journeySteps.map((step, idx) => (
                          <div key={idx} className="flex gap-6 relative">
                             <div className="w-6 h-6 rounded-full bg-white border border-[#D1CEC5] flex items-center justify-center relative z-10">
                                <span className="text-[8px] font-bold text-[#AFAFA8]">{idx + 1}</span>
                             </div>
                             <div className="flex-1 pb-4">
                                <h5 className="text-xs font-bold uppercase tracking-widest mb-1">{step.title}</h5>
                                <p className="text-xs font-light text-[#6B6658] leading-relaxed">{step.description}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Impact Stats */}
                  <div className="grid grid-cols-1 gap-4">
                     <div className="bg-white/50 p-5 rounded-2xl border border-[#EAE6D8]">
                        <h5 className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#8E795B] mb-2">Sustainable Methods</h5>
                        <p className="text-[11px] font-light text-[#6B6658] leading-relaxed">{note.sourcing?.methods}</p>
                     </div>
                     <div className="bg-white/50 p-5 rounded-2xl border border-[#EAE6D8]">
                        <h5 className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#8E795B] mb-2">Community Impact</h5>
                        <p className="text-[11px] font-light text-[#6B6658] leading-relaxed">{note.sourcing?.communityImpact}</p>
                     </div>
                  </div>

                  {/* Certifications Row */}
                  <div className="flex flex-wrap gap-2 pt-2">
                      {note.sourcing?.certifications.map(c => (
                        <div key={c} className="px-3 py-1.5 bg-white border border-[#EAE6D8] rounded-full flex items-center gap-1.5">
                           <div className="w-1 h-1 bg-green-400 rounded-full" />
                           <span className="text-[8px] uppercase tracking-widest font-bold text-[#2D2926]">{c}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
           </div>

           <footer className="mt-20 pt-10 border-t border-[#EAE6D8] text-center">
              <span className="text-[9px] uppercase tracking-[0.5em] text-[#8E795B] font-bold">YSL BEAUTY COMMITS</span>
              <p className="text-[10px] text-[#AFAFA8] mt-4 leading-loose max-w-xs mx-auto">By 2025, 100% of our iconic botanical ingredients will be sourced sustainably, ensuring absolute transparency from harvest to sillage.</p>
           </footer>
        </div>
      )}

      {showIntensityMenu && <DiffusionControl current={activeFragrance.intensity} onClose={() => setShowIntensityMenu(false)} onSelect={() => setShowIntensityMenu(false)} />}
    </div>
  );
};

export default Dashboard;
