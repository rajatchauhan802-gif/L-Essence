
import React from 'react';
import { DiffusionIntensity } from '../types';

interface DiffusionControlProps {
  current: DiffusionIntensity;
  onSelect: (intensity: DiffusionIntensity) => void;
  onClose: () => void;
}

export const DiffusionControl: React.FC<DiffusionControlProps> = ({ current, onSelect, onClose }) => {
  const options = [
    { type: DiffusionIntensity.SOFT, label: 'Soft', desc: 'A gentle, intimate aura.' },
    { type: DiffusionIntensity.BALANCED, label: 'Balanced', desc: 'The perfume as intended by the nose.' },
    { type: DiffusionIntensity.EXPRESSIVE, label: 'Expressive', desc: 'A confident, lingering trail.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F9F7F2] rounded-t-[32px] p-8 pb-12 fade-in shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl">Diffusion Mode</h3>
          <button onClick={onClose} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {options.map((opt) => (
            <button
              key={opt.type}
              onClick={() => onSelect(opt.type)}
              className={`flex justify-between items-center p-6 rounded-2xl border transition-all duration-300 ${current === opt.type ? 'border-[#8E795B] bg-[#8E795B]/5' : 'border-[#EAE6D8] hover:border-[#D1CEC5]'}`}
            >
              <div className="text-left">
                <p className="text-sm font-medium tracking-widest uppercase mb-1">{opt.label}</p>
                <p className="text-xs font-light text-[#6B6658]">{opt.desc}</p>
              </div>
              {current === opt.type && (
                <div className="w-5 h-5 bg-[#8E795B] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </button>
          ))}
        </div>
        
        <button 
          onClick={onClose}
          className="w-full mt-10 py-5 rounded-full bg-[#2D2926] text-white text-xs tracking-widest uppercase"
        >
          Confirm Experience
        </button>
      </div>
    </div>
  );
};
