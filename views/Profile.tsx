
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="p-8">
      <header className="mb-12">
        <h2 className="text-4xl mb-2">Charlotte</h2>
        <p className="text-xs uppercase tracking-widest text-[#AFAFA8]">Ritual Member since 2024</p>
      </header>

      <div className="space-y-8">
        <section>
          <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8E795B] mb-6">Experience Settings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 border-b border-[#EAE6D8]">
              <p className="text-sm">Adaptive Diffusion</p>
              <div className="w-10 h-5 bg-[#8E795B] rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-[#EAE6D8]">
              <p className="text-sm">Contextual Guidance</p>
              <div className="w-10 h-5 bg-[#8E795B] rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8E795B] mb-6">Privacy & Trust</h3>
          <p className="text-xs font-light text-[#6B6658] leading-relaxed mb-6">
            We value the sanctity of your scent journey. Your data is used exclusively to refine your personal guidance and is never shared with third parties.
          </p>
          <button className="text-xs text-[#8E795B] underline">Download my scent data</button>
        </section>

        <section className="pt-8 border-t border-[#EAE6D8]">
          <button className="w-full py-4 text-xs tracking-widest uppercase border border-[#2D2926] text-[#2D2926] rounded-full hover:bg-[#2D2926] hover:text-white transition-all">
            Unpair Device
          </button>
          <p className="text-center text-[10px] text-[#AFAFA8] mt-4">Firmware: v2.4.1 (Latest)</p>
        </section>
      </div>
    </div>
  );
};

export default Profile;
