
import React from 'react';
import { Fragrance } from '../types';

interface LibraryProps {
  activeFragrance: Fragrance | null;
}

const WARDROBE: Partial<Fragrance>[] = [
  { id: '1', name: 'White Tea & Bergamot', brand: 'A&L Fragrances', remainingPercentage: 62 },
  { id: '2', name: 'Noir Musk', brand: 'Private Atelier', remainingPercentage: 45 },
  { id: '3', name: 'Golden Vetiver', brand: 'Heritage House', remainingPercentage: 92 },
];

const Library: React.FC<LibraryProps> = ({ activeFragrance }) => {
  return (
    <div className="p-8">
      <header className="mb-12">
        <h2 className="text-4xl mb-2">Wardrobe</h2>
        <p className="text-xs uppercase tracking-widest text-[#AFAFA8]">Refills & Subscriptions</p>
      </header>

      <section className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8E795B] mb-6">Current Journey</h3>
        {activeFragrance ? (
          <div className="bg-white p-6 rounded-3xl border border-[#EAE6D8] luxury-shadow flex gap-6 items-center">
            <div className="w-20 h-24 bg-[#F9F7F2] rounded-xl flex items-center justify-center border border-[#EAE6D8]">
               <div className="w-12 h-16 border-2 border-[#8E795B]/20 rounded" />
            </div>
            <div className="flex-1">
              <p className="text-lg mb-1">{activeFragrance.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#AFAFA8] mb-4">{activeFragrance.brand}</p>
              <div className="w-full bg-[#F9F7F2] h-1 rounded-full overflow-hidden">
                <div className="bg-[#8E795B] h-full" style={{ width: `${activeFragrance.remainingPercentage}%` }} />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs italic text-[#AFAFA8]">No active fragrance paired.</p>
        )}
      </section>

      <section className="space-y-6">
        <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8E795B]">Archive</h3>
        {WARDROBE.map(f => (
          <div key={f.id} className="flex gap-4 items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#EAE6D8] flex items-center justify-center p-2">
              <img src={`https://picsum.photos/seed/${f.id}/100/100`} alt={f.name} className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div className="flex-1 border-b border-[#EAE6D8] pb-4">
              <p className="text-sm font-medium">{f.name}</p>
              <p className="text-[8px] uppercase tracking-widest text-[#AFAFA8]">{f.brand}</p>
            </div>
            <div className="text-[10px] text-[#8E795B] font-medium">{f.remainingPercentage}%</div>
          </div>
        ))}
      </section>

      <div className="mt-12 bg-[#8E795B]/10 p-8 rounded-3xl text-center">
        <h4 className="text-lg mb-2 italic">Sustainability first.</h4>
        <p className="text-xs font-light text-[#6B6658] leading-relaxed mb-6">
          Every cartridge is 100% recyclable. Return five used cartridges and receive a complimentary refill of your signature scent.
        </p>
        <button className="text-[10px] uppercase tracking-widest font-semibold text-[#8E795B] border-b border-[#8E795B] pb-1">
          Explore Recycling Program
        </button>
      </div>
    </div>
  );
};

export default Library;
