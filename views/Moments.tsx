
import React, { useState } from 'react';

const Moments: React.FC = () => {
  const [tab, setTab] = useState<'Icons' | 'Community'>('Icons');

  const icons = [
    { name: "Dua Lipa", role: "Face of Libre", quote: "Freedom is the ultimate luxury.", image: "https://picsum.photos/seed/dua/800/1000", scent: "Libre EDP" },
    { name: "Lenny Kravitz", role: "Ambassador of Y", quote: "I want to see the future of craft.", image: "https://picsum.photos/seed/lenny/800/1000", scent: "Y Le Parfum" },
  ];

  const nearby = [
    { id: 1, dist: "200m", ritual: "Afternoon Reflection", note: "Orange Blossom" },
    { id: 2, dist: "1.2km", ritual: "Golden Hour Glow", note: "Lavender" },
    { id: 3, dist: "3.5km", ritual: "Midnight Sillage", note: "Vanilla" },
  ];

  return (
    <div className="p-8 pb-32">
      <header className="mb-10">
        <span className="text-[10px] uppercase tracking-[0.5em] text-[#8E795B] font-bold">L'Espace Social</span>
        <h2 className="text-4xl serif italic mt-1">Shared Rituals</h2>
      </header>

      <div className="flex gap-8 border-b border-[#EAE6D8] mb-10">
        {['Icons', 'Community'].map((t) => (
          <button 
            key={t}
            onClick={() => setTab(t as any)}
            className={`pb-4 text-[10px] uppercase tracking-widest font-bold transition-all ${tab === t ? 'text-[#2D2926] border-b-2 border-[#8E795B]' : 'text-[#AFAFA8]'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Icons' ? (
        <div className="space-y-12">
          {icons.map((icon) => (
            <div key={icon.name} className="relative group overflow-hidden rounded-[2.5rem] luxury-shadow">
               <div className="aspect-[4/5] w-full bg-[#F9F7F2]">
                  <img src={icon.image} alt={icon.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8E795B] mb-1">{icon.role}</p>
                  <h3 className="text-2xl serif italic mb-2">{icon.name}</h3>
                  <p className="text-sm font-light italic text-white/80 mb-4">&ldquo;{icon.quote}&rdquo;</p>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#8E795B]" />
                     <span className="text-[10px] uppercase tracking-widest font-bold">{icon.scent}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
           <div className="bg-[#8E795B]/5 border border-[#8E795B]/10 p-6 rounded-3xl">
              <h4 className="text-sm font-bold tracking-widest uppercase mb-2">Proximity Rituals</h4>
              <p className="text-[10px] text-[#6B6658] leading-relaxed italic">Connect silently through shared sillage. Respecting privacy through proximity-only presence.</p>
           </div>
           
           <div className="space-y-6">
              {nearby.map(u => (
                <div key={u.id} className="flex items-center gap-6 p-4 border-b border-[#EAE6D8] hover:bg-white transition-colors cursor-pointer">
                   <div className="w-12 h-12 rounded-full border border-[#D1CEC5] flex items-center justify-center bg-white">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                   </div>
                   <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest">{u.ritual}</p>
                      <p className="text-[10px] text-[#AFAFA8] italic mt-1">Sensing {u.note} • {u.dist} away</p>
                   </div>
                   <button className="text-[9px] uppercase tracking-widest font-bold text-[#8E795B] border border-[#8E795B]/20 px-3 py-1.5 rounded-full hover:bg-[#8E795B] hover:text-white transition-all">Connect</button>
                </div>
              ))}
           </div>

           <div className="pt-12 text-center">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#AFAFA8] max-w-[200px] mx-auto">No personal data is shared. Connection is based on olfactive compatibility.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default Moments;
