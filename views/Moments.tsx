
import React from 'react';

const Moments: React.FC = () => {
  const moments = [
    { title: "Midnight in Paris", description: "Many found Santal Parfum grounding during cool evenings in the city.", tags: ["Quiet", "Elegant"] },
    { title: "The Silk Road", description: "A collective appreciation for the spicy warmth of cardomom at sunset.", tags: ["Spicy", "Enveloping"] },
    { title: "Dawn in Kyoto", description: "Shared moments of clarity with citrus openings during morning rituals.", tags: ["Bright", "Fresh"] },
  ];

  return (
    <div className="p-8">
      <header className="mb-12">
        <h2 className="text-4xl mb-2">Moments</h2>
        <p className="text-xs uppercase tracking-widest text-[#AFAFA8]">A Collective Olfactive Experience</p>
      </header>

      <div className="space-y-12">
        {moments.map((m, i) => (
          <div key={i} className="fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
            <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden mb-4 grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
               <img src={`https://picsum.photos/seed/moment${i}/800/450`} alt={m.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2 mb-3">
              {m.tags.map(t => (
                <span key={t} className="text-[8px] uppercase tracking-widest bg-white border border-[#EAE6D8] px-2 py-1 rounded-full text-[#AFAFA8]">{t}</span>
              ))}
            </div>
            <h3 className="text-xl mb-2 italic">{m.title}</h3>
            <p className="text-xs font-light text-[#6B6658] leading-relaxed">
              {m.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center text-[#AFAFA8]">
        <svg className="w-8 h-8 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 21l-8-4.5v-9L12 3l8 4.5v9L12 21z" /></svg>
        <p className="text-[10px] uppercase tracking-widest">Rituals are shared, identities are private.</p>
      </div>
    </div>
  );
};

export default Moments;
