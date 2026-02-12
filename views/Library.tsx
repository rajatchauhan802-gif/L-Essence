
import React from 'react';
import { Fragrance } from '../types';

interface LibraryProps {
  activeFragrance: Fragrance | null;
}

const WARDROBE: Partial<Fragrance>[] = [
  { id: 'ysl-black-opium', name: 'Black Opium', brand: 'YVES SAINT LAURENT', remainingPercentage: 42 },
  { id: 'ysl-y', name: 'Y Le Parfum', brand: 'YVES SAINT LAURENT', remainingPercentage: 88 },
  { id: 'ysl-tuxedo', name: 'Tuxedo Le Vestiaire', brand: 'YVES SAINT LAURENT', remainingPercentage: 15 },
];

const Library: React.FC<LibraryProps> = ({ activeFragrance }) => {
  return (
    <div className="p-8 pb-32">
      <header className="mb-12">
        <h2 className="text-4xl serif italic mb-2 tracking-tight">The Wardrobe</h2>
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#AFAFA8] font-bold">Refill & Lifecycle Management</p>
      </header>

      <section className="mb-12">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8E795B] mb-6">Current Ritual</h3>
        {activeFragrance ? (
          <div className="bg-white p-6 rounded-[2rem] border border-[#EAE6D8] luxury-shadow flex gap-6 items-center group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
               <span className="text-7xl serif italic">YSL</span>
            </div>
            <div className="w-20 h-28 bg-[#F9F7F2] rounded-xl flex items-center justify-center border border-[#EAE6D8] relative z-10">
               <div className="w-10 h-16 border-[1px] border-black/10 rounded flex items-center justify-center">
                  <span className="text-[8px] font-bold opacity-30">Libre</span>
               </div>
            </div>
            <div className="flex-1 relative z-10">
              <p className="text-lg font-bold mb-1 leading-tight">{activeFragrance.name}</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#AFAFA8] mb-4 font-medium">{activeFragrance.brand}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#F9F7F2] h-1 rounded-full overflow-hidden">
                  <div className="bg-[#8E795B] h-full transition-all duration-1000" style={{ width: `${activeFragrance.remainingPercentage}%` }} />
                </div>
                <span className="text-[10px] font-bold text-[#8E795B]">{activeFragrance.remainingPercentage}%</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs italic text-[#AFAFA8]">No active fragrance paired.</p>
        )}
      </section>

      <section className="space-y-6">
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8E795B]">Archive</h3>
        {WARDROBE.map(f => (
          <div key={f.id} className="flex gap-4 items-center opacity-70 hover:opacity-100 transition-all cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#EAE6D8] flex items-center justify-center p-2 group-hover:border-[#8E795B]">
              <div className="w-full h-full bg-[#F9F7F2] rounded-lg flex items-center justify-center text-[7px] uppercase font-bold text-[#AFAFA8]">{f.name?.charAt(0)}</div>
            </div>
            <div className="flex-1 border-b border-[#EAE6D8] pb-4">
              <p className="text-sm font-bold tracking-tight">{f.name}</p>
              <p className="text-[8px] uppercase tracking-[0.2em] text-[#AFAFA8] font-medium">{f.brand}</p>
            </div>
            <div className="text-[10px] text-[#8E795B] font-bold">{f.remainingPercentage}%</div>
          </div>
        ))}
      </section>

      <div className="mt-12 bg-black text-white p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        <h4 className="text-xl serif italic mb-3 relative z-10">Sustainability is not a gadget.</h4>
        <p className="text-[11px] font-light text-white/70 leading-relaxed mb-8 relative z-10">
          Our cartridges are eternally recyclable. For every five returns, we gift you a signature refill to continue your journey.
        </p>
        <button className="text-[10px] uppercase tracking-[0.4em] font-bold text-white border-b-2 border-[#8E795B] pb-2 hover:text-[#8E795B] transition-all relative z-10">
          ORDER PRE-PAID RECYCLING
        </button>
      </div>
    </div>
  );
};

export default Library;
